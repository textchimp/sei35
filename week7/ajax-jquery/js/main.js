const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=24d863d54c86392e6e1df55b9a328755';



$(document).ready(function(){

  // Get ready for CALLBACK HELL

  $('#go').on('click', function(){

    $('#results').empty().show();
    $('#details').hide();

    const searchText = $('#query').val();

    console.log('query:', searchText);

    $.getJSON(`${ BASE_URL }search/movie?${ API_KEY }&query=${ searchText }`)
    .done(function( data ){
      console.log( 'success:', data );

      data.results.forEach( function( movie ){
        // console.log( movie.title );
        // const $movieItem = $(`<p>${ movie.title }</p>`);
        const $movieItem = $(`<img src="https://image.tmdb.org/t/p/w185${ movie.poster_path }">`);

        // Each image gets its own unique click handler, which knows the ID of the current movie;
        // this saves us working out ID the from within a more generic click handler function, but it
        // is kind of inefficient - we end up creating 20 functions in memory for these 20 images.
        // Also, the nesting is getting a bit out of control by this point...
        $movieItem.on('click', function(){
          console.log('clicked ID', movie.id ); // This works because of something called a 'closure'

          $.getJSON(`${ BASE_URL }movie/${ movie.id }?${ API_KEY }`)
          .done(function( data ){
            // When we get the details data for the clicked movie result:
            console.log('movie details:', data );
            $('#results').hide();
            $('#details').html(`
              <strong>Title:</strong> ${ data.title } <br>
              <strong>Tagline:</strong> ${ data.tagline } <br><br>
              <p>${ data.overview }</p>
              <strong>Budget:</strong> ${ data.budget }<br>
            `).show();
          })
          .fail( console.warn );

        }); // .on() click handler for each movie

        $('#results').append($movieItem);
        // $movieItem.appendTo('#results');

      }); // end of the forEach() for movie results


    })
    .fail(function( err ){
      console.log( 'ERROR', err );
    });

  }); // end of #go button click handler



















  // jQuery version of XMLHttpRequest
  // $.ajax({
  //   url: 'http://numbersapi.com/random/trivia?json=1',
  //   method: 'get',
  //   dataType: 'json' // default: "intelligent guess"
  // })

  // $.getJSON('http://numbersapi.com/random/trivia?json')
  // .done(function( res ){
  //   console.log('response:', res );
  //   $('body').append(`<p>${ res.text }</p>`);
  // })
  // .fail(function( err ){
  //   console.log( 'ERROR', err );
  // });

  // .always( function( a, b, c ){
  //   console.log( 'always:', a, b, c );
  // });

}); // $(document).ready
