import React from 'react'

function Form (props) {
  return(
    <form action="" onSubmit={props.handleSubmit}>
      <input
        className="slider"
        type="range"
        min="20"
        max="260"
        value={props.userNumberInput}
        id="userLog"
        onChange={props.handleChange}
      />
      <div className="parent">
          <p>What <span aria-label="music" className="musicNotes" role="img">  🎶 </span>  are you playing?</p>
          <input
            className="piece"
            type="text"
            placeholder="Title:"
            name="piece"
            value={props.userInput}
            id="userLog"
            onChange={props.handleUserInput}
          />
          <input
            className="composer"
            type="text"
            placeholder="Composer:"
            name="composer"
            value={props.userCompInput}
            id="userComp"
            onChange={props.handleCompInput}
          />
        <button type="submit">Store</button>
      </div>
    </form>
  )
}

export default Form;