# Serendipia
Serendipia is a real-time chat application inspired by the word serendipity, which means discovering something good without actively searching for it. This project was created as part of my effort to improve my skills in web development, particularly in building a full-stack web application. I used the MERN stack for this project, which includes MongoDB, Express, React, and Node.js. This allowed me to gain a deeper understanding of backend and server-side development, especially with my first experience using a NoSQL database. <br>

To implement real-time communication, I integrated Socket.IO, which facilitates instant message exchanges between users. Through this project, I have strengthened my knowledge in Express, React, and Node.js while also gaining practical experience in full-stack development.

## Project File Structure
This is an overview of the file structure for the project, broken down by the `backend` and `frontend` directories.

### `/frontend`
The frontend directory contains all the client-side code for the React application.

/frontend 
├── /node-modules # Node.js dependencies 
├── /public # Public static assets like images and index.html 
├── /src # Source code for the frontend 
│ ├── /components # React components (UI elements, forms, etc.) 
│ ├── /lib # Utility functions and helper files for frontend 
│ ├── /pages # React components representing different pages/views 
│ ├── /store # Redux or other state management logic 
│ ├── App.jsx # Main React component to render app views 
│ ├── index.css # Global CSS styles 
│ ├── main.jsx # Entry point for the React app 
│ └── ThemeContext.jsx # Context provider for theming and global styles 
├── eslint.config.js # ESLint configuration for JavaScript linting 
├── index.html # Main HTML file served to the browser 
├── package-lock.json # Lock file for consistent dependency versions 
├── package.json # Contains metadata about the project and dependencies 
├── postcss.config.js # PostCSS configuration for CSS transformations 
├── tailwind.config.js # Configuration file for TailwindCSS 
└── vite.config.js # Vite configuration for bundling and dev server setup
