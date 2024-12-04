"use client";

import React, { useEffect, useRef, useState } from "react";

const SpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

interface Props {
  onNext: () => void;
}

const QuestionScreen = ({ onNext }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, settimer] = useState(60);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null); // Current audio
  const [recording, setRecording] = useState(false);

  const questions = [
    "Can you tell me about your background and what led you to this career path?",
    "What would you say are your strongest skills and how have you demonstrated them in previous roles?",
    "Describe a challenging situation you faced at work and how you navigated it to achieve a positive outcome.",
    "What are your salary expectations for this position?",
    "Do you have any questions for me about the role or the company?",
  ];

  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera or microphone:", error);
      }
    };
    initMedia();
  }, []);

  // Play audio and start speech recognition
  useEffect(() => {
    const askQuestion = async () => {
      // Stop the previous audio (if any)
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }

      // Set and play the current question's audio
      const audioPath = `/question-${currentQuestionIndex + 1}.mp3`; // Dynamic audio path
      const audio = new Audio(audioPath);
      setCurrentAudio(audio);
      audio.play();

      // Start speech recognition after the audio finishes playing
      audio.onended = startSpeechRecognition;
    };

    askQuestion();
  }, [currentQuestionIndex, currentAudio]);

  // Start speech recognition
  const startSpeechRecognition = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in your browser.");
      return;
    }
  }

  useEffect(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = true; // Ensures it doesn't stop after a pause
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log("User's response:", event.results[0][0].transcript);
        handleNextQuestion();
      };

      recognition.onend = () => {
        if (recording) {
          recognition.start();
        }
      };
      recognition.start();
      setRecording(true);
    } else {
      console.warn("SpeechRecognition not supported in this browser.");
    }
  }, [currentQuestionIndex, currentAudio]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      settimer(60);
    } else {
      onNext();
    }
  };

  // useEffect for the timer of completion of the question
  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => {
        settimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <video ref={videoRef} autoPlay muted className="w-1/2 mb-4 rounded" />
      <h1 className="text-xl font-bold mb-4">{questions[currentQuestionIndex]}</h1>
      <p className="text-gray-400 text-center mb-2">
        Respond to the question directly. You have {timer} seconds to answer.
      </p>
      <p className="text-gray-400 text-center">
        Respond to the question directly. The system will automatically proceed.
      </p>
    </div>
  );
};

export default QuestionScreen;
