import React, {Component} from 'react';
import './App.css';
import Header from './Header';

import chirp1 from './chirp1.wav';
import chirp2 from './chirp2.mp3';


class App extends Component {
  constructor(){
    super();
    // The state is initialized
    this.state = {
      playing: false,
      count: 0,
      bpm: 80,
      beatsPerMeasure: 4
    }
    
    // Audio files of bird sounds
    this.chirp1 = new Audio(chirp1);
    this.chirp2 = new Audio(chirp2);
  }

  chirp = () => {
    const { count, beatsPerMeasure } = this.state;

    // If the metronome is on the downbeat of the four-beat pattern that is set in the state, chirp2 will play.
    if (count % beatsPerMeasure === 0) {
      this.chirp2.play();
    } else {
      this.chirp1.play();
    }

    // The setState is used to keep track of which beat in each 4/4 measure we are on. 
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop = () => {
    // If the chicktronome is playing and you want it to stop, press the Stop button. This will stop it from playing by clearing the interval (timer) and setting the playing value to false. The Stop button will change back to a Start button (as directed by the ternary operator in the button element). 
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    // However, if it is not already playing, a timer is set that takes the number 60, divides it by the bpm chosen by the user, and multiplies it by 1 second. 
    } else {
      this.timer = setInterval(this.chirp, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        // This second argument is used so that a chirp is played as soon as the button is clicked and there is no lag time. 
      }, this.chirp);
    }
  }

  // Create the ability for the user to adjust the bpm through the number and range inputs. this.handleChange will be passed as the onChange prop in the number and range inputs. 
  handleChange = event => {
    const bpm = event.target.value;

    if(this.state.playing) {
      // If the metronome is already playing and the user changes the bpm, the timer has to be cleared and this.timer has to be re-calculated.
      clearInterval(this.timer);
      this.timer = setInterval(this.chirp, (60 / bpm) * 1000);

      // After the new bpm is set by the user, the beat count is also reset to 0. 
      this.setState({
        count: 0,
        bpm
      });
    // However, if the metronome is not already playing, the bpm is just updated. 
    } else {
      this.setState({bpm});
    }

  }

  render(){
    // Whether playing is true or false + the bpm will determine the state
    const {playing, bpm} = this.state;

    return (
      <div className="chirptronome">
        <div className="data">
          <Header/>
          <main>
          <p class="chirps"><span>{bpm}</span> Chirps per Minute</p>
            <form>
              <input class="range"
                type="range"
                min="20"
                max="260"
                value={bpm}
                onChange={this.handleChange} />
              <input class="number" 
                type="number" min="40" max="260"
                min="20"
                max="260"
                value={bpm} 
                onChange={this.handleChange}/>
              <div class="parent">
                <label>
                  <p>What 🎶 are you playing?</p>
                <input class="piece"
                  type="text"
                  placeholder="Right now I'm playing..."
                  name="piece" />
                </label>
                <input type="submit" value="Store"/>
              </div>
            </form>
          </main>
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default App;
