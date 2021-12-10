import React from "react";
import { User } from "../types/common";
import Hide from "./hide";

interface Props {
  user: User;
  hidden: any[];
  setHidden: any;
}

/**
 * Render the user's top coding languages
 */
function TopLanguages({ user, hidden, setHidden }: Props) {
  const languages = user.topLanguages;
  const stat: keyof User = "topLanguages";

  if (!languages || hidden.includes(stat)) return <></>;

  return (
    <div className="m-5 text-left group">
      <h1 className="text-gray-400 text-xl font-medium mb-2">
        {
          [
            "You speak my language",
            "You're multilingual",
            "No language barriers",
          ][~~(Math.random() * 3)]
        }
      </h1>
      <div className="space-y-5 text-white">
        {languages.map((language, i) => (
          <div
            key={i}
            className="flex items-center space-x-3"
            style={{ color: language.color }}
          >
            <p className="text-3xl font-medium text-gray-600">#{i + 1}</p>
            <p className={`devicon-${language.name}-plain text-4xl`} />
            <p className="font-mono text-xl">{language.commonName}</p>
          </div>
        ))}
      </div>
      <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
    </div>
  );
}

export default TopLanguages;
