import React from 'react';

function Byline(props) {
  return (
    <p className="chirps"><span>{props.cpm}</span> Chirps per Minute</p>
  )
}

export default Byline;