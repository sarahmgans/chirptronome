import React from 'react';



function Form({ playing, bpm }) {
  const props = { playing, bpm }
  return (
    <form>
      <input class="range"
        type="range"
        min="20"
        max="260"
        value={props.bpm}
        ChangeIt={props.onChange} />
      <input class="number"
        type="number" min="40" max="260"
        min="20"
        max="260"
        value={props.bpm}
        ChangeIt={props.onChange} />
      <div class="parent">
        <label>
          <p>What 🎶 are you playing?</p>
          <input class="piece"
            type="text"
            name="piece" />
        </label>
        <input type="submit" value="Store" />
      </div>
    </form>
  )
}

export default Form;
