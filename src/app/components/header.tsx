"use client";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, useUser } from "@clerk/clerk-react";
import React from "react";

const Header = () => {
  const { isLoaded } = useUser();
  return (
    <nav className="bg-base-200 sticky top-0 flex w-full items-center justify-between py-2 shadow-sm shadow-neutral-700/10">
      <div className="flex">
        <a className="btn btn-ghost text-primary text-xl">ez finance tracker</a>
      </div>
      <div className="container mx-auto">
        <div className="flex w-full flex-wrap items-center justify-end">
          <div className="pr-5">
            {!isLoaded ? (
              <span className="loading loading-spinner loading-md mr-1 mt-1"></span>
            ) : (
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
