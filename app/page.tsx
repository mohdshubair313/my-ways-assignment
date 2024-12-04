"use client"

import { useState } from "react";
import InstructionsScreen from "@/components/InstructionsScreen";
import CheckPermissionsScreen from "@/components/CheckPermissionsScreen";
import QuestionScreen from "@/components/QuestionScreen";
import CompletionScreen from "@/components/CompletionScreen";

export default function Home() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  }

  return (
    <>
      {step === 0 && <InstructionsScreen onNext={nextStep} />}
      {step === 1 && <CheckPermissionsScreen step={step} onNext={nextStep} />}
      {step === 2 && <QuestionScreen onNext={nextStep} />}
      {step === 3 && <CompletionScreen />}
    </>
  );
}
