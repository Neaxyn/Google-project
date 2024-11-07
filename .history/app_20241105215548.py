import logging
from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Configuration API Google Generative AI
os.environ["API_KEY"] = "AIzaSyAe6bAVaFgub8ZRX8eqwlCw78LfxgfrLvs"
genai.configure(api_key=os.environ["API_KEY"])
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