# Connectify (Full stack NextJS social media app)

<strong>Website live at : [here](https://connectify-socialmedia.herokuapp.com/)</strong>

## Tech Stack used

1. **NextJS** for server side rendering react app
2. **Express** middleware on the backened to handle routes and requests
3. **Mongoose** for the database schema and performing operations
4. **MongoDB** used as a database
5. **Bootstrap** for front-end styling
6. **nookies and js-cookies** for storing tokens in cookies

## Features

1. Users can post and also like and comment on posts
2. SEO friendly (thanks to NextJs :P)
3. Users can follow others. Their following and followers count is also visible
4. Users can reset password through email OTP service
5. Users are notified when someone likes or comments on their post or when someone follows them
6. Users can edit their profile details from profile page

## Future plans

- [ ] Add a stories section
- [ ] Add more colors to the front end (It's pretty black and white now )

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

## Found a bug 🐛

Raise an issue. I'll try to fix it as soon as possible

## Install this project

```bash
git clone https://github.com/Avash027/connectify.git
```

To install all dependencies

```bash
npm install
```

Now create a .env file in the root directory

```
MONGO_URI = (Database URL provided by the MonogDB atlas)
SECRET_KEY = (For JWT Authentication)
NODE_ENV = (production/deployment as per the use)
MAIL_KEY = (Secret key provided by sendgrid)
```

To run this project locally

```bash
npm run start
```

## Some relevant links of the tool I have used in the project

1. [NextJS](https://nextjs.org/docs/getting-started)
2. [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
3. [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
4. [Express](https://expressjs.com/)
5. [Mongoose](https://mongoosejs.com/docs/)
6. [MongoDB](https://docs.mongodb.com/)
7. [NodeJS](https://nodejs.org/en/docs/)

## Authors

- [@Avash Mitra](https://github.com/Avash027)
