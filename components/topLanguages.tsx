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
    <div className="p-5 text-left">
      <h1 className="text-gray-400 text-xl font-medium mb-2">
        You type many tongues
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
    </div>
  );
}

export default TopLanguages;
