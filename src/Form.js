import React from 'react'

function Form (props){
  return (
    <form>
      <input className="range"
        type="range"
        min="20"
        max="260"
        value={props.cpm}
        onChange={props.handleChange} />
      <input className="number"
        type="number"
        min="20"
        max="260"
        value={props.cpm}
        onChange={props.handleChange} />
      <div className="parent">
        <label>
          <p>What 🎶 are you playing?</p>
          <input className="piece"
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