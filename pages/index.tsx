import React, { useState, useEffect } from "react";
import { isSignedIn } from "../utils/supabase";
import Constants from "../utils/constants";
import Slideshow from "../components/slideshow";
import HeadTags from "../components/headTags";
import SignIn from "../components/signIn";
import { initShortcuts } from "../utils/shortcuts";
import { getByUsername } from "../utils/exports";
import { isDev, getUserStats } from "../utils/utils";
import { defaultUser } from "../utils/default";
import Link from "next/link";
import Summary from "../components/summary";
import DownloadButton from "../components/downloadNeat";

export default function Home({ hostUser }) {
  const [user, setUser] = useState(defaultUser);
  const [auth, setAuth] = useState(null);
  // Local storage is undefined if rendering on the server
  const [hidden, setHidden] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("hidden") === null
        ? []
        : JSON.parse(localStorage.getItem("hidden"))
      : []
  );

  useEffect(() => {
    (async () => {
      let userStats = await getUserStats();
      setUser(userStats);
      initShortcuts(userStats);
    })();
    checkUser();
    window.addEventListener("hashchange", () => checkUser());
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("hidden", JSON.stringify(hidden));
  }, [hidden]);

  // Check if user is signed in
  async function checkUser() {
    const auth = await isSignedIn();
    if (auth) setAuth(auth);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <HeadTags user={hostUser} />

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <h1
          className={`transition-all duration-1000 ease-out mb-5 font-bold tracking-tighter ${
            auth || hostUser ? "text-2xl top-3 left-12" : "text-8xl top-1/4"
          }`}
        >
          <span className="text-gray-300">GitHub</span>
          <span
            className={`font-mono pl-3 ${
              auth || hostUser
                ? "text-indigo-600"
                : "text-transparent bg-clip-text bg-gradient-to-l to-[#85259D] via-purple-600 from-[#6B3EEC]"
            }`}
          >
            Wrapped
          </span>
        </h1>
        {auth ? (
          <Slideshow user={user} hidden={hidden} setHidden={setHidden} />
        ) : hostUser ? (
          <div className="flex flex-col">
            <div className="text-gray-400 text-xl pt-6">
              Welcome to
              <span className="text-white ml-1">
                {hostUser.fullName ?? hostUser.username}
              </span>
              's year in review.
            </div>
            <Summary user={hostUser} hidden={hidden} setHidden={setHidden} />
            <SignIn auth={auth} setAuth={setAuth} />
            <DownloadButton />
          </div>
        ) : (
          <SignIn auth={auth} setAuth={setAuth} />
        )}
      </main>
      <footer>
        <div className="px-8 w-screen flex justify-between">
          <a
            href="https://github.com/neat-run/wrapped"
            className="text-gray-500 hover:text-gray-200 p-3 transition-transform hover:-translate-y-1 hover:rotate-3 duration-500"
            rel="noopener noreferrer"
          >
            Code
          </a>
          <div className="flex items-baseline">
            <span className="text-gray-500">Made by</span>
            <a
              className="font-semibold p-3 pl-1 text-indigo-500 hover:text-indigo-400 transition hover:-translate-y-1 duration-500"
              href={Constants.NEAT.URL}
            >
              Neat
            </a>
          </div>
          <Link href="/privacy">
            <a className="text-gray-500 hover:text-gray-200 p-3 transition-transform hover:-translate-y-1 hover:-rotate-3 duration-500">
              Privacy
            </a>
          </Link>
        </div>
      </footer>
    </div>
  );
}

// Server-side rendering for viewing others' Wrapped pages
export const getServerSideProps = async (context) => {
  // Get user from subdomain eg. https://nat.wrapped.run
  let hostUser = null;
  let domainParts = context.req.headers.host.split(".");
  if (domainParts.length > (isDev() ? 1 : 2)) {
    hostUser = await getByUsername(domainParts[0]);
  }

  return {
    props: {
      hostUser,
    },
  };
};
