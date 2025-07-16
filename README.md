# TW3 Chatbot (test technique)

Ce projet est un Chatbot qui utilise l'API DuckDuckGo Search pour rechercher sur internet des informations et OpenRouter pour élaborer les réponses en langage naturel (et fournir aussi les sources), facilitant ainsi l'engagement des utilisateurs à utiliser et promouvoir cet outil dans le cadre d'une utilisation interne en entreprise.

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



## Réponses aux questions de la partie 2

# Déploiement de la solution sur Azure

## 1. Décrivez étape par étape comment déployer la solution sur Azure

Le déploiement de la solution sur Azure suit une série d'étapes structurées, de la préparation de l'environnement au déploiement final et à la validation.

### Étapes :
1. **Préparation de l’environnement Azure (cloud et local)**
2. **Provisionnement des ressources Azure**  
   (via Infrastructure as Code - IaC)
3. **Déploiement du code et Configuration**
4. **Validation finale et Monitoring**  
   (tests, métriques, logs)

---

## 2. Identifiez TOUS les prérequis nécessaires

Les prérequis se divisent en deux catégories : techniques et organisationnels.

### Prérequis techniques :
- Un compte Azure avec un abonnement actif et des crédits suffisants
- Des permissions Azure appropriées (rôle *Contributeur* ou rôle personnalisé)
- Azure CLI et Docker installés localement
- Node.js et npm/yarn (versions compatibles avec React)
- Accès au dépôt GitHub (lecture + écriture pour GitHub Actions)
- Un outil IaC (Terraform ou Azure Bicep) avec les scripts nécessaires
- Connaissance approfondie des services Azure :  
  App Services, Container Registry, Bot Service, Key Vault, Storage, Application Insights
- Maîtrise des concepts CI/CD et GitHub Actions

### Prérequis organisationnels :
- Validation et allocation budgétaire par les équipes IT/Finance
- Politiques de sécurité et conformité Azure (IAM, logs, accès)
- Définition claire des rôles et responsabilités (infra & cycle de vie)

---

## 3. Estimez les coûts mensuels

Scénario basé sur 200 utilisateurs actifs :

| Service Azure                | Coût estimé/mois |
|-----------------------------|------------------|
| App Service (Frontend/Backend) | 150 € à 200 €     |
| Azure Container Registry (Standard) | 10 € à 15 €       |
| Azure Bot Service (4 000 messages/jour) | 60 €             |
| Blob Storage                | 10 € max         |
| **Total estimé**            | **< 300 €**      |

---

## 4. Proposez une architecture scalable

L'architecture proposée est conçue pour s'ajuster dynamiquement à la charge :

- **App Services** (autoscaling activé) : pour frontend et backend
- **Azure Application Gateway (avec WAF)** : pour répartition de charge intelligente et sécurisée
- **Azure Blob Storage** : pour un stockage évolutif et redondant (logs, sauvegardes)
- **Azure Application Insights** : pour monitorer les performances, diagnostiquer les erreurs et piloter les mises à l'échelle

---

## 5. Points d’attention : Accès, Permissions, Backend

### Accès nécessaires :
- Accès administrateur
- Accès contributeur
- Accès lecture seule

### Permissions :
- Utilisation de l'IAM pour une gestion fine des accès par équipe

### Accès au backend :
- Réservé uniquement aux développeurs

### Autres considérations :
- Choix judicieux de la ou des **régions Azure**
- Limitation des accès réseau via des **NSG** ou **Private Endpoints**

---

## 6. Quels services Azure utiliser et pourquoi ?

| Service Azure | Usage |
|---------------|-------|
| **Azure App Service** | Hébergement simple avec autoscaling, slots de déploiement, intégration Docker |
| **Azure Container Registry (ACR)** | Registre Docker privé, sécurisé, intégré aux pipelines CI/CD |
| **Azure Bot Service** | Intégration facile des bots sur divers canaux |
| **Azure Key Vault** | Gestion centralisée et sécurisée des secrets |
| **Azure Storage Account (Blob Storage)** | Stockage scalable pour logs et données |
| **Azure Application Insights** | Monitoring des performances, détection des erreurs |
| **Azure Application Gateway / Front Door** | Répartition de charge, WAF, terminaison SSL |

---

## 7. Quelles sont les considérations de sécurité ?

La sécurité est intégrée à chaque étape :

- Communication interne sécurisée (VPN, réseaux privés)
- **IAM** : gestion des identités et des accès
- **Key Vault** pour la gestion des secrets
- Sécurité réseau : NSG, Private Endpoints, Application Gateway avec WAF

---

## 8. Comment gérer les secrets et API keys ?

- Stockage sécurisé via **Azure Key Vault**
- Utilisation d’**Identités Managées**
- Accès contrôlé (RBAC)
- Rotation régulière des secrets
- Récupération sécurisée via application ou pipeline CI/CD

---

## 9. Stratégie de mise en production

### CI/CD pipeline (via GitHub Actions)

- **Backend** :  
  Build image Docker → Tests unitaires (Python) → Déploiement (staging → prod)
- **Frontend** :  
  Installation dépendances → Build React → Tests unitaires

### Monitoring et logs
- Centralisation des logs
- Dashboard avec Azure Monitor / Application Insights
- Suivi en temps réel : performance, erreurs, coûts

---

## 10. Gestion des erreurs

- **Tests unitaires** (fonctions spécifiques)
- **Tests d’intégration** (services Azure)
- **Tests E2E**
- **Tests de charge** pour identifier les goulots d’étranglement

---

## 11. Stratégie de backup

### Code source :
- Sauvegarde assurée via GitHub (commits, branches, historique)

### Données :
- **Azure Blob Storage** : versioning et redondance activés
- **Azure Backup** : snapshots réguliers et points de récupération
- **Sauvegardes automatiques** configurées pour tous les services critiques

