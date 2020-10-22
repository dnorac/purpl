# Purpl

## Set up

1. Duplicate the `.env.example` file in your `backend` folder and rename it to `.env`
2. Update the `MONGOURI` key to use your own MongoDB server.

## Starting the development server

In the root directory, you can run:

### `npm start`

Runs both the backend and frontend of the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### Technologies used

##### Frontend

- [React.js](http://reactjs.org/) - Front-end JavaScript library for building user interfaces.
- [Redux](https://redux.js.org/) - Manage global state of your application.
  - [React-Redux](https://react-redux.js.org/) - Can't live without `useDispatcher` & `useSelector`
  - [Redux Toolkit](https://redux-toolkit.js.org/) - Redux batteries-included.
    - [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Great for writing asynchronous actions
    - [Immer](https://immerjs.github.io/) - Write reducers as if you could mutate `state`
- [React Hook Form](https://react-hook-form.com/) - Great form state management (quit `useState` and `setState`) & validation.
- [Semantic UI React](https://react.semantic-ui.com/) - Beautiful UI Library
- [Axios](https://github.com/axios/axios) - Easier than Fetch API
- [node-sass](https://github.com/sass/node-sass) - Can't live without SASS anymore.
- [React Helmet](https://github.com/nfl/react-helmet) - Change the `header` tag dynamically in React.

##### Backend

- [Express](http://expressjs.com/) - A high-level and simple HTTP Server for Node.js
  - [Helmet]() - Secure Express headers
- [dotenv](https://github.com/motdotla/dotenv) - Load environment variables from `.env` files.
- [Mongoose](https://mongoosejs.com/) - Allows creating schemas and models (with validation) to operate on your MongoDB documents.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Create and Sign JSON Web Tokens for token-based authentication
- [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse the `Cookie` header and populate `req.cookies`.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Used for hashing passwords
- [nodemon](https://github.com/remy/nodemon) - Restart the node application when files change

##### Integration

- [Concurrently](https://github.com/kimmobrunfeldt/concurrently) - Run multiple commands concurrently.
