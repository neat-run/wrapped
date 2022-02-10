import React, { useState, useEffect } from "react";
import { isSignedIn } from "../utils/supabase";
import Slideshow from "../components/slideshow";
import HeadTags from "../components/headTags";
import SignIn from "../components/signIn";
import { initShortcuts } from "../utils/shortcuts";
import { getByUsername } from "../utils/exports";
import { isDev, getUserStats } from "../utils/utils";
import { defaultUser } from "../utils/default";
import Script from "next/script";
import Summary from "../components/summary";
import DownloadButton from "../components/downloadNeat";
import MusicPlayer from "../components/musicPlayer";
import Footer from "../components/footer";
import ProductHuntBadge from "../components/productHuntBadge";

export default function Home({ hostUser }) {
  const [user, setUser] = useState(defaultUser);
  const [auth, setAuth] = useState(null);

  // Get and store hidden sections in local storage
  const [hidden, setHidden] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("hidden") === null
        ? Array()
        : JSON.parse(localStorage.getItem("hidden"))
      : Array()
  );
  useEffect(() => {
    localStorage.setItem("hidden", JSON.stringify(hidden));
  }, [hidden]);

  // On sign-in, fetch stats and enable keyboard shortcuts
  useEffect(() => {
    (async () => {
      let userStats = await getUserStats();
      setUser(userStats);
      initShortcuts(userStats);
    })();
    checkUser();
    window.addEventListener("hashchange", () => checkUser());
  }, [auth]);

  // Check if user is signed in
  async function checkUser() {
    const auth = await isSignedIn();
    if (auth) setAuth(auth);
  }

  return (
    <div className="flex flex-col items-center bg-black min-h-screen justify-between">
      <HeadTags user={hostUser} />

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
            <ProductHuntBadge />
          </div>
        )}
      </div>

      <Script
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src="https://neat-analytics.up.railway.app/umami.js"
      />

      <Footer />
    </div>
  );
}

// Server-side rendering for viewing others' Wrapped pages
export const getServerSideProps = async (context) => {
  // Get user from subdomain eg. https://nat.wrapped.run
  let hostUser = null;
  let domainParts = context.req.headers.host.split(".");
  if (domainParts.length > (isDev() ? 1 : 2)) {
    try {
      hostUser = await getByUsername(domainParts[0]);
    } catch {
      // Patch to prevent 500 error when no user is found
      hostUser = null;
    }
  }

  return {
    props: {
      hostUser,
    },
  };
};
