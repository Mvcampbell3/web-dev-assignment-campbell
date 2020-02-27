# To Do App

[Delployed Site](https://to-do-firebase.netlify.com)

| Use            | Technology                 |
| -------------- | -------------------------- |
| Authentication | Firebase Authentication    |
| Database       | Firebase Realtime Database |
| SPA            | React                      |
| CSS Framework  | Bulma                      |
| Hosting        | Netlify                    |

## About the application

This website is a to-do application which uses firebase authentication to save and store a user's email address, username, and password. This creates a unique user ID which is used to set up the user's branch in the Firebase realtime database. Doing this ensures that only the user with correct ID can see their to-do branch, and maintains the flattened database structure firebase recommends using.

The React js library is used to dynamically display data from the database to the browser when the state changes. One of the advantages of using an SPA like React with firebase is setting up root level listeners on the database, making use of the realtime connection.

Bulma was added to the project for a modern website look that is quick to set up. Most of the styling uses a custom grid layout, but the color scheme and input areas make use of Bulma classes and styles.

## Future Considerations

If I were to devote more time to this application, my main focus would be on adding the ability for users to share to-do lists with other users. I would accomplish this by adding a layer to the database branch which can use it's key to be accessed by other users given they:

1. Are invited to join the list. (i.e. know the key)
2. Know the password for the branch, which will be set by the owner of the list.

Another focus would be adding a time component to the to-do list. Having a time-based to-do list would help keep track of the order of the lists. By using something like Moment.js, it would make setting the list's time-zone according to the user's preference and displaying the time in a proper format much more manageable.

Finally, I would like to add multiple lists that are project-based. I think having multiple lists for different areas of concern help to keep things organized.
