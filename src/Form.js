import React from 'react'

function Form (props) {
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <div className="parent">
        <input
          className="slider"
          type="range"
          min="40"
          max="210"
          value={props.userNumberInput}
          id="userLog"
          onChange={props.handleChange}
        />
      </div>
      <fieldset className="radio">
        <input
          type="radio"
          name="meter"
          value="6"
          checked={props.chirpsPerMeasure === "6"}
          id="6/4"
          onChange={(e) => props.handleInput(e, "chirpsPerMeasure")}
        />
        <label for="6/4" className="6/4">
          <span>6/4</span>
        </label>

        <input
          type="radio"
          name="meter"
          value="5"
          checked={props.chirpsPerMeasure === "5"}
          id="5/4"
          onChange={(e) => props.handleInput(e, "chirpsPerMeasure")}
        />
        <label for="5/4" className="5/4">
          <span>5/4</span>
        </label>

        <input
          type="radio"
          name="meter"
          value="4"
          checked={props.chirpsPerMeasure === "4"}
          id="4/4"
          onChange={(e) => props.handleInput(e, "chirpsPerMeasure")}
        />
        <label for="4/4" className="4/4">
          <span>4/4</span>
        </label>

        <input
          type="radio"
          name="meter"
          value="3"
          checked={props.chirpsPerMeasure === "3"}
          id="3/4"
          onChange={(e) => props.handleInput(e, "chirpsPerMeasure")}
        />
        <label for="3/4" className="3/4">
          <span>3/4</span>
        </label>

        <input
          type="radio"
          name="meter"
          value="2"
          checked={props.chirpsPerMeasure === "2"}
          id="2/4"
          onChange={(e) => props.handleInput(e, "chirpsPerMeasure")}
        />
        <label for="2/4" className="2/4">
          <span>2/4</span>
        </label>

        <input
          type="radio"
          name="meter"
          value="1"
          checked={props.chirpsPerMeasure === "1"}
          id="noMeter"
          onChange={(e) => props.handleInput(e, "chirpsPerMeasure")}
        />
        <label for="noMeter" className="1/4">
          <span>1/4</span>
        </label>
      </fieldset>
      <button className="playing" onClick={props.startAndStop}>
        {props.playing ? "Stop" : "Play"}
      </button>
      <div className="parentTwo">
        <p className="form">What music are you playing?</p>
        <input
          className="piece"
          type="text"
          placeholder="Title"
          name="piece"
          value={props.userInput}
          id="userLog"
          onChange={(e) => props.handleInput(e, "userInput")}
        />
        <input
          className="composer"
          type="text"
          placeholder="Composer"
          name="composer"
          value={props.userCompInput}
          id="userComp"
          onChange={(e) => props.handleInput(e, "userCompInput")}
        />
        <div className="buttonParent">
          <button type="submit">Store</button>
        </div>
      </div>
    </form>
  );
}

export default Form;