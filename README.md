# 🕹️ DEVINE

> _Retrouve le nombre mystère entre 1 et 100 — en un minimum de tentatives !_

Application web de jeu de devinette développée avec **Node.js**, **Express** et **MongoDB/Mongoose**, dans un style pixel rétro 80s-90s.

---

## ✨ Fonctionnalités

- Inscription et connexion utilisateur (mots de passe hashés avec Argon2)
- Jeu de devinette : trouver un nombre entre 1 et 100
- Classement des parties (tentatives + temps)
- Interface pixel/rétro avec effets neon
- Espace admin : gestion des utilisateurs

---

## 🛠️ Stack technique

| Couche          | Technologie              |
| --------------- | ------------------------ |
| Serveur         | Node.js + Express        |
| Base de données | MongoDB + Mongoose       |
| Vues            | EJS (templates)          |
| Style           | Bootstrap 5 + CSS custom |
| Auth            | express-session + Argon2 |
| Validation      | express-validator        |

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) en local sur le port `27017`

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/JnniferV/Guess_number.git
cd Guess_number

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm start
```

L'app est accessible sur **http://localhost:3000**

### Fichier `.env` (important)

Avant de lancer le projet, crée un fichier `.env` à la racine du projet et ajoute :

```env
MONGODB_URI=mongodb://localhost:27017/express_brain
SESSION_SECRET=remplace_par_un_secret_long_et_unique
```

Exemple simple de secret :

```env
SESSION_SECRET=devine_secret_2026
```

---

## ⚙️ Configuration

La connexion MongoDB est définie dans `config/database.js` :

```
mongodb://localhost:27017/express_brain
```

## 📁 Structure du projet

```
guess-app/
├── config/          # Connexion MongoDB
├── controllers/     # Logique des routes
├── middlewares/     # Auth, sessions
├── models/          # Schémas Mongoose
├── repositories/    # Accès aux données
├── routes/          # Définition des routes
├── services/        # Logique métier
├── views/           # Templates EJS
└── public/          # CSS, assets statiques
```

---

## 👤 Auteur

**JnniferV**
