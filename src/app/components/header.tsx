"use client";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import React from "react";
import { env } from "~/env";

const copy = {
  title: "ez finance tracker",
  money: "💰",
};

const Header = () => {
  const { isLoaded } = useUser();

  return (
    <nav
      className="sticky top-0 flex w-full flex-row items-center justify-center bg-base-200 py-2 shadow-sm shadow-neutral-700/10"
      style={{ zIndex: 9999 }}
    >
      <div className="container max-w-2xl flex-row">
        <div className="flex">
          <a
            className="btn btn-ghost text-xl text-primary"
            href={env.NEXT_PUBLIC_GOOGLE_SHEET_LINK}
            target="_blank"
          >
            {copy.title}
          </a>
          <div className="container mx-auto my-auto">
            <div className="flex w-full flex-wrap items-center justify-end">
              <div className="pr-4">
                {!isLoaded ? (
                  <span className="loading loading-spinner loading-md mr-1 mt-1"></span>
                ) : (
                  <>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <div className="avatar placeholder online">
                        <div className="w-8 rounded-full bg-neutral text-neutral-content">
                          <span className="text-xl">{copy.money}</span>
                        </div>
                      </div>
                    </SignedOut>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
