import React, { useState } from "react";
import { env } from "~/env";

interface PinButtonLoginProps {
  onAfterEnterPin: () => void;
}

const PinButtonLogin: React.FC<PinButtonLoginProps> = ({ onAfterEnterPin }) => {
  const [pin, setPin] = useState<string>("");

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
      onAfterEnterPin();
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">wow a secret login method 🥺</h1>
      <div className="mb-4">
        <input
          type="password"
          value={pin}
          disabled
          className=" max-w-xs rounded border border-gray-300 p-2 text-center"
        />
      </div>

      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => handlePinChange("1")}
          className="btn btn-circle btn-primary btn-lg"
        >
          1
        </button>
        <button
          onClick={() => handlePinChange("2")}
          className="btn btn-circle btn-primary btn-lg"
        >
          2
        </button>
        <button
          onClick={() => handlePinChange("3")}
          className="btn btn-circle btn-primary btn-lg"
        >
          3
        </button>
      </div>
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => handlePinChange("4")}
          className="btn btn-circle btn-primary btn-lg"
        >
          4
        </button>
        <button
          onClick={() => handlePinChange("5")}
          className="btn btn-circle btn-primary btn-lg"
        >
          5
        </button>
        <button
          onClick={() => handlePinChange("6")}
          className="btn btn-circle btn-primary btn-lg"
        >
          6
        </button>
      </div>
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => handlePinChange("7")}
          className="btn btn-circle btn-primary btn-lg"
        >
          7
        </button>
        <button
          onClick={() => handlePinChange("8")}
          className="btn btn-circle btn-primary btn-lg"
        >
          8
        </button>
        <button
          onClick={() => handlePinChange("9")}
          className="btn btn-circle btn-primary btn-lg"
        >
          9
        </button>
      </div>
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handlePinDelete}
          className="btn btn-circle btn-primary btn-lg"
        >
          Del
        </button>
        <button
          onClick={() => handlePinChange("0")}
          className="btn btn-circle btn-primary btn-lg"
        >
          0
        </button>
        <button
          onClick={handlePinSubmit}
          className="btn btn-circle btn-primary btn-lg "
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default PinButtonLogin;
