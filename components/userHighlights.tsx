import React from "react";
import { User } from "../types/common";

interface Props {
  user: User;
}

/**
 * Fetch and display the user's top
 * @returns {element} div with text
 */
function UserHighlights({ user }: Props) {
  return (
    <div className="p-5 text-left space-y-5 text-white">
      <div>
        You have no commitment issues
        <p className="text-5xl font-bold">{user?.commits}</p>
        commits
      </div>
      <div>
        You carry your weight
        <p className="text-5xl font-bold">{user?.contributions}</p>
        total contributions
      </div>
      <div>
        You code far and wide
        <p className="text-5xl font-bold">{user?.repos}</p>
        repos
      </div>
      <div>
        PRs are your forte
        <p className="text-5xl font-bold">{user?.pulls}</p>
        contributions
      </div>
      <div>
        Your team loves you for your
        <p className="text-5xl font-bold">{user?.reviews}</p>
        PR reviews
      </div>
    </div>
  );
}

export default UserHighlights;
