import React, { Component } from 'react'
import './App.css'
import firebase from './firebase';
import Login from './components/Login';
import Detail from './components/Detail'
import Landing from './components/Landing'
import Header from './components/Header';

class App extends Component {

  state = {
    list: [],
    nameInput: '',
    descriptionInput: '',
    login: true,
    viewLogin: false,
    emailInput: '',
    usernameInput: '',
    passwordInput: '',
    userId: '',
    username: '',
    userEmail: '',
    displayMenu: false,
    // Set ViewLanding back to true
    viewLanding: false,
    loadedAuth: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        // does user stuff
        if (!this.state.login) {
          user.updateProfile({
            displayName: this.state.usernameInput
          })
        }
        this.setState(
          {
            viewLogin: false,
            userId: user.uid,
            username: user.displayName,
            userEmail: user.email,
            emailInput: '',
            usernameInput: '',
            passwordInput: '',
            login: true,
            loadedAuth: true
          }
        )
        this.getDatabase()
      } else {
        // not signed in/up
        this.setState({ viewLogin: true, userId: '', username: '', userEmail: '', loadedAuth: true })
      }
    })
  }

  getDatabase() {
    console.log('getdatabase called')
    if (this.state.userId) {
      const itemRef = firebase.database().ref(this.state.userId);
      itemRef.on('value', snapshot => {
        const items = snapshot.val()
        let newStateItems = [];
        for (let item in items) {
          newStateItems.push({
            id: item,
            name: items[item].name,
            description: items[item].description,
            completed: items[item].completed
          })
        }
        console.log(newStateItems)
        this.setState({
          list: newStateItems
        })
      })
    }
  }

  sendItem = () => {
    const itemRef = firebase.database().ref(this.state.userId);
    const newItem = {
      name: this.state.nameInput,
      description: this.state.descriptionInput,
      completed: false
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
      if (this.state.emailInput !== '' && this.state.passwordInput !== '' && this.state.usernameInput !== '') {
        firebase.auth().createUserWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
          .then(() => {
            console.log('successful user creation')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('Must enter email, username, and password for login')
      }
    }
  }

  signOutUser = () => {
    firebase.auth().signOut()
      .then(() => { console.log('user has signed out') })
      .catch((err) => { console.log(err) })
  }

  deleteItem = (itemId) => {
    console.log(itemId)
    const delRef = firebase.database().ref(`${this.state.userId}/${itemId}`)
    // console.log(delRef).remove()
    delRef.remove()
  }

  toggleItemComplete = (itemId, currentValue) => {
    const updateRef = firebase.database().ref(`${this.state.userId}/${itemId}`)
    console.log(updateRef)
    console.log(currentValue)
    let update = {};
    update.completed = !currentValue;
    updateRef.update(update)
  }

  toggleMobileNav = () => {
    this.setState({ displayMenu: !this.state.displayMenu })
  }

  toggleViewLanding = () => {
    this.setState({ viewLanding: !this.state.viewLanding })
  }

  render() {
    return (
      <div>

        {this.state.viewLanding ?
          <Landing
            loadedAuth={this.state.loadedAuth}
            toggleViewLanding={this.toggleViewLanding}
          /> : <>
            <Header
              userId={this.state.userId}
              toggleMobileNav={this.toggleMobileNav}
              toggleViewLanding={this.toggleViewLanding}
              displayMenu={this.state.displayMenu}
              signOutUser={this.signOutUser}
            />
            {
              this.state.viewLogin ?
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
                <Detail
                  nameInput={this.state.nameInput}
                  descriptionInput={this.state.descriptionInput}
                  handleInput={this.handleInput}
                  sendItem={this.sendItem}
                  signOutUser={this.signOutUser}
                  list={this.state.list}
                  deleteItem={this.deleteItem}
                  toggleItemComplete={this.toggleItemComplete}
                  username={this.state.username}
                />
            }</>}
      </div>
    )
  }
}

export default App;