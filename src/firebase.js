import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBOPHhwnl2H7LOdWEaSp5jzcrLRs45aKx8",
  authDomain: "web-dev-assignment-campbell.firebaseapp.com",
  databaseURL: "https://web-dev-assignment-campbell.firebaseio.com",
  projectId: "web-dev-assignment-campbell",
  storageBucket: "web-dev-assignment-campbell.appspot.com",
  messagingSenderId: "975942719485",
  appId: "1:975942719485:web:8f90274d8f7be27e1feb94",
  measurementId: "G-1GH8KCQ2GY"
};

firebase.initializeApp(config);

export default firebase;