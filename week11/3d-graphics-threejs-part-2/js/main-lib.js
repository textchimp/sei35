
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
  // plane.receiveShadow = true; // shadows are cast onto this

  return plane;

}; // createPlane()


app.createSpotlight = () => {

  const spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( -10, 60, 10 );
  // spotlight.castShadow = true;
  // spotlight.shadow.mapSize.width = 2048;
  // spotlight.shadow.mapSize.height = 2048;

  return spotlight;

}; // createSpotlight()

// const func = (name = 'Jordan') =>

app.createCube = ({ x, y, z } = { x: -4, y: 15, z: 0 }) => {

  const cubeGeometry = new THREE.BoxGeometry(
     4, 4, 4
     // THREE.Math.randInt(2, 200),
     // THREE.Math.randInt(2, 50),
     //THREE.Math.randInt(2, 50),
   );
  const cubeMaterial = new THREE.MeshLambertMaterial({
    // color: 0xFF8F00,
    // wireframe: true
  });

  const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

  cube.rotation.x = Math.random();
  cube.rotation.y = Math.random();

  cube.userData.rotationSpeed = Math.random() * 0.1;


  cube.material.color.setRGB(
    Math.random(),
    Math.random(),
    Math.random()
  );

  // cube.position.set( x, y, z );
  cube.position.set( -4, 34, 0 );

  // cube.castShadow = true;

  return cube;

}; // createCube()


app.createSphere = () => {

  const sphereGeometry = new THREE.SphereGeometry(
    30,  // radius
    40, // number of triangle segments on the X axis
    40, // number of triangle segments on the Y axis
  );

  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture('img/earth.jpg'), // deprecated!
    side: THREE.DoubleSide

    // wireframe: true
  });

  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.set( 0, 0, 0 );
  // sphere.castShadow = true;

  return sphere;

}; // createSphere()


app.createParticleSystem = () => {

  const particles = new THREE.Geometry();
  const dist = app.controls.particleDistributionRange;

  // Create a bunch of particles as Vector3 points
  for( let i = 0; i < app.controls.numParticles; i++ ){

    // Create a particle and give it a random position
    const p = new THREE.Vector3(
      100, // THREE.Math.randInt(-dist, dist), // x
      THREE.Math.randInt(-dist, dist), // y
      THREE.Math.randInt(-dist, dist)  // z
    );

    // Random velocities for each x,y,z axis
    p.vx = 0; //THREE.Math.randFloat(-1, 1);
    p.vy = 0; //THREE.Math.randFloat(-1, 1);
    p.vz = 0; //THREE.Math.randFloat(-1, 1);


    particles.vertices.push( p );
  } // for

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture('img/el.png'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: 0.5
  });

  const particleSystem = new THREE.Points(
    particles, // the points involved, i.e. the geometry
    particleMaterial
  );

  return particleSystem;

}; // createParticleSystem()
