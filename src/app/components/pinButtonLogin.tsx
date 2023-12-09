import React, { useState } from "react";
import { env } from "~/env";
import Image from "next/image";

interface PinButtonLoginProps {
  onCorrectPinEntered: () => void;
}

const copy = {
  secretLogin: "wow a secret login method 🥺",
  attemptsLeft: (attemptsLeft: number) => `attempts left: ${attemptsLeft}`,
  enterFourDigits: "enter 4 digits",
  thankYou: "thank you for not giving up 🥺",
};

const PinButtonLogin: React.FC<PinButtonLoginProps> = ({
  onCorrectPinEntered,
}) => {
  const [pin, setPin] = useState<string>("");
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [hasAttemptedIncorrectly, setHasAttemptedIncorrectly] =
    useState<boolean>(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(10);

  const handlePinChange = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handlePinDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 4 && pin === env.NEXT_PUBLIC_PINCODE_BYPASS) {
      onCorrectPinEntered();
    } else {
      setIsIncorrect(true);
      setAttemptsLeft(attemptsLeft - 1);
      setHasAttemptedIncorrectly(true);
      setTimeout(() => {
        setIsIncorrect(false);
      }, 200);
    }
  };

  const onClickPinButton = (digit: string) => () => {
    if (digit === "del") {
      handlePinDelete();
    } else if (digit === "enter") {
      handlePinSubmit();
    } else {
      handlePinChange(digit.toString());
    }
  };

  const generateButtons = () => {
    const buttonLayout = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ["del", 0, "enter"],
    ];

    return buttonLayout.map((row, rowIndex) => (
      <div
        key={rowIndex}
        className="my-2 flex flex-wrap items-center justify-center gap-4"
      >
        {row.map((value, index) => (
          <button
            key={index}
            onClick={onClickPinButton(value.toString())}
            className={`pop-animation btn btn-circle btn-primary btn-lg ${
              isIncorrect ? "shake-animation" : ""
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    ));
  };

  return attemptsLeft > 0 ? (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{copy.secretLogin}</h1>
      <div className="text-ghost text-sm">
        {hasAttemptedIncorrectly
          ? `${copy.attemptsLeft(attemptsLeft)}`
          : copy.enterFourDigits}
      </div>
      <div className="mb-4 mt-2">
        <input
          type="password"
          value={pin}
          disabled
          className={`max-w-xs rounded border border-gray-300 p-2 text-center ${
            isIncorrect ? "shake-animation" : ""
          }`}
        />
      </div>
      {generateButtons()}
    </div>
  ) : (
    <div>
      <Image src="/easter-egg.gif" width={640} height={640} alt="Easter Egg" />
      <div className="mt-1">
        <h1 className="blinking-text-3 text-2xl font-bold">{copy.thankYou}</h1>
        <h1 className="blinking-text-2 text-2xl font-bold">{copy.thankYou}</h1>
        <h1 className="blinking-text text-2xl font-bold">{copy.thankYou}</h1>
      </div>
    </div>
  );
};

export default PinButtonLogin;
