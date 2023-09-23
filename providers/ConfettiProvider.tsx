"use client";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import ReactConfetti from "react-confetti";
import React from "react";

type Props = {};

const ConfettiProvider = (props: Props) => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};

export default ConfettiProvider;
