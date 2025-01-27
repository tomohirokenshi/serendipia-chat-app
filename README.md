# Serendipia
Serendipia is a real-time chat application inspired by the word serendipity, which means discovering something good without actively searching for it. This project was created as part of my effort to improve my skills in web development, particularly in building a full-stack web application. I used the MERN stack for this project, which includes MongoDB, Express, React, and Node.js. This allowed me to gain a deeper understanding of backend and server-side development, especially with my first experience using a NoSQL database. <br>

To implement real-time communication, I integrated Socket.IO, which facilitates instant message exchanges between users. Through this project, I have strengthened my knowledge in Express, React, and Node.js while also gaining practical experience in full-stack development.

## Project File Structure
This is an overview of the file structure for the project, broken down by the `backend` and `frontend` directories.

### `/backend`
The backend directory contains all the server-side code, including controllers, routes, models, middleware, and other utilities.

/backend <br>
├── /node-modules # Node.js dependencies <br>
├── /src # Source code for the backend <br>
│ ├── /controllers # Logic for handling incoming requests <br>
│ ├── /lib # Utility functions and helper files <br>
│ ├── /middleware # Custom middleware for request processing <br>
│ ├── /models # Mongoose models for MongoDB collections <br>
│ ├── /routes # API endpoint definitions <br>
│ ├── /seeds # Sample data to seed the database <br>
│ └── index.js # Entry point for the backend server <br>
├── .env # Environment variables (e.g., DB credentials, ports) <br>
├── package-lock.json # Lock file for consistent dependency versions <br>
├── package.json # Contains metadata about the project and dependencies <br>

### `/frontend`
The frontend directory contains all the client-side code for the React application.

/frontend <br>
├── /node-modules # Node.js dependencies <br>
├── /public # Public static assets like images and index.html <br>
├── /src # Source code for the frontend <br>
│ ├── /components # React components (UI elements, forms, etc.) <br>
│ ├── /lib # Utility functions and helper files for frontend <br>
│ ├── /pages # React components representing different pages/views <br>
│ ├── /store # Redux or other state management logic <br>
│ ├── App.jsx # Main React component to render app views <br>
│ ├── index.css # Global CSS styles <br>
│ ├── main.jsx # Entry point for the React app <br>
│ └── ThemeContext.jsx # Context provider for theming and global styles <br>
├── eslint.config.js # ESLint configuration for JavaScript linting <br>
├── index.html # Main HTML file served to the browser <br>
├── package-lock.json # Lock file for consistent dependency versions <br>
├── package.json # Contains metadata about the project and dependencies <br>
├── postcss.config.js # PostCSS configuration for CSS transformations <br>
├── tailwind.config.js # Configuration file for TailwindCSS <br>
└── vite.config.js # Vite configuration for bundling and dev server setup <br>
<br>
.gitignore # Specifies files and directories to be ignored by Git <br>
.package.json # Root package file for managing shared dependencies (if applicable)
