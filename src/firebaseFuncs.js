import firebase from './firebase';

export default {
  getDatabase(userId, cb) {
    if (userId) {
      const itemRef = firebase.database().ref(userId);

      itemRef.on('value', snapshot => {
        const items = snapshot.val()
        console.log(items)
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
        cb(newStateItems);
      })

    } else {
      return false;
    }
  }

}