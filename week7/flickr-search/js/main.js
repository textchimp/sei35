console.log('flickr!');

// https://www.flickr.com/services/rest/?method=flickr.photos.search&text=coral+ocean&api_key=2f5ac274ecfac5a455f38745704ad084&format=json&nojsoncallback=1

const BASE_URL = 'https://www.flickr.com/services/rest/';
const API_KEY = '2f5ac274ecfac5a455f38745704ad084';

let searchQuery = '';  // this will contain the search text, later!
let currentPage = 0;   // keep track of the page of results we're up to

const searchFlickr = searchText => {

  currentPage++;  // always increment the page counter (TODO: use an argument instead?)

  $.getJSON(BASE_URL, {
    method: 'flickr.photos.search',
    text: searchText,
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: 1,
    page: currentPage
  })
  .done( displaySearchResults )
  .fail( console.warn );

};  // searchFlickr()

// Generate a new version of our searchFlickr function, which is
// guaranteed to run no more often than every 5 seconds.
// The new function takes the same arguments as our original function!
// NOTE: This is functions as "first-class" in JS:
// - they can be passed in as arguments to other functions
// - they can be returned by other functions
// - i.e. they're just *values*, like anything else you can put in a variable
const throttledSearchFlickr = _.throttle( searchFlickr, 5000 );


const displaySearchResults = response => {
  // console.log( response.photos.photo );
  response.photos.photo.forEach( photo => {
    const url = generatePhotoURL( photo );
    // console.log( url );
    const $img = $(`<img src="${url}">`).on('click', () => displayFullscreenImage(photo) );
    $('#results').append($img);
  }); // forEach

}; // displaySearchResults()

const generatePhotoURL = (photo, size='q') => {
  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

  // return [
  //   'http://farm',
  //   photo.farm,
  //   '.staticflickr.com/'
  // ].join();

};


const displayFullscreenImage = photoObj => {
  console.log( photoObj );
  const fullsizeURL = generatePhotoURL( photoObj, 'c' );
  console.log('fullsizeURL', fullsizeURL);
  $('#fullscreen')
    .css('background-image', `url(${fullsizeURL})`)
    .show();
};



$(document).ready( () => {

  $('#searchText').focus(); // cursor focus

  // Hide the fullscreen panel when the ESC key is pressed
  $(document).on('keydown', ev => {
    if( ev.key === 'Escape' ){
      $('#fullscreen').fadeOut(500);
    }
  });

  // Handle a click on an thumbnail image, to show a larger version
  // BECAUSE there are no images on the page yet, when we attach this handler to the query results,
  // we need a different way of attaching the handler to images - it needs to be able to respond
  // to ANY images on the page that are added at ANY time (dynamically)

  // $('#results > img').on('click', () => {
  // 'Event delegation' style:
  // $(document).on('click',  '#results > img', () => {
  //   console.log('clicked!');
  // });


  $('#searchForm').on('submit', () => {
    // save into a global variable (infinite scroll needs it)
    searchQuery = $('#searchText').val();

    // Clear the previous results
    $('#results').empty();

    // Reset the page counter for this new search
    currentPage = 0;

    // call our search function, passing in the query text
    searchFlickr( searchQuery );

    // do not actually submit the form (which reloads the page)
    return false;

  }); // form submit handler


  // Attach an event handler to scroll events on the whole window
  $(window).on('scroll', () => {

    // Have we scrolled to the bottom of the document yet?
    // console.log('scroll!');
    // console.log('document height:', $(document).height() );
    // console.log('window height:', $(window).height() );

    // What is the distance of the window bottom from the TOP of the document?
    // (This will be an increasing number, with a max value of document height)
    const scrollBottom = $(window).scrollTop() + $(window).height();
    // console.log('scrollBottom:', scrollBottom );

    // What is the distance of the window bottom from the END of the document?
    // (This will be a decreasing number (as we scroll down), with a min value of 0)
    const windowBottomToEnd = $(document).height() - scrollBottom;
    // console.log('windowBottomToEnd:', windowBottomToEnd);

    if( windowBottomToEnd < 200 ){
      // Load next page of results!
      console.log('%cLoad next page!', 'font-size: 18pt');

      // use the global variable containing the query, only changed when form submits
      throttledSearchFlickr( searchQuery );
    }


  }); // scroll handler


}); // document ready
