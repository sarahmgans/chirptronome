import React from 'react'

function Counter({ bpm }) {
  return(
    <p class="chirps"><span>{bpm}</span> Chirps per Minute</p>
  )
}

export default Counter;