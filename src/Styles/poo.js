import React, { Component } from 'react';
import axios from 'axios'

// import components
import Header from './components/Header/Header'
import Form from './components/Form/Form';
import Usertime from './components/UserTime/Usertime';

//Sass
import './styles/App.scss'

// First, we get the date for the user of when they would like to run.
// Then, we ask if they'd like to hit the sunrise or the sunset. 
// From there we save the values for the time that either the sunrise ends or sunset ends, depending on the user selection. 
// Then, we ask them for the desired duration of their run and save that value. 
// Then, we subtract that duration from either the sunrise or sunset time (depending on what they chose) to figure out when they should leave to go on their run.

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiTimes: [],
      beforeSunrise: null,
      date: '',
      duration: 0,
      userTime: [],
      showForm: true
    }
  }

  // Stores selected twilight time selected by the user into state. Also converts the string values of 'true' and 'false' into booleans. 
  handleSunrise = (event) => {
    const beforeSunrise = event.target.value === 'true' ? true : false;
    this.setState({
      beforeSunrise
    })
  }

  // Stores date selected by the user into state.
  handleDate = (event) => {
    this.setState({
      date: event.target.value,
    })
  }

  // Stores duration selected by the user into state. 
  handleDuration = (event) => {
    this.setState({
      duration: event.target.value,
    })
  }

  // Removes the form after the user twilights themselves. Makes it appear again after the user presses the beautiful refresh icon. 
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  // Takes the users selections and uses them for the axios call to get thei results. 
  handleSubmit = (event) => {
    event.preventDefault();
    this.toggleForm();
    axios({
      url: `https://api.sunrise-sunset.org/json`,
      method: `GET`,
      responseType: `json`,
      params: {
        lat: 43.6532,
        lng: -79.3832,
        date: this.state.date,

      }
    })
      .then((response) => {
        this.setState({
          apiTimes: response.data.results
        }, () => this.createRun())
        // Anonymous function above delays createRun until the API is finished. 
      });
  }

  // Converts user selected date into number values
  dateConverter = (date) => {
    const dateString = date.split("-", 3)
    // Map to new array
    return dateString.map((date) => {
      return parseInt(date)
    })
  }
  // Converts sunrise time
  sunriseTimeConverter = () => {
    // Converts the sunrise time from API - from string to number values
    const sunriseStringOne = this.state.apiTimes.sunrise.split(':', 3)
    const seconds = sunriseStringOne[2].split(" ", 1)
    const sunriseStringThree = sunriseStringOne.pop()
    // Concats the two arrays together without AM/PM values
    const finalSunriseString = sunriseStringOne.concat(seconds)
    // Converts array into number values
    const finalSunriseNumber = finalSunriseString.map((sRiseTimes) => {
      return parseInt(sRiseTimes)
    })
    return finalSunriseNumber
  }

  // Convert sunset time
  sunsetTimeConverter = () => {
    // Coverts sunset time into number values
    const sunsetStringOne = this.state.apiTimes.sunset.split(':', 3)
    const secondsTwo = sunsetStringOne[2].split(" ", 1)
    const sunsetStringThree = sunsetStringOne.pop()
    // Concats the two arrays together without AM/PM values
    const finalSunsetString = sunsetStringOne.concat(secondsTwo)
    // Converts array into number values
    const finalSunsetNumber = finalSunsetString.map((sunsetTimes) => {
      return parseInt(sunsetTimes)
    })
    return finalSunsetNumber;
  }

  // This converts the sunrise time into 24 hour time
  convertTimeFormat = (formattedTime) => {
    const timeToConvert = [...formattedTime]

    if (timeToConvert[0] === 12) {
      const newHour = timeToConvert[0] - 12
      const newTimeToConvert = timeToConvert.shift()
      const formattedTimeAgain = timeToConvert.unshift(newHour)

    } else {
      const sameHour = timeToConvert[0] - 0
    }
    // Returns to the function in createRun
    return timeToConvert;
  }

  // This converts the sunset time into EST time
  timeToEst = (easternTime) => {

    if (easternTime[3] >= 5) {
      return easternTime[3] - 4
    } else {
      return easternTime[3] + 20
    }
  }

  resetPage = () => {
    window.location.reload()
  }

  createRun = () => {
    // Date values returned from date converter
    const dateArray = this.dateConverter(this.state.date)

    // Sunrise/sunset values returned from sunrise and sunset time converter
    const sunriseTimeArray = this.sunriseTimeConverter()
    const sunsetTimeArray = this.sunsetTimeConverter()

    const formattedSunsetArray = this.convertTimeFormat(sunsetTimeArray)

    // Creating two arrays, the date+sunset array and the date+sunrise array
    const sunsetDateArray = dateArray.concat(formattedSunsetArray)
    const sunriseDateArray = dateArray.concat(sunriseTimeArray);

    // Converting the sunsetDateArray and the sunriseDateArray into EST
    const convertedToSunsetEst = this.timeToEst(sunsetDateArray)
    const convertedToSunriseEst = this.timeToEst(sunriseDateArray)

    // Converted the sunset date array into 24-hour time
    const sunsetDateArrayFinal = [...sunsetDateArray]
    sunsetDateArrayFinal[3] = convertedToSunsetEst;

    // Converted the sunrise date array into 24-hour time
    const sunriseDateArrayFinal = [...sunriseDateArray]
    sunriseDateArrayFinal[3] = convertedToSunriseEst;

    // Converted the sunsetDateArrayFinal into a new Date object using the spread operator. 
    const sunsetDateObject = new Date(...sunsetDateArrayFinal);

    // Converted the sunriseDateArrayFinal into a new Date object using the spread operator. 
    const sunriseDateObject = new Date(...sunriseDateArrayFinal)

    // Converted the run duration from a string to a number
    const runDuration = parseInt(this.state.duration);

    // Defined variables for sunset and sunrise times and subtracted the users chosen run duration 
    let morningRun = sunriseDateObject;
    morningRun.setMinutes(morningRun.getMinutes() - runDuration)

    let nightRun = sunsetDateObject;
    nightRun.setMinutes(nightRun.getMinutes() - runDuration)

    // Used the toTimeString method on the new Date object to isolate only the time in the object. 
    const morningRunString = morningRun.toTimeString()
    const nightRunString = nightRun.toTimeString()

    // Sliced the extra shit off of the end of each of the time strings to display to the user. 
    const finalMorningString = morningRunString.slice(0, 8)
    const finalNightString = nightRunString.slice(0, 8)

    // Set the user run to either the sunrise string or the sunset string, using a ternary operator. 
    const userRun = this.state.beforeSunrise ? finalMorningString : finalNightString

    // Set the state with users selections. 
    this.setState({
      userTime: userRun
    })
  }

  render() {
    return (
      <div>
        <Header />
        <section className="formSection" id="form">
          <div>
            {this.state.showForm ?
              <Form
                handleSubmit={this.handleSubmit}
                handleSunrise={this.handleSunrise}
                handleDate={this.handleDate}
                date={this.state.date}
                handleDuration={this.handleDuration}
                duration={this.state.duration}
                beforeSunrise={this.state.beforeSunrise}
              />
              : <Usertime
                userTime={this.state.userTime}
                resetPage={this.resetPage}
                nightOrDay={this.state.beforeSunrise} />
            }
          </div>
        </section>
      </div>
    )
  }
}

export default App;
