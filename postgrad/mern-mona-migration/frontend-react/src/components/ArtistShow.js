import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SHOW_URL = 'http://localhost:1337/artists/';

const ArtistShow = (props) => {

  const [artist, setArtist] = useState( {} );

  // Fetch the list of artists from the server, when the component
  // is first mounted
  useEffect( () => {
    console.log('ArtistShow mounted!');
    console.log('Artist:', artist);

    axios.get( SHOW_URL + props.match.params.id )
      .then( res => {
        // console.log( res, res.data );
        setArtist( res.data );
      })
      .catch( err => {
        console.error('INDEX fetch error:', err);
      });

  }, [] ); // Empty array here makes this hook act like componentDidMount

  if( !('_id' in artist) ){
    return <div>Loading artist...</div>;
  }

  // We must have the data by now, or we would have returned in the above if
  return (
    <div className="artist">
      <h2>{ artist.name }</h2>
      <p><strong>Nationality</strong>: { artist.nationality }</p>
      <p><img src={ artist.image } alt={ artist.name }/></p>
    </div>
  );

};

export default ArtistShow;
