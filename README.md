# TW3 Chatbot (test technique)

Ce projet est un Chatbot qui utilise une API DuckDuckGo pour rechercher sur internet des informations et OpenRouter pour fournir les réponses.

## Quick steps

### Backend
```bash
cd chatbot-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Éditer .env et ajouter votre clé API OpenRouter
python src/main.py
```

### Frontend
```bash
cd chatbot-frontend
npm install
npm run dev
```

## Configuration

1. Créer une clé API sur https://openrouter.ai/
2. Ajouter la clé dans `chatbot-backend/.env`
4. Générer une Secret Key Flask et l'ajouter dans chatbot-backend/.env (voir le README du backend pour plus de détails)
4. Démarrer le backend puis le frontend

## Utilisation

1. Ouvrir http://localhost:3000 (ou http://localhost:5173, voir output)
2. Posez votre question
3. TW3 Chatbot recherche sur Internet et génère une réponse, en donnant ses sources

## Stack technique

- **Backend** : Python, Flask, DuckDuckGo Search, OpenRouter
- **Frontend** : React, CSS basique
- **LLM** : qwen-2.5-72b-instruct:free (la 32b n'était pas disponible, sauf en version 'Coder' mais qui retournait des réponses hors sujet et/ou hors contexte)
