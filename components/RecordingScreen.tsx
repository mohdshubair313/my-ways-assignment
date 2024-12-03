"use client"
import React, { useRef, useState } from "react";

interface Props  {
  onComplete:() => void;
}

const RecordingScreen = ({ onComplete }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if(videoRef.current) {
      videoRef.current.srcObject =  stream;
    }

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    setRecorder(mediaRecorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if(recorder) {
      recorder.stop();
    }
    setRecording(false);
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <video ref={videoRef} autoPlay className="w-1/2 mb-4" />
      {!recording ? (
        <button onClick={startRecording} className="bg-blue-600 px-4 py-2 rounded">
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} className="bg-red-600 px-4 py-2 rounded">
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default RecordingScreen;
