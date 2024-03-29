import './css/style.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import React, {Component} from 'react';
import facts from './Space_Facts.js';
import Diary from './components/Diary';
import song from './chillmusic.mp3';

if (!firebase.apps.length) {
  firebase.initializeApp({
  apiKey: "AIzaSyBD1ZZ-FzcVuz2cqGpxH91OXMtZXLPV-Fw",
  authDomain: "starry-start.firebaseapp.com",
  databaseURL: "https://starry-start.firebaseio.com",
  projectId: "starry-start"
});
} else {
  firebase.app();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleMoonDisplay = this.toggleMoonDisplay.bind(this);
    this.toggleSpaceDisplay = this.toggleSpaceDisplay.bind(this);
    this.toggleDiaryDisplay = this.toggleDiaryDisplay.bind(this);
    // this.showSpaceFact = this.showSpaceFact.bind(this);
    this.toggleConstellationsDisplay = this.toggleConstellationsDisplay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);

    this.state = {
      isSignedIn: false,
      displayDiary: false,
      displayMoon: false,
      displaySpace: false,
      displayConstellations: false,
      music: true
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  // database = firebase.database().ref();
  // users = database.child('users');

  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user});
    });

  }

  toggleDiaryDisplay() {
    if (this.state.displayDiary) {
      this.setState({displayDiary: false});
    } else {
      this.setState({displayDiary: true});
    }
  }

  toggleMoonDisplay() {
    let moonModal = document.getElementById("moonModal");
    if (this.state.displayMoon) {
      this.setState({displayMoon: false})
      moonModal.style.display = "none";
    } else {
      this.setState({displayMoon: true})
      moonModal.style.display = "block";
    }
  }

  toggleSpaceDisplay() {
    let spaceModal = document.getElementById("spaceModal");
    let coolfacts = facts.split('\n')
    if (this.state.displaySpace) {
      this.setState({displaySpace: false})
      spaceModal.style.display = "none";
    } else {
      this.setState({displaySpace: true})
      let number = Math.floor(Math.random() * 100); 
      document.getElementById("spacefact").innerHTML = coolfacts[number];
      spaceModal.style.display = "block";
    }
  }

  toggleConstellationsDisplay() {
    let constellationsModal = document.getElementById("constellationsModal");
    if (this.state.displayConstellations) {
      this.setState({displayConstellations: false})
      constellationsModal.style.display = "none";
    } else {
      this.setState({displayConstellations: true})
      constellationsModal.style.display = "block";
    }
  }

  toggleMute() {
    if (this.state.music) {
      this.song.pause();
      this.setState({music: false});
    } else {
      this.song.play();
      this.setState({music: true});
    }
  }

  render() {
    // let musicSrc = this.state.music ? "./images/unmute.png" : "./images/mute.png";

    // diary button here
    let diaryButton = <button onClick={this.toggleDiaryDisplay}>view diary</button>;
    let diaryPage = <div className="body">
        <Diary />
        <button onClick={this.toggleDiaryDisplay}>back to home</button>
      </div>

    // moon display here
    let moonButton = <button onClick={this.toggleMoonDisplay}>moon phase</button>;
    let moonModal = <div id="moonModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.toggleMoonDisplay}>&times;</span>
          <h3>This is today's moon phase!</h3>
          <iframe className="moonframe" src="https://www.moongiant.com/phase/today/" title="the moon today"></iframe> 
        </div>
      </div>;

    // space display here
    let spaceButton = <button onClick={this.toggleSpaceDisplay}>space fact</button>;
    let spaceModal = <div id="spaceModal" className="modal">
        <div className="space-modal-content">
          <span className="close" onClick={this.toggleSpaceDisplay}>&times;</span>
          <h3>Check out this cool space fact!</h3>
          <p id='spacefact'></p>
        </div>
      </div>;

    // constellations display here
    let constellationsButton = <button onClick={this.toggleConstellationsDisplay}>constellations</button>;
    let constellationsModal = <div id="constellationsModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.toggleConstellationsDisplay}>&times;</span>
          <h3>These are the constellations you can see based on your time and location!</h3>
          <iframe className="constellationframe" src="https://stellarium-web.org/" title="the constellations today"></iframe> 
        </div>
      </div>;

    // rendering items
    return (
      <div className="App">
        {/* <img src={require(musicSrc)} onClick={this.toggleMute}/> */}
        {this.state.isSignedIn ? (
          this.state.displayDiary ? (
            diaryPage
          ) : (
            <div>
              <div className="audio">
                <audio controls>
                  <source src={song} type="audio/mpeg"/>
                </audio>
              </div>
              <div className="body">
                <h>start</h>
                {diaryButton}
                {constellationsButton}
                {constellationsModal}
                {moonButton}
                {moonModal}
                {spaceButton}
                {spaceModal}
                <button onClick={() => firebase.auth().signOut()}>log out</button>
              </div>
            </div>
          )
        ) : (
          <div className="body">
          <h1>start</h1>
          <div className="p">
            <p>sign in to start</p>
          </div>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>

          <p className="creators">This was created by <a href="https://github.com/srpatel2000">Siddhi Patel</a> and <a href="https://github.com/soumyakalluri">Soumya Kalluri</a> for Women/Hacks 2021!
          </p>
        </div>
      )}

      </div>
    );

  }
}

export default App;
