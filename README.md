                                                Facial Recognition Login System README
About-
This Facial Recognition Login System is a full-stack web application designed to showcase a secure authentication method using facial recognition technology. It utilizes React.js for the frontend, Express.js for the backend, MongoDB for data storage, and face-api.js for facial recognition features.

Features-
Facial recognition-based authentication for enhanced security.
Live video stream for real-time face detection.
User registration and login using email and facial data.
Responsive web design for a seamless experience across devices.

Getting Started

Prerequisites
Node.js
npm (Node Package Manager)
MongoDB account or local MongoDB server
Installation
Clone the repository-
Backend setup-
npm install
Create a .env file in the root directory with the following content:
PORT=5000
MONGOURI=YourMongoDBConnectionString
Start the backend server:
npm start
Frontend setup-

Navigate to the client directory:
cd client
Install frontend dependencies:
npm install
Start the React application:
npm start
The application should now be running on http://localhost:3000.

Usage-
Navigate to http://localhost:3000 on your web browser.
Register a new account using your email and capturing your face through the web application's interface.
Log in using your registered email and facial recognition to access the home page.
Built With
React.js - The web framework used for the frontend.
Express.js - The backend framework.
MongoDB - The database used for storing user data.
face-api.js - The JavaScript API for facial recognition features.
Axios - Used for making HTTP requests between the frontend and backend.
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Acknowledgments
The open-source community for providing invaluable resources and support.
Deployment link - https://facial-login-project.vercel.app/ 
