import React from 'react';

const Zone = ({ name, id, image }) => {
  return (
    <div className="zone" id={id}>
      <h3>{name}</h3>
      <image src={image} alt="picture of this particular zone" />
    </div>
  )
}

export default Zone;