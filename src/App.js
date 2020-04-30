import React, {Component} from 'react';
import './App.css';
import swal from "sweetalert";

import firebase from './firebase';

import Log from './Log'
import Header from './Header';
import Byline from './Byline';
import Button from './Button';
import Form from './Form';

import chirp1 from './chirp1.wav';
import chirp2 from './chirp2.mp3';

class App extends Component {
  constructor(){
    super();
    // The state is initialized so that the playing begins at false, the count at 0, the chirps per minute at 80, the chirps per measure at 4, the logs an empty array and the text inputs empty strings.  
    this.state = {
      playing: false,
      count: 0,
      logs: [],
      userInput: '',
      userCompInput: '',
      userNumberInput: "80",
      chirpsPerMeasure: "4",
      // userDateInput: ''
    }

    // Audio files of bird sounds
    this.chirp1 = new Audio(chirp1);
    this.chirp2 = new Audio(chirp2);
  }

  // grab the list of logs from our database
  componentDidMount() {
    // set up a listener to firebase
    const dbRef = firebase.database().ref();
    // taking info out of firebase to put on page
    dbRef.on('value', (result) => {
      const data = result.val();
      // turn data from an object into an array
      const logsArray = []
      for(let key in data){
        // logName is the object that contains tempo and title
        logsArray.push({logId: key, logName: data[key]})
        console.log(data[key]);
      }
      this.setState({
        logs: logsArray
      })
    })
  }

  handleSubmit = (e) => {
    // putting info into firebase
    e.preventDefault()
    if (this.state.userInput !=='' && this.state.userCompInput !=='' && this.state.userDate !== ''){
      const dbRef = firebase.database().ref()
      // object that will be in firebase
      const toSave = {
        title: this.state.userInput,
        composer: this.state.userCompInput,
        tempo: this.state.userNumberInput,
        meter: this.state.chirpsPerMeasure,
        // date: this.state.userDateInput
      }

      dbRef.push(toSave)
      
      // Clears the two text inputs on store while maintaining the tempo and the meter.
      this.setState({
        userInput:'',
        userCompInput: '',
        // userDateInput: ''
      })

    } else {
      swal({
        title: "Error!",
        text: "Please go back and fill out all of the fields!",
        icon: "error",
        button: true,
      });
    }
  }

  handleUserInput = (event) => {
    // take event.target.value (user's chosen values) and put them into the setState.[].
    this.setState({
      userInput: event.target.value
    })
  }

  handleCompInput = (event) => {
    this.setState({
      userCompInput: event.target.value
    })
  }

  handleMeterInput = (event) => {
    this.setState({
      chirpsPerMeasure: event.target.value
    })
  }

  // handleDateInput = (event) => {
  //   this.setState({
  //     userDateInput: event.target.value
  //   })
  // }

  chirp = () => {
    // If the metronome is on the downbeat of the four-beat pattern that is set in the state, chirp2 will play.
    if (this.state.count % this.state.chirpsPerMeasure === 0) {
      this.chirp2.play();
    } else {
      this.chirp1.play();
    }

    // The setState method allows the count to increase by one by passing in an object with the key of count and setting it to count plus one. It also keeps track of which beat in each 4/4 measure we are on by using the modulo operator and the chirpsPerMeasure. 
    this.setState(state => ({
      count: (state.count + 1) % state.chirpsPerMeasure
    }));
  }

  startAndStop = () => {
    // If the chirptronome is playing and you want it to stop, press the Stop button. This will stop it from playing by clearing the interval (timer) and setting the playing value to false. The Stop button will change back to a Start button (as directed by the ternary operator in the button element). 
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
      // However, if it is not already playing, a timer is set that takes the number 60, divides it by the cpm chosen by the user, and multiplies it by 1 second. 
    } else {
      this.timer = setInterval(this.chirp, (60 / this.state.userNumberInput) * 1000);
      this.setState({
        count: 0,
        playing: true
        // This second argument is used so that a chirp is played as soon as the button is clicked and does not wait for setState. 
      }, this.chirp);
    }
  }

  // Allow the user to adjust the cpm through the range input.
  handleChange = event => {
    const cpm = event.target.value

    // If the metronome is already playing and the user changes the cpm through the range input, the timer has to be cleared and this.timer has to be re-calculated.
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.chirp, (60 / cpm) * 1000);

      // After the new cpm is set by the user, the beat count is also reset to 0 so that the first of every four chirps is recognized as the down beat of the beatPerMeasure. 
      this.setState({
        count: 0,
        userNumberInput: cpm
      });

      // However, if the metronome is not already playing, the cpm is just updated through the setState. 
    } else {
        this.setState({ userNumberInput: cpm });
    }
  }
  render(){
    const { playing, userNumberInput } = this.state;

    return (
      <div className="chirptronome">
        <div className="data">
          <Header />
          <main>
            <Byline cpm={userNumberInput} />
            <Form 
              handleSubmit={this.handleSubmit}
              userNumberInput={this.state.userNumberInput}
              handleChange={this.handleChange}
              userInput={this.state.userInput}
              handleUserInput={this.handleUserInput}
              userCompInput={this.state.userCompInput}
              handleCompInput={this.handleCompInput}
              chirpsPerMeasure={this.state.chirpsPerMeasure}
              handleMeterInput={this.handleMeterInput}
              // userDateInput={this.userDateInput}
              // handleDateInput={this.handleDateInput}
            />
            <Button playing={playing} startAndStop={this.startAndStop} />
            <ul>
              {this.state.logs.map((log) => {
                return (
                  <Log
                    key={log.logId}
                    logId={log.logId}
                    logTitle={log.logName.title}
                    cpm={log.logName.tempo}
                    logComp={log.logName.composer}
                    logMeter={log.logName.meter}
                    // logDate={log.logName.date}
                  />
                );
              })}
            </ul>
          </main>
        </div>
      </div>
    );
  }
}

export default App;

