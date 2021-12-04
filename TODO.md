## Chat room task

## Actual TODO`s

- [ ] Add connected/disconnected events:
  - [ ] Add `user_connected` event and send to all connected users.
  - [ ] On an `user_connected` the client will add it to the connected list
  - [ ] Add `user_disconnected` event and send to all connected users .
  - [ ] On an `user_disconnected` the client will remove it from the connected list
- [ ] Add 2 "static" routes:
  - [ ] Connected -> all connected users
  - [ ] Messages -> all messages history

### Requirements:

- [x] Create a login screen and a chat screen
- [x] The login screen Will contain an entry form (asking only for username is the minimum requirement - look at the bonus section to see more options).
- [x] The chat screen Will contain the chat.
- [x] Use React-router to enable switching between login screen and chat screen
- [ ] After a user login, an event is sent to the server for initial connection and this message is published to all other participants.
- [ ] When a user disconnect the server will send a disconnection event that will inform all participants.

#### Chat screen

- [x] Text writing area.
- [ ] Area of ​​previous messages (like chat on WhatsApp).
- [ ] Updated list of participants (like zoom).

- [x] When a message is sent from one of the participants it will reach the server and be published live to all those users who are currently connected to the server
- [ ] When a participant enters or leaves the chat room (his connection to the server is terminated) the server will update the other participants with a message (as in WhatsApp)
- [x] Messages coming from the server will be displayed in the designated area with the time they were sent and the name of the author.

#### Login screen

- [x] Create a form for user input
- [x] The minimum requirement is to take a username, in the bonus section you can see more complex ways.

### Bonus:

- [x] Use jwt To assign a token to a user.
- [x] Create auth middleware and check the token before you allow the user to enter the chat room
- [ ] Use private route to redirect a user without a valid token.

- [ ] When a user enters a chat room he will get the message history of the room.
- [ ] Clicking on a username sends a message only to it specifically
- [ ] Gray V when the message successfully reached the server. 2 gray V when the message reached all participants.
- [ ] create different rooms and option to be admin of a room.
