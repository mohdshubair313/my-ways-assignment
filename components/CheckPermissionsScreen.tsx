"use-client"

import React, { useState } from "react";

interface Props {
  onNext: () => void;
}

const CheckPermissionsScreen = ({ onNext }: Props) => {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [micGranted, setMicGranted] = useState(false);
  const [screenGranted, setScreenGranted] = useState(false);

  const checkCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraGranted(true);
    } catch (error) {
      console.error("Camera permission denied:", error);
    }
  };

  const checkMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
    } catch (error) {
      console.error("Mic permission denied:", error);
    }
  };

  const checkScreen = async () => {
    try {
      await navigator.mediaDevices.getDisplayMedia();
      setScreenGranted(true);
    } catch (error) {
      console.error("Screen sharing permission denied:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Check Permissions</h1>
      <button onClick={checkCamera} className="bg-green-600 mb-2 px-4 py-2 rounded">
        Check Camera {cameraGranted ? "✅" : ""}
      </button>
      <button onClick={checkMic} className="bg-yellow-600 mb-2 px-4 py-2 rounded">
        Check Microphone {micGranted ? "✅" : ""}
      </button>
      <button onClick={checkScreen} className="bg-blue-600 px-4 py-2 rounded">
        Check Screen Sharing {screenGranted ? "✅" : ""}
      </button>
      {cameraGranted && micGranted && screenGranted && (
        <button
          onClick={onNext}
          className="bg-purple-600 mt-4 px-4 py-2 rounded"
        >
          Proceed to Interview
        </button>
      )}
    </div>
  );
};

export default CheckPermissionsScreen;
