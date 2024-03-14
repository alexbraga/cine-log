<h1 align="center">
  <a href="https://cinelog-js.netlify.app">Cine.log</a>
</h1>

<h3 align="center">
    Keep a diary of watched movies, give ratings and add your own reviews
</h3>

<p align="center">
  <a href="https://github.com/alexbraga/cine-log/commits/master"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexbraga/cine-log"></a>
  <a href="https://github.com/alexbraga/cine-log/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/alexbraga/cine-log?label=license"></a>
  <a href="https://cinelog-js.netlify.app"><img alt="Netlify build status" src="https://api.netlify.com/api/v1/badges/0f5b8b92-8899-4edc-aa0f-2501f0ef21be/deploy-status"></a>
</p>

<h4 align="center">
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#todo">Todo</a> •
 <!-- <a href="#screenshots">Screenshots</a> • -->
 <a href="#how-it-works">How it works</a> •
 <a href="#tech-stack">Tech Stack</a> •
 <a href="#how-to-contribute">How to contribute</a> •
 <a href="#author">Author</a> •
 <a href="#license">License</a>

</p>

## About

<p align="justify">Cine.log is a lightweight Web App with fully responsive layout focused on keeping track of watched movies alongside with other records, like ratings, reviews and watch count. It's built with MERN stack, with a RESTful API and using a front-end almost entirely developed with Material UI library.

Available at <a href="https://cinelog-js.netlify.app">https://cinelog-js.netlify.app</a></p>

---

## Features

- Authentication with e-mail and password or via Google OAuth 2.0
- Password resetting
- RESTful API
- JWT based protection for API endpoints
- Access token and refresh token delivering
- Movie searching (data provided by TMDb)
- Access to movie info (data provided by TMDb)
- Movie list sorting and filtering
- Save/edit ratings and reviews
- Edit user info and password change

---

## Todo

- [ ] E-mail validation
- [ ] Create custom movie lists
- [ ] Dashboard with insights on user behavior

---

<!-- ## Screenshots

### Mobile

<img src="https://github.com/alexbraga/cine-log/blob/master/screenshots/screenshot-sm.png?raw=true" alt="Mobile screen" width="350" />

### Medium screen

<img src="https://github.com/alexbraga/cine-log/blob/master/screenshots/screenshot-md.png?raw=true" alt="Medium screen" width="450" />

### Large screen

<img src="https://github.com/alexbraga/cine-log/blob/master/screenshots/screenshot-lg.png?raw=true" alt="Large screen" width="650" />

--- -->

## How it works

1. <a href="#pre-requisites">Pre-requisites</a>
2. <a href="#clone-this-repository">Clone this repository</a>
3. <a href="#set-the-environment-variables">Set the environment variables</a>
4. <a href="#running-the-back-end">Run the back-end server</a>
5. <a href="#running-the-front-end">Run the front-end server</a>

### Pre-requisites

Before getting started, you'll need to have the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [npm](https://npmjs.com)
- [MongoDB](https://www.mongodb.com/try/download/community)

In addition, you'll need to register a [free] accout at [SendGrid](https://sendgrid.com/) and [TMDb](https://developers.themoviedb.org/3/getting-started/introduction) as well. You might also want an editor to work with the code, like
[VS Code](https://code.visualstudio.com/).

#### Clone this repository

```bash
$ git clone https://github.com/alexbraga/cine-log.git
```

#### Set the environment variables

- Create a `.env` file at the root of both `client/` and `server/` folders, and place the following in each, with their respective values:

**Front-end** (`client/.env`)

```
#Environment
NODE_ENV=

#App URLs
REACT_APP_CLIENT_URL_DEV=
REACT_APP_CLIENT_URL_PROD=
REACT_APP_SERVER_URL_DEV=
REACT_APP_SERVER_URL_PROD=

#Google
REACT_APP_GOOGLE_CLIENT_ID=
```

**Back-end** (`server/.env`)

```
#Environment
NODE_ENV=

#Database
MONGO_URI_DEV=
MONGO_URI_PROD=

#TMDb
TMDB_API_KEY=

#SendGrid
SENDGRID_API_KEY=
FROM_EMAIL=

#App URLs
CLIENT_URL_DEV=
CLIENT_URL_PROD=
SERVER_URL_DEV=
SERVER_URL_PROD=

#JWT
JWT_SECRET=
REFRESH_JWT_SECRET=

#Google
GOOGLE_CLIENT_ID=
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

<!-- #### API Endpoints

- List all diary entries:

  - `GET` `/diary` -->

#### Running the Front-end

```bash
# Go to the client folder
$ cd cine-log/client

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm start

# The application will automatically open on your browser at port 3000
```

---

## Tech Stack

The following tools were used in the construction of the project:

### **Front-end**

#### **Language**

- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**

#### **Dependencies**

- **[Axios](https://axios-http.com/)**
- **[Date-fns](https://date-fns.org/)**
- **[dayjs](https://www.npmjs.com/package/dayjs)**
- **[Material UI](https://mui.com)**
- **[React](https://react.dev/)**
- **[react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)**
- **[React Router v6](https://reactrouter.com/)**
- **[React Scripts](https://www.npmjs.com/package/react-scripts)**
- **[React Strap](https://www.npmjs.com/package/reactstrap)**
- **[React Table](https://react-table.tanstack.com/)**

> See the file
> [package.json](https://github.com/alexbraga/cine-log/master/client/package.json)

### **Back-end**

#### **Language**

- **[NodeJS](https://nodejs.org/en/)**

#### **Framework**

- **[Express](https://expressjs.com/)**

#### **Dependencies**

- **[Axios](https://axios-http.com/)**
- **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[dotENV](https://github.com/motdotla/dotenv)**
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
2. Create a new branch with your changes:

```
git checkout -b my-amazing-feature
```

3. Save your changes and create a commit message (in present tense) telling what you did:

```
git commit -m "Add my amazing feature"
```

4. Submit your changes:

```
git push origin my-amazing-feature
```

5. Create a pull request

- At the moment, any help with making the app fully accessible for visually impaired people will be very much appreciated.

---

## Author

<h4>Alexandre Braga</h4>

<div>
<a href="https://www.linkedin.com/in/alexgbraga/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white" alt="LinkedIn"></a>&nbsp;
<a href="mailto:contato@alexbraga.com.br" target="_blank"><img src="https://img.shields.io/badge/-email-c14438?style=for-the-badge&logo=Gmail&logoColor=white" alt="E-Mail"></a>
</div>

---

## License

This project is under the [MIT License](./LICENSE).
