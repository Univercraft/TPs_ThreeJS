import * as THREE from 'three';

/**
 * TP1 - Three.js - Scène 3D Interactive
 * Création d'une composition harmonieuse avec différents objets 3D
 */

// ========================================
// 1. CONFIGURATION DE LA SCÈNE
// ========================================
const scene = new THREE.Scene();
// Fond rouge sombre pour contraster avec les objets colorés
scene.background = new THREE.Color(0xff0000);


// ========================================
// 2. CONFIGURATION DE LA CAMÉRA
// ========================================
const camera = new THREE.PerspectiveCamera(
75, // FOV - Champ de vision
window.innerWidth / window.innerHeight, // Ratio d'aspect
0.1, // Plan proche
1000 // Plan lointain
);
// Position initiale de la caméra pour une vue d'ensemble
camera.position.set(6, 5, 6);
camera.lookAt(0, 0, 0);

// ========================================
// 3. CONFIGURATION DU RENDERER
// ========================================
const renderer = new THREE.WebGLRenderer({
antialias: true // Antialiasing pour des bords lisses
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Optimisation pour écrans haute résolution
document.body.appendChild(renderer.domElement);

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================================
// 4. SYSTÈME D'ÉCLAIRAGE COMPLET
// ========================================

// Objet pour gérer l'état des lumières
const lightsState = {
  ambient: true,
  directional: true,
  point: true,
  spot: true,
  hemisphere: true,
  rectArea: true
};

// 1. AmbientLight - Lumière ambiante, éclaire uniformément toute la scène
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 2. DirectionalLight - Lumière directionnelle (comme le soleil)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(8, 10, 5);
scene.add(directionalLight);

// 3. PointLight - Lumière ponctuelle (comme une ampoule)
const pointLight = new THREE.PointLight(0xffff00, 1.2, 20);
pointLight.position.set(-4, 4, -4);
scene.add(pointLight);

// 4. SpotLight - Projecteur avec cône de lumière
const spotLight = new THREE.SpotLight(0xff6600, 2.0);
spotLight.position.set(0, 10, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.3;
spotLight.distance = 20;
spotLight.decay = 2;
scene.add(spotLight);

// 5. HemisphereLight - Lumière hémisphérique (ciel + sol)
const hemisphereLight = new THREE.HemisphereLight(
  0x87ceeb, // Couleur du ciel (bleu clair)
  0x2d1b00, // Couleur du sol (marron)
  0.6
);
scene.add(hemisphereLight);

// 6. RectAreaLight - Lumière rectangulaire (néon, fenêtre)
const rectAreaLight = new THREE.RectAreaLight(0x00ffff, 2, 4, 4);
rectAreaLight.position.set(0, 5, -5);
rectAreaLight.lookAt(0, 0, 0);
scene.add(rectAreaLight);

// Fonction pour mettre à jour l'état des lumières
function updateLightsVisibility() {
  ambientLight.visible = lightsState.ambient;
  directionalLight.visible = lightsState.directional;
  pointLight.visible = lightsState.point;
  spotLight.visible = lightsState.spot;
  hemisphereLight.visible = lightsState.hemisphere;
  rectAreaLight.visible = lightsState.rectArea;
  
  updateLightsUI();
}

// Fonction pour mettre à jour l'interface
function updateLightsUI() {
  document.querySelectorAll('.light-toggle').forEach(btn => {
    const lightName = btn.dataset.light;
    btn.classList.toggle('active', lightsState[lightName]);
  });
}


// ========================================
// 5. CRÉATION DES OBJETS 3D
// ========================================

// A. Cube central - Point focal de la composition (Orange vif)
const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const material = new THREE.MeshStandardMaterial({
color: 0xff6600,
metalness: 0.3,
roughness: 0.4
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.6, 0);
scene.add(cube);

// Configurer le target du spotLight maintenant que cube existe
spotLight.target = cube;

// B. Sphère - Élément flottant semi-transparent (Bleu cyan)
const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
color: 0x00d4ff,
transparent: true,
opacity: 0.7,
metalness: 0.5,
roughness: 0.2
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(3.2, 0.6, 0);
scene.add(sphere);

// C. Tore - Structure en wireframe (Violet néon)
const torusGeometry = new THREE.TorusGeometry(0.6, 0.25, 16, 100);
const torusMaterial = new THREE.MeshPhongMaterial({
color: 0xbb00ff,
wireframe: true,
shininess: 100
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
const angle1 = (120 * Math.PI) / 180;
torus.position.set(Math.cos(angle1) * 3.2, 0.9, Math.sin(angle1) * 3.2);
scene.add(torus);

// D. Cône - Élément pyramidal avec style cartoon (Vert lime)
const coneGeometry = new THREE.ConeGeometry(0.6, 1.4, 32);
const coneMaterial = new THREE.MeshToonMaterial({
color: 0xddff00
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
const angle2 = (240 * Math.PI) / 180;
cone.position.set(Math.cos(angle2) * 3.2, 1.4, Math.sin(angle2) * 3.2);
scene.add(cone);

// E. Plan - Sol de la scène (Matériau normal pour effet arc-en-ciel)
const planeGeometry = new THREE.PlaneGeometry(12, 12, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
color: 0x2d3436,
roughness: 0.8,
metalness: 0.2,
side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -0.5;
plane.rotation.x = Math.PI / 2;
scene.add(plane);


// ========================================
// 6. SYSTÈME D'ANIMATION
// ========================================
let time = 0;
const cameraRadius = 8.5; // Distance de la caméra au centre
const cameraHeight = 5; // Hauteur fixe de la caméra sur l'axe Y

// Contrôle de la caméra
let cameraAngle = 0;
let autoRotate = true; // Rotation automatique activée par défaut
let rotationSpeed = 0.2;

// Gestion des contrôles clavier
const keys = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false
};

window.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'ArrowRight':
    case 'KeyA':
      keys.left = true;
      autoRotate = false;
      break;
    case 'ArrowLeft':
    case 'KeyD':
      keys.right = true;
      autoRotate = false;
      break;
    case 'ArrowUp':
    case 'KeyW':
      keys.up = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      keys.down = true;
      break;
    case 'Space':
      keys.space = true;
      autoRotate = !autoRotate;
      break;
    // Raccourcis pour toggle les lumières (chiffres 1-6)
    case 'Digit1':
      lightsState.ambient = !lightsState.ambient;
      updateLightsVisibility();
      break;
    case 'Digit2':
      lightsState.directional = !lightsState.directional;
      updateLightsVisibility();
      break;
    case 'Digit3':
      lightsState.point = !lightsState.point;
      updateLightsVisibility();
      break;
    case 'Digit4':
      lightsState.spot = !lightsState.spot;
      updateLightsVisibility();
      break;
    case 'Digit5':
      lightsState.hemisphere = !lightsState.hemisphere;
      updateLightsVisibility();
      break;
    case 'Digit6':
      lightsState.rectArea = !lightsState.rectArea;
      updateLightsVisibility();
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch(e.code) {
    case 'ArrowLeft':
    case 'KeyA':
      keys.left = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      keys.right = false;
      break;
    case 'ArrowUp':
    case 'KeyW':
      keys.up = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      keys.down = false;
      break;
    case 'Space':
      keys.space = false;
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);
  
  // Incrément du temps pour les animations fluides
  time += 0.01;
  
  // Animation du cube : rotation sur deux axes
  cube.rotation.x += 0.008;
  cube.rotation.y += 0.012;
  
  // Animation de la sphère : oscillation verticale sinusoïdale
  sphere.position.y = 0.6 + Math.sin(time * 1.5) * 0.6;
  sphere.rotation.y += 0.015;
  
  // Animation du tore : rotation complexe pour effet de spirale
  torus.rotation.x += 0.015;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.005;
  
  // Animation du cône : rotation simple
  cone.rotation.y += 0.02;
  
  // Contrôles de la caméra
  if (autoRotate) {
    cameraAngle += rotationSpeed * 0.01;
  } else {
    if (keys.left) cameraAngle -= 0.03;
    if (keys.right) cameraAngle += 0.03;
  }
  
  // Contrôle de la hauteur de la caméra
  let currentHeight = cameraHeight;
  if (keys.up) currentHeight += 0.1;
  if (keys.down) currentHeight -= 0.1;
  currentHeight = Math.max(2, Math.min(15, currentHeight)); // Limites
  
  // Position de la caméra basée sur l'angle
  camera.position.x = Math.cos(cameraAngle) * cameraRadius;
  camera.position.z = Math.sin(cameraAngle) * cameraRadius;
  camera.position.y = currentHeight;
  camera.lookAt(0, 1, 0);
  
  // Animation de la lumière ponctuelle mobile
  pointLight.position.x = Math.cos(time * 0.4) * 6;
  pointLight.position.z = Math.sin(time * 0.4) * 6;
  pointLight.position.y = 3 + Math.sin(time * 0.6) * 2;
  
  // Animation du SpotLight pour effet dynamique
  spotLight.position.x = Math.cos(time * 0.2) * 2;
  spotLight.position.z = Math.sin(time * 0.2) * 2;
  
  // Rendu de la scène
  renderer.render(scene, camera);
}

// Démarrage de la boucle d'animation
animate();

// Initialiser l'UI après le chargement du DOM
window.addEventListener('DOMContentLoaded', () => {
  // Attacher les événements aux boutons
  document.querySelectorAll('.light-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const lightName = btn.dataset.light;
      lightsState[lightName] = !lightsState[lightName];
      updateLightsVisibility();
    });
  });
  
  updateLightsUI();
});

// Exposer les fonctions et états globalement pour l'interface HTML
window.lightsState = lightsState;
window.updateLightsVisibility = updateLightsVisibility;