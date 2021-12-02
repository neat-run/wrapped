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
    <div className="p-5 text-left space-y-5 text-white">
      <p>You type many tongues</p>
      {languages.map((language, i) => (
        <div key={i} className="flex items-center space-x-2">
          <p
            className={`devicon-${language.name}-plain text-4xl`}
            style={{ color: language.color }}
          />
          <p>{language.commonName}</p>
        </div>
      ))}
    </div>
  );
}

export default TopLanguages;
