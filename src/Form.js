import React from 'react'

function Form (props) {
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <div className="parent">
        <input
          className="slider"
          type="range"
          min="20"
          max="260"
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
          onChange={props.handleMeterInput}
        />
        <label for="6/4" className="6/4">
          6/4
        </label>

        <input
          type="radio"
          name="meter"
          value="5"
          checked={props.chirpsPerMeasure === "5"}
          id="5/4"
          onChange={props.handleMeterInput}
        />
        <label for="5/4" className="5/4">
          5/4
        </label>

        <input
          type="radio"
          name="meter"
          value="4"
          checked={props.chirpsPerMeasure === "4"}
          id="4/4"
          onChange={props.handleMeterInput}
        />
        <label for="4/4" className="4/4">
          4/4
        </label>

        <input
          type="radio"
          name="meter"
          value="3"
          checked={props.chirpsPerMeasure === "3"}
          id="3/4"
          onChange={props.handleMeterInput}
        />
        <label for="3/4" className="3/4">
          3/4
        </label>

        <input
          type="radio"
          name="meter"
          value="2"
          checked={props.chirpsPerMeasure === "2"}
          id="2/4"
          onChange={props.handleMeterInput}
        />
        <label for="2/4" className="2/4">
          2/4
        </label>

        <input
          type="radio"
          name="meter"
          value="1"
          checked={props.chirpsPerMeasure === "1"}
          id="noMeter"
          onChange={props.handleMeterInput}
        />
        <label for="noMeter" className="1/4">
          1/4
        </label>
      </fieldset>
      <div className="parent">
        <p>
          What{" "}
          <span aria-label="music" className="musicNotes" role="img">
            {" "}
            🎶{" "}
          </span>{" "}
          are you playing?
        </p>
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
      </div>
      <button type="submit">Store</button>
    </form>
  );
}

export default Form;