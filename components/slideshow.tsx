import { useState } from "react";
import UserHighlights from "./userHighlights";
import TopRepos from "./topRepos";
import TopLanguages from "./topLanguages";
import Contributions from "./contributions";
import Follows from "./follows";
import Stars from "./stars";
import Summary from "./summary";
import { User } from "../types/common";
import Loading from "./loading";
import { ArrowRightIcon, ArrowLeftIcon } from "@modulz/radix-icons";

interface Props {
  user: User;
}

const buttonClass =
  "text-white p-2 rounded scale-[1.5] hover:scale-[1.8] focus:outline-none";

function Slideshow({ user }: Props) {
  const [loading, setLoading] = useState(true);
  const cardsToShow = [
    "userHighlights",
    "topRepos",
    "topLanguages",
    "follows",
    "stars",
    "contributions",
  ];
  const [slideUserHighlights, setSlideUserHighlights] = useState(false);
  const [slideTopRepos, setSlideTopRepos] = useState(false);
  const [slideTopLanguages, setSlideTopLanguages] = useState(false);
  const [slideFollows, setSlideFollows] = useState(false);
  const [slideStars, setSlideStars] = useState(false);
  const [slideContributions, setSlideContributions] = useState(false);
  const [summary, setSummary] = useState(false);

  setTimeout(() => {
    if (loading) {
      setLoading(false);
      setSlideUserHighlights(true);
    }
  }, 5 * 1000);
  return (
    <div>
      {loading && <Loading />}
      {slideUserHighlights && (
        <div className="flex flex-row">
          <UserHighlights user={user} />
          <button
            className={buttonClass}
            onClick={() => {
              setSlideUserHighlights(false);
              setSlideTopRepos(true);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {slideTopRepos && (
        <div className="flex flex-row">
          <button
            className={buttonClass}
            onClick={() => {
              setSlideTopRepos(false);
              setSlideUserHighlights(true);
            }}
          >
            <ArrowLeftIcon />
          </button>
          <TopRepos user={user} />
          <button
            className={buttonClass}
            onClick={() => {
              setSlideTopRepos(false);
              setSlideTopLanguages(true);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {slideTopLanguages && (
        <div className="flex flex-row">
          <button
            className={buttonClass}
            onClick={() => {
              setSlideTopLanguages(false);
              setSlideTopRepos(true);
            }}
          >
            <ArrowLeftIcon />
          </button>
          <TopLanguages user={user} />
          <button
            className={buttonClass}
            onClick={() => {
              setSlideTopLanguages(false);
              setSlideFollows(true);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {slideFollows && (
        <div className="flex flex-row">
          <button
            className={buttonClass}
            onClick={() => {
              setSlideFollows(false);
              setSlideTopLanguages(true);
            }}
          >
            <ArrowLeftIcon />
          </button>
          <Follows user={user} />
          <button
            className={buttonClass}
            onClick={() => {
              setSlideFollows(false);
              setSlideStars(true);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {slideStars && (
        <div className="flex flex-row">
          <button
            className={buttonClass}
            onClick={() => {
              setSlideStars(false);
              setSlideFollows(true);
            }}
          >
            <ArrowLeftIcon />
          </button>
          <Stars />
          <button
            className={buttonClass}
            onClick={() => {
              setSlideStars(false);
              setSlideContributions(true);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {slideContributions && (
        <div className="flex flex-row">
          <button
            className={buttonClass}
            onClick={() => {
              setSlideContributions(false);
              setSlideStars(true);
            }}
          >
            <ArrowLeftIcon />
          </button>
          <Contributions />
          <button
            className={buttonClass}
            onClick={() => {
              setSlideContributions(false);
              setSummary(true);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {summary && <Summary user={user} />}
      {/* {cardsToShow.map((card) => {
        switch (card) {
          case "userHighlights":
            return <UserHighlights user={user} />;
          case "topRepos":
            return <TopRepos />;
          case "topLanguages":
            return <TopLanguages user={user} />;
          case "follows":
            return <Follows />;
          case "stars":
            return <Stars />;
          case "contributions":
            return <Contributions />;
        }
      })}
      */}
      {/* <ProgressBar /> */}
      {/* <Toolbar user={user} /> */}
    </div>
  );
}

export default Slideshow;
