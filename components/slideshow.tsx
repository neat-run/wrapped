import React, { useEffect, useState } from "react";
import Highlights from "./highlights";
import TopRepos from "./topRepos";
import TopLanguages from "./topLanguages";
import Contributions from "./contributions";
import Follows from "./follows";
import Stars from "./stars";
import Summary from "./summary";
import { User } from "../types/common";
import Loading from "./loading";
import { ArrowRightIcon, ArrowLeftIcon, PlayIcon } from "@modulz/radix-icons";
import Toolbar from "./toolbar";

interface Props {
  user: User;
  hidden: any[];
  setHidden: any;
}

const buttonClass =
  "text-white px-6 py-24 rounded scale-[1.5] hover:scale-[1.8] transition-transform absolute top-1/2 -translate-y-1/2 focus:outline-none";

function Slideshow({ user, hidden, setHidden }: Props) {
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardsToShow = [
    <Highlights user={user} />,
    <TopRepos user={user} />,
    <TopLanguages user={user} />,
    <Follows user={user} hidden={hidden} setHidden={setHidden} />,
    <Stars user={user} hidden={hidden} setHidden={setHidden} />,
    <Contributions user={user} />,
    <Summary user={user} hidden={hidden} setHidden={setHidden} />,
  ];
  const lastSlideIndex = cardsToShow.length - 1;

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((slide) =>
      slide < lastSlideIndex ? slide + 1 : lastSlideIndex
    );
  };

  // Next slide button
  const arrowRight = currentSlide < lastSlideIndex && (
    <button
      className={`${buttonClass} right-6 hover:translate-x-2`}
      onClick={nextSlide}
    >
      <ArrowRightIcon />
    </button>
  );

  // Go to previous slide
  const previousSlide = () => {
    setCurrentSlide((slide) => (slide > 0 ? slide - 1 : 0));
  };

  // Previous slide
  const arrowLeft = currentSlide > 0 && (
    <button
      className={`${buttonClass} left-6 hover:-translate-x-2`}
      onClick={previousSlide}
    >
      <ArrowLeftIcon />
    </button>
  );

  // Show welcome message when user props have been populated
  useEffect(() => {
    if (user.username && loading) {
      setLoading(false);
      setWelcome(true);
    }
  }, [user]);

  // Allow left/right arrow keys to navigate slides
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (!e || !e.key) return;
      else if (["ArrowRight", "k"].includes(e.key)) nextSlide();
      else if (["ArrowLeft", "j"].includes(e.key)) previousSlide();
    };
    window.addEventListener("keydown", handleArrowKeys);
    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, []);

  return (
    <div>
      {loading && <Loading user={user} />}
      {welcome && (
        <div className="text-center text-gray-100 p-5 space-y-10 ">
          {user.username && (
            <div>
              <p className="text-3xl text-white space-x-2 transition-all duration-1000 ease-in">
                {user.avatarUrl && (
                  <img
                    className="w-20 h-20 rounded-full mx-auto mb-4 hover:scale-[1.5]"
                    src={user.avatarUrl}
                    alt={`${user.username}'s avatar'`}
                  />
                )}
                {user.username && <span>Welcome,</span>}
                <span className="font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-l to-[#85259D] via-indigo-600 from-[#6B3EEC]">
                  {user.fullName ? user.fullName : user.username}
                </span>
              </p>
              <button
                className={`text-white rounded scale-[2] p-1 hover:scale-[2.5] mt-5 focus:outline-none transition-colors hover:bg-indigo-600`}
                onClick={() => setWelcome(false)}
              >
                <PlayIcon />
              </button>
            </div>
          )}
        </div>
      )}
      {!loading && !welcome && (
        <div>
          {arrowLeft}
          <div id="wrap" className="flex items-center justify-center bg-black">
            {cardsToShow[currentSlide]}
          </div>
          {arrowRight}
          <Toolbar user={user} />
        </div>
      )}
      {/* <ProgressBar /> */}
    </div>
  );
}

export default Slideshow;
