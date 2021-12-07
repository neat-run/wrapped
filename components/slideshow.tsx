import React, { useState } from "react";
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

  // Next slide
  const arrowRight = (
    <button
      className={`${buttonClass} right-6 hover:translate-x-2`}
      onClick={() => {
        setCurrentSlide((slide) =>
          slide < lastSlideIndex ? slide + 1 : lastSlideIndex
        );
      }}
    >
      <ArrowRightIcon />
    </button>
  );

  // Previous slide
  const arrowLeft = (
    <button
      className={`${buttonClass} left-6 hover:-translate-x-2`}
      onClick={() => {
        setCurrentSlide((slide) => (slide > 0 ? slide - 1 : 0));
      }}
    >
      <ArrowLeftIcon />
    </button>
  );

  setTimeout(() => {
    if (loading) setLoading(false);
  }, 5 * 1000);

  return (
    <div>
      {loading ? (
        <Loading user={user} />
      ) : (
        <div id="wrap">
          {currentSlide > 0 && arrowLeft}
          {cardsToShow[currentSlide]}
          {currentSlide < lastSlideIndex && arrowRight}
        </div>
      )}
      {/* <ProgressBar /> */}
      {!loading && <Toolbar user={user} />}
    </div>
  );
}

export default Slideshow;
