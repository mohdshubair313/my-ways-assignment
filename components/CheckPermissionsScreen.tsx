"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  onNext: () => void;
  step: number
}

const back = () => {
  
};

const CheckPermissionsScreen = ({ onNext, step }: Props) => {
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
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasMic = devices.some(device => device.kind === "audioinput");
      if (!hasMic) {
        throw new Error("Microphone not found");
      }
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
    } catch (error) {
      console.error("Mic permission denied or not found:", error);
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
    <div className="flex flex-col mb-6 items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl mb-24">Check Permissions</h1>
      <Button onClick={checkCamera} variant="ghost" className="bg-green-600 mb-6 px-4 py-2 rounded">
        Check Camera {cameraGranted ? "✅" : ""}
      </Button>
      <Button variant="ghost" onClick={checkMic} className="bg-yellow-600 mb-6 px-4 py-2 rounded">
        Check Microphone {micGranted ? "✅" : ""}
      </Button>
      <Button variant="ghost" onClick={checkScreen} className="bg-blue-600 px-4 py-2 rounded">
        Check Screen Sharing {screenGranted ? "✅" : ""}
      </Button>
      {cameraGranted && micGranted && screenGranted && (
        <button
          onClick={onNext}
          className="bg-purple-600 mt-4 px-4 py-2 rounded-md hover:transition-all ease-in-out scale-105"
        >
          Proceed to Interview
        </button>
      )}
      <Button onClick={back} className="flex mt-4 mr-96 hover:scale-125 transition-all ease-in-out" variant="secondary">
        👈 Back to step 1
      </Button>
    </div>
  );
};

export default CheckPermissionsScreen;
