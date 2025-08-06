# Purpl

A modern social posting platform built with React.js and Express.js, featuring user authentication, posts management, and a beautiful UI.

## Features

- 🔐 **User Authentication**: JWT-based login/register system
- 📝 **Posts Management**: Create, read, update, delete posts with form validation
- 👥 **User Profiles**: View user profiles and manage your own
- 🎨 **Modern UI**: Built with Semantic UI React for a beautiful, responsive design
- 🔒 **Security**: Secure Express.js backend with Helmet, bcrypt password hashing
- 📱 **Responsive**: Mobile-friendly design that works on all devices

## Set up

1. Duplicate the `.env.example` file in your `backend` folder and rename it to `.env`
2. Update the `MONGOURI` key to use your own MongoDB server
3. Set a secure `SECRET` key for JWT token signing
4. Optionally set `DOMAIN` and `PORT` environment variables

## Starting the development server

In the root directory, you can run:

### `npm start`

Runs both the backend and frontend of the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/logout` - User logout
- `GET /api/checkToken` - Verify authentication
- `POST /api/updateProfile` - Update user profile

### Posts

- `GET /api/posts` - Get all visible posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth + ownership required)
- `DELETE /api/posts/:id` - Delete post (auth + ownership required)

### Users

- `GET /api/users` - Get all users

#### Technologies used

##### Frontend

- [React.js](http://reactjs.org/) (^18.3.1) - Front-end JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - Manage global state of your application
  - [React-Redux](https://react-redux.js.org/) (^9.1.2) - Can't live without `useDispatch` & `useSelector`
  - [Redux Toolkit](https://redux-toolkit.js.org/) (^2.2.7) - Redux batteries-included with modern patterns
    - Built-in Redux Thunk for asynchronous actions
    - [Immer](https://immerjs.github.io/) - Write reducers as if you could mutate `state`
- [React Router](https://reactrouter.com/) (^6.26.0) - Declarative routing for React applications
- [React Hook Form](https://react-hook-form.com/) (^7.52.2) - Performant forms with easy validation
- [Semantic UI React](https://react.semantic-ui.com/) (^2.1.5) - Beautiful UI component library
- [React Helmet](https://github.com/nfl/react-helmet) (^6.1.0) - Dynamic `<head>` tag management
- [Axios](https://github.com/axios/axios) (^1.7.3) - Promise-based HTTP client
- [Sass](https://github.com/sass/sass) (^1.77.8) - CSS preprocessor (replaced node-sass)
- [Vite](https://vitejs.dev/) (^7.0.6) - Fast build tool with HMR and modern bundling

##### Backend

- [Express](http://expressjs.com/) (^4.19.2) - Fast, unopinionated web framework for Node.js
  - [Helmet](https://helmetjs.github.io/) (^7.1.0) - Secure Express apps with various HTTP headers
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (^8.5.2) - Database and ODM for data modeling
- [JWT](https://github.com/auth0/node-jsonwebtoken) (^9.0.2) - JSON Web Token implementation
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) (^5.1.1) - Password hashing function
- [cookie-parser](https://github.com/expressjs/cookie-parser) (^1.4.6) - Parse HTTP cookies
- [dotenv](https://github.com/motdotla/dotenv) (^16.4.5) - Load environment variables
- [@faker-js/faker](https://fakerjs.dev/) (^8.4.1) - Generate fake data for testing
- [nanoid](https://github.com/ai/nanoid) (^5.0.7) - URL-safe unique string ID generator
- [nodemon](https://github.com/remy/nodemon) (^3.1.4) - Development server auto-restart

##### Build & Development Tools

- [Concurrently](https://github.com/open-cli-tools/concurrently) (^8.2.2) - Run multiple commands concurrently
- [ESLint](https://eslint.org/) (^9.8.0) - JavaScript/React linting
- [Prettier](https://prettier.io/) (^3.3.3) - Code formatting

## Project Structure

```
purpl/
├── frontend/           # React.js application
│   ├── src/
│   │   ├── app/        # Redux store and navigation
│   │   ├── features/   # Feature-based components
│   │   │   ├── posts/  # Posts management
│   │   │   ├── user/   # User authentication
│   │   │   └── users/  # Users management
│   │   └── utils/      # Helper functions
│   └── public/         # Static assets
├── backend/            # Express.js API server
│   └── src/
│       ├── config/     # Database configuration
│       ├── login/      # Authentication routes
│       ├── posts/      # Posts API endpoints
│       └── users/      # Users API endpoints
└── package.json        # Root scripts and tools
```

## Recent Updates (2025)

This project has been fully modernized with the latest versions of all dependencies:

### Major Migrations Completed

- ✅ **Python 2 Elimination**: Replaced `node-sass` with `sass`
- ✅ **React 18**: Updated from React 17 with new createRoot API
- ✅ **React Router v6**: Migrated from v5 with modern routing patterns
- ✅ **React Hook Form v7**: Updated form handling with Controller patterns
- ✅ **Redux Toolkit 2.2**: Modern Redux with extraReducers builder pattern
- ✅ **Mongoose 8**: Updated MongoDB integration with latest features
- ✅ **Complete Posts API**: Full CRUD operations with authentication
- ✅ **Security Updates**: Latest Helmet, bcrypt, JWT implementations

### New Features Added

- 🆕 **Full Posts Backend**: Complete Express.js API with MongoDB integration
- 🆕 **Form Validation**: React Hook Form integration with error handling
- 🆕 **Authentication Middleware**: JWT-based route protection
- 🆕 **Error Handling**: Comprehensive error states and user feedback
- 🆕 **Loading States**: Better UX with loading indicators

## Development

### Prerequisites

- Node.js (v16 or higher recommended)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/danielnora/purpl.git
   cd purpl
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set up environment variables**

   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your MongoDB URI and JWT secret
   ```

4. **Start development servers**
   ```bash
   npm start
   ```

### Environment Variables

Create a `backend/.env` file with:

```env
MONGOURI=mongodb://localhost:27017/purpl
SECRET=your-jwt-secret-key
DOMAIN=http://localhost
PORT=3001
```

### Scripts

- `npm start` - Run both frontend and backend concurrently
- `cd frontend && npm start` - Run frontend with Vite dev server (port 3000)
- `cd frontend && npm run dev` - Alternative command for Vite dev server
- `cd backend && npm start` - Run backend only (port 3001)
- `cd frontend && npm run build` - Build frontend for production
- `cd frontend && npm run preview` - Preview production build locally

## Recent Updates

### 🚀 Migration to Modern Build System (2024)

- ✅ **Migrated from CRACO to Vite**: Faster development server with Hot Module Replacement (HMR)
- ✅ **Dependency Cleanup**: Removed unused testing dependencies and React Quill imports
- ✅ **JSX File Extensions**: Properly structured component files with `.jsx` extensions
- ✅ **Semantic UI CSS**: Switched from LESS to CSS distribution for better compatibility
- ✅ **Updated Dependencies**: All packages updated to latest stable versions

### Performance Improvements

- **Development**: ~10x faster dev server startup with Vite
- **Build**: Optimized production builds with modern bundling
- **Hot Reload**: Instant component updates without full page refresh

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.
