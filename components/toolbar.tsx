import { useState } from "react";
import {
  TwitterLogoIcon,
  DownloadIcon,
  CopyIcon,
  CheckIcon,
} from "@modulz/radix-icons";
import Tooltip from "../components/tooltip";
import { copy, download } from "../utils/exports";
import { SHORTCUTS } from "../utils/shortcuts";

function Toolbar() {
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  setTimeout(() => {
    setDownloaded(false);
  }, 3 * 1000);

  setTimeout(() => {
    setCopied(false);
  }, 3 * 1000);

  const buttonClass =
    "p-2 hover:bg-gray-500 hover:bg-opacity-20 rounded scale-[1.5] hover:scale-[1.8] focus:outline-none";

  return (
    <div className="p-7 text-white space-x-7">
      <Tooltip content="Copy image" shortcut={SHORTCUTS.copy.sequence}>
        <button
          className={buttonClass}
          onClick={() => {
            copy();
            setCopied(true);
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </Tooltip>

      <Tooltip content="Share to Twitter">
        <button className={buttonClass}>
          <TwitterLogoIcon />
        </button>
      </Tooltip>

      <Tooltip content="Download" shortcut={SHORTCUTS.save.sequence}>
        <button
          className={buttonClass}
          onClick={() => {
            download();
            setDownloaded(true);
          }}
        >
          {downloaded ? <CheckIcon /> : <DownloadIcon />}
        </button>
      </Tooltip>
    </div>
  );
}

export default Toolbar;
