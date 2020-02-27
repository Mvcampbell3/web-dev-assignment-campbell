import firebase from './firebase';

export default {
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

  sendItem(userId, name, description, cb) {
    const itemRef = firebase.database().ref(userId);
    const newItem = {
      name,
      description,
      completed: false
    }
    itemRef.push(newItem);
    cb(true)
  }

}