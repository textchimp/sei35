
import React from 'react';
import SearchForm from './SearchForm';
import ThumbnailGallery from './ThumbnailGallery';

import axios from 'axios';

const BASE_URL = 'https://api.flickr.com/services/rest';
const API_KEY = '2f5ac274ecfac5a455f38745704ad084';

class FlickrSearch extends React.Component{

  state = {
    photos: []
  };

  // lifecycle method! Do your AJAX requests here!
  componentDidMount(){
    console.log('Component mounted!');
  }


  performSearch = (queryText) => {
    console.log('in performSearch(): ', queryText);

    const flickrParams = {
      api_key: API_KEY,
      method: 'flickr.photos.search',
      text: queryText,
      format: 'json',
      nojsoncallback: 1,
      page: 1
    };

    // $.getJSON() equivalent in axios:
    axios.get(BASE_URL, { params: flickrParams })
    // axios uses Promises, so we attach .then() instead of .done()
    .then( res => {
      console.log( 'response:', res );
      this.setState({ photos:  res.data.photos.photo });
    })
    // axious uses Promises, so we attach .catch() instead of .fail()
    .catch( err => {
      console.warn( 'error', err );
    });

  } // performSearch()



  render(){
    return(
      <div className="App">
        <h1>Flickr Search</h1>
        <SearchForm onSubmit={ this.performSearch } />

        {
          // We can't use an 'if' statement in JSX curly tags, so if you want the behaviour
          // of an if statement (render some tag only when some condition is true), you can
          // use the '&&' operator to get that behaviour. It's allowed becaused it's an expression.
          (this.state.photos.length > 0) && <ThumbnailGallery photos={ this.state.photos }  />
        }

      </div>
    );
  } // render()

} // class FlickrSearch



export default FlickrSearch;
