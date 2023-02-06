# PostItMart
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A Social Media Application where Users can create/view/like/comment on posts as well as add Friends with other users. Would also like to implement marketplace section where users can also post Products that they want to sell which would be a different type of post. Users would also be able to search for posts or click categories/tags button to see all posts with those categories/tags.

## Inspiration
Everyone has seen or used Post it notes before, they are so popular because of how easy it is to just jot down something and stick it up. They are used mostly to jot down notes or reminders. But why not quickly jot down how your day went, or something amazing you saw, maybe jot down your shower thoughts that you want to share and go back to, a strange dream you had,  before you forget.  This is an application where users can jot all of these as well as sharing and connecting to the rest of the world. Even stuff sitting around your house you were looking to sell or buy but never got around to it. Just post it here, it's easy, simple, convenient and fast!

## Table of Contents
- [Deployment](#deployment)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Technology](#technology)
- [Credits](#credits)
- [Tests](#tests)
- [Future Development](#future-development)
- [License](#license)

## Deployment
Note - Application still in development
Heroku URL ver.1 - https://postitmart.herokuapp.com/

## Installation
- To install necessary dependencies, run the following commands:
npm i OR npm install

- Note that the herokuapp deployment would have the dependencies pre-installed

## Usage
- Visit the deployed application to use.
- Users are directed to the Home page of the application where users can see all the posts made. User then can then login/signup. Signed up users are able to access the sidebar, where they can update their profile, create posts or search and add friends. They can click on the post image to view the post by itself or they can click on the author to view their profile page.

- Backend (Run application locally)
  - To run the application in local, type 'npm install' in the terminal to install all dependencies.
  - After you can run 'npm build' then 'npm run develop' to start development server or 'npm start' to start application

## Demo
![](./client/src/images/screenshot1.png)
![](./client/src/images/screenshot2.png)
![](./client/src/images/screenshot3.png)

## Technology
- MERN Stack (MongoDb,Express.js,React,Node.js)
- Javascript
- CSS
- Project management (Kaban board)
- npm packages/dependencies in server side includes: 
  - apollo-server-express
  - bcrypt
  - body-parser
  - cloudinary
  - dontenv
  - cors
  - express
  - graphql
  - graphql-scalars
  - jsonwebtoken
  - mongoose
- npm packages/dependencies in client side includes:
  - @apollo/client
  - axios
  - bootstrap
  - graphql
  - jwt-decode
  - react
  - react-bootstrap
  - react-dom
  - react-image-file-resizer
  - react-router-dom

## Tests
- No Tests available
- Mutations/Queries tested via apollo sandbox

## Future development
- Marketplace section, where users can post products as well, with description.
- Friends functionality
- Categories/Tag buttons, linking posts/products to categories/tags
- Commenting/Liking posts and have a count

## License
- This project is licensed under MIT license.



