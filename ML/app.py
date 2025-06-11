import os
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
import tensorflow as tf

app = Flask(__name__)

print("Current working directory:", os.getcwd())

# Konfigurasi
MODEL_PATH = 'model/model_sambal.h5'  # Ganti ke file .h5
LABELS_PATH = 'label/labels.txt'
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
IMAGE_SIZE = (224, 224)  # Sesuaikan dengan input size model

# Buat folder upload jika belum ada
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load label
with open(LABELS_PATH, 'r') as f:
    labels = [line.strip() for line in f.readlines()]

# Load model TensorFlow
model = tf.keras.models.load_model(MODEL_PATH)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB')
    img = img.resize(IMAGE_SIZE)
    img_array = np.array(img, dtype=np.float32) / 255.0  # Normalisasi
    img_array = np.expand_dims(img_array, axis=0)  # Tambahkan batch dimension
    return img_array

def predict_image(image_path):
    input_data = preprocess_image(image_path)
    output_data = model.predict(input_data)
    
    probabilities = np.squeeze(output_data)
    top_k = 3
    top_indices = np.argsort(probabilities)[-top_k:][::-1]
    
    results = []
    for idx in top_indices:
        class_name = labels[idx]
        confidence = float(probabilities[idx])
        results.append({
            "class": class_name,
            "confidence": round(confidence * 100, 2)
        })
    
    return results

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        try:
            predictions = predict_image(file_path)
            response = {
                "predictions": predictions
            }
            return jsonify(response)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)
    
    return jsonify({"error": "Invalid file type"}), 400

@app.route('/')
def index():
    return """
    <h1>Sambal Classification API</h1>
    <p>Gunakan endpoint /predict dengan POST request yang mengandung file gambar</p>
    <p>Contoh curl:</p>
    <pre>
    curl -X POST -F "file=@test.jpg" http://localhost:5000/predict
    </pre>
    """

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
