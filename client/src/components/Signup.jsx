import React, { useState, useCallback } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FaceScan from "./FaceScan";
// import '/client/public/api_models'
import "../App.css"; // Adjust the path as needed

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [faceDescriptor, setFaceDescriptor] = useState(null); // State to hold face descriptor
  const navigate = useNavigate();

  // const handleFaceDetected = useCallback((descriptor) => {
  //   setFaceDescriptor(descriptor);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFaceDescriptor(faceDescriptor)
    // Ensure that all required fields are provided, including the face descriptor/
    console.log(faceDescriptor);
    if (!faceDescriptor) {
      alert("Please capture your face before signing up.");
      return;
    }

    await Axios.post("https://facial-login-api.vercel.app/auth/signup", {
      username,
      email,
      faceDescriptor: Object.values(faceDescriptor), // Include the face descriptor in the signup data
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        if(err.response){
          alert(err.response.data.message);
        }
        else
          alert(err.message)
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <div className="work">
        <FaceScan className="face" setFaceDescriptor={setFaceDescriptor} />
      </div>

      <div className="form">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* FaceScan component is expected to capture the face descriptor */}
          <button type="submit">Sign Up</button>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
