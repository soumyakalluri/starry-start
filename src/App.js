import './css/style.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import React, {Component} from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyBD1ZZ-FzcVuz2cqGpxH91OXMtZXLPV-Fw",
  authDomain: "starry-start.firebaseapp.com"
})

class App extends Component {
  state = {
    isSignedIn: false
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user});
    });

  }

  render() {
  return (
    <div className="App">
      {this.state.isSignedIn ? (
      <div className="body">
        <h1>start</h1>
        <button>view diary</button>
        <button>constellations</button>
        <button>moon phase</button>
        <button>space fact</button>
        <button onClick={() => firebase.auth().signOut()}>log out</button>
      </div>
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
