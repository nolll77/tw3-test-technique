# TW3 Chatbot - Readme Backend

Backend Flask pour le chatbot TW3 (test technique) avec DuckDuckGo pour la recherche sur internet et openrouter.ia pour le 'provider' de LLM.

## Installation

1. Cloner le projet
2. Créer un environnement virtuel :
```bash
python -m venv venv
source venv/bin/activate  # sur Mac
# ou
venv\Scripts\activate  # sur windows, mais pas pu tester
```

3. Installer les dépendances :
```bash
pip install -r requirements.txt
```

4. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
ensuite éditer le fichier `.env` et ajouter la clé API d'OpenRouter.

## Config

### Créer la clé API sur OpenRouter

1. Aller sur https://openrouter.ai/
2. Créer un compte, pusi créer une clé APi
3. Aller dans le fichier `.env` pour coller la clé OpenRouter:
```bash
OPENROUTER_API_KEY=coller_cle_api_ici
```
### Secret Key Flask

1. La Secret Key pour Flask est utilisée pour sécuriser les sessions. Créer une chaîne de caractères aléatoire et l'ajoutez au fichier .env
```bash
FLASK_SECRET_KEY=chaine_de_caracteres_aleatoire
```

## Utilisation

Démarrer le serveur :
```bash
python src/main.py
```

Le serveur sera accessible sur http://localhost:6000

## API

### POST /api/chat
Envoie une question au chatbot.

**Body :**
```json
{
  "message": "Votre question"
}
```

**Réponse :**
```json
{
  "response": "Réponse du chatbot",
  "sources": [
    {
      "title": "Titre de la source",
      "url": "URL de la source"
    }
  ]
}
```

