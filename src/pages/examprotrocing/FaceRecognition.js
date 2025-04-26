// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceRecognition.css';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
//   const [capturedImages, setCapturedImages] = useState([]);
  

//   useEffect(() => {
//     if (detections.length > 0) {
//       // For visual feedback (optional)
//       console.log('Faces detected:', detections.length);
//     }
//   }, [detections]);
  

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error(err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.addEventListener('play', () => {
//         const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//         const displaySize = {
//           width: videoRef.current.width,
//           height: videoRef.current.height,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         const drawDetections = () => {
//           const context = canvas.getContext('2d');
//           context.clearRect(0, 0, canvas.width, canvas.height);
//           const resizedDetections = faceapi.resizeResults(detections, displaySize);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         };

//         if (detections.length > 0) {
//           drawDetections();
//         }
//       });
//     }
//   }, [detections, videoRef]);

//   const captureImage = () => {
//     const video = videoRef.current;

//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Draw detections and expressions on the canvas
//       if (detections.length > 0) {
//         const resizedDetections = faceapi.resizeResults(detections, {
//           width: canvas.width,
//           height: canvas.height,
//         });
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }

//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImages([...capturedImages, dataUrl]);

//       const byteString = atob(dataUrl.split(',')[1]);
//       const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       const formData = new FormData();
//       formData.append('image', blob, 'capture.jpg');

//       fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Failed to upload image.');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Image saved successfully', data);
//         })
//         .catch((error) => {
//           console.error('Error saving image:', error);
//         });
//     }
//   };

//   return (
//     <div className="face-recognition-container">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         onPlay={handleVideoOnPlay}
//         width="720"
//         height="560"
//         className="video-stream"
//       />
//       <button onClick={captureImage} className="capture-button">
//         Capture Image
//       </button>
//       <div className="captured-images-container">
//         {capturedImages.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Captured ${index}`}
//             className="captured-image"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;



// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceRecognition.css';
// import { useNavigate } from 'react-router-dom';


// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
//   const [capturedImages, setCapturedImages] = useState([]);
//   const navigate = useNavigate();


//   // Load captured images from localStorage when the component mounts
//   useEffect(() => {
//     const savedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
//     setCapturedImages(savedImages);
//   }, []);

//   // Handle detections and video stream
//   useEffect(() => {
//     if (detections.length > 0) {
//       // For visual feedback (optional)
//       console.log('Faces detected:', detections.length);
//     }
//   }, [detections]);

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error(err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.addEventListener('play', () => {
//         const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//         const displaySize = {
//           width: videoRef.current.width,
//           height: videoRef.current.height,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         const drawDetections = () => {
//           const context = canvas.getContext('2d');
//           context.clearRect(0, 0, canvas.width, canvas.height);
//           const resizedDetections = faceapi.resizeResults(detections, displaySize);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         };

//         if (detections.length > 0) {
//           drawDetections();
//         }
//       });
//     }
//   }, [detections, videoRef]);

//   const captureImage = () => {
//     const video = videoRef.current;

//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Draw detections and expressions on the canvas
//       if (detections.length > 0) {
//         const resizedDetections = faceapi.resizeResults(detections, {
//           width: canvas.width,
//           height: canvas.height,
//         });
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }

//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImages([...capturedImages, dataUrl]);

//       // Save to localStorage
//       const existingImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
//       existingImages.push(dataUrl);
//       localStorage.setItem('capturedImages', JSON.stringify(existingImages));

//       console.log('Image saved to localStorage');
//       navigate('/applicant-take-test');

//     }
//   };

//   return (
//     <div className="face-recognition-container">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         onPlay={handleVideoOnPlay}
//         width="720"
//         height="560"
//         className="video-stream"
//       />
//       <button onClick={captureImage} className="capture-button">
//         Capture Image
//       </button>
//       <div className="captured-images-container">
//         {capturedImages.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Captured ${index}`}
//             className="captured-image"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;






// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceRecognition.css';
// import { useNavigate, useLocation } from 'react-router-dom';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
//   const [capturedImages, setCapturedImages] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Load captured images from localStorage on mount
//   useEffect(() => {
//     const savedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
//     setCapturedImages(savedImages);
//   }, []);

//   // Log detections if any
//   useEffect(() => {
//     if (detections.length > 0) {
//       console.log('Faces detected:', detections.length);
//     }
//   }, [detections]);

//   // Start the webcam
//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error(err));
//     };

//     startVideo();
//   }, [videoRef]);

//   // Draw detections on canvas
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.addEventListener('play', () => {
//         const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//         const displaySize = {
//           width: videoRef.current.width,
//           height: videoRef.current.height,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         const drawDetections = () => {
//           const context = canvas.getContext('2d');
//           context.clearRect(0, 0, canvas.width, canvas.height);
//           const resizedDetections = faceapi.resizeResults(detections, displaySize);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         };

//         if (detections.length > 0) {
//           drawDetections();
//         }
//       });
//     }
//   }, [detections, videoRef]);

//   const captureImage = () => {
//     const video = videoRef.current;

//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       if (detections.length > 0) {
//         const resizedDetections = faceapi.resizeResults(detections, {
//           width: canvas.width,
//           height: canvas.height,
//         });
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }

//       const dataUrl = canvas.toDataURL('image/jpeg');
//       const updatedImages = [...capturedImages, dataUrl];
//       setCapturedImages(updatedImages);
//       localStorage.setItem('capturedImages', JSON.stringify(updatedImages));

//       console.log('Image saved to localStorage');

//       // 👇 Navigate to applicant-take-test with the testName if passed via location
//       const testName = location.state?.testName || '';
//       navigate('/applicant-take-test', { state: { testName } });
//     }
//   };

//   return (
//     <div className="face-recognition-container">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         onPlay={handleVideoOnPlay}
//         width="720"
//         height="560"
//         className="video-stream"
//       />
//       <button onClick={captureImage} className="capture-button">
//         Capture Image
//       </button>
//       <div className="captured-images-container">
//         {capturedImages.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Captured ${index}`}
//             className="captured-image"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;


// import React, { useEffect, useState } from 'react';
// import './FaceRecognition.css';
// import { useNavigate } from 'react-router-dom';
// import TestFailAcknowledgment from '../../components/applicantcomponents/TestFailAcknowledgment';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [verified, setVerified] = useState(false);
//   const [warningCount, setWarningCount] = useState(0);
//   const [showFailPopup, setShowFailPopup] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error(err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (verified) {
//       if (detections.length !== 1) {
//         setWarningCount((prev) => prev + 1);
//         console.warn('Warning: Invalid face detected!', warningCount + 1);
//       }
//       if (warningCount >= 3) {
//         setShowFailPopup(true);
//       }
//     }
//   }, [detections, verified, warningCount]);

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(dataUrl);
//     }
//   };

//   const handleVerify = () => {
//     if (capturedImage) {
//       localStorage.setItem('capturedImage', capturedImage);
//       console.log('Image verified and stored!');
//       setVerified(true);
//     }
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
//   };

//   const handleClosePopup = () => {
//     setShowFailPopup(false);
//     navigate('/applicant-verified-badges');
//   };

//   return (
//     <div className="face-recognition-container">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         onPlay={handleVideoOnPlay}
//         width="320"
//         height="260"
//         className="video-stream"
//       />

//       {!capturedImage && !verified && (
//         <button onClick={captureImage} className="capture-button">
//           Capture Image
//         </button>
//       )}

//       {capturedImage && !verified && (
//         <div className="verification-buttons">
//           <img src={capturedImage} alt="Captured" className="captured-image" />
//           <button onClick={handleVerify} className="verify-button">Verify</button>
//           <button onClick={handleRetake} className="retake-button">Retake</button>
//         </div>
//       )}
// {/* 
//       {showFailPopup && (
//         <TestFailAcknowledgment onClose={handleClosePopup} />
//       )} */}
//     </div>
//   );
// };

// export default FaceRecognition;




// import React, { useEffect, useState } from 'react';
// import './FaceRecognition.css';
// import { useNavigate } from 'react-router-dom';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [verified, setVerified] = useState(false);
//   const [warningCount, setWarningCount] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error(err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (verified) {
//       if (detections.length !== 1) {
//         setWarningCount((prev) => {
//           const newCount = prev + 1;
//           console.warn(`Warning ${newCount}: Invalid face detected!`);
//           alert(`Warning ${newCount}: Invalid face detected!`);
//           if (newCount >= 3) {
//             navigate('/applicant-verified-badges');
//           }
//           return newCount;
//         });
//       }
//     }
//   }, [detections, verified]);

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(dataUrl);
//     }
//   };

//   const handleVerify = () => {
//     if (capturedImage) {
//       localStorage.setItem('capturedImage', capturedImage);
//       console.log('Image verified and stored!');
//       setVerified(true);
//     }
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
//   };

//   return (
//     <div className="face-recognition-container">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         onPlay={handleVideoOnPlay}
//         width="320"
//         height="260"
//         className="video-stream"
//       />

//       {!capturedImage && !verified && (
//         <button onClick={captureImage} className="capture-button">
//           Capture Image
//         </button>
//       )}

//       {capturedImage && !verified && (
//         <div className="verification-buttons">
//           <img src={capturedImage} alt="Captured" className="captured-image" />
//           <button onClick={handleVerify} className="verify-button">Verify</button>
//           <button onClick={handleRetake} className="retake-button">Retake</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceRecognition;



// import React, { useEffect, useState } from 'react';
// import './FaceRecognition.css';
// import { useNavigate, useLocation } from 'react-router-dom';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [verified, setVerified] = useState(false);
//   const [warningCount, setWarningCount] = useState(0);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const stopVideoAndClearData = () => {
//     localStorage.removeItem('capturedImage');
//     console.log('Video stopped and captured image removed.');
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//     }
//   };

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((err) => console.error(err));
//     };

//     startVideo();

//     return () => {
//       stopVideoAndClearData();
//     };
//   }, [videoRef]);

//   useEffect(() => {
//     if (verified) {
//       if (detections.length !== 1) {
//         setWarningCount((prev) => {
//           const newCount = prev + 1;
//           console.warn(`Warning ${newCount}: Invalid face detected!`);
//           alert(`Warning ${newCount}: Invalid face detected!`);
//           if (newCount >= 3) {
//             navigate('/applicant-verified-badges');
//           }
//           return newCount;
//         });
//       }
//     }
//   }, [detections, verified, navigate]);

//   useEffect(() => {
//     if (location.pathname !== '/applicant-take-test') {
//       stopVideoAndClearData();
//     }
//   }, [location]);

//   useEffect(() => {
//     const handleBackOrForward = () => {
//       if (location.pathname !== '/applicant-take-test') {
//         stopVideoAndClearData();
//       }
//     };

//     window.addEventListener('popstate', handleBackOrForward);

//     return () => {
//       window.removeEventListener('popstate', handleBackOrForward);
//     };
//   }, [location]);

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(dataUrl);
//     }
//   };

//   const handleVerify = () => {
//     if (capturedImage) {
//       localStorage.setItem('capturedImage', capturedImage);
//       console.log('Image verified and stored!');
//       setVerified(true);
//     }
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
//   };

//   return (
//     <div className="face-recognition-container">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         onPlay={handleVideoOnPlay}
//         width="320"
//         height="260"
//         className="video-stream"
//       />

//       {!capturedImage && !verified && (
//         <button onClick={captureImage} className="capture-button">
//           Capture Image
//         </button>
//       )}

//       {capturedImage && !verified && (
//         <div className="verification-buttons">
//           <img src={capturedImage} alt="Captured" className="captured-image" />
//           <button onClick={handleVerify} className="verify-button">Verify</button>
//           <button onClick={handleRetake} className="retake-button">Retake</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceRecognition;




import React, { useEffect, useState } from 'react';
import './FaceRecognition.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/ApplicantAPIService';

const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections, apiUrl, userId }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [verified, setVerified] = useState(false);
  const [warningCount, setWarningCount] = useState(0);

  const navigate = useNavigate();

  // Start webcam video
  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Error accessing webcam:', err));
    };

    startVideo();

    // Stop video and clean up on unmount
    return () => {
      stopVideo();
      localStorage.removeItem('capturedImage'); // Remove captured image if any
    };
  }, [videoRef]);

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Handle face detection warnings
  useEffect(() => {
    if (verified) {
      if (detections.length !== 1) {
        setWarningCount((prev) => {
          const newCount = prev + 1;
          console.warn(`Warning ${newCount}: Invalid face detected!`);
          alert(`Warning ${newCount}: Invalid face detected!`);

          if (newCount >= 5) {
            stopVideo(); // Stop video immediately
            handleViolationSubmit();
          }
          return newCount;
        });
      }
    }
  }, [detections, verified]);

  const captureImage = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
    }
  };

  const handleVerify = () => {
    if (capturedImage) {
      localStorage.setItem('capturedImage', capturedImage);
      console.log('Image verified and stored!');
      setVerified(true);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleViolationSubmit = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const testName = localStorage.getItem('testName') || 'Face Detection Test';
    // const violationSubject = 'Face detection violation';
    const failStatus = 'F'; // or 'FAILED' based on your API

    fetch(`${apiUrl}/skill-badges/save`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicantId: userId, // Use the applicant's ID
        skillBadgeName: testName, // Use the test name as the skill badge name
        status: "FAILED", // Use PASS or
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Violation submitted successfully:', data);
        navigate('/applicant-verified-badges');
      })
      .catch((error) => {
        console.error('Error submitting violation:', error);
        navigate('/applicant-verified-badges');
      });
  };

  return (
    <div className="face-recognition-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoOnPlay}
        width="320"
        height="260"
        className="video-stream"
      />

      {!capturedImage && !verified && (
        <button onClick={captureImage} className="capture-button">
          Capture Image
        </button>
      )}

      {capturedImage && !verified && (
        <div className="verification-buttons">
          <img src={capturedImage} alt="Captured" className="captured-image" />
          <button onClick={handleVerify} className="verify-button">Verify</button>
          <button onClick={handleRetake} className="retake-button">Retake</button>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
