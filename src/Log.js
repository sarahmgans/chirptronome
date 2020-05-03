import React from "react";
import firebase from "./firebase";

function Log(props) {

  // A function for deleting the log (li) on click of the button in the top right corner.
  const deleteItem = () => {
    const itemRef = firebase.database().ref(props.logId);
    itemRef.remove();
  };

  // A function for deleting the log on the pressing of the enter key. 
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const itemRef = firebase.database().ref(props.logId);
      itemRef.remove();
    }
  };

  return (
    <li tabIndex="0">
      <p>
        <span className="bold">Title:</span> {props.logTitle}
      </p>
      <p>
        <span className="bold">Composer:</span> {props.logComp}
      </p>
      <p>
        <span className="bold">Tempo:</span> {props.cpm} Chirps per Minute
      </p>
      <p className="last">
        {/* A /4 is added, as in the state, the values are only integers and not in the fraction form that would be recognized in music. */}
        <span className="bold">Meter:</span> {props.logMeter}/4
      </p>
      <a href="#top"
        className="replay"
        onClick={() => props.setTempoMeter(props.logId)}
        tabIndex="0"
      >
        Play me again!
      </a>
      <span
        className="x"
        onClick={deleteItem}
        onKeyDown={handleKeyPress}
        tabIndex="0"
      >
        ☒
      </span>
    </li>
  );
}


export default Log;
