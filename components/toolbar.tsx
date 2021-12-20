import React, { useState } from "react";
import {
  TwitterLogoIcon,
  DownloadIcon,
  CopyIcon,
  Link2Icon,
  CheckIcon,
  ResetIcon,
} from "@modulz/radix-icons";
import Tooltip from "../components/tooltip";
import {
  copyImage,
  copyPublicLink,
  download,
  getPublicLink,
  publishUser,
  undo,
} from "../utils/exports";
import { SHORTCUTS } from "../utils/shortcuts";
import { User } from "../types/common";
import Modal from "./modal";
import MusicPlayer from "./musicPlayer";

interface IProps {
  user: User;
  hidden: any[];
  setHidden: any;
}

function Toolbar({ user, hidden, setHidden }: IProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [twitterModalOpen, setTwitterModalOpen] = useState(false);

  setTimeout(() => {
    setDownloaded(false);
    setCopiedImage(false);
    setCopiedLink(false);
  }, 3 * 1000);

  const buttonClass =
    "p-2 hover:bg-gray-800/90 text-gray-100 rounded scale-[1.5] hover:scale-[2] mt-5 focus:outline-none";

  return (
    <div className="p-7 text-white space-x-7 flex items-center justify-center fixed left-1/2 -translate-x-1/2 bottom-8">
      {hidden.length > 0 && (
        <Tooltip content="Undo">
          <button
            className={buttonClass}
            onClick={() => {
              undo(user, hidden, setHidden);
            }}
          >
            <ResetIcon />
          </button>
        </Tooltip>
      )}

      <Tooltip content="Copy image" shortcut={SHORTCUTS.copyImage.sequence}>
        <button
          className={`${buttonClass} ${copiedImage ? "text-green-500" : ""}`}
          onClick={() => {
            copyImage();
            setCopiedImage(true);
          }}
        >
          {copiedImage ? <CheckIcon /> : <CopyIcon />}
        </button>
      </Tooltip>

      <Modal
        onSubmit={() => {
          copyPublicLink(user);
          setCopiedLink(true);
        }}
        defaultOpen={linkModalOpen}
        title={"Heads up"}
        description={
          "Any info you see, including private repositories, will be publicly accessible via your username."
        }
      >
        <Tooltip content="Copy link" shortcut={SHORTCUTS.copyURL.sequence}>
          <div
            className={`${buttonClass} ${copiedLink ? "text-green-500" : ""}`}
            onClick={() => setLinkModalOpen(true)}
          >
            {copiedLink ? <CheckIcon /> : <Link2Icon />}
          </div>
        </Tooltip>
      </Modal>

      <Modal
        onSubmit={async () => {
          await publishUser(user);
          let publicLink = getPublicLink(user);
          window.open(
            `https://twitter.com/intent/tweet?text=Check%20out%20my%20GitHub%20Wrapped!&url=${publicLink}`,
            "_blank"
          );
        }}
        defaultOpen={twitterModalOpen}
        title={"Heads up"}
        description={
          "Any info you see, including private repositories, will be publicly accessible via your username."
        }
      >
        <Tooltip content="Share to Twitter">
          <div
            className={buttonClass}
            onClick={() => setTwitterModalOpen(true)}
          >
            <TwitterLogoIcon />
          </div>
        </Tooltip>
      </Modal>

      <Tooltip content="Download" shortcut={SHORTCUTS.save.sequence}>
        <button
          className={`${buttonClass} ${downloaded ? "text-green-500" : null}`}
          onClick={() => {
            download(user);
            setDownloaded(true);
          }}
        >
          {downloaded ? <CheckIcon /> : <DownloadIcon />}
        </button>
      </Tooltip>

      <MusicPlayer buttonClass={buttonClass} />
    </div>
  );
}

export default Toolbar;
