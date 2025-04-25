




import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import FaceRecognition from './FaceRecognition';
import './Exampage.css';

function Exampage() {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions();

        setDetections(detections);
      }
    }, 100);
  };

  return (
    <div className="App">
      <h1>Face Recognition App</h1>
      {modelsLoaded ? (
        <FaceRecognition
          videoRef={videoRef}
          handleVideoOnPlay={handleVideoOnPlay}
          detections={detections}
        />
      ) : (
        <p>Loading models...</p>
      )}
    </div>
  );
}

export default Exampage;