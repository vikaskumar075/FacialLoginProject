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
    if (!email) {
      alert("Enter Your Email");
      return;
    }
    console.log(faceDescriptor);
    if (!faceDescriptor) {
      alert("Face not Detected");
      return;
    }

    await Axios.post("https://facial-login-api.vercel.app/auth/login", {
      email,
      faceDescriptor: Object.values(faceDescriptor), // Include the face descriptor in the signup data
    })
      .then((response) => {
        console.log(response);

        localStorage.setItem("username", JSON.stringify(response.data.user.username));

        if (response?.status == 200) {
          navigate("/home");
        }
      })
      .catch((err) => {
        if(err.response){
          alert(err.response.data.message);
        }
        else alert(err.message);
        console.log(err);
      });
  };

  return (
    <div className="log-in-container" username={username}>
      <FaceScan className="face" setFaceDescriptor={setFaceDescriptor} />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50vw",
        // backgroundImage: url('/client/src/components/login page.jpg')
      }}>
        <form className="log-in-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* FaceScan component is expected to capture the face descriptor */}
          <button type="submit">Log in</button>
          <p>Don't have a account!?  <Link to="/">SignUp</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
