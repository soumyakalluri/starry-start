import React, {Component, useDebugValue} from 'react';
import '../css/diary.css';
import firebase from 'firebase';

class Diary extends Component {
  constructor(props) {
    super(props);
    this.displayNewDiary = this.displayNewDiary.bind(this);
    this.toggleNewEntry = this.toggleNewEntry.bind(this);
    this.toggleViewDiary = this.toggleViewDiary.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    let today = new Date();
    let date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    this.state = {
      viewDiary: false,
      newDiary: false,
      value: '',
      date: date
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(firebase.firestore());

    let currentUID = firebase.auth().currentUser.uid;
    let userRef = firebase.firestore().collection('users').doc(currentUID);

    let setWithMerge = userRef.set({
      [this.state.date]: this.state.value}, 
    {merge: true});

    this.setState({newDiary: false, value: ''});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCancel(event) {
    this.setState({
      newDiary: false,
      viewDiary: false
    });
  }

  toggleNewEntry() {
    if (this.state.newDiary) {
      this.setState({newDiary: false});
    } else {
      this.setState({newDiary: true});
    }
  }

  toggleViewDiary() {
    if (this.state.viewDiary) {
      this.setState({viewDiary: false});
    } else {
      this.setState({viewDiary: true});
      this.displayNewDiary();
    }
  }

  displayNewDiary() {
    let currentUID = firebase.auth().currentUser.uid;
    let userRef = firebase.firestore().collection('users').doc(currentUID);
    let data = userRef.get().then((entry) => {
      if (entry.exists) {
        let keys = Object.keys(entry.data());
        keys.forEach((day) => {
          let li = document.createElement('li');
          document.getElementById('diary-entries').appendChild(li);
          li.innerHTML += `${day}: ${entry.data()[day]}`;
        });
        // document.getElementById('diary-entries').innerHTML = myDiary;
      } else {
        console.log("No such entry!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  render () {
    let newEntry = <button onClick={this.toggleNewEntry}>create new entry</button>;
    let viewDiary = <button onClick={this.toggleViewDiary}>view past entries</button>;

    return (
      <div className="diary">
        {this.state.viewDiary ? (
          // view past diary entries
          <div>
            <ul id="diary-entries"></ul>
          </div>
        ) : 
          this.state.newDiary ? 
            // create new diary
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  how are you feeling today?
                  <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="save"/>
                <input type="button" value="cancel" onClick={this.handleCancel}/>
              </form>
            </div>
            :
            // view my diary options
            <div>
              <h3 className="heading">my diary</h3>
              {newEntry}
              {viewDiary}
            </div>
        }
      </div>
    )
  }
}

export default Diary;