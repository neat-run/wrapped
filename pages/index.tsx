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
import Script from "next/script";
import Summary from "../components/summary";
import DownloadButton from "../components/downloadNeat";
import MusicPlayer from "../components/musicPlayer";
import { GitHubLogoIcon } from "@modulz/radix-icons";

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
    <div className="flex flex-col items-center bg-black min-h-screen justify-between">
      <HeadTags user={hostUser} />

      {/* <div className="grid place-items-center h-screen"> */}
      <div className="flex flex-col w-full flex-1 items-center justify-center">
        <div
          className={`flex items-baseline absolute font-bold tracking-tighter z-10 transition-all duration-1000 ease-out mb-5 ${
            auth || hostUser
              ? "text-xl flex-row top-3"
              : "text-4xl sm:text-6xl md:text-8xl flex-col md:flex-row top-1/4"
          }`}
        >
          <h1 className="w-full text-center">GitHub</h1>
          <h1
            className={`w-full font-mono pl-2 ${
              auth || hostUser
                ? "text-indigo-600"
                : "text-transparent bg-clip-text bg-gradient-to-l to-[#85259D] via-purple-600 from-[#6B3EEC]"
            }`}
          >
            Wrapped
          </h1>
        </div>
        {auth ? (
          <Slideshow user={user} hidden={hidden} setHidden={setHidden} />
        ) : hostUser ? (
          <div className="flex flex-col">
            <div className="text-gray-400 text-lg pt-12 pb-2 text-center">
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
            <div className="flex items-center justify-center p-5 sm:min-w-[800px] min-h-[600px] rounded-lg bg-gray-900/80 backdrop-blur-3xl card-border">
              <Summary
                user={hostUser}
                hidden={hidden}
                setHidden={setHidden}
                showHide={false}
              />
            </div>
            <div className="text-white fixed bottom-8 right-8">
              <MusicPlayer buttonClass="p-2 hover:bg-gray-800/90 text-gray-100 rounded scale-[1.5] hover:scale-[2] focus:outline-none" />
            </div>
            <SignIn auth={auth} setAuth={setAuth} />
            <DownloadButton />
          </div>
        ) : (
          <div className="flex flex-col items-center pt-40 space-y-10">
            <SignIn auth={auth} setAuth={setAuth} />
            <a
              href="https://www.producthunt.com/posts/github-wrapped-4?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-github-wrapped-4"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=322830&theme=dark"
                alt="GitHub Wrapped - Your year in code | Product Hunt"
                width="250"
                height="54"
              />
            </a>
          </div>
        )}
      </div>

      <Script
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src="https://neat-analytics.up.railway.app/umami.js"
      />

      <footer className="px-0 md:px-8 w-1/5 md:w-full flex flex-wrap justify-center md:justify-between">
        <div className="flex items-center order-first md:order-2">
          <div className="m-3 flex whitespace-nowrap text-gray-400 text-center justify-center">
            Made by&nbsp;
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
            target="_blank"
            className="text-gray-400 hover:text-gray-200 m-3 transition-transform hover:-translate-y-1 hover:rotate-3 duration-500 scale-[1.8]"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon />
          </a>
        </div>

        <div className="flex order-3">
          <Link href="/privacy">
            <a className="text-gray-400 hover:text-gray-200 m-3 transition-transform hover:-translate-y-1 hover:-rotate-3 duration-500">
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
