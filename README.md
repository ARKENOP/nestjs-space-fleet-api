# NestJS Space Fleet API 🚀
Ce projet est une API REST développée avec NestJS permettant la gestion d'une flotte de vaisseaux spatiaux ("Space Fleet").

## Prérequis
- Node.js
- npm

## Installation
1. Clonez le dépôt :
```bash
  git clone
```
2. Installez les dépendances:
```bash
  npm install
```
3. Démarrez le serveur de développement:
```bash
  npm run start:dev
```
L'API sera accessible à l'adresse `http://localhost:3000`.

## Documentation de l'API
Une documentation Swagger est disponible à l'adresse `http://localhost:3000/`.

## Endpoints Principaux
- `GET /starships` : Liste tous les vaisseaux de la flotte.
- `GET /starships/:id` : Récupère les détails d'un vaisseau spécifique.
- `POST /starships` : Ajoute un nouveau vaisseau à la flotte.
- `PUT /starships/:id` : Met à jour les informations d'un vaisseau existant.
- `DELETE /starships/:id` : Supprime un vaisseau de la flotte.

## Structure d'un object Starship
```json
{
  "id": "string",
  "name": "string",
  "model": "string",
  "crew": "number",
  "status": "string"
}
```

## Tests
Des tests unitaires sont mis en place pour valider la logique du service CRUD.
Pour les exécuter, utilisez la commande suivante:
```bash
  npm run test
```