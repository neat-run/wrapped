import React from "react";
import { signIn, signOut } from "../utils/supabase";
import KeyboardShortcut from "./shortcut";

/**
 * Sign out or into the app
 * @param auth user object from GitHub
 * @param setAuth user object setter from parent
 * @returns button with one of two actions
 */
function SignInOut({ auth, setAuth }) {
  return (
    <button
      onClick={() => {
        if (!auth) signIn();
        else {
          signOut();
          setAuth(null);
        }
      }}
      className="bg-purple-600 hover:bg-purple-700 text-gray-100 py-2 px-6 rounded"
    >
      <span>{auth ? "Sign out" : "Sign in"}</span>
      {!auth && <KeyboardShortcut shortcut={"S"} />}
    </button>
  );
}

export default SignInOut;
