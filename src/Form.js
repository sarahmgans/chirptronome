import React from 'react'

function Form (props) {
  return (
    <form>
      <input class="range"
        type="range"
        min="20"
        max="260"
        value={cpm}
        onChange={props.onChange} />
      <input class="number"
        type="number" min="40" max="260"
        min="20"
        max="260"
        value={cpm}
        onChange={props.onChange} />
      <div class="parent">
        <label>
          <p>What 🎶 are you playing?</p>
          <input class="piece"
            type="text"
            placeholder="Right now I'm playing..."
            name="piece" />
        </label>
        <input type="submit" value="Store" />
      </div>
    </form>
  )
}

export default Form;