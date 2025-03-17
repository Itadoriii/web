// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true para fondo transparente

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "fixed";  // Hace que el canvas esté fijo en el fondo
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1";  // Asegura que esté detrás de otros elementos
document.body.appendChild(renderer.domElement);  // Agregar directamente al body

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Cargar el modelo de la computadora
const loader = new THREE.GLTFLoader();
let modelPC = null;

loader.load('home/sebasti9/code/src/models/galaxy2.glb', function (gltf) {
  modelPC = gltf.scene;
  modelPC.position.set(0, 0, 0);
  modelPC.rotation.y = -2 * Math.PI / 3;
  scene.add(modelPC);
}, undefined, function (error) {
  console.error("Error al cargar el modelo de la computadora:", error);
});

// Configuración de la cámara
camera.position.set(0, 1, 3);

// Velocidad de rotación (ajustable)
const rotationSpeed = 0.001;

// Animación para renderizar la escena
function animate() {
  requestAnimationFrame(animate);

  // Rotación lenta del modelo
  if (modelPC) {
    modelPC.rotation.y += rotationSpeed; // Gira el modelo lentamente alrededor del eje Y
  }

  renderer.render(scene, camera);
}
animate();

// Ajustar tamaño dinámico del canvas
function updateCanvasSize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();
