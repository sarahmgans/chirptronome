import React from 'react';

function Button(props) {
  return (
<button className="playing" onClick={props.startAndStop}>
  {props.playing ? 'Stop' : 'Start'}
</button>
  )
}

export default Button;