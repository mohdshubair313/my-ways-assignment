"use client"

import { useState } from "react";
import InstructionsScreen from "@/components/InstructionsScreen";
import CheckPermissionsScreen from "@/components/CheckPermissionsScreen";
import QuestionScreen from "@/components/QuestionScreen";
import RecordingScreen from "@/components/RecordingScreen";
import CompletionScreen from "@/components/CompletionScreen";

export default function Home() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  }

  return (
    <>
      {step === 0 && <InstructionsScreen onNext={nextStep} />}
      {step === 1 && <CheckPermissionsScreen onNext={nextStep} />}
      {step === 2 && <QuestionScreen onNext={nextStep} />}
      {step === 3 && <RecordingScreen onComplete={nextStep} />}
      {step === 4 && <CompletionScreen />}
    </>
  );
}
