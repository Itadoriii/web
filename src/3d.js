// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Campo de visión ajustado
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Luz ambiental suave
scene.add(ambientLight);

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize(); // Configura la dirección de la luz
scene.add(directionalLight);

// Cargar el modelo .glb
const loader = new THREE.GLTFLoader();
loader.load('models/mc.glb', function(gltf) {
    const model = gltf.scene;

    // Asegurarse de que solo se dibujen las caras exteriores
    model.traverse(function(child) {
        if (child.isMesh) {
            // Asegurarse de que las caras estén bien configuradas y sin transparencia
            child.material.side = THREE.FrontSide;
            child.material.transparent = false;
            child.material.opacity = 1;
            
            // Si tiene un alpha map, desactivarlo
            if (child.material.alphaMap) {
                child.material.alphaMap = null;
            }
        }
    });

    scene.add(model);
    model.scale.set(0.5, 0.5, 0.5); // Ajustar el modelo si es necesario
    model.position.set(0, 0, 0); // Colocar el modelo en el centro de la escena
}, undefined, function(error) {
    console.error(error);
});

// Configuración de la cámara
camera.position.set(0, 3, 150);  // Posición de la cámara ajustada para que vea el modelo desde una distancia adecuada

// Crear los controles de la cámara (OrbitControls)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Configuración de controles (opcional)
controls.enableDamping = true; // Habilita la amortiguación para un movimiento suave
controls.dampingFactor = 0.25; // Ajusta la velocidad de amortiguación
controls.screenSpacePanning = false; // Impide mover la cámara en el espacio de pantalla (para mantener la cámara fija)
controls.maxPolarAngle = Math.PI / 2; // Limita el ángulo polar para evitar que la cámara pase debajo del plano

// Animación para renderizar la escena
function animate() {
    requestAnimationFrame(animate);
  
    // Actualiza los controles
    controls.update(); // Solo es necesario si se habilita la amortiguación
  
    // Renderiza la escena
    renderer.render(scene, camera);
}

animate();

// Obtener la altura disponible (restando la altura del navbar)
const navbarHeight = document.getElementById('navbar').offsetHeight;
const containerHeight = window.innerHeight - navbarHeight;

// Configurar el tamaño del renderizador
renderer.setSize(window.innerWidth, containerHeight);
document.getElementById('three-container').style.height = containerHeight + 'px';
window.addEventListener('resize', () => {
    // Actualizar las dimensiones del renderizador
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const containerHeight = window.innerHeight - navbarHeight;
  
    renderer.setSize(window.innerWidth, containerHeight);
    document.getElementById('three-container').style.height = containerHeight + 'px';
  
    // Actualizar la relación de aspecto de la cámara
    camera.aspect = window.innerWidth / containerHeight;
    camera.updateProjectionMatrix();
});
