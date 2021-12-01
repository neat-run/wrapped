import { TwitterLogoIcon, DownloadIcon, CopyIcon } from "@modulz/radix-icons";
import Tooltip from "../components/tooltip";
import domtoimage from "dom-to-image";
import saveAs from "file-saver";

function Toolbar() {
  const buttonClass = "p-5 hover:bg-gray-500 hover:bg-opacity-20 rounded";

  function download() {
    let canvas = document.getElementById("wrap");
    domtoimage.toBlob(canvas).then(function (blob) {
      saveAs(blob, "wrapped.png");
    });
  }
  return (
    <div className="mt-5 text-white space-x-3">
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
        <button className={buttonClass} onClick={download}>
          <DownloadIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default Toolbar;
