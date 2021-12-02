import { useState, useEffect } from "react";
import { getUser } from "../utils/supabase";
import Constants from "../utils/constants";
import UserHighlights from "../components/userHighlights";
import TopRepos from "../components/topRepos";
import TopLanguages from "../components/topLanguages";
import Contributions from "../components/contributions";
import Follows from "../components/follows";
import HeadTags from "../components/headTags";
import Toolbar from "../components/toolbar";
import SignInOut from "../components/signInOut";
import { initShortcuts } from "../utils/shortcuts";
import { getByUsername } from "../utils/exports";
import { isDev } from "../utils/utils";

export default function Home({ socialPreview, hostUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initShortcuts();
    checkUser();
    window.addEventListener("hashchange", () => checkUser());
  }, []);

  // Check if user exists
  async function checkUser() {
    const user = await getUser();
    if (user) setUser(user);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
      <HeadTags socialPreview={socialPreview} />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="flex text-6xl font-bold text-white mb-5">
          GitHub <p className="pl-2 text-purple-700">Wrapped</p>
        </h1>
        <SignInOut user={user} setUser={setUser} />
        {user ? (
          <div>
            <div className="text-white p-5 flex justify-center items-center space-x-5">
              {user.user_metadata.avatar_url && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.user_metadata.avatar_url}
                  alt={`${user.user_metadata.full_name}'s avatar'`}
                />
              )}
              <p>
                Hey,{" "}
                {user.user_metadata.full_name
                  ? user.user_metadata.full_name
                  : user.email}
                , you're logged in!
              </p>
            </div>
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 mt-5 p-10"
              id="wrap"
            >
              <div className="flex space-x-5 rounded-xl bg-gray-900/80 border border-gray-500">
                <UserHighlights props={hostUser} />
                <TopRepos />
                <TopLanguages />
                <Follows />
              </div>
              <Contributions />
            </div>
            <Toolbar />
          </div>
        ) : hostUser ? (
          <div>
            <div className="text-white pt-5">
              Welcome to {hostUser.username}'s year in review.
            </div>
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 mt-5 p-10"
              id="wrap"
            >
              <div className="flex space-x-5 rounded-xl bg-gray-900/80 border border-gray-500">
                <UserHighlights hostUser={hostUser} />
                {/* <TopRepos /> */}
                {/* <TopLanguages /> */}
                {/* <Contributions /> */}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
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

// Server-side rendering for viewing others' Wrapped pages
export const getServerSideProps = async (context) => {
  let socialPreview = await fetch(
    "https://jsonplaceholder.typicode.com/photos/1"
  );
  socialPreview = await socialPreview.json();

  // Get user from subdomain eg. https://nat.wrapped.run
  let hostUser = {};
  let domainParts = context.req.headers.host.split(".");
  if (domainParts.length > (isDev() ? 1 : 2)) {
    hostUser = await getByUsername(domainParts[0]);
  }

  return {
    props: {
      socialPreview,
      hostUser: hostUser ?? null,
    },
  };
};
