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
        ? Array()
        : JSON.parse(localStorage.getItem("hidden"))
      : Array()
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
          className={`transition-all duration-1000 ease-out fixed mb-5 left-1/2 -translate-x-1/2 font-bold tracking-tighter ${
            auth || hostUser ? "text-2xl top-3" : "text-8xl top-1/4"
          }`}
        >
          <span className="text-gray-200">GitHub</span>
          <span
            className={`font-mono pl-2 ${
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
            <div className="text-gray-400 text-lg pt-12 pb-2">
              Welcome to
              <a
                href={`https://github.com/${hostUser.username ?? ""}`}
                rel="noopener noreferrer"
                className="text-gray-200 font-medium ml-1.5"
              >
                {hostUser.fullName ?? hostUser.username}
              </a>
              's year in review.
            </div>
            <div className="flex items-center justify-center p-5 min-w-[800px] min-h-[600px] rounded-lg bg-gray-900/80 backdrop-blur-3xl card-border">
              <Summary
                user={hostUser}
                hidden={hidden}
                setHidden={setHidden}
                showHide={false}
              />
            </div>
            <SignIn auth={auth} setAuth={setAuth} />
            <DownloadButton />
          </div>
        ) : (
          <SignIn auth={auth} setAuth={setAuth} />
        )}
      </main>
      <footer className="px-0 md:px-8 w-1/5 md:w-screen flex flex-wrap justify-center md:justify-between">
        <div className="flex items-center order-first md:order-2">
          <div className="flex flex-col sm:flex-row text-gray-400 text-center justify-center">
            Made by &nbsp;
            <a
              className="font-semibold text-indigo-500 hover:text-indigo-400 transition hover:-translate-y-1 duration-500"
              href={Constants.NEAT.URL}
            >
              Neat
            </a>
          </div>
        </div>
        <div className="flex order-1">
          <a
            href="https://github.com/neat-run/wrapped"
            className="text-gray-400 hover:text-gray-200 p-3 transition-transform hover:-translate-y-1 hover:rotate-3 duration-500"
            rel="noopener noreferrer"
          >
            Code
          </a>
        </div>

        <div className="flex order-3">
          <Link href="/privacy">
            <a className="text-gray-400 hover:text-gray-200 p-3 transition-transform hover:-translate-y-1 hover:-rotate-3 duration-500">
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
