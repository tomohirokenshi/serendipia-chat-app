# Serendipia
Serendipia is a real-time chat application inspired by the word serendipity, which means discovering something good without actively searching for it. This project was created as part of my effort to improve my skills in web development, particularly in building a full-stack web application. I used the MERN stack for this project, which includes MongoDB, Express, React, and Node.js. This allowed me to gain a deeper understanding of backend and server-side development, especially with my first experience using a NoSQL database. <br>

To implement real-time communication, I integrated Socket.IO, which facilitates instant message exchanges between users. Through this project, I have strengthened my knowledge in Express, React, and Node.js while also gaining practical experience in full-stack development.

## Installation Instructions
Follow the steps below to get the project running on your local machine.

**Prerequisites**
Ensure you have the following software installed:
- **Node.js** (v16.x or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** (or use a cloud database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) for database storage
- **Cloudinary** account for image/media storage (optional, if using media uploads)

**1. Clone the Repository** <br>
Start by cloning the project repository to your local machine:
```bash
git clone https://github.com/tomohirokenshi/serendipia-chat-app.git
```

**2. Set Up Environment Variables** <br>
Create a .env file in the backend or root directory of the project and add the following environment variables. These are required for the backend to connect to the database and Cloudinary for file storage.
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

**3. Build the Application** <br>
Run the following command to install dependencies for both frontend and backend as defined in the scripts:
```bash
npm run build
```

**3. Start the Application** <br>
Start the application by simply running the npm start command:
```bash
npm start
```

## Usage

Once the app is running, you can access it via your browser at `https://serendipia-chat-app.onrender.com/` or `http://localhost:5173` if you are working on the development environment. 

- **Create an Account**: Sign up with your email and password.
- **Start a Chat**: After logging in, select a user from the list to begin a conversation. 
- **Group Chat**: You can create a group chat by selecting multiple users.
- **Real-Time Messaging**: Messages will appear instantly as they are sent thanks to Socket.IO.

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
└── package.json # Contains metadata about the project and dependencies <br>

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
.gitignore # Specifies files and directories to be ignored by Git <br>
.package.json # Root package file for managing shared dependencies
