
import React from 'react';


const generateImageURL = (photo, size='q') => {
  return `https://farm${ photo.farm }.staticflickr.com/${ photo.server }/${ photo.id }_${ photo.secret }_${ size }.jpg`;
};

const ThumbnailGallery = props => {

  return props.photos.map( photo => (
    <img
      src={ generateImageURL(photo) }
      alt={ photo.title }
      key={ photo.id }
    />
  ));

}; // ThumbnailGallery()

export default ThumbnailGallery;
