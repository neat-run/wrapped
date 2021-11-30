import Head from "next/head";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import Constants from "../utils/constants";
import UserHighlights from "../components/userHighlights";
import TopRepos from "../components/topRepos";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  // Check if user exists
  async function checkUser() {
    const user = supabase.auth.user();
    if (!user) return;
    setUser(user);
  }

  // Sign in with GitHub
  async function signIn() {
    await supabase.auth.signIn(
      { provider: "github" },
      { scopes: "repo:read user read:org" }
    );
  }

  // Sign out
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-200">
      <Head>
        <title>GitHub Wrapped</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="flex text-6xl font-bold">
          GitHub <p className="pl-2 text-purple-700">Wrapped</p>
        </h1>
        <div className="pt-5">
          {user ? (
            <div>
              <p className="text-black pb-5">
                Hey,{" "}
                {user.user_metadata.full_name
                  ? user.user_metadata.full_name
                  : user.email}
                , you're logged in!
              </p>
              <button
                onClick={signOut}
                className="bg-purple-600 text-gray-100 py-2 px-6 rounded"
              >
                Sign out
              </button>
              <div className="flex space-x-5">
                <UserHighlights />
                <TopRepos />
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={signIn}
                className="bg-purple-600 text-gray-100 py-2 px-6 rounded"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </main>
      <footer className="text-gray-500 hover:text-gray-700">
        <a href={Constants.NEAT.URL}> Made by Neat</a>
      </footer>
    </div>
  );
}
