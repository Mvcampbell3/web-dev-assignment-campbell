import React, { Component } from 'react'
import './App.css'
// Brings in firebase connection, used in auth
import firebase from './firebase';
// Brings in firebase database functions
import fire from './firebaseFuncs';

// Brings in components
import Login from './components/Login';
import Detail from './components/Detail'
import Landing from './components/Landing'
import Header from './components/Header';
import About from './components/About';
import ErrorModal from './components/ErrorModal';

// Brings in validateLogin functions
import valLogin from './validateLogin';

class App extends Component {

  state = {
    list: [],
    nameInput: '',
    descriptionInput: '',
    login: true,
    viewLogin: false,
    viewDetail: false,
    viewAbout: false,
    emailInput: '',
    usernameInput: '',
    passwordInput: '',
    userId: '',
    username: '',
    userEmail: '',
    displayMenu: false,
    viewLanding: true,
    loadedAuth: false,
    displayError: false,
    errorMsgs: []
  }

  componentDidMount() {
    // Run firebase Auth on mount to get user info
    // Sets display after landing to login or detail page
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!this.state.login) {
          // if user was on signup form, updates firebase user profile with display name
          user.updateProfile({
            displayName: this.state.usernameInput
          })
        }
        this.setState(
          {
            viewLogin: false,
            viewDetail: true,
            userId: user.uid,
            // can run before displayName is set, will display usernameInput value if that happens
            username: user.displayName || this.state.usernameInput,
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
        this.setState({ viewLogin: true, viewDetail: false, userId: '', username: '', userEmail: '', loadedAuth: true })
      }
    })
  }

  // Runs firebase signInWithEmailAndPassword auth function
  loginUser = () => {
    // Run validate inputs here!
    const validUsername = valLogin.validLength(this.state.usernameInput);
    const validPassword = valLogin.validLength(this.state.passwordInput);
    const validEmail = valLogin.validEmail(this.state.emailInput)

    // checks if login in or sign up
    if (this.state.login) {
      // login
      if (validEmail && validPassword) {
        // passed client side validation
        firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
          .catch(err => {
            // handles bad email, password errs without telling user which was which
            this.setState({ displayError: true, errorMsgs: ['Email or Password was incorrect'] })
          })
      } else {
        this.loginErrorAssignment(validPassword, validEmail, validUsername)
      }
    } else {
      // signup
      if (validEmail && validPassword && validUsername) {
        // passed client side validation
        firebase.auth().createUserWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
          .then(() => {
            console.log('successful user creation')
          })
          .catch(err => {
            // handles errors thrown by firebase for already email in db, etc.
            this.setState({ displayError: true, errorMsgs: [err.message] })
          })
      } else {
        this.loginErrorAssignment(validPassword, validEmail, validUsername)
      }
    }
  }

  // sets client-side validation error display
  loginErrorAssignment(password, email, username) {
    const newErrors = [];
    if (!password) {
      newErrors.push('Password must be atleast 6 characters long');
    }
    if (!email) {
      newErrors.push('Email must be a valid email address');
    }
    if (!username && !this.state.login) {
      newErrors.push('Username must be atleast 6 characters long');
    }
    this.setState({ displayError: true, errorMsgs: newErrors });
  }

  // Switches between login and signup forms, also sets if username is updated to user profile
  switchLoginSignup = () => {
    this.setState({ login: !this.state.login })
  }

  // Logs user out of firebase auth
  signOutUser = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('user has signed out');
        this.setState({ displayMenu: false, userId: '', username: '', userEmail: '' })
      })
      .catch((err) => { console.log(err) })
  }

  // Hooks onto database which has ref of userId
  getDatabase = () => {
    fire.getDatabase(this.state.userId, data => {
      if (data) {
        this.setState({ list: data })
      }
    });
  }

  // sends new to do to user database
  sendItem = () => {
    if (this.state.nameInput !== '' && this.state.descriptionInput !== '') {
      fire.sendItem(this.state.userId, this.state.nameInput, this.state.descriptionInput, result => {
        if (result) {
          this.setState({ nameInput: '', descriptionInput: '' })
        }
      })
    } else {
      this.setState({ displayError: true, errorMsgs: ['Mush have both name and description entered for new to do'] })
    }
  }

  // allows user to send to do by pressing enter key inside of textarea
  enterSend = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendItem()
    }
  }

  // basic react onChange event handler for inputs
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // deletes to do item
  deleteItem = (itemId) => {
    fire.deleteItem(this.state.userId, itemId)
  }

  // updates item.completed
  toggleItemComplete = (itemId, currentValue) => {
    fire.updateItem(this.state.userId, itemId, currentValue)
  }

  // For bulma navbar on mobile/screens < 1000px
  toggleMobileNav = () => {
    this.setState({ displayMenu: !this.state.displayMenu })
  }

  // Determines if user sees landing page
  toggleViewLanding = () => {
    this.setState({ viewLanding: !this.state.viewLanding })
  }

  // sets about page component view based on what state user auth is in and if currently on about page
  toggleViewAboutPage = () => {
    this.toggleMobileNav();
    if (this.state.viewAbout) {

      this.setState(prevState => {
        if (prevState.userId !== '') {
          prevState.viewDetail = true;
          prevState.viewLogin = false;
        } else {
          prevState.viewDetail = false;
          prevState.viewLogin = true;
        }
        prevState.viewAbout = false;
      })

    } else {
      return this.setState({ viewLanding: false, viewLogin: false, viewDetail: false, viewAbout: true })
    }
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
          <ErrorModal
            toggleShowErrorModal={this.toggleShowErrorModal}
            errorMsgs={this.state.errorMsgs}
          />
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
              toggleViewAboutPage={this.toggleViewAboutPage}
              viewAbout={this.state.viewAbout}
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
                null}
            {
              this.state.viewDetail ?
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
                :
                null}
            {this.state.viewAbout ?
              <About />
              :
              null}
          </>
        }
      </div>
    )
  }
}

export default App;