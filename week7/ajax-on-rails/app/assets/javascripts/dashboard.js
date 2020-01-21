$(document).ready(function(){


  $.getJSON('/uptime')
  .done( function( data ){
    console.log( 'response:', data );

    // Append the JSON response data to the DOM
    $('#uptime').append( data.output );
  })
  .fail( console.warn );

  $.getJSON('/cpuhog')
    .done(function( res ){
      console.log('/cpuhog response:', res );
      $('#hog').html(`${ res.cpuHog } (as of ${ res.currentDate })`);
    });

    // }, 200);

    $.getJSON('/dogs')
    .done(function( res ){
      for( let i = 0; i < res.length; i++ ){
        const currentDog = res[i];
        $('#dogs').append(`<p>${ currentDog.name } (${ currentDog.roundness })</p>`)
      }
    });


}); // ready
