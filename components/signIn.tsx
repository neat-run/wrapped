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
    <div className="sticky py-10">
      <span
        className={`absolute ${auth ? "" : "backdrop-glow-reactive"}`}
      ></span>
      <button
        onClick={() => {
          if (!auth) signIn();
          else {
            signOut();
            setAuth(null);
          }
        }}
        className={`z-100 mx-10 transition bg-indigo-700 hover:bg-indigo-600 text-white p-4 rounded-md focus:outline-dotted`}
      >
        <div className="flex flex-row flex-wrap justify-center">
          <span className="px-5 font-medium text-base">
            {auth ? "Sign out" : "See your developer stats"}
          </span>
          {!auth && <KeyboardShortcut shortcut={"S"} />}
        </div>
      </button>
      <p className="text-gray-400 text-sm mt-2 text-center">
        Read-only access to your account
      </p>
    </div>
  );
}

export default SignIn;
