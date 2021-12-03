import ProgressBar from "./progressBar";
function Loading() {
  return (
    <div className="text-3xl text-white animate-pulse">
      <div>Loading...</div>
      {/* Add progress bar for better UX */}
    </div>
  );
}

export default Loading;
