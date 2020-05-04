import React, {Component} from 'react';
import './Styles/App.scss'
import swal from "sweetalert";
import firebase from './firebase';

// Importing components 
import Log from './Log'
import Header from './Header';
import Byline from './Byline';
import Form from './Form';
import Footer from './Footer';

// Importing audio files
import chirp1 from './chirp1.wav';
import chirp2 from './chirp2.mp3';

class App extends Component {
  constructor(){
    super();
    // The state is initialized so that the playing begins at false, count at 0, userNumberInput (chirps per minute) at 80, chirpsPerMeasure at 4 (4/4 time), logs an empty array, and text inputs (title and composer) empty strings.  
    this.state = {
      playing: false,
      count: 0,
      logs: [],
      userInput: '',
      userCompInput: '',
      userNumberInput: "80",
      chirpsPerMeasure: "4"
    }

    // Audio files of bird sounds
    this.chirp1 = new Audio(chirp1);
    this.chirp2 = new Audio(chirp2);
  }

  // Below we are grabbing info from firebase to put it on the page
  componentDidMount() {
    // A listener is set up to firebase
    const dbRef = firebase.database().ref();
    // Info is taken out of firebase to put on the page
    dbRef.on('value', (result) => {
      const data = result.val();
      // Data from an object is then turned into an array 
      const logsArray = []
      for(let key in data){
        logsArray.push({logId: key, logName: data[key]})
      }
      this.setState({
        logs: logsArray
      })
    })
  }

  handleSubmit = (e) => {
    // Below we are putting info into firebase
    e.preventDefault()
    if (this.state.userInput !=='' && this.state.userCompInput !=='' && this.state.userDate !== ''){
      const dbRef = firebase.database().ref()
      // Object that will be saved in firebase
      const toSave = {
        title: this.state.userInput,
        composer: this.state.userCompInput,
        tempo: this.state.userNumberInput,
        meter: this.state.chirpsPerMeasure
      }

      dbRef.push(toSave)
      
      // When the user presses Store, all of their information is stored. While the text inputs are emptied, the tempo and the meter remain. This is so that the user can keep playing at their tempo and meter even after they are stored.
      this.setState({
        userInput:'',
        userCompInput: ''
      })

    // Error handling to make sure that the user fills out all of the inputs before storing. 
    } else {
      swal({
        title: "Error!",
        text: "Please fill all of the fields!",
        icon: "error",
        button: true
      });
    }
  }

  // A function that will be used for the states chirpsPerMeasure, userCompInput and userInput.
  handleInput = (event, state) => {
    this.setState({
      [state]: event.target.value
    })
  }

  chirp = () => {
    // If the metronome is on the downbeat of the four-beat pattern that is set in the state, chirp2 (louder chirp) will play.
    if (this.state.count % this.state.chirpsPerMeasure === 0) {
      this.chirp2.play();
    } else {
      this.chirp1.play();
    }

    // The setState method allows for the count to increase by 1 by passing in an object with the key of count, and setting it to count plus one. It also keeps track of which beat in each measure we are on by using the modulo operator and the chirpsPerMeasure. 
    this.setState(state => ({
      count: (state.count + 1) % state.chirpsPerMeasure
    }));
  }

  startAndStop = (e) => {
    // If the chirptronome is playing and you want it to stop, press the Stop button. This will stop it from playing by clearing the interval and setting the playing value to false in setState. The Stop button will also change back to a Start button (as directed by the ternary operator in the button element). 
    e.preventDefault();
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });

      // However, if it is not already playing, a timer is set that takes the number 60, divides it by the cpm chosen by the user, and multiplies it by 1 second. The count is then set to 0 and the playing value to true in the setState. 
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

  // Here, when the user clicks on the log (li) Play Me Again button, all of their chosen settings that were stored in the particular li that they clicked on, are restored. 
  setTempoMeter = (logId) => {
    const dbRef = firebase.database().ref(logId);
    dbRef.on('value', (item) => {
      const data = item.val();

      // Error handling so that if there is data, it goes back into the inputs, but if there is no data, the inputs are reset to the values in the initialized state.
      const storedTempo = data ? data.tempo : "80"
      const storedMeter = data ? data.meter : "4"
      const storedCompInput = data ? data.composer : ''
      const storedTitleInput = data ? data.title : ''
      
        this.setState({
        userNumberInput: storedTempo,
        chirpsPerMeasure: storedMeter,
        userCompInput: storedCompInput,
        userInput: storedTitleInput
      })
    }
  )}

  render(){
    // Destructuring
    const { playing, userNumberInput } = this.state;

    // What will be printed to the page
    return (
      <div className="chirptronome" id="top">
        <div className="data wrapper">
          <Header />
          <main className="wrapper">
            <section>
              <Byline cpm={userNumberInput} />
              <Form
                handleInput={(e, state) => this.handleInput(e, state)
                }
                handleSubmit={this.handleSubmit}
                userNumberInput={this.state.userNumberInput}
                handleChange={this.handleChange}
                userInput={this.state.userInput}
                userCompInput={this.state.userCompInput}
                chirpsPerMeasure={this.state.chirpsPerMeasure}
                playing={playing}
                startAndStop={this.startAndStop}
              />
            </section>
            <section>
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
                      setTempoMeter={this.setTempoMeter}
                    />
                  );
                })}
              </ul>
            </section>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;


