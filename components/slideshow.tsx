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
import { ArrowRightIcon, ArrowLeftIcon } from "@modulz/radix-icons";
import Toolbar from "./toolbar";

interface Props {
  user: User;
}

const buttonClass =
  "text-white px-6 py-24 rounded scale-[1.5] hover:scale-[1.8] transition-transform absolute top-1/2 -translate-y-1/2 focus:outline-none";

function Slideshow({ user }: Props) {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardsToShow = [
    <Highlights user={user} />,
    <TopRepos user={user} />,
    <TopLanguages user={user} />,
    <Follows user={user} />,
    <Stars user={user} />,
    <Contributions user={user} />,
    <Summary user={user} />,
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

  setTimeout(() => {
    if (loading) setLoading(false);
  }, 5 * 1000);

  // Allow left/right arrow keys to navigate slides
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (!e || !e.key) return;
      if (e.key == "ArrowRight") nextSlide();
      else if (e.key == "ArrowLeft") previousSlide();
    };
    window.addEventListener("keydown", handleArrowKeys);
    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <Loading user={user} />
      ) : (
        <div>
          {arrowLeft}
          <div id="wrap" className="flex items-center justify-center">
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
