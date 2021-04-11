import './css/style.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import React, {Component} from 'react';
import facts from './Space_Facts.js';
import Diary from './components/Diary';

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

    this.state = {
      isSignedIn: false,
      displayDiary: false,
      displayMoon: false,
      displaySpace: false
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
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

  render() {
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
          <h3>This is today's moon phase</h3>
          <iframe className="moonframe" src="https://in-the-sky.org/links.php" title="the moon today"></iframe> 
        </div>
      </div>;

    // space display here
    let spaceButton = <button onClick={this.toggleSpaceDisplay}>cool space fact</button>;
    let spaceModal = <div id="spaceModal" className="modal">
        <div className="space-modal-content">
          <span className="close" onClick={this.toggleSpaceDisplay}>&times;</span>
          <h3>Check out this cool space fact!</h3>
          <p id='spacefact'></p>
        </div>
      </div>;

    // rendering items
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          this.state.displayDiary ? (
            diaryPage
          ) : (
            <div className="body">
              <h3 className="heading">start</h3>
              {diaryButton}
              <button>constellations</button>
              {moonButton}
              {moonModal}
              {spaceButton}
              {spaceModal}
              <button onClick={() => firebase.auth().signOut()}>log out</button>
            </div>
          )
        ) : (
          <div className="body">
            <h1>sign in to start</h1>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
      )}
      </div>
    );

  }
}

export default App;
