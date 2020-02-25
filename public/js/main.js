var firebaseConfig = {
  apiKey: "AIzaSyBOPHhwnl2H7LOdWEaSp5jzcrLRs45aKx8",
  authDomain: "web-dev-assignment-campbell.firebaseapp.com",
  databaseURL: "https://web-dev-assignment-campbell.firebaseio.com",
  projectId: "web-dev-assignment-campbell",
  storageBucket: "web-dev-assignment-campbell.appspot.com",
  messagingSenderId: "975942719485",
  appId: "1:975942719485:web:8f90274d8f7be27e1feb94",
  measurementId: "G-1GH8KCQ2GY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const authUser = firebase.auth()


const testUser = {
  email: 'mvcampbell3@gmail.com',
  password: 'test123'
}

const signOutBtn = document.getElementById('signOutBtn');

// Event Listener on firebase.auth for change in user status

// Have a signedUp boolean that will update user display name with username if they signed up for the first time

authUser.onAuthStateChanged(user => {
  console.log(user)
  if (user === null) {
    console.log('need to auth user');
  } else {
    console.log('user is already signed up')
  }
});


function loginUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      console.log(err)
    });
}

function createUser(username, email, password) {
  firebase.auth().signInWithEmailAndPassword(testUser.email, testUser.password)
    .catch((err) => {
      console.log(err)
    });
}

// Sign Out Button Event Listener
signOutBtn.addEventListener('click', function() {
  authUser.signOut()
    .then(() => {
      console.log('signed out')
    })
    .catch(err => {
      console.log(err)
    })
})
