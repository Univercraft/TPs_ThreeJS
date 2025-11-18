import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * TP2 - Three.js - Éclairage, Ombres et Atmosphère
 * Scène 3D avec système d'éclairage complet, ombres et contrôles
 */

// ========================================
// 1. CONFIGURATION DE LA SCÈNE
// ========================================
const scene = new THREE.Scene();

// Question 3 : Atmosphère - Brouillard
// Thème : Nuit mystérieuse avec brouillard
scene.background = new THREE.Color(0x0a0a1a);
scene.fog = new THREE.Fog(0x0a0a1a, 5, 30);
// Alternative avec FogExp2 (décommentez pour tester) :
// scene.fog = new THREE.FogExp2(0x0a0a1a, 0.05);

// ========================================
// 2. CONFIGURATION DE LA CAMÉRA
// ========================================
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 8, 10);
camera.lookAt(0, 0, 0);

// ========================================
// 3. CONFIGURATION DU RENDERER
// ========================================
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Question 2 : Configuration des ombres
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Types: BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, VSMShadowMap

// Gestion du redimensionnement
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================================
// 4. QUESTION 4 : CONTRÔLES DE CAMÉRA
// ========================================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Inertie
controls.dampingFactor = 0.05;
controls.minDistance = 5; // Distance minimale de zoom
controls.maxDistance = 30; // Distance maximale de zoom
controls.maxPolarAngle = Math.PI / 2 - 0.1; // Limite angle vertical (ne pas aller sous le sol)
controls.minPolarAngle = 0.1; // Limite angle vertical minimum

// ========================================
// 5. QUESTION 1 : SYSTÈME D'ÉCLAIRAGE
// ========================================

// Paramètres des lumières pour lil-gui
const lightParams = {
  ambientIntensity: 0.2,
  directionalIntensity: 1.0,
  pointLight1Intensity: 0.8,
  pointLight1Color: 0xff00ff, // Rose/Magenta
  pointLight2Intensity: 0.8,
  pointLight2Color: 0x00ffff, // Cyan
};

// 1. Lumière ambiante (intensité faible)
const ambientLight = new THREE.AmbientLight(0xffffff, lightParams.ambientIntensity);
scene.add(ambientLight);

// 2. Lumière directionnelle (comme le soleil)
const directionalLight = new THREE.DirectionalLight(0xffffff, lightParams.directionalIntensity);
directionalLight.position.set(10, 15, 5);
scene.add(directionalLight);

// Question 2 : Configuration des ombres pour la lumière directionnelle
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // Résolution des ombres
directionalLight.shadow.mapSize.height = 2048;
// Ajuster la shadow camera pour couvrir toute la scène
directionalLight.shadow.camera.left = -15;
directionalLight.shadow.camera.right = 15;
directionalLight.shadow.camera.top = 15;
directionalLight.shadow.camera.bottom = -15;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

// Bonus : Helper pour visualiser la shadow camera
const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
shadowCameraHelper.visible = false; // Caché par défaut
scene.add(shadowCameraHelper);

// 3. Première lumière ponctuelle colorée (Rose/Magenta)
const pointLight1 = new THREE.PointLight(
  lightParams.pointLight1Color,
  lightParams.pointLight1Intensity,
  20
);
pointLight1.position.set(-5, 3, -5);
pointLight1.castShadow = true;
pointLight1.shadow.mapSize.width = 1024;
pointLight1.shadow.mapSize.height = 1024;
scene.add(pointLight1);

// Helper pour visualiser la lumière ponctuelle 1
const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 0.5);
scene.add(pointLightHelper1);

// 4. Deuxième lumière ponctuelle colorée (Cyan)
const pointLight2 = new THREE.PointLight(
  lightParams.pointLight2Color,
  lightParams.pointLight2Intensity,
  20
);
pointLight2.position.set(5, 3, 5);
pointLight2.castShadow = true;
pointLight2.shadow.mapSize.width = 1024;
pointLight2.shadow.mapSize.height = 1024;
scene.add(pointLight2);

// Helper pour visualiser la lumière ponctuelle 2
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5);
scene.add(pointLightHelper2);

// ========================================
// 6. CRÉATION DES OBJETS 3D (avec MeshStandardMaterial)
// ========================================

// A. Cube central - MeshStandardMaterial
const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6600,
  metalness: 0.3,
  roughness: 0.4
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.6, 0);
cube.castShadow = true; // Projette des ombres
cube.receiveShadow = true; // Reçoit des ombres
scene.add(cube);

// B. Sphère - MeshStandardMaterial
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
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

// C. Tore - MeshStandardMaterial (pas de wireframe pour recevoir la lumière)
const torusGeometry = new THREE.TorusGeometry(0.6, 0.25, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0xbb00ff,
  metalness: 0.6,
  roughness: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
const angle1 = (120 * Math.PI) / 180;
torus.position.set(Math.cos(angle1) * 3.2, 0.9, Math.sin(angle1) * 3.2);
torus.castShadow = true;
torus.receiveShadow = true;
scene.add(torus);

// D. Cône - MeshStandardMaterial
const coneGeometry = new THREE.ConeGeometry(0.6, 1.4, 32);
const coneMaterial = new THREE.MeshStandardMaterial({
  color: 0xddff00,
  metalness: 0.2,
  roughness: 0.5
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
const angle2 = (240 * Math.PI) / 180;
cone.position.set(Math.cos(angle2) * 3.2, 0.7, Math.sin(angle2) * 3.2);
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);

// E. Plan (Sol) - Grand plan texturé
const planeGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1a2e,
  roughness: 0.8,
  metalness: 0.2,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = 0;
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true; // Le sol reçoit les ombres
scene.add(plane);

// ========================================
// 7. QUESTION 1 & 5 : INTERFACE LIL-GUI
// ========================================
const gui = new GUI();

// Dossier pour la lumière ambiante
const ambientFolder = gui.addFolder('Lumière Ambiante');
ambientFolder.add(lightParams, 'ambientIntensity', 0, 2, 0.01)
  .name('Intensité')
  .onChange((value) => {
    ambientLight.intensity = value;
  });
ambientFolder.open();

// Dossier pour la lumière directionnelle
const directionalFolder = gui.addFolder('Lumière Directionnelle (Soleil)');
directionalFolder.add(lightParams, 'directionalIntensity', 0, 3, 0.01)
  .name('Intensité')
  .onChange((value) => {
    directionalLight.intensity = value;
  });
directionalFolder.add(shadowCameraHelper, 'visible').name('Voir Shadow Camera');
directionalFolder.open();

// Dossier pour la première lumière ponctuelle
const point1Folder = gui.addFolder('Lumière Ponctuelle 1 (Rose)');
point1Folder.add(lightParams, 'pointLight1Intensity', 0, 3, 0.01)
  .name('Intensité')
  .onChange((value) => {
    pointLight1.intensity = value;
  });
point1Folder.addColor(lightParams, 'pointLight1Color')
  .name('Couleur')
  .onChange((value) => {
    pointLight1.color.setHex(value);
  });
point1Folder.open();

// Dossier pour la deuxième lumière ponctuelle
const point2Folder = gui.addFolder('Lumière Ponctuelle 2 (Cyan)');
point2Folder.add(lightParams, 'pointLight2Intensity', 0, 3, 0.01)
  .name('Intensité')
  .onChange((value) => {
    pointLight2.intensity = value;
  });
point2Folder.addColor(lightParams, 'pointLight2Color')
  .name('Couleur')
  .onChange((value) => {
    pointLight2.color.setHex(value);
  });
point2Folder.open();

// Paramètres du brouillard
const fogParams = {
  enabled: true,
  color: 0x0a0a1a,
  near: 5,
  far: 30
};

const fogFolder = gui.addFolder('Brouillard (Atmosphère)');
fogFolder.add(fogParams, 'enabled')
  .name('Activer')
  .onChange((value) => {
    if (value) {
      scene.fog = new THREE.Fog(fogParams.color, fogParams.near, fogParams.far);
    } else {
      scene.fog = null;
    }
  });
fogFolder.addColor(fogParams, 'color')
  .name('Couleur')
  .onChange((value) => {
    scene.background.setHex(value);
    if (scene.fog) scene.fog.color.setHex(value);
  });
fogFolder.add(fogParams, 'near', 0, 50, 1)
  .name('Début')
  .onChange((value) => {
    if (scene.fog) scene.fog.near = value;
  });
fogFolder.add(fogParams, 'far', 0, 100, 1)
  .name('Fin')
  .onChange((value) => {
    if (scene.fog) scene.fog.far = value;
  });

// ========================================
// 8. SYSTÈME D'ANIMATION
// ========================================
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  
  time += 0.01;
  
  // Animation du cube
  cube.rotation.x += 0.008;
  cube.rotation.y += 0.012;
  
  // Animation de la sphère
  sphere.position.y = 0.6 + Math.sin(time * 1.5) * 0.6;
  sphere.rotation.y += 0.015;
  
  // Animation du tore
  torus.rotation.x += 0.015;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.005;
  
  // Animation du cône
  cone.rotation.y += 0.02;
  
  // Animation des lumières ponctuelles pour effet dynamique
  pointLight1.position.x = -5 + Math.cos(time * 0.5) * 2;
  pointLight1.position.z = -5 + Math.sin(time * 0.5) * 2;
  
  pointLight2.position.x = 5 + Math.cos(time * 0.5 + Math.PI) * 2;
  pointLight2.position.z = 5 + Math.sin(time * 0.5 + Math.PI) * 2;
  
  // Mise à jour des contrôles (damping)
  controls.update();
  
  // Rendu
  renderer.render(scene, camera);
}

// Démarrage de l'animation
animate();
