import logging
from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Configuration API Google Generative AI
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    logging.debug(f"Received user input: {user_input}")
    if user_input:
        try:
            # Generate response from Google Generative AI model
            response = model.generate_content(user_input)
            logging.debug(f"Model response: {response.text}")
            return jsonify({"response": response.text})
        except Exception as e:
            logging.error(f"Error generating response: {e}")
            return jsonify({"response": "Erreur dans le traitement de la demande."}), 500
    return jsonify({"response": "Erreur dans le traitement de la demande."}), 400

if __name__ == "__main__":
    app.run(debug=True)