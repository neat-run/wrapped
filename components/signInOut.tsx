import React from "react";
import { signIn, signOut } from "../utils/supabase";
import KeyboardShortcut from "./shortcut";

/**
 * Sign out or into the app
 * @param user user object from GitHub
 * @param setUser user object setter from parent
 * @returns button with one of two actions
 */
function SignInOut({ user, setUser }) {
  return (
    <button
      onClick={() => {
        !user
          ? signIn()
          : () => {
              signOut();
              setUser(null);
            };
      }}
      className="bg-purple-600 hover:bg-purple-700 text-gray-100 py-2 px-6 rounded"
    >
      <span>{user ? "Sign out" : "Sign in"}</span>
      {!user && <KeyboardShortcut shortcut={"S"} />}
    </button>
  );
}

export default SignInOut;
