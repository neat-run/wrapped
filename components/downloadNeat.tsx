import React, { useEffect, useState } from "react";
import axios from "axios";

const downloadErrorMessage =
  "Woops! Something went wrong. Please contact us if this happens again.";

/**
 * Button to download the app installer from the latest release
 * @returns <button> which downloads the .dmg and alerts the user when clicked
 */
function DownloadButton() {
  const [downloadURL, setDownloadURL] = useState(
    "https://github.com/neat-run/activity-feed-public/releases/download/v0.0.35/Neat-0.0.35.dmg"
  );
  const [downloadName, setDownloadName] = useState("Neat.dmg");
  const [downloaded, setDownloaded] = useState(false);
  const [message, setMessage] = useState("Free to use. Log in with GitHub.");

  // Get the download URL from the latest release.
  useEffect(() => {
    axios({
      url: "https://api.github.com/repos/neat-run/activity-feed-public/releases/latest",
      headers: { Accept: "application/vnd.github.v3+json" },
      method: "GET",
    })
      .then((response) => {
        if (response.status !== 200 || !response.data) return;

        // Get the DMG download URL
        response.data.assets
          .filter((asset) => asset.browser_download_url.includes(".dmg"))
          .filter((asset) => !asset.browser_download_url.includes(".blockmap"))
          .map((dmg) => {
            setDownloadURL(dmg.browser_download_url);
            setDownloadName(dmg.name);
          });
      })
      .catch(() => {
        setMessage(downloadErrorMessage);
        setTimeout(() => setMessage(""), 6 * 1000);
      });
  }, []);

  // Download the app installer (.dmg)
  const fetchFile = () => {
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = downloadName;
    link.click();

    // Tell the user what to do next
    setMessage("Thanks for downloading! Install then sign in with GitHub.");
    setDownloaded(true);
  };

  return (
    <div className="py-20 hidden md:flex flex-col items-center">
      <p className="text-gray-400 text-lg font-light py-10 max-w-xl">
        You're active on GitHub. <br />
        You need to know when a PR is ready to review or merge.
        <br />
        <br />
        <span className="font-bold pr-1">Neat</span>
        puts important GitHub notifications in your menu bar. <br />
        Keyboard navigation. Unread. Pin to top. Quick reactions. <br />
        <br />
        We built this site in one week by working on one branch with Neat.
      </p>
      <button onClick={fetchFile} className="focus:outline-none">
        <div
          className={`${
            downloaded ? "invisible h-12" : ""
          } flex items-center space-x-1 text-lg text-white justify-around p-4 px-9 border-2 border-gray-600/80 hover:bg-white hover:text-black rounded-md transition`}
        >
          <span>Try </span>
          <span className="font-bold">Neat</span>
          <span> for macOS</span>
        </div>
      </button>
      <p
        className={`${
          downloaded
            ? "text-gray-400 text-lg font-medium"
            : "text-gray-400 text-sm"
        } mt-2`}
      >
        {message}
      </p>
    </div>
  );
}

export default DownloadButton;
