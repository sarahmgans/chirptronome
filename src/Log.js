import React from "react";
import firebase from "./firebase";

function Log(props) {

  const deleteItem = () => {
    // console.log(props.logId);
    const itemRef = firebase.database().ref(props.logId);
    itemRef.remove();
  };

  return (
    <li onClick={deleteItem} onKeyDown={deleteItem}>
      <p>
        <span className="bold">Title:</span> {props.logTitle}
      </p>
      <p>
        <span className="bold">Composer:</span> {props.logComp}
      </p>
      <p>
        <span className="bold">Tempo:</span> {props.cpm} Chirps per Minute
      </p>
      <p>
        <span className="bold">Meter:</span> {props.logMeter}/4
      </p>
      {/* <p>
        <span className="bold">Date:</span> {props.logDate}
      </p> */}
      <span className="x">☒</span>
    </li>
  );
}

export default Log;
