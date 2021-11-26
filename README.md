# Connectify (Full stack NextJS social media app)

<strong>Website live at : [here](https://connectify-socialmedia.herokuapp.com/)</strong>

## API Documentation

| Type   | Route                                   | Access  | Description                                                                                            |
| ------ | --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| GET    | /api/auth/user/:username                | Public  | Return success if username is unique                                                                   |
| POST   | /api/auth/signup                        | Public  | If all the fields are valid then the user is added to the database and a success response is sent back |
| POST   | /api/auth/login                         | Public  | If the user is already signed up then it sends a success code and a JWT Token                          |
| POST   | /api/auth/user                          | Private | If the user is valid then it returns user and user follow stats                                        |
| GET    | /api/notifications                      | Private | Returns all the notifications if the user is valid                                                     |
| POST   | /api/notifications                      | Private | Changes the unread notifications to false and send a success response if user is valid                 |
| POST   | /api/posts                              | Private | Adds a new post to the database if the user and all post details is valid and return the new post      |
| GET    | /api/posts/explore                      | Private | Returns all the posts by all the users in descending order of created time                             |
| GET    | /api/posts/feed                         | Private | Returns all the posts by the people whom the user is following                                         |
| DELETE | /api/posts/:postId                      | Private | Deletes the post and return the success code                                                           |
| POST   | /api/posts/like/:postId                 | Private | Adds a like by the user to the post and return a sucess code                                           |
| POST   | /api/posts/unlike/:postId               | Private | Removes the like by the user (if any)                                                                  |
| GET    | /api/posts/like/:postId                 | Private | Gets all the likes on the post                                                                         |
| POST   | /api/posts/comment/:postId              | Private | Adds a comment by the user to the desired post                                                         |
| DELETE | /api/posts/comment/:postId/:commentId   | Private | Deletes the specific comment made by the user                                                          |
| GET    | /api/profile/:username                  | Private | Returns the profile as per the username param                                                          |
| GET    | /api/profile/posts/:username            | Private | Returns all the posts by the username                                                                  |
| GET    | /api/profile/followers/:userId          | Private | Returns all the followers of the user                                                                  |
| GET    | /api/profile/following/:userId          | Private | Returns all the people user is following                                                               |
| POST   | /api/profile/follow/:userToFollowId     | Private | Adds userToFollow to the following of user and user to followers of userToFollow                       |
| POST   | /api/profile/unfollow/:userToUnFollowId | Private | Removes userToUnFollow from the following of user and user from followers of userToUnFollow            |
| POST   | /api/profile/update                     | Private | Updates user name, bio and profile picture                                                             |
| POST   | /api/profile/settings/password          | Private | Updates user password                                                                                  |
| GET    | /api/reset                              | Public  | Mails a reset token to the user                                                                        |
| POST   | /api/reset                              | Public  | Validates the reset token and updates the user password                                                |
| GET    | /api/search/:username                   | Private | Sends all the username which have a prefix the username param                                          |
