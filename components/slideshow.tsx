import React, { useEffect, useRef, useState } from "react";
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
import Tooltip from "./tooltip";
import Tilt from "vanilla-tilt";

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

  // Add tilt effect to card
  const tilt = useRef(null);
  const options = {
    max: 3, // degrees
    perspective: 1000,
    reverse: true,
    transition: false,
  };
  useEffect(() => {
    if (tilt.current && !window.matchMedia("(pointer: coarse)").matches) {
      Tilt.init(tilt.current, options);
    }
  }, [tilt]);

  // Slide components
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
    <button
      name="next-slide"
      className={`${buttonClass} right-8`}
      onClick={nextSlide}
    >
      <Tooltip content="Next slide" shortcut="right">
        <div>
          <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Tooltip>
    </button>
  );

  // Go to previous slide
  const previousSlide = () => {
    setCurrentSlide((slide) => (slide > 0 ? slide - 1 : 0));
  };

  // Previous slide
  const arrowLeft = currentSlide > 0 && (
    <button
      name="previous-slide"
      className={`${buttonClass} left-8`}
      onClick={previousSlide}
    >
      <Tooltip content="Previous slide" shortcut="left">
        <div>
          <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
        </div>
      </Tooltip>
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
              <p className="text-3xl text-white space-x-2 transition-all duration-1000 ease-in items-baseline">
                {user.avatarUrl && (
                  <img
                    className="w-20 h-20 rounded-full mx-auto mb-5 hover:scale-[1.5] transition"
                    src={user.avatarUrl}
                    alt={`${user.username}'s avatar'`}
                  />
                )}
                {user.username && (
                  <span className="font-bold text-gray-200">Welcome,</span>
                )}
                <span className="font-mono text-transparent bg-clip-text bg-gradient-to-l to-blue-600 via-indigo-600 from-purple-600">
                  {user.fullName ? user.fullName : user.username}
                </span>
              </p>
              <button
                className={`text-white rounded scale-[2] p-2 hover:scale-[2.25] mt-5 transition ease-out hover:bg-indigo-600 shadow-xl shadow-indigo-600/80 hover:shadow-none`}
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
          <div
            id="wrap"
            ref={tilt}
            className="pt-12 px-5 sm:p-10 bg-black w-screen sm:w-auto sm:min-w-[800px]"
          >
            <Background currentSlide={currentSlide} />
            <div className="flex items-center justify-center min-h-[600px] rounded-lg bg-gray-900/80 backdrop-blur-3xl">
              {cardsToShow[currentSlide]}
            </div>
          </div>
          {arrowRight}
          <Toolbar user={user} hidden={hidden} setHidden={setHidden} />
        </div>
      )}
    </div>
  );
}

export default Slideshow;
