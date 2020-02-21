
// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object
// (only works for 'var' because of 'hoisting', google it)
var app = app || {};

app.controls = {
  rotationSpeed: 0.01,
  bouncingSpeed: 0.05,
  step: 0,  // for controlling the sphere position
  particleDistributionRange: 1000,
  numParticles: 100000,
  particleVelocityScale: 0.5
};

app.init = () => {

  console.log('Hello 3D W0rld!');

  app.gui = new dat.GUI();
  app.gui.add( app.controls, 'rotationSpeed', 0, 1 );
  app.gui.add( app.controls, 'bouncingSpeed', 0, 2 );
  app.gui.add( app.controls, 'particleVelocityScale', -1, 1 );


  // The scene stores and keeps track of all the objects we're creating,
  // including the camera and the lights
  app.scene = new THREE.Scene();


  app.camera = new THREE.PerspectiveCamera(
    60,  // field of view
    window.innerWidth / window.innerHeight,  // screen ratio
    0.1,  // near field (how close to the camera should we still see things)
    1000  // far field  (how far away from the camera should we still see things)
  );

  // Where exactly is the camera in the scene?
  app.camera.position.x = -30;
  app.camera.position.y = 40;
  app.camera.position.z = 30;
  // app.camera.position.set( -30, 40, 30 );

  app.camera.lookAt( app.scene.position ) // Look at the origin: x=0, y=0, z=0

  // The renderer calculates how to draw all the objects in the scene,
  // based on the lighting and the camera perspective, and renders
  // it all down to a 2D image to show in a <canvas> browser tag
  app.renderer = new THREE.WebGLRenderer(); // use hardware acceleration of gfx card!
  app.renderer.setSize( window.innerWidth, window.innerHeight );
  app.renderer.setClearColor( 0x000000 );  // background colour

  // app.renderer.shadowMap.enabled = true;  // shadows are computationally expensive, and thus disabled by default
  // app.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // WTF??

  document.getElementById('output').appendChild( app.renderer.domElement );

  // app.axes = new THREE.AxesHelper( 40 );
  // app.scene.add( app.axes );

  // Let's add a 2D 'plane', i.e. a sheet, aka "The Runway"
  // app.plane = app.createPlane();
  // app.scene.add( app.plane );

  // app.cube = app.createCube(-4, 15, 0);

  const cubeRange = 1;
  const numCubes  = 1;

  app.cubes = [];

  for( let i = 0; i < numCubes; i++ ){

    const cube = app.createCube({
      x: THREE.Math.randInt( -cubeRange, cubeRange ),
      y: THREE.Math.randInt( -cubeRange, cubeRange ),
      z: THREE.Math.randInt( -cubeRange, cubeRange )
    });

    app.scene.add( cube );
    app.cubes.push( cube );

  } // for numCubes





  app.sphere = app.createSphere();
  app.scene.add( app.sphere );


  // Let there be light!
  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );

  app.ambient = new THREE.AmbientLight( 0x666666 );
  app.scene.add( app.ambient );

  // Control camera position and zoom using the mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera,
    app.renderer.domElement
  );

  app.particleSystem = app.createParticleSystem();
  app.scene.add( app.particleSystem );


  app.stats = app.addStats();

  app.animate(); // kick off the animation process

}; // app.init()


app.animate = () => {

  app.stats.update();

  app.animateParticles();

  app.controls.step += app.controls.bouncingSpeed;

  // app.sphere.position.y = 6 +  Math.abs( Math.sin(app.controls.step) * 30 );
  // app.sphere.position.x = 20 + ( Math.cos(app.controls.step) * 30 );

  app.sphere.rotation.y += app.controls.rotationSpeed;

  // Animate every cube in our array
  app.cubes.forEach( c => {
    c.rotation.x += c.userData.rotationSpeed * app.controls.rotationSpeed;
    c.rotation.y += c.userData.rotationSpeed * app.controls.rotationSpeed;
  });


  // app.cube.rotation.x += app.controls.rotationSpeed;
  // app.cube.rotation.y += app.controls.rotationSpeed;

  app.renderer.render( app.scene, app.camera );

  // Get the browser animation API to work out
  // how often to run our animate() method
  // (ideally, 60 times/sec and only when the tab
  // is visible)
  requestAnimationFrame( app.animate );

}; // app.animate()


app.animateParticles = () => {

  const particles = app.particleSystem.geometry.vertices;

  for( let i = 0; i < particles.length; i++ ){
    const p = particles[i];

    // Calculate the distance(squared) of each particle from the
    // earth. Because the earth is at (0,0,0) our calculation is
    // simplified and only needs to use the particle's position
    const distSquared = (p.x * p.x) + (p.y * p.y) + (p.z * p.z);

    if( distSquared > 10.0 ){
      // only add gravity if the particle is not already too
      // close to the earth (because otherwise we get huge
      // values that make everything go nuts)

      // Newton yo!
      const gravityForce = -0.2  * ( 1.0 / distSquared );
      // Apply the force of gravity to the particle's velocity
      p.vx += gravityForce * p.x;
      p.vy += gravityForce * p.y;
      // p.vz += gravityForce * p.z;

    }

    // The particle's new position on each axis is
    // what you get when you add its velocity to
    // its current position
    // (we are also scaling by a global value so we
    // can control the overall speed of the whole
    // system at once)
    p.x +=  p.vx * app.controls.particleVelocityScale;
    p.y +=  p.vy * app.controls.particleVelocityScale;
    p.z +=  p.vz * app.controls.particleVelocityScale;

  } // for

  app.particleSystem.geometry.verticesNeedUpdate = true;

  // app.particleSystem.rotation.y += app.controls.rotationSpeed;

}; // animateParticles()



app.addStats = () => {

  const stats = new Stats();

  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById('stats').appendChild( stats.domElement );

  return stats;
};


app.resize = () => {
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.camera.updateProjectionMatrix();
  app.renderer.setSize( window.innerWidth, window.innerHeight );
};

// 👇 This overwrites any previous event handler for this event
// window.onresize = app.resize;

// This lets us have multiple event handlers for the same event
window.addEventListener( 'resize', app.resize );


// Like jQuery $(document).ready() - run our function
// after the DOM is loaded
window.onload = app.init;
