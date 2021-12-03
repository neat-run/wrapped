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
    <button
      onClick={() => {
        if (!auth) signIn();
        else {
          signOut();
          setAuth(null);
        }
      }}
      className={`${
        auth ? "" : "backdrop-glow"
      } transition-colors bg-indigo-700/90 border border-gray-600/80 hover:bg-indigo-600 text-gray-100 p-4 rounded-md`}
    >
      <span className="px-5 font-medium">
        {auth ? "Sign out" : "See your developer stats"}
      </span>
      {!auth && <KeyboardShortcut shortcut={"S"} />}
    </button>
  );
}

export default SignIn;
