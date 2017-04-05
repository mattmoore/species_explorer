var camera;
var renderer;
var scene;
var lights;
var jsonLoader;
var textureLoader;
var dna;

function init() {
  var fov = 50;
  var near = 1;
  var far = 10000;

  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(fov, aspect(), near, far);
  camera.position.z = 15;
  scene = new THREE.Scene();
  scene.add(camera);

  jsonLoader = new THREE.JSONLoader();
  textureLoader = new THREE.TextureLoader();

  loadMeshes();
  loadLights();

  requestAnimationFrame(update);

  document.querySelector('#container').appendChild(renderer.domElement); 
  $(window).resize(updateViewport);
  updateViewport();
}

function updateViewport() {
  camera.aspect = aspect();
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function aspect() {
  return window.innerWidth / window.innerHeight;
}

function update() {
  box.rotation.x += .01;
  box.rotation.y += .01;
  if (dna) {
    dna.rotation.z += .01;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

function loadMeshes() {
  loadBox();
  loadDNA();
}

function loadBox() {
  var boxGeometry = new THREE.BoxGeometry(5, 5, 5);
  var texture = textureLoader.load('/textures/wood-floor.jpg');
  var boxMaterial = new THREE.MeshPhongMaterial({ map: texture, shininess: 1000 });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.x = 3;
  scene.add(box);
}

function loadDNA() {
  jsonLoader.load('/models/dna/DNA.json', function(geometry, materials) {
    var material = new THREE.MultiMaterial(materials);
    dna = new THREE.Mesh(geometry, material);
    dna.position.x = -5;
    dna.rotation.x = -8;
    scene.add(dna);
  });
}

function loadLights() {
  pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 30;
  pointLight.position.y = 50;
  pointLight.position.z = 130;
  scene.add(pointLight);
}
