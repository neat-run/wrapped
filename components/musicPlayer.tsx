import { SpeakerLoudIcon, SpeakerQuietIcon } from "@modulz/radix-icons";
import React, { useState } from "react";
import Tooltip from "./tooltip";

const audio =
  typeof Audio != "undefined"
    ? new Audio(
        "https://www.chosic.com/wp-content/uploads/2021/08/Loyalty_Freak_Music_-_04_-_It_feels_good_to_be_alive_too.mp3"
      )
    : null;

/**
 * Plays ambient music
 */
function MusicPlayer({ buttonClass }) {
  const [musicPlaying, setMusicPlaying] = useState(false);

  if (!audio) return <></>;
  return (
    <Tooltip content={musicPlaying ? "Pause music" : "Play music"}>
      <button
        className={buttonClass}
        onClick={() => {
          // Play or pause music
          musicPlaying ? audio.pause() : audio.play();
          setMusicPlaying((state) => !state);
        }}
      >
        {musicPlaying ? <SpeakerLoudIcon /> : <SpeakerQuietIcon />}
      </button>
    </Tooltip>
  );
}

export default MusicPlayer;
