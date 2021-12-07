/**
 * Loading component
 * @param {User} user for username etc
 */
function Loading({ user }) {
  return (
    <div className="flex flex-col items-center text-gray-100 p-5 space-y-4">
      {user.avatarUrl && (
        <img
          className="w-12 h-12 rounded-full"
          src={user.avatarUrl}
          alt={`${user.username}'s avatar'`}
        />
      )}
      <p className="text-2xl font-medium text-white">
        Welcome, {user.username}.
      </p>
      <div className="text-3xl text-white animate-pulse">Loading...</div>
      {/* Add progress bar for better UX */}
    </div>
  );
}

export default Loading;
