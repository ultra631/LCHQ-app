# LCHQ — Ligue de Hockey

Portail officiel de la LCHQ : règlements, équipes et infos de la ligue.

Site statique (HTML/CSS) hébergé sur **GitHub Pages**.

## Structure

```
.
├── index.html              # Page d'accueil
├── public/
│   ├── logos/              # Logos et bannière
│   └── reglements/         # Documents officiels (PDF, .docx)
├── .nojekyll              # Désactive le traitement Jekyll de GitHub Pages
└── README.md
```

## Développement local

Ouvre simplement `index.html` dans un navigateur, ou sers le dossier :

```bash
python -m http.server 8000
# puis ouvre http://localhost:8000
```

## Déploiement (GitHub Pages)

1. Pousse ce dépôt sur GitHub.
2. Dans **Settings → Pages**, choisis la source **Deploy from a branch**.
3. Branche `main`, dossier `/ (root)`, puis **Save**.
4. Le site sera disponible à `https://<utilisateur>.github.io/<nom-du-depot>/`.

---

© Ligue de Hockey LCHQ — Tous droits réservés.
