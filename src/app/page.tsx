"use client";
import SignInButton from "./components/signInButton";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import SheetsForm from "./components/sheetsForm";

export default function Home() {
  const { user, isLoaded } = useUser();

  const copy = {
    firstName: `hello there, ${user?.firstName?.toLowerCase() ?? "friend"} 🫡`,
    heyStranger: "hey stranger 👀",
    welcome: "time to encode 📝",
    getStarted: "sign in to get started 🫰",
  };

  return (
    <div className="hero-content mx-auto flex h-full text-center">
      <div className="max-w-md">
        {!isLoaded ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <>
            <SignedIn>
              <h1 className="text-4xl font-bold">{copy.firstName}</h1>
              <p className="pb-6 pt-2">{copy.welcome}</p>
              <SheetsForm />
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
