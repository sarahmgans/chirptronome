import React, {Component} from 'react';
import './App.css';
import Header from './Header';
import Byline from './Byline';
import Form from './Form';
import Button from './Button';


import chirp1 from './chirp1.wav';
import chirp2 from './chirp2.mp3';
class App extends Component {
  constructor(){
    super();
    // The state is initialized so that the playing begins at false, the count at 0, the chirps per minute at 80 and the chirps per measure at 4. 
    this.state = {
      playing: false,
      count: 0,
      cpm: 80,
      chirpsPerMeasure: 4
    }
    
    // Audio files of bird sounds
    this.chirp1 = new Audio(chirp1);
    this.chirp2 = new Audio(chirp2);
  }

  chirp = () => {
    // If the metronome is on the downbeat of the four-beat pattern that is set in the state, chirp2 will play.
    if (this.state.count % this.state.chirpsPerMeasure === 0) {
      this.chirp2.play();
    } else {
      this.chirp1.play();
    }

    // The setState method allows the count to increase by one by passing in an object with the key of count and setting it to count plus one. It also keeps track of which beat in each 4/4 measure we are on by using the modulo operator and the chirpsPerMeasure key. 
    this.setState(state => ({
      count: (state.count + 1) % state.chirpsPerMeasure
    }));
  }

  startAndStop = () => {
    // If the chicktronome is playing and you want it to stop, press the Stop button. This will stop it from playing by clearing the interval (timer) and setting the playing value to false. The Stop button will change back to a Start button (as directed by the ternary operator in the button element). 
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
      // However, if it is not already playing, a timer is set that takes the number 60, divides it by the cpm chosen by the user, and multiplies it by 1 second. 
    } else {
      this.timer = setInterval(this.chirp, (60 / this.state.cpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        // This second argument is used so that a chirp is played as soon as the button is clicked and does not wait for setState. 
      }, this.chirp);
    }
  }

  // Allow the user to adjust the cpm through the number and range inputs.
  handleChange = event => {
    const cpm = event.target.value;

    // If the metronome is already playing and the user changes the cpm through the range or number input, the timer has to be cleared and this.timer has to be re-calculated.
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.chirp, (60 / cpm) * 1000);

      // After the new cpm is set by the user, the beat count is also reset to 0 so that the first of every four chirps is recognized as the down beat of the beatPerMeasure. 
      this.setState({
        count: 0,
        cpm: cpm
      });

      // However, if the metronome is not already playing, the cpm is just updated through the setState. 
    } else {
      this.setState({ cpm });
    }
  }

  render(){
    return (
      <div className="chirptronome">
        <div className="data">
          <Header/>
          <main>
            <Byline cpm={this.state.cpm}/>
            <Form handleChange={this.handleChange} cpm={this.state.cpm}/>
          </main>
        </div>
        <Button playing={this.state.playing} startAndStop={this.startAndStop}/>
      </div>
    );
  }
}

export default App;

