import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import * as faceapi from "face-api.js";

function FaceScan({ setFaceDescriptor }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const captureCanvasRef = useRef(); // Canvas for capturing images
  const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image data URL

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, [capturedImage]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/api_models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/api_models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/api_models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/api_models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resizedDetections = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    };
  };

  const handleCapture = async () => {
    const context = captureCanvasRef.current.getContext("2d");
    captureCanvasRef.current.width = videoRef.current.videoWidth; // Set canvas size to video size
    captureCanvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(
      videoRef.current,
      0,
      0,
      captureCanvasRef.current.width,
      captureCanvasRef.current.height
    );
    // Convert the canvas to a data URL and set it as the captured image
    const dataUrl = captureCanvasRef.current.toDataURL();
    setCapturedImage(dataUrl);
    // const dataUrl = captureCanvasRef.toDataURL();
    // setCapturedImage(prevImage => [...prevImage, dataUrl]);
    // Further processing or saving of the captured image
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections.length > 0) {
      const descriptor = detections[0].descriptor;
      console.log(descriptor); // Use the descriptor as needed
      setFaceDescriptor(descriptor);
    }
  };

  return (
    <div className="myapp">
      <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
        Face Detection
      </h1>
      <div className="appvideo">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            style={{ borderRadius: "400px" }}
          />
        ) : (
          <video
            crossOrigin="anonymous"
            ref={videoRef}
            autoPlay
            style={{
              objectFit: "contain",
              borderRadius: "400px",
            }}
          ></video>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width="940"
        height="650"
        className="appcanvas"
        style={{ display: "none" }}
      ></canvas>
      <canvas
        ref={captureCanvasRef}
        width="940"
        height="650"
        style={{ display: "none", borderRadius: "100px" }}
      ></canvas>{" "}
      {/* Hidden capture canvas */}
      {/* Display the captured image */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem"
      }}>
        <button
          onClick={handleCapture}
          style={{
            position: "relative",
            fontSize: "20px",
            backgroundColor: "#D3D3D3",
            padding: "20px",
            width: "180px",
            borderRadius: "20px",
          }}
        >
          Capture
        </button>
        <button
          onClick={()=>setCapturedImage(null)}
          style={{
            position: "relative",
            fontSize: "20px",
            backgroundColor: "#D3D3D3",
            padding: "20px",
            width: "180px",
            borderRadius: "20px",
          }}
        >
          Re-Capture
        </button>
      </div>
    </div>
  );
}

export default FaceScan;
