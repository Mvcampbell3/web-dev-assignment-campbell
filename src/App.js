import React, { Component } from 'react'
import './App.css'
// Loads in firebase config
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
    // ----------------------------
    loadedAuth: false,
    displayError: false,
    errorMsgs: []
  }

  componentDidMount() {
    // Run firebase Auth on mount to get user info
    // Sets display after landing to login or detail page
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
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
        // Sets up listener for firebase realtime database
        this.getDatabase()
      } else {
        // not signed in/up
        this.setState({ viewLogin: true, userId: '', username: '', userEmail: '', loadedAuth: true })
      }
    })
  }

  getDatabase() {
    console.log('getdatabase called')
    // Hooks onto database which has ref of userId
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

  // allows user to send to do by pressing enter key inside of textarea
  enterSend = (e) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendItem()
    }

  }

  // sends new to do to user database
  sendItem = () => {
    if (this.state.nameInput !== '' && this.state.descriptionInput !== '') {

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
    } else {
      this.setState({ displayError: true, errorMsgs: ['Must have both name and description fields entered'] })
    }
  }

  // basic react onChange event handler for inputs
  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Switches between login and signup forms, also sets if username is updated to user profile
  switchLoginSignup = () => {
    this.setState({ login: !this.state.login })
  }

  // Runs firebase signInWithEmailAndPassword auth function
  loginUser = () => {
    if (this.state.login) {
      if (this.state.emailInput !== '' && this.state.passwordInput !== '') {
        firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
          .catch(err => {
            console.log(err)
          })
      } else {
        // change to error modal and errormsgs
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
        // change to error modal and errormsgs
        alert('Must enter email, username, and password for login')
      }
    }
  }

  // Logs user out of firebase auth
  signOutUser = () => {
    firebase.auth().signOut()
      .then(() => { console.log('user has signed out') })
      .catch((err) => { console.log(err) })
  }

  // deletes to do item
  deleteItem = (itemId) => {
    console.log(itemId)
    const delRef = firebase.database().ref(`${this.state.userId}/${itemId}`)
    // console.log(delRef).remove()
    delRef.remove()
  }

  // updates item.completed
  toggleItemComplete = (itemId, currentValue) => {
    const updateRef = firebase.database().ref(`${this.state.userId}/${itemId}`)
    console.log(updateRef)
    console.log(currentValue)
    let update = {};
    update.completed = !currentValue;
    updateRef.update(update)
  }

  // For bulma navbar on mobile/screens < 1000px
  toggleMobileNav = () => {
    this.setState({ displayMenu: !this.state.displayMenu })
  }

  // Determines if user sees landing page
  toggleViewLanding = () => {
    this.setState({ viewLanding: !this.state.viewLanding })
  }

  // Flips state and empties errorMsgs for error display to user
  toggleShowErrorModal = () => {
    this.setState(prevState => {
      if (prevState.errorMsgs.length > 0 && prevState.displayError) {
        prevState.errorMsgs = [];
      }
      prevState.displayError = !prevState.displayError;
      return prevState;
    })
  }

  render() {
    return (
      <div>
        {this.state.displayError ?
          <div className='modal is-active'>
            <div className="modal-background" onClick={this.toggleShowErrorModal}></div>
            <div className="modal-content">
              <div className="notification is-info">
                <button className="delete" onClick={this.toggleShowErrorModal}></button>
                <h3 className="title">Whoops!</h3>
                {this.state.errorMsgs.map((errMsg, i) =>
                  <p key={i}>{errMsg}</p>
                )}
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={this.toggleShowErrorModal}></button>
          </div>
          : null}
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
                  enterSend={this.enterSend}
                />
            }</>}
      </div>
    )
  }
}

export default App;