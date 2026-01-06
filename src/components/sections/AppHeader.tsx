"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function AppHeader() {
  return (
    <header className="flex items-center gap-4 p-4 border-b">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-rose-500 text-white px-3 py-2 rounded">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}
