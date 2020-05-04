import React from 'react';

function Button(props) {
  return (
<button onClick={props.startAndStop}>
  {props.playing ? 'Stop' : 'Start'}
</button>
  )
}

export default Button;