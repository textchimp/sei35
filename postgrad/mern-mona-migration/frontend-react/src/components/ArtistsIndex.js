import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const INDEX_URL = 'http://localhost:1337/artists';

// Let's use Hooks... So Hot Right Now
// (i.e. functional componenents, not classes)

const ArtistsIndex = (props) => {

  const [artists, setArtists] = useState( [] );

  // Fetch the list of artists from the server, when the component
  // is first mounted
  useEffect( () => {
    console.log('ArtistsIndex mounted!');
    console.log('Artists:', artists);

    axios.get( INDEX_URL )
      .then( res => {
        // console.log( res, res.data );
        setArtists( res.data );
      })
      .catch( err => {
        console.error('INDEX fetch error:', err);
      });

  }, [] ); // Empty array here makes this hook act like componentDidMount


  return (
    <div className="artists">
      <h2>Artist Index</h2>
      <ul>
        {
          artists.map( a => (
            <li key={ a._id }>
              <Link to={`/artists/${ a._id }`}>{ a.name }</Link>
            </li> 
          ))
        }
      </ul>
    </div>
  );

};

export default ArtistsIndex;
