var container;
var world;
var lights;
var loader;
var dna;

function init() {
  container = document.querySelector('#container');
  params = {
    width: window.innerWidth,
    height: window.innerHeight,
    view_angle: 45,
    near: 0.1,
    far: 10000
  }
  lights = loadLights();
  world = world(params);

  $(window).resize(function() {
    world.renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function world(params) {
  renderer = new THREE.WebGLRenderer();
  aspect = params.width / params.height;
  camera = new THREE.PerspectiveCamera(params.width, aspect, params.near, params.far);
  scene = new THREE.Scene();
  scene.add(camera);

  loadMeshes();

  $.each(lights, function(index, item) {
    scene.add(item);
  });

  renderer.setSize(params.width, params.height);
  container.appendChild(renderer.domElement); 

  requestAnimationFrame(update);

  return {
    renderer: renderer,
    camera: camera,
    scene: scene,
  };
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
  var texture = new THREE.ImageUtils.loadTexture('/textures/wood-floor.jpg');
  var boxMaterial = new THREE.MeshPhongMaterial({ map: texture, shininess: 1000 });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.x = 3;
  box.position.z = -10;
  scene.add(box);
}

function loadDNA() {
  var loader = new THREE.JSONLoader();
  loader.load('/models/dna/DNA.json', function(geometry, materials) {
    var material = new THREE.MultiMaterial(materials);
    dna = new THREE.Mesh(geometry, material);
    dna.position.x = -5;
    dna.position.z = -10;
    dna.rotation.x = -8;
    scene.add(dna);
  });
}

function loadLights() {
  lights = [];

  pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 30;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  lights.push(pointLight);
  return lights;
}
