var container;
var world;
var meshes;
var lights;

function init() {
  container = document.querySelector('#container');
  params = {
    width: 400,
    height: 300,
    view_angle: 45,
    near: 0.1,
    far: 10000
  }
  meshes = loadMeshes();
  lights = loadLights();
  world = world(params);
}

function world(params) {
  renderer = new THREE.WebGLRenderer();
  aspect = params.width / params.height;
  camera = new THREE.PerspectiveCamera(params.width, aspect, params.near, params.far);
  scene = new THREE.Scene();
  scene.add(camera);

  $.each(meshes, function(index, item) {
    scene.add(item);
  });

  $.each(lights, function(index, item) {
    scene.add(item);
  });

  renderer.setSize(params.width, params.height);
  container.appendChild(renderer.domElement); 

  function update() {
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);

  return {
    renderer: renderer,
    camera: camera,
    scene: scene,
  };
}

function loadMeshes() {
  meshes = [];

  radius = 50;
  segments = 16;
  rings = 16;
  sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
  sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCCFF00 });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.z = -200;

  meshes.push(sphere);
  return meshes;
}

function loadLights() {
  lights = [];

  pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  lights.push(pointLight);
  return lights;
}
