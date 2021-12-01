import { useState } from "react";
import {
  TwitterLogoIcon,
  DownloadIcon,
  CopyIcon,
  CheckIcon,
} from "@modulz/radix-icons";
import Tooltip from "../components/tooltip";
import domtoimage from "dom-to-image";
import saveAs from "file-saver";

function Toolbar() {
  const [downloaded, setDownloaded] = useState(false);

  setTimeout(() => {
    setDownloaded(false);
  }, 3 * 1000);

  const buttonClass =
    "p-2 hover:bg-gray-500 hover:bg-opacity-20 rounded scale-[1.5] hover:scale-[1.8]";

  function download() {
    let canvas = document.getElementById("wrap");
    domtoimage.toBlob(canvas).then(function (blob) {
      saveAs(blob, "wrapped.png");
    });
  }
  return (
    <div className="p-7 text-white space-x-7">
      <Tooltip content="Copy image">
        <button className={buttonClass}>
          <CopyIcon />
        </button>
      </Tooltip>

      <Tooltip content="Share to Twitter">
        <button className={buttonClass}>
          <TwitterLogoIcon />
        </button>
      </Tooltip>

      <Tooltip content="Download">
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
