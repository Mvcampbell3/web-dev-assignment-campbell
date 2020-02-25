import React, { Component } from 'react'
import './App.css'
import firebase from './firebase';
import Login from './components/Login';

class App extends Component {

  state = {
    list: [],
    nameInput: '',
    descriptionInput: '',
    login: true,
    viewLogin: false,
    emailInput: '',
    usernameInput: '',
    passwordInput: ''
  }


  componentDidMount() {
    const itemRef = firebase.database().ref('items');
    itemRef.on('value', snapshot => {
      const items = snapshot.val()
      let newStateItems = [];
      for (let item in items) {
        newStateItems.push({
          id: item,
          name: items[item].name,
          description: items[item].description
        })
      }
      this.setState({
        list: newStateItems
      })
    })
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        // does user stuff
        this.setState({ viewLogin: false })
      } else {
        // not signed in/up
        this.setState({ viewLogin: true })
      }
    })
  }

  sendItem = () => {
    const itemRef = firebase.database().ref('items');
    const newItem = {
      name: this.state.nameInput,
      description: this.state.descriptionInput
    }
    itemRef.push(newItem);
    this.setState({
      nameInput: '',
      descriptionInput: ''
    })
  }

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  switchLoginSignup = () => {
    this.setState({ login: !this.state.login })
  }

  loginUser = () => {
    if (this.state.login) {
      if (this.state.emailInput !== '' && this.state.passwordInput !== '') {
        firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('Must enter email and password to login')
      }
    } else {

    }
  }

  signOutUser = () => {
    firebase.auth().signOut()
      .then(() => { console.log('user has signed out') })
      .catch((err) => { console.log(err) })
  }

  render() {
    return (
      <div className="App">
        {this.state.viewLogin ?
          <Login
            login={this.state.login}
            password={this.state.passwordInput}
            username={this.state.usernameInput}
            email={this.state.emailInput}
            handleInput={this.handleInput}
            switchLoginSignup={this.switchLoginSignup}
            loginUser={this.loginUser}
          />
          :
          <button className='button is-danger' onClick={this.signOutUser}>Sign Out</button>
        }

        {/* <input type="text" name='nameInput' className='input' placeholder='Enter name' value={this.state.nameInput} onChange={(e) => this.handleInput(e)} />
        <input type="text" name='descriptionInput' className='input' placeholder='Enter description' value={this.state.descriptionInput} onChange={(e) => this.handleInput(e)} />
        <button className="button is-info" onClick={this.sendItem}>Add Item</button> */}
      </div>
    );
  }
}

export default App;