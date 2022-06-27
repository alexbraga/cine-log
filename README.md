<h1 align="center">
  <a href="https://cine-log.herokuapp.com">Cine.log </a>
</h1>

<h3 align="center">
    Keep a diary of watched movies, give ratings and add your reviews
</h3>

<p align="center">
  <a href="https://github.com/alexbraga/cine-log/commits/master"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexbraga/cine-log"></a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/alexbraga/cine-log">
  <a href="https://github.com/alexbraga/cine-log/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/alexbraga/cine-log?label=license"></a>
  <a href="https://cine-log.herokuapp.com"><img alt="App URL" src="https://img.shields.io/badge/heroku-app-%237159c1?style=flat&logo=heroku"></a>
</p>

<h4 align="center">
	 Status: Deployed
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#how-it-works">How it works</a> •
 <a href="#tech-stack">Tech Stack</a> •
 <a href="#how-to-contribute">How to contribute</a> •
 <a href="#author">Author</a> •
 <a href="#license">License</a>

</p>

## About

<p align="justify">Cine.log is a simple and lightweight Web App with fully responsive layout focused on keeping track of watched movies alongside with other records, like ratings, reviews and watch count. It's built with MERN stack, with a RESTful API and using a front-end almost entirely developed with Material UI library.</p>

---

## Features

- [x] Authentication with e-mail and password or via Google OAuth 2.0
- [x] Password resetting
- [x] RESTful API
- [x] JWT based protection for API endpoints
- [x] Access token and refresh token delivering
- [x] Movie searching (data provided by TMDb)
- [x] Access to movie info (data provided by TMDb)
- [x] Movie list sorting and filtering
- [x] Save/edit ratings and reviews
- [x] Edit user info and password change
- [ ] E-mail validation
- [ ] Create custom movie lists
- [ ] Dashboard with insights on user behavior

---

## How it works

This project is divided into two parts:

1. Back-end (`/server` folder)
2. Front-end (`/client` folder)

### Pre-requisites

Before you begin, you will need to have the following tools installed on your
machine: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and
[MongoDB](https://www.mongodb.com/try/download/community). In addition, you
might also want an editor to work with the code, like
[VS Code](https://code.visualstudio.com/).

#### Clone this repository

```bash
$ git clone https://github.com/alexbraga/cine-log.git
```

#### Running the Back-end

```bash

# Go to the server folder
$ cd cine-log/server

# Install the dependencies
$ npm install

# Run the application in development mode
$ node server.js

# The server will start at port 5000

```

#### Running the Front-end

```bash

# Go to the client folder
$ cd cine-log/client

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm start

# The application will automatically open on browser at port 3000

```

---

## Tech Stack

The following tools were used in the construction of the project:

#### **Front-end** ([React](https://reactjs.org/))

- **[Axios](https://axios-http.com/)**
- **[Date-fns](https://date-fns.org/)**
- **[Material UI](https://mui.com)**
- **[React Google Login](https://www.npmjs.com/package/react-google-login)**
- **[React Router v6](https://reactrouter.com/)**
- **[React Scripts](https://www.npmjs.com/package/react-scripts)**
- **[React Strap](https://www.npmjs.com/package/reactstrap)**
- **[React Table](https://react-table.tanstack.com/)**

> See the file
> [package.json](https://github.com/alexbraga/cine-log/master/client/package.json)

#### **Server** ([NodeJS](https://nodejs.org/en/))

- **[Axios](https://axios-http.com/)**
- **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[dotENV](https://github.com/motdotla/dotenv)**
- **[Express](https://expressjs.com/)**
- **[Google Auth Library](https://www.npmjs.com/package/google-auth-library)**
- **[JWT](https://github.com/auth0/node-jsonwebtoken)**
- **[Mongoose](https://mongoosejs.com/)**
- **[Passport](https://www.passportjs.org/)**
- **[Passport JWT](https://www.passportjs.org/packages/passport-jwt/)**
- **[Passport Local Mongoose](https://www.npmjs.com/package/passport-local-mongoose)**
- **[SendGrid](https://sendgrid.com/)**

> See the file
> [package.json](https://github.com/alexbraga/cine-log/master/server/package.json)

#### **Utilities**

- External API:
  **[TMDb](https://developers.themoviedb.org/3/getting-started/introduction)**
- API Testing: **[Postman](https://postman.com)**
- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**
- Font: **[Montserrat](https://fonts.google.com/specimen/Montserrat)**

---

## How to contribute

1. Fork the project
2. Create a new branch with your changes: `git checkout -b my-amazing-feature`
3. Save your changes and create a commit message (in present tense) telling what
   you did: `git commit -m "Add my-amazing-feature"`
4. Submit your changes: `git push origin my-feature`

<p>At the moment any help with making the app fully accessible for visually impaired people will be very much appreciated.</p>

---

## Author

<p>Alexandre Braga</p>

[![Twitter Badge](https://img.shields.io/badge/-@_alex_braga-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white)](https://twitter.com/_alex_braga)
[![Linkedin Badge](https://img.shields.io/badge/-Alexandre%20Braga-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/alexgbraga/)
[![Gmail Badge](https://img.shields.io/badge/-contato@alexbraga.com.br-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:contato@alexbraga.com.br)

---

## License

This project is under the [MIT License](./LICENSE).
