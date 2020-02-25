import React, { Component } from 'react'
import './App.css'
import firebase from './firebase';

class App extends Component {

  state = {
    list: [],
    nameInput: '',
    descriptionInput: ''
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
      } else {
        // not signed in/up
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

  handleInput(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <input type="text" name='nameInput' className='input' placeholder='Enter name' value={this.state.nameInput} onChange={(e) => this.handleInput(e)} />
        <input type="text" name='descriptionInput' className='input' placeholder='Enter description' value={this.state.descriptionInput} onChange={(e) => this.handleInput(e)} />
        <button className="button is-info" onClick={this.sendItem}>Add Item</button>
      </div>
    );
  }
}

export default App;