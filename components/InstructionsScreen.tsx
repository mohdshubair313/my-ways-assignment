"use-client"

import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "./ui/button";

interface Props  {
  onNext:() => void;
}

const InstructionsScreen = ({ onNext }: Props) => {
  return (
  <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Trainee Interview</h1>
      <ul className="text-lg mb-6">
        <li>1. Ensure stable internet and a quiet location.</li>
        <li>2. Give camera/mic permissions.</li>
        <li>3. Answer with examples and projects you've worked on.</li>
      </ul>
      
        <Button variant="ghost" onClick={onNext}>Start Now</Button>
    </div>
    </>
  );
};

export default InstructionsScreen;
