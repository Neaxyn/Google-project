import logging
from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
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
    logging.debug("Received chat request")
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
#
#
# @app.route("/summarize", methods=["POST"])
# def summarize():
#     logging.debug("Received summarize request")
#     url = request.json.get("url")
#     logging.debug(f"Received URL: {url}")
#     if url:
#         try:
#             api_url = f"https://language.googleapis.com/v1/documents:analyzeEntities?key={api_key}"
#             headers = {'Content-Type': 'application/json'}
#             body = {
#                 "document": {
#                     "type": "PLAIN_TEXT",
#                     "content": url
#                 },
#                 "encodingType": "UTF8"
#             }
#             response = requests.post(api_url, headers=headers, json=body)
#             response.raise_for_status()
#             data = response.json()
#             key_points = [entity['name'] for entity in data.get('entities', [])]
#             logging.debug(f"Key points: {key_points}")
#             return jsonify({"key_points": key_points})
#         except Exception as e:
#             logging.error(f"Error summarizing URL: {e}")
#             return jsonify({"response": "Erreur dans le traitement de la demande."}), 500
#     return jsonify({"response": "Erreur dans le traitement de la demande."}), 400

if __name__ == "__main__":
    app.run(debug=True)


