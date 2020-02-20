
var app = app || {};

app.createPlane = () => {

  const planeGeometry = new THREE.PlaneGeometry( 120, 20 );
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xCCCCCC
  });

  // Combine the geometry (shape) and the material (what
  // the surface looks like) into a mesh, the actual
  // 3D object
  const plane = new THREE.Mesh( planeGeometry, planeMaterial);

  plane.position.set( 15, 0, 0 );
  plane.rotation.x = -0.5 * Math.PI;  // because of math(s)
  plane.receiveShadow = true; // shadows are cast onto this

  return plane;

}; // createPlane()


app.createSpotlight = () => {

  const spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( -10, 60, 10 );
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;

  return spotlight;

}; // createSpotlight()

app.createCube = () => {

  const cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF8F00,
    // wireframe: true
  });

  const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  cube.position.set( -4, 15, 0 );
  cube.castShadow = true;

  return cube;

}; // createCube()


app.createSphere = () => {

  const sphereGeometry = new THREE.SphereGeometry(
    6,  // radius
    40, // number of triangle segments on the X axis
    40, // number of triangle segments on the Y axis
  );

  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x039BE5,
    // wireframe: true
  });

  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.set( 20, 6, 2 );
  sphere.castShadow = true;

  return sphere;

}; // createSphere()
