
import os
import torch
import torch.nn as nn

from PIL import Image
from torchvision import models, transforms

from disease_info import DISEASE_INFO


# DEVICE CONFIGURATION

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR, "models", "crop_disease_model.pth"
)

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# IMAGE PREPROCESSING

image_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# LOAD TRAINED MODEL ONCE

def load_model():

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            "Trained model not found. Train the model first."
        )

    checkpoint = torch.load(
        MODEL_PATH,
        map_location=DEVICE,
        weights_only=True
    )

    class_names = checkpoint["class_names"]
    num_classes = checkpoint["num_classes"]

    model = models.mobilenet_v2(weights=None)

    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        num_classes
    )

    model.load_state_dict(checkpoint["model_state_dict"])

    model = model.to(DEVICE)
    model.eval()

    return model, class_names


model, class_names = load_model()


# PREDICT PLANT DISEASE

def predict_disease(image):

    image = image.convert("RGB")

    image_tensor = image_transform(image)
    image_tensor = image_tensor.unsqueeze(0).to(DEVICE)

    with torch.no_grad():

        outputs = model(image_tensor)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, predicted_index = torch.max(
            probabilities, dim=1
        )

    category = class_names[predicted_index.item()]

    confidence_score = round(
        confidence.item() * 100, 2
    )

    disease_details = DISEASE_INFO.get(category)

    if disease_details is None:
        raise ValueError(
            f"No disease information found for {category}"
        )

    return {
        "category": category,
        "confidence": confidence_score,
        "details": disease_details
    }
