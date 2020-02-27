import firebase from './firebase';

// Firebase database functions
export default {
  // establish connection to user's db through userId path
  getDatabase(userId, cb) {
    if (userId) {
      const itemRef = firebase.database().ref(userId);
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
        cb(newStateItems);
      })
    } else {
      return false;
    }
  },

  // Send new To Do to the db, connection above loads to page on value change
  sendItem(userId, name, description, cb) {
    const itemRef = firebase.database().ref(userId);
    const newItem = {
      name,
      description,
      completed: false
    }
    itemRef.push(newItem);
    cb(true)
  },

  // Delete to do from db, connection loads new list to page on value change
  deleteItem(userId, itemId) {
    const delRef = firebase.database().ref(`${userId}/${itemId}`)
    delRef.remove()
  },

  // Updates to do completed, connection loads change on value change
  updateItem(userId, itemId, currentValue) {
    const updateRef = firebase.database().ref(`${userId}/${itemId}`)
    let update = {};
    update.completed = !currentValue;
    updateRef.update(update)
  }

}