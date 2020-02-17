
let particles = [];

// let img;
// function preload() {
//   img = loadImage('/el.png');
// }

const controls = {
  velocityScale: 0.3,
  edgeMode: 'bounce',
  distanceThreshold: 300
}

// Runs once when your sketch loads
function setup(){

  createCanvas( windowWidth, windowHeight ); // maximise canvas space!
  background( 0 );  // black background (greyscale)

  colorMode( HSB, 255 ); // Use Hue, Saturation, Brightness, range of 0..255
  // imageMode(CENTER);


  // add a control panel
  const gui = new dat.GUI();
  gui.add( controls, 'velocityScale', -1, 1 );
  gui.add( controls, 'edgeMode', ['bounce', 'wrap'] );
  gui.add( controls, 'distanceThreshold', 0, 1000);

  // stroke( 255, 0, 0 );  // outline colour R,G,B
  //
  // line(
  //   10, 10,  // from x,y
  //   500, 500   // to x,y
  // );

  const greenish = [0, 200, 0];
  fill( ...greenish );  // what colour to fill in solid shapes with

  // stroke( 0, 0, 255 );
  // noStroke();

  // rect(
  //   300, 100,  // top left corner x,y
  //   300, 300   // width, height
  // );

  // fill( 0, 0, 255 );

  // triangle(
  //   400, 200,  // top point
  //   100, 500,  // bottom left point
  //   700, 500   // bottom right
  // );

} // setup()

// Runs once every screen refresh, ideally 60 times per second
function draw(){

  if( !keyIsDown(CONTROL) ){
    background(0); // clear the screen each draw!
  }


  // stroke(
  //   random(255),
  //   random(255),
  //   random(255)
  // );
  //
  // strokeWeight(8);
  // line(
  //   // random(windowWidth), random(windowHeight), // start x,y
  //   mouseX, mouseY,
  //   mouseX + 300, mouseY + 300,
  //   // random(windowWidth), random(windowHeight)  // end   x,y
  // );

  // const hue = map(
  //   mouseX,          // input value
  //   0, windowWidth,  // input range
  //   0, 255           // output range
  // );

  // fill(
  //   hue, // frameCount % 255,  // Hue, need to wrap it ourselves using modulus
  //   255, // Saturation
  //   255  // Brightness
  // );

  noStroke();

  // const size = random(100);

  const vx = mouseX - pwinMouseX + random( [-4, 4] );  // mouse x velocity (speed)
  const vy = mouseY - pwinMouseY + random( [-4, 4] );  // mouse y velocity


  const size = map( mouseY,  0, windowHeight,  50, 200 );

  if( keyIsDown(SHIFT) ){
    // ellipse( mouseX, mouseY,  size, size );
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: vx,
      vy: vy,
      size: vx + 20,
      hue: frameCount % 255,
      createdFrameCount: frameCount
    });
  } // pressed

  updateParticles();

} // draw()


function updateParticles(){

  for( let i = 0; i < particles.length; i++ ){
    const p = particles[i];



    if( controls.edgeMode === 'bounce' ){
      // bounce off edges
      if( p.x >= windowWidth || p.x <= 0 ){
        p.vx *= -1;
      }
      if( p.y >= windowHeight || p.y <= 0 ){
        p.vy *= -1;
      }
    } else {
      // wrap around edges
      if( p.x >= windowWidth ){
        p.x = 0;
      } else if( p.x <= 0 ){
        p.x = windowWidth;
      }
      if( p.y >= windowHeight ){
        p.y = 0;
      } else if( p.y <= 0 ) {
        p.y = windowHeight;
      }

    } // else

    for( let j = 0; j < particles.length; j++ ){
      const other = particles[j];

      // Calculate the distance between these two particles, p and other:
      const xDist = p.x - other.x;
      const yDist = p.y - other.y;

      const distance = Math.sqrt( xDist*xDist + yDist*yDist );

      // if( distance < controls.distanceThreshold ){
      //  (frameCount - p.createdFrameCount) > 100 &&
      if( other.lastCollisionWith !== i &&  distance < (p.size/2 + other.size/2) ){
        p.x *= -1; p.y *= -1;
        other.x *= -1; other.y *= -1;

        // push them away a bit!
        p.x += p.vx * controls.velocityScale;
        p.y += p.vy * controls.velocityScale;
        p.lastCollisionWith = j;
      }

         // The opacity of the line is 'inversely proportional' to the distance between
         // the particles, i.e. the closer they are, the more opaque (less transparent) it is
         //
         // const alpha = map( distance, 0, controls.distanceThreshold, 255, 0 );
         // stroke( p.hue, 255, 255, alpha );
         // line( p.x, p.y,  other.x, other.y );

      // }

    } // inner for

    // Update the particle position by adding the velocity values to it
    p.x += p.vx * controls.velocityScale;
    p.y += p.vy * controls.velocityScale;



    fill(p.hue, 255, 255, 200);
    ellipse(p.x, p.y, p.size, p.size);
  }

} // updateParticles()


function keyPressed(e){
  if( keyCode === 32 ){
    e.preventDefault();
    particles = [];  // Spacebar clears the screen
  }

} // keyPressed()
