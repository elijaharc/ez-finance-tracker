"use client";
import SignInButton from "./components/signInButton";
import { useUser } from "@clerk/clerk-react";
import SheetsForm from "./components/sheetsForm";
import { useState } from "react";
import PinButtonLogin from "./components/pinButtonLogin";
import Header from "./components/header";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedInWithPin, setLoggedInWithPin] = useState(false);
  const [showPinPage, setShowPinPage] = useState(false);
  const onAfterSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const onCorrectPinEntered = () => setLoggedInWithPin(true);
  const onClickAvatar = () => {
    setLoggedInWithPin(false);
    setShowPinPage(false);
  };
  const onPressEye = () => setShowPinPage(true);
  const showSheetsForm = user ?? loggedInWithPin;

  const copy = {
    firstName: `hello there, ${user?.firstName?.toLowerCase() ?? "friend"} 🫡`,
    heyStranger: "hey stranger ",
    encode: "time to encode 📝",
    getStarted: "sign in to get started 🫰",
    submitted: "thanks for submitting! 📤",
  };

  return (
    <main>
      <Header onClickAvatar={onClickAvatar} />
      <div className="hero-content flex h-full min-w-full items-start justify-center text-center">
        <div className="w-full max-w-lg">
          {!isLoaded ? (
            <div className="mt-48 flex h-full items-center justify-center">
              <div className="loading loading-ring loading-lg"></div>
            </div>
          ) : (
            <>
              {showSheetsForm ? (
                <>
                  <h1 className="mt-0 text-2xl font-bold">{copy.firstName}</h1>
                  <p
                    className={`pb-3 pt-1 ${isSubmitted ? "text-primary" : ""}`}
                  >
                    {isSubmitted ? copy.submitted : copy.encode}
                  </p>
                  <SheetsForm onAfterSubmit={onAfterSubmit} />
                </>
              ) : (
                <>
                  {showPinPage ? (
                    <PinButtonLogin onCorrectPinEntered={onCorrectPinEntered} />
                  ) : (
                    <>
                      <h1 className="mt-48 text-4xl font-bold">
                        {copy.heyStranger}
                        <button onClick={onPressEye}>👀</button>
                      </h1>
                      <p className="pb-5 pt-2">{copy.getStarted}</p>
                      <SignInButton />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
