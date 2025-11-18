# TP1 - Three.js - Scène 3D Interactive

## 📋 Description du projet

Création d'une scène 3D interactive utilisant Three.js avec différents objets géométriques, matériaux variés, système d'éclairage complexe et animations fluides.

## 🎯 Objectifs réalisés

### Question 1 : Configuration de base
- ✅ Initialisation de la scène Three.js
- ✅ Configuration de la caméra perspective
- ✅ Mise en place du renderer WebGL avec antialiasing
- ✅ Gestion responsive du canvas

### Question 2 : Création des objets 3D
- ✅ **Cube** : Objet central en MeshStandardMaterial (orange)
- ✅ **Sphère** : Objet semi-transparent avec effet de verre (bleu cyan)
- ✅ **Tore** : Structure en wireframe pour effet technique (violet)
- ✅ **Cône** : Matériau cartoon/toon (vert lime)
- ✅ **Plan** : Sol de la scène (gris sombre)

### Question 2bis : Variations de matériaux
- ✅ MeshBasicMaterial → MeshStandardMaterial (cube)
- ✅ MeshStandardMaterial avec transparence (sphère)
- ✅ MeshPhongMaterial en wireframe (tore)
- ✅ MeshToonMaterial pour effet cartoon (cône)
- ✅ Objet semi-transparent avec opacity: 0.7 (sphère)

### Question 3 : Système d'éclairage
- ✅ **Lumière ambiante** : Éclairage global uniforme (intensité 0.6)
- ✅ **Lumière directionnelle** : Lumière principale type soleil (intensité 0.9)
- ✅ **Lumière ponctuelle** : Source dynamique orange (intensité 0.8)
- ✅ **Lumière d'appoint** : Fill light pour équilibrer les ombres

### Question 4 : Animations
- ✅ Boucle d'animation avec `requestAnimationFrame`
- ✅ Rotation du cube sur axes X et Y
- ✅ Oscillation sinusoïdale de la sphère (haut/bas)
- ✅ Rotation complexe du tore sur 3 axes
- ✅ Rotation globale de la caméra autour de la scène
- ✅ Animation de la lumière ponctuelle

### Question 5 : Composition finale
- ✅ Disposition circulaire harmonieuse des objets
- ✅ Palette de couleurs complémentaires
- ✅ Équilibre visuel avec point focal central
- ✅ Animations fluides et coordonnées
- ✅ Code source entièrement commenté

## 🎨 Choix artistiques

### Palette de couleurs
- **Fond** : Bleu nuit (#1a1a2e) pour créer du contraste
- **Cube** : Orange vif (#ff6600) - Point focal chaud
- **Sphère** : Cyan lumineux (#00d4ff) - Légèreté et transparence
- **Tore** : Violet néon (#bb00ff) - Contraste technologique
- **Cône** : Vert lime (#ddff00) - Énergie et dynamisme
- **Plan** : Gris anthracite (#2d3436) - Base neutre

### Composition spatiale
- **Centre** : Cube comme ancrage visuel
- **Disposition circulaire** : Objets à 120° d'intervalle (règle des tiers)
- **Hauteurs variées** : Création de profondeur (0.6, 0.9, 1.4)
- **Rayon de 3.2 unités** : Espacement harmonieux

### Animations
- **Vitesses différenciées** : Chaque objet a son propre rythme
- **Caméra orbitale lente** : Pour apprécier tous les angles
- **Oscillation naturelle** : Utilisation de Math.sin pour fluidité
- **Lumière dynamique** : Renforce l'immersion

## 🚀 Installation et lancement

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation
```bash
# Installation des dépendances
npm install
```

### Lancement
```bash
# Mode développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

### Accès
Ouvrir le navigateur à l'adresse : `http://localhost:5173`

## 📁 Structure du projet
```
TP1/
├── TP1/
│   └── src/
│       └── main.js          # Code principal de la scène
├── package.json             # Configuration npm
├── vite.config.js          # Configuration Vite
└── README.md               # Documentation (ce fichier)
```

## 🛠️ Technologies utilisées
- **Three.js** (^0.160.0) : Bibliothèque 3D WebGL
- **Vite** (^5.0.0) : Build tool et dev server
- **JavaScript ES6+** : Langage de programmation

## 📸 Capture d'écran
Pour faire une capture d'écran :
1. Lancer l'application avec `npm run dev`
2. Attendre quelques secondes pour voir l'animation
3. Faire une capture d'écran (Windows : Win+Shift+S)
4. Sauvegarder sous `screenshot.png` à la racine du projet

## 🎓 Compétences développées
- Configuration d'une scène Three.js complète
- Manipulation de géométries et matériaux 3D
- Gestion de l'éclairage pour rendu réaliste
- Création d'animations fluides avec requestAnimationFrame
- Utilisation de fonctions trigonométriques pour animations
- Organisation et documentation du code
- Optimisation des performances WebGL

## 📝 Notes techniques

### Performances
- Antialiasing activé pour qualité visuelle
- PixelRatio adaptatif pour écrans haute résolution
- Animations à 60 FPS via requestAnimationFrame
- Gestion responsive du canvas

### Points d'amélioration possibles
- Ajout de contrôles OrbitControls pour interaction utilisateur
- Implémentation d'ombres portées
- Ajout de textures sur les objets
- Post-processing effects (bloom, etc.)
- Chargement de modèles 3D externes

## 👤 Auteur
Réalisé dans le cadre du cours R507 - Dispositif Interactif - MMI3

## 📅 Date
Novembre 2024
