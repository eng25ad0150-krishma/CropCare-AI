
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO

from disease_info import DISEASE_INFO
from predict import predict_disease


app = FastAPI(title="CropCare AI API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://crop-care-ai-nu.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "CropCare AI backend is running!"
    }


@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image."
        )

    image_data = await file.read(5 * 1024 * 1024 + 1)

    if len(image_data) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="Image size must be less than 5 MB."
        )

    try:
        image = Image.open(BytesIO(image_data))
        image.verify()

        image = Image.open(BytesIO(image_data)).convert("RGB")

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )

    try:
        prediction = predict_disease(image)

        return {
            "message": "Image uploaded and analysed successfully!",
            "filename": file.filename,
            "status": "Prediction completed successfully.",
            "prediction": prediction
        }

    except Exception as error:
        print("Prediction error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to analyse the image. Please try again."
        )


@app.get("/diseases")
def get_diseases():
    return {
        "total_categories": len(DISEASE_INFO),
        "categories": list(DISEASE_INFO.keys())
    }


@app.get("/diseases/{category_name}")
def get_disease_details(category_name: str):

    if category_name not in DISEASE_INFO:
        raise HTTPException(
            status_code=404,
            detail="Disease category not found."
        )

    return DISEASE_INFO[category_name]
