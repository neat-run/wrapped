import React from "react";
import { signIn, signOut } from "../utils/supabase";
import KeyboardShortcut from "./shortcut";

/**
 * Sign out or into the app
 * @param auth user object from GitHub
 * @param setAuth user object setter from parent
 * @returns button with one of two actions
 */
function SignIn({ auth, setAuth }) {
  return (
    <div className="sticky py-10 text-center">
      <span className={`absolute ${auth ? "" : "backdrop-glow-reactive"}`} />
      <button
        onClick={() => {
          if (!auth) signIn();
          else {
            signOut();
            setAuth(null);
          }
        }}
        className={`z-50 mx-auto transition bg-indigo-700 hover:bg-indigo-600 text-white p-4 rounded-md focus:outline-dotted`}
      >
        <span className="px-6 font-medium text-base">
          {auth ? "Sign out" : "See your developer stats"}
        </span>
        {!auth && <KeyboardShortcut shortcut={"S"} />}
      </button>
      <p className="text-gray-400 text-xs mt-2 text-center">
        Access to profile and commits. No code access.
      </p>
    </div>
  );
}

export default SignIn;
