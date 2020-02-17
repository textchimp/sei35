
let hue = 0;  // our hue increment counter

let lastX = 0; // keep track of the last mouse X position


const midi = {};
const DEBUG = true;


const MIDI_INPUTS = [
  // 'Launchkey MK2 49 Launchkey MIDI',
  // 'Launchpad Mini',
  // 'Scarlett 2i4 USB',
  // 'IAC Driver Bus 1'  // can cause feedback
  'virtual1',
  'IAC Driver Hydrogen'
];


const MIDI_OUTPUT = "IAC Driver Bus 1";

const S1 = 41, S2 = 42, S3 = 43, S4 = 44, S5 = 45, S6 = 46 ,S7 = 47, S8 = 48, S9 = 7,
      K1 = 21, K2 = 22, K3 = 23, K4 = 24, K5 = 25, K6 = 26 ,K7 = 27, K8 = 28,
      PITCH = 0, MOD = 1;


const mstate = {
  notes: {},
  sliders: { [S8]: 0.5, [K8]: 0.5 }, // defaults
  buttons: {}
};


function gotMIDI(m){
  let [cmd, note, vel] = m.data;

  if(DEBUG) console.log('MIDI', {cmd, note, vel});

  // 144 note on   - launchpad also sends 144 when button off, vel 0
  // 128 note off  - NOTE: channel added to value, i.e. 128 is note off on channel 1, 129 note off on 2...
  // 153/137  - launchkey pad button on/off
  // 176 - launchkey slider values, note 41-48
  // 176 - launchkey knob values, note 21-28
  // 176 - launchkey slider buttons, note val 51-58, vel 127/0
  // 176 - launchkey mod wheel, note 1, vel 0-127
  // 176 - launchkey pitch shift, note 0, vel 0 - [64 default] - 127
  // 176 - launchkey RHS play buttons, note 104, 105 vel 127/0
  // 176 - launchkey RHS buttons, note 112-117, vel 127/0
  // 176 - launchkey LHS track L/R buttons, notes 102,103, vel 127/0


  // check type of MIDI message, and store normalised value in mstate object
  switch(cmd){


    case 144:
      // note?
      // console.log('midi 144');
      createBlob(
        800, 400
      );

      // createBlob(
      //   ((note - 30) / 50.0) * window.innerWidth,
      //   // (vel / 127.0)  *
      //   window.innerHeight/2
      // );
      //



    case 128:
    case 153:
    case 137:
    // note ON/OFF
    // console.log('midi 137');
      mstate.notes[note] = vel/127.0;
      // midi.out.send([144, note, vel]);  // TO SEND A NOTE
      break;
    case 176:
    // slider/buttons
      mstate.sliders[note] = vel/127.0;
      redraw();
      break;
  }
  // console.log(mstate.notes, mstate.sliders, mstate.buttons);
}



if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess()
  .then(midiAccess => {
    midi.inputs = midiAccess.inputs;
    midi.outputs = midiAccess.outputs;

    for (var input of midiAccess.inputs.values()){
      console.log('MIDI: ', input.name);
      if( MIDI_INPUTS.includes(input.name) ){
        input.onmidimessage = gotMIDI;
        console.log('input:', input.name);
      }
    }

    for (var output of midiAccess.outputs.values()){
      if( output.name === MIDI_OUTPUT ){
        midi.out = output;
        console.log('output', output);
      }
    }

  },
  fail => console.log('midi connection failure', fail)
  );
} else {
  console.log('WebMIDI is not supported in this browser.');
}





const createBlob = function( x, y, color=hue ){

  console.log('createBlob', {x,y});

  // Make a DIV to add to the page, giving it the position of the mouse
  const $blob = $('<div class="blob zoom">');


  const xVelocity = Math.abs(x - lastX);
  const size = xVelocity * 0.5;

  lastX = x;  // update lastX for the next time we use it

  if( size > 100 ){
    return; // early return, skip the rest of the function if too big
  }

  // Valid hue values are 0 - 360, but it will be wrapped back to 0 for us when
  // it reaches 360
  const colour = `hsla(${ hue }, 100%, 50%, 40% )`;
  hue += 10;  // hue = hue + 1;

  $blob.css({
    top:  (y - size/2) + 'px',
    left: (x - size/2) + 'px',
    backgroundColor: colour, //'rgba(0,0,0,0.0)',
    // backgroundColor: 'white', //'rgba(0,0,0,0.0)',
    // border: `1px solid ${colour}`,
    width: size + 'px',
    height: size + 'px',
    'animation-iteration-count':  1, // `${ Math.floor(Math.random()*10) }`,
    // transform: 'scale(1)'
    // border: '1px solid white'
  });

  $blob.on('animationend', function(){
    // console.log('end');
    $blob.fadeOut().remove();
  });

  $('body').append( $blob );   // attach to the DOM

  // Turning this off for now, in favor of CSS transform:scale() animations (they zoom from center)
  // let topLimit = 1000;
  // if( Math.random() > 0.5 ){
  //   topLimit = window.innerHeight * 4; // randomly 50% move up, 50% move down
  // }
  //
  // $blob.animate( { width: topLimit, height: topLimit, transform: 'scale(30)' }, 1000, function(){
  //   $blob.remove();
  // });

  const $blobs = $('.blob');
  // remove oldest
  if($blobs.length > 60){
    console.log('rm');
    $blobs.eq(0).remove();
  }

};


$(document).ready( function(){

  console.log('DOM loaded!');

  $(document).on('mousemove', function( event ){
    // console.log( event.clientX, event.clientY ); // print out mouse position at time of click

    // Only draw a blob if the shift key was held down
    if( event.shiftKey  ){
      createBlob( event.clientX, event.clientY );
    }

  }); // .on('click')

  // Make it work for mobile screens!
  $(document).on('touchmove', function( event ){
      createBlob(
        event.originalEvent.touches[0].pageX,
        event.originalEvent.touches[0].pageY
      );
  }); // .on('click')

  $(document).on('keypress', function( event ){

    // Clear the screen on spacebar press
    if( event.key === ' ' ){
      $('div.blob').remove();
    }  //else if ( event.key === '...' )

  }); // .on('keypress')

}); // .ready()
