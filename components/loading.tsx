import { User } from "../types/common";

interface IProps {
  user: User;
}

/**
 * Loading component
 * @param {User} user for username etc
 */
function Loading({ user }: IProps) {
  return (
    <div className="text-center text-gray-100 p-5 space-y-10">
      <p className="text-3xl text-white space-x-2">
        {user.avatarUrl && (
          <img
            className="w-20 h-20 rounded-full mx-auto mb-4"
            src={user.avatarUrl}
            alt={`${user.username}'s avatar'`}
          />
        )}
        <span>Welcome,</span>
        <span className="font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-l to-[#85259D] via-indigo-600 from-[#6B3EEC]">
          {user.fullName ? user.fullName : user.username}
        </span>
      </p>
      <div className="text-xl font-medium text-gray-400 animate-pulse">
        Loading...
      </div>
      {/* Add progress bar for better UX */}
    </div>
  );
}

export default Loading;
