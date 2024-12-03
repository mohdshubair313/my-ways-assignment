"use client";

import React, { useEffect, useRef, useState } from "react";

interface event {
  event: () => void;
  result: Array
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Web Speech API for speech recognition
const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
}


interface Props {
  onComplete: () => void;
}

const QuestionScreen = ({ onComplete }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element
  const [question, setQuestion] = useState(""); // Current question text
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  ); // Currently playing audio
  const [recognition, setRecognition] = useState<InstanceType<typeof SpeechRecognition> | null>(
    null
  ); // Speech recognition instance

  const questions = [
    "Can you tell me about your background and what led you to this career path?",
    "What would you say are your strongest skills and how have you demonstrated them in previous roles?",
    "Describe a challenging situation you faced at work and how you navigated it to achieve a positive outcome.",
    "What are your salary expectations for this position?",
    "Do you have any questions for me about the role or the company?",
  ]; // Array of questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index

  // Initialize the video and microphone
  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to access camera or microphone", err);
      }
    };

    initMedia();
  }, []);

  // Play question audio and initialize speech recognition
  useEffect(() => {
    const askQuestion = async () => {
      // Stop the previous audio if it's playing
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }

      // Play the current question audio
      const audioPath = `/audio/question-${currentQuestionIndex + 1}.mp3`; // Dynamic audio file path
      const audio = new Audio(audioPath);
      setCurrentAudio(audio);
      audio.play();

      // Set the current question text
      setQuestion(questions[currentQuestionIndex]);

      // Start speech recognition when the audio finishes
      audio.onended = startSpeechRecognition;
    };

    askQuestion();
  }, [currentQuestionIndex]);

  // Start the SpeechRecognition API
  const startSpeechRecognition = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "en-US";
    recognitionInstance.continuous = false; // Stop listening after one result
    recognitionInstance.interimResults = false;

    recognitionInstance.onstart = () => {
      console.log("Listening for user's response...");
    };

    recognitionInstance.onresult = (event:event) => {
      const transcript = event.results[0][0].transcript; // Extract the speech-to-text result
      console.log("User's response:", transcript);
      handleNextQuestion(); // Proceed to the next question
    };

    recognitionInstance.onerror = (event: event) => {
      console.error("Speech recognition error:", event.error);
      handleNextQuestion(); // Proceed even if recognition fails
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  // Move to the next question or complete the flow
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Stop speech recognition and complete the flow
      if (recognition) recognition.stop();
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">{question}</h1>
      <video ref={videoRef} autoPlay muted className="w-1/2 mb-4 rounded-lg" />
      <p className="text-sm text-gray-400 text-center">
        Your video is on. Please respond directly after the question is asked.
        The system will automatically proceed to the next question.
      </p>
    </div>
  );
};

export default QuestionScreen;
