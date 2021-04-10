import React from 'react';
import '../css/login.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function Login() {
    return (
      <div className="body">
        <h1>sign in to start</h1>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
}

export default Login