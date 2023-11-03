## Project Title
- Blog App


## Project Introduction
- It is a service for friends, family, and coworkers to communicate and stay connected through the exchange of quick, frequent messages. 
- People post messages, which may contain photos, videos, links, and text. 
- These messages are posted to your profile, sent to your followers, and are searchable.

## User Requirements 
- User posts a tweet
  Service pushes tweets to followers, sending push notifications
- User views the user timeline (activity from the user)
- User views the home timeline (activity from people the user is following)
- User searches keywords


## Basic domain model

![image](https://user-images.githubusercontent.com/98194136/206017890-52f37b07-8ae4-4512-88ca-feea0496b42a.png)


# Blog-clone

blog-clone is the front-end.

## Tech Stack

- ReactJS
- SCSS
- Semantic-UI
- Eslint & Prettier

## Setup

Start server(blog-clone-api) before start the front-end.

```
1. git clone this repository
2. cd blog-clone
3. npm install
4. npm start
```

### To enable automated code formatting, extra extensions need to be installed in  VS  Code  --- Eslint & Prettier. Costomized style rules could be added in .eslintrc.json.



# Blog-clone-api

blog-clone-api is the back-end for blog-clone.

## Tech Stack

- Node.js
- Expressjs
- MongoDB
- Mongoose
- JSON Web Tokens liarary
- cloudinary

## Setup

Create a database in MongoDB.

Create an account on cloudinary for storing user images, put cloud information in .env file.

```
MONGO_URI=<mongodb url>
JWT_SECRET=<jwt secret>
CLOUD_NAME=<your cloud name>
CLOUDINARY_API_KEY=<your cloud api key>
CLOUDINARY_SECRET=<your cloud secret?
```

Run the server

```
1. git clone this repository
2. cd blog-clone-api
3. npm install
4. npm start
```
