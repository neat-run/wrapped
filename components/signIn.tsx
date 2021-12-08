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
    <div className="sticky py-5">
      <button
        onClick={() => {
          if (!auth) signIn();
          else {
            signOut();
            setAuth(null);
          }
        }}
        className={`z-50 ${
          auth ? "" : "backdrop-glow"
        } transition-colors bg-indigo-700 border border-gray-600/80 hover:bg-indigo-600 text-white p-4 rounded-md`}
      >
        <span className="px-5 font-medium text-lg">
          {auth ? "Sign out" : "See your developer stats"}
        </span>
        {!auth && <KeyboardShortcut shortcut={"S"} />}
      </button>
      <p className="text-gray-400 text-sm mt-2">
        Read-only access to your account
      </p>
    </div>
  );
}

export default SignIn;
