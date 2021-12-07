import React from "react";
import { User } from "../types/common";

interface Props {
  user: User;
}

/**
 * Render the user's top coding languages
 */
function TopLanguages({ user }: Props) {
  const languages = user.topLanguages;

  if (!languages) return <></>;
  return (
    <div className="p-5 text-left space-y-6 text-white">
      <h1 className="text-gray-400 text-xl font-medium">
        You type many tongues
      </h1>
      {languages.map((language, i) => (
        <div
          key={i}
          className="flex items-center space-x-4"
          style={{ color: language.color }}
        >
          <p className={`devicon-${language.name}-plain text-4xl`} />
          <p className="font-mono text-xl">{language.commonName}</p>
        </div>
      ))}
    </div>
  );
}

export default TopLanguages;
