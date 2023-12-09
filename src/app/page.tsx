"use client";
import SignInButton from "./components/signInButton";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import SheetsForm from "./components/sheetsForm";
import { useState } from "react";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onAfterSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const copy = {
    firstName: `hello there, ${user?.firstName?.toLowerCase() ?? "friend"} 🫡`,
    heyStranger: "hey stranger 👀",
    encode: "time to encode 📝",
    getStarted: "sign in to get started 🫰",
    submitted: "thanks for submitting! 📤",
  };

  return (
    <div className="hero-content mx-auto flex h-full text-center">
      <div className="max-w-md">
        {!isLoaded ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <>
            <SignedIn>
              <h1 className="mx-20 mt-2 text-2xl font-bold">
                {copy.firstName}
              </h1>
              <p className={`pb-3 pt-1 ${isSubmitted ? "text-primary" : ""}`}>
                {isSubmitted ? copy.submitted : copy.encode}
              </p>
              <SheetsForm onAfterSubmit={onAfterSubmit} />
            </SignedIn>
            <SignedOut>
              <h1 className="text-4xl font-bold">{copy.heyStranger}</h1>
              <p className="pb-6 pt-2">{copy.getStarted}</p>
              <SignInButton />
            </SignedOut>
          </>
        )}
      </div>
    </div>
  );
}
