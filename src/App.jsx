import { useState } from 'react';
import './App.css';

     function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadResult, setUploadResult] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const handleReset = () => {
  setSelectedImage(null);
  setUploadStatus("");
  setUploadResult(null);
  setPredictionResult(null);
};
  const handleImageUpload = async (file) => {
  if (!file) return;

  setUploadStatus("Uploading image...");
  setUploadResult(null);
  setPredictionResult(null);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Image upload failed.");
    }

    setUploadResult(data);
    setPredictionResult(data.prediction || null);
    setUploadStatus("Image uploaded successfully!");
  } catch (error) {
    setUploadStatus(error.message);
  }
};

  return (
    <div className="app">

      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="#home" className="logo">
          CROPCARE<span>AI.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <a href="#detect" className="nav-button">
          Detect Disease <span>↗</span>
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">

        <div className="hero-content">
          <span className="hero-tag">
            ✳ INTELLIGENT CROP HEALTH
          </span>

          <h1>
            Healthier crops.
            <br />
            <span>Smarter farming.</span>
          </h1>

          <p>
            Detect crop diseases early with the power of
            artificial intelligence. Simply upload a leaf
            photograph and discover insights that help
            protect your crops.
          </p>

          <div className="hero-buttons">
            <a href="#detect" className="primary-button">
              Analyse a Leaf <span>↗</span>
            </a>

            <a href="#how-it-works" className="secondary-button">
              Discover How It Works
            </a>
          </div>

          <div className="hero-note">
            AI-powered insights for healthier agriculture.
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1200&q=85"
            alt="Healthy green agricultural crops"
          />

          <div className="image-label">
            <span>✳</span>
            THE FUTURE OF CROP HEALTH
          </div>
        </div>

      </section>

      {/* WHY CROP HEALTH MATTERS */}
      <section className="problem-section" id="about">

        <div className="problem-heading">
          <span className="section-tag">
            THE CHALLENGE BEHIND EVERY LEAF
          </span>

          <h2>
            A small change on a leaf
            <br />
            <span>can make a big difference.</span>
          </h2>

          <p>
            Crop diseases can affect plant health and agricultural
            productivity. Identifying warning signs early can help
            farmers take informed action.
          </p>
        </div>

        <div className="problem-grid">

          <div className="problem-card">
            <span className="problem-number">01</span>
            <div className="problem-icon">✳</div>
            <h3>Diseases can spread</h3>
            <p>
              Plant diseases can spread across crops when warning
              signs go unnoticed.
            </p>
          </div>

          <div className="problem-card featured-problem">
            <span className="problem-number">02</span>
            <div className="problem-icon">⌁</div>
            <h3>Early detection matters</h3>
            <p>
              Recognising possible symptoms early helps farmers
              explore suitable management options.
            </p>
          </div>

          <div className="problem-card">
            <span className="problem-number">03</span>
            <div className="problem-icon">✳</div>
            <h3>Information empowers</h3>
            <p>
              Accessible crop health information can support
              better farming decisions.
            </p>
          </div>

        </div>

            </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="features">

        <div className="features-heading">
          <span className="section-tag">
            WHAT CROPCARE AI OFFERS
          </span>

          <h2>
            Everything your crops
            <br />
            <span>need to stay healthier.</span>
          </h2>

          <p>
            Simple, intelligent tools that help you understand
            crop health and make more informed decisions.
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <span className="feature-number">01 / DETECT</span>
            <div className="feature-icon">⌕</div>
            <h3>AI Disease Detection</h3>
            <p>
              Upload a photograph of a crop leaf to check for
              possible signs of disease using image analysis.
            </p>
            <span className="feature-arrow">↗</span>
          </div>

          <div className="feature-card">
            <span className="feature-number">02 / UNDERSTAND</span>
            <div className="feature-icon">✳</div>
            <h3>Disease Insights</h3>
            <p>
              Explore possible symptoms, causes and information
              about the detected crop condition.
            </p>
            <span className="feature-arrow">↗</span>
          </div>

          <div className="feature-card">
            <span className="feature-number">03 / PROTECT</span>
            <div className="feature-icon">❋</div>
            <h3>Smart Recommendations</h3>
            <p>
              Discover practical management and prevention
              guidance to support healthier crops.
            </p>
            <span className="feature-arrow">↗</span>
          </div>

        </div>

      
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-section" id="how-it-works">

        <div className="how-heading">
          <span className="section-tag">
            SIMPLE. SMART. ACCESSIBLE.
          </span>

          <h2>
            From leaf to insight,
            <br />
            <span>in three simple steps.</span>
          </h2>

          <p>
            Understanding your crop's health doesn't have to be
            complicated. CROPCARE AI makes the process simple.
          </p>
        </div>

        <div className="how-grid">

          <div className="how-card">
            <span className="how-number">01</span>
            <div className="how-icon">↑</div>
            <h3>Upload a Leaf</h3>
            <p>
              Choose a clear photograph of the crop leaf you
              want to examine.
            </p>
          </div>

          <div className="how-card">
            <span className="how-number">02</span>
            <div className="how-icon">⌕</div>
            <h3>AI Analysis</h3>
            <p>
              Our trained AI model analyses the image for
              possible signs of crop disease.
            </p>
          </div>

          <div className="how-card">
            <span className="how-number">03</span>
            <div className="how-icon">✳</div>
            <h3>Get Insights</h3>
            <p>
              Explore the prediction, confidence score and
              relevant crop health guidance.
            </p>
          </div>

        </div>

      
      </section>

      {/* AI DISEASE DETECTION SECTION */}
      <section className="detect-section" id="detect">

        <div className="detect-heading">
          <span className="section-tag">
            YOUR FIRST STEP TOWARDS HEALTHIER CROPS
          </span>

          <h2>
            Let's understand
            <br />
            <span>what your leaf is telling you.</span>
          </h2>

          <p>
            Upload a clear photograph of a crop leaf and let
            CROPCARE AI help you examine its health.
          </p>
        </div>

        <div className="detect-container">

          <div className="upload-box">
            <div className="upload-icon">↑</div>

            <h3>Upload your leaf image</h3>

            <p>
              Choose a photograph from your device to begin
              the crop health analysis.
            </p>

            <label className="upload-button">
  Choose Image
  <input
  type="file"
  accept="image/jpeg, image/png"
  hidden
  onChange={(event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setUploadStatus("Please upload a JPG or PNG image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    handleImageUpload(file);
    event.target.value = "";
  }}
/>

</label>

            <span className="upload-note">
              Supported format: JPG, PNG
            </span>

{selectedImage && (
  <div className="image-preview">
    <img
      src={selectedImage}
      alt="Selected crop leaf"
    />
    <p>Image selected successfully</p>
    <button
      className="reset-button"
      onClick={handleReset}
    >
      Clear & Upload Another Image
    </button>
  </div>
)}

{uploadStatus && (
  <p className="upload-status">{uploadStatus}</p>
)}

{uploadResult && (
  <div className="upload-result">
    <h4>Upload Details</h4>
    <p>File: {uploadResult.filename}</p>
    <p>Status: {uploadResult.status}</p>
  </div>
)}


{predictionResult && (
  <div className="prediction-result">

    <div className="result-header">
      <span className="result-label">AI ANALYSIS COMPLETE</span>
      <h3>Disease Detection Result</h3>
      <p>Here is the analysis of your uploaded leaf.</p>
    </div>

    <div className="result-summary">
      <div>
        <span>Crop</span>
        <h4>{predictionResult.details.crop}</h4>
      </div>

      <div>
        <span>Detected Disease</span>
        <h4>{predictionResult.details.disease}</h4>
      </div>

      <div>
        <span>Model Confidence</span>
        <h4>{predictionResult.confidence}%</h4>

        <div className="confidence-bar">
          <div
            className="confidence-fill"
            style={{ width: `${predictionResult.confidence}%` }}
          ></div>
        </div>

        <p className="confidence-note">
         This score represents the model's confidence in its prediction.
         It does not guarantee that the diagnosis is correct.
       </p>


      </div>
    </div>

    
  <div className="result-details-grid">

   <div className="result-detail-card">
    <h4>Symptoms</h4>
    <ul>
      {predictionResult.details.symptoms.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  <div className="result-detail-card">
    <h4>Possible Causes</h4>
    <ul>
      {predictionResult.details.causes.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  <div className="result-detail-card">
    <h4>Treatment</h4>
    <ul>
      {predictionResult.details.treatment.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  <div className="result-detail-card">
    <h4>Prevention</h4>
    <ul>
      {predictionResult.details.prevention.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

 </div>


    <div className="result-disclaimer">
      <strong>Important Note</strong>
      <p>
        AI predictions are provided for informational purposes.
        Please verify the result with an agricultural expert
        before taking treatment decisions.
      </p>
    </div>

  </div>
)}

</div>


          <div className="detect-info">
            <span className="detect-small-tag">
              BEFORE YOU UPLOAD
            </span>

            <h3>For a better analysis</h3>

            <ul>
              <li>Use a clear, well-lit photograph.</li>
              <li>Keep the leaf fully visible.</li>
              <li>Avoid blurry or distant images.</li>
              <li>Choose one leaf at a time.</li>
            </ul>

            <div className="detect-disclaimer">
              <span>✳</span>
              AI predictions are informational and should
              be verified before taking treatment decisions.
            </div>
          </div>

        </div>

      </section>


      {/* FOOTER SECTION */}
      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              CROPCARE<span>AI.</span>
            </a>

            <p>
              Empowering healthier crops through intelligent
              technology. Making crop health insights
              simpler, smarter and more accessible.
            </p>

            <span className="footer-tagline">
              SMART CROP HEALTH. BETTER FARMING.
            </span>
          </div>

          <div className="footer-links">
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About Us</a>
          </div>

          <div className="footer-links">
            <h3>GET STARTED</h3>
            <a href="#detect">AI Disease Detection</a>
            <a href="#detect">Upload a Leaf</a>
            <a href="#features">Our Features</a>
          </div>

          <div className="footer-message">
            <span>GROW WITH CONFIDENCE</span>
            <h3>
              A healthier tomorrow
              starts with every leaf.
            </h3>
            <a href="#detect" className="footer-cta">
              Analyse Your Leaf ↗
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 CROPCARE AI. All rights reserved.</p>
          <p>Built with care for a greener tomorrow. 🌱</p>
        </div>

      </footer>



    </div>
  );
}


export default App;
