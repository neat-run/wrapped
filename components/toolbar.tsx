import { TwitterLogoIcon, DownloadIcon, CopyIcon } from "@modulz/radix-icons";
import Tooltip from "../components/tooltip";

function Toolbar() {
  const buttonClass = "p-5 hover:bg-gray-500 hover:bg-opacity-20 rounded";
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
        <button className={buttonClass}>
          <DownloadIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default Toolbar;
