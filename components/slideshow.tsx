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
import Background from "./background";

interface Props {
  user: User;
  hidden: any[];
  setHidden: any;
}

const buttonClass =
  "text-white px-6 py-24 rounded scale-[1.5] hover:scale-[1.8] group transition absolute top-1/2 -translate-y-1/2 focus:outline-none";

function Slideshow({ user, hidden, setHidden }: Props) {
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardsToShow = [
    <Highlights user={user} hidden={hidden} setHidden={setHidden} />,
    <TopRepos user={user} hidden={hidden} setHidden={setHidden} />,
    <TopLanguages user={user} hidden={hidden} setHidden={setHidden} />,
    <Follows user={user} hidden={hidden} setHidden={setHidden} />,
    <Stars user={user} hidden={hidden} setHidden={setHidden} />,
    <Contributions user={user} hidden={hidden} setHidden={setHidden} />,
    <Summary
      user={user}
      hidden={hidden}
      setHidden={setHidden}
      showHide={true}
    />,
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
    <button className={`${buttonClass} right-8`} onClick={nextSlide}>
      <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
    </button>
  );

  // Go to previous slide
  const previousSlide = () => {
    setCurrentSlide((slide) => (slide > 0 ? slide - 1 : 0));
  };

  // Previous slide
  const arrowLeft = currentSlide > 0 && (
    <button className={`${buttonClass} left-8`} onClick={previousSlide}>
      <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
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
            <div className="space-y-10">
              <p className="text-3xl text-white space-x-2 transition-all duration-1000 ease-in">
                {user.avatarUrl && (
                  <img
                    className="w-20 h-20 rounded-full mx-auto mb-5 hover:scale-[1.5] transition"
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
                className={`text-white rounded scale-[2] p-1 hover:scale-[2.5] mt-5 transition ease-out hover:bg-indigo-600 shadow-xl shadow-indigo-600/80 hover:shadow-none`}
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
          <div id="wrap">
            <Background currentSlide={currentSlide} />

            <div className="flex items-center justify-center p-5 min-w-[800px] min-h-[600px] rounded-lg bg-gray-900/80 backdrop-blur-3xl card-border">
              {cardsToShow[currentSlide]}
            </div>
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
