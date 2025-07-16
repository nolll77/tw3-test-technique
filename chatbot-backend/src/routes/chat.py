import os
import requests
from flask import Blueprint, request, jsonify
from duckduckgo_search import DDGS

chat_bp = Blueprint('chat', __name__)

def recherche_internet(query):
    try:
        ddgs = DDGS()
        results = ddgs.text(query, max_results=3)
        return results
    except:
        return []

def ask_llm(question, search_resultats):
    api_key = os.getenv('OPENROUTER_API_KEY')
    if not api_key:
        return "Erreur: clé API manquante"
    
    # Préparer le contexte
    context = ""
    if search_resultats:
        context = "Informations trouvées:\n"
        for result in search_resultats:
            context += f"- {result.get('title', '')}: {result.get('body', '')}\n"
    
    # Appeler l'API
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "qwen/qwen-2.5-72b-instruct:free",
                "messages": [
                    {"role": "system", "content": "Tu es un assistant qui répond en français de manière simple et claire."},
                    {"role": "user", "content": f"Question: {question}\n\n{context}"}
                ]
            }
        )
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            return "Erreur lors de la génération de la réponse"
    except:
        return "Erreur de connexion à l'API OpenRouteur"

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get('message', '')
    
    if not question:
        return jsonify({'error': 'Question manquante'}), 400
    
    # Rechercher sur internet
    search_resultats = recherche_internet(question)
    
    # Demande au LLM
    response = ask_llm(question, search_resultats)
    
    # Préparer les sources
    sources = []
    for result in search_resultats:
        sources.append({
            'title': result.get('title', 'Sans titre'),
            'url': result.get('href', '')
        })
    
    return jsonify({
        'response': response,
        'sources': sources
    })

