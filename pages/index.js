import Head from "next/head";
import { useState, useEffect } from "react";
import { signIn, signOut, getUser } from "../utils/supabase";
import Constants from "../utils/constants";
import UserHighlights from "../components/userHighlights";
import TopRepos from "../components/topRepos";
import TopLanguages from "../components/topLanguages";
import Toolbar from "../components/toolbar";
import { initShortcuts } from "../utils/shortcuts";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initShortcuts();
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  // Check if user exists
  async function checkUser() {
    const user = await getUser();
    if (user) setUser(user);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
      <Head>
        <title>GitHub Wrapped</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
          crossorigin="anonymous"
        />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="flex text-6xl font-bold text-white">
          GitHub <p className="pl-2 text-purple-700">Wrapped</p>
        </h1>
        <div className="pt-5">
          {user ? (
            <div>
              <p className="text-white pb-5">
                Hey,{" "}
                {user.user_metadata.full_name
                  ? user.user_metadata.full_name
                  : user.email}
                , you're logged in!
              </p>
              <button
                onClick={() => {
                  signOut();
                  setUser(null);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-gray-100 py-2 px-6 rounded"
              >
                Sign out
              </button>
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 mt-5 p-10"
                id="wrap"
              >
                <div className="flex space-x-5 rounded-xl bg-gray-900/80 border border-gray-500">
                  <UserHighlights />
                  <TopRepos />
                  <TopLanguages />
                </div>
              </div>
              <Toolbar />
            </div>
          ) : (
            <div>
              <button
                onClick={signIn}
                className="bg-purple-600 hover:bg-purple-700 text-gray-100 py-2 px-6 rounded"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </main>
      <footer className=" ">
        <p className="text-gray-300">
          Made by{" "}
          <a
            className="font-bold text-purple-500 hover:text-purple-400"
            href={Constants.NEAT.URL}
          >
            Neat
          </a>
        </p>
      </footer>
    </div>
  );
}
