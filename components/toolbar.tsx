import React, { useState } from "react";
import {
  TwitterLogoIcon,
  DownloadIcon,
  CopyIcon,
  Link2Icon,
  CheckIcon,
} from "@modulz/radix-icons";
import Tooltip from "../components/tooltip";
import {
  copyImage,
  copyPublicLink,
  download,
  getPublicLink,
} from "../utils/exports";
import { SHORTCUTS } from "../utils/shortcuts";
import { User } from "../types/common";
import Modal from "./modal";

interface Props {
  user: User;
}

function Toolbar({ user }: Props) {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  setTimeout(() => {
    setDownloaded(false);
    setCopiedImage(false);
    setCopiedLink(false);
  }, 3 * 1000);

  const buttonClass =
    "p-2 hover:bg-gray-500 hover:bg-opacity-20 rounded scale-[1.5] hover:scale-[1.8] focus:outline-none";

  return (
    <div className="p-7 text-white space-x-7 flex items-center justify-center">
      <Tooltip content="Copy image" shortcut={SHORTCUTS.copyImage.sequence}>
        <button
          className={buttonClass}
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
        defaultOpen={modalOpen}
        title={"Heads up"}
        description={
          "Any info you see, including private repositories, will be publicly accessible via your username."
        }
      >
        <Tooltip content="Copy link" shortcut={SHORTCUTS.copyURL.sequence}>
          <div className={buttonClass} onClick={() => setModalOpen(true)}>
            {copiedLink ? <CheckIcon /> : <Link2Icon />}
          </div>
        </Tooltip>
      </Modal>

      <Tooltip content="Share to Twitter">
        <button
          className={buttonClass}
          onClick={async () => {
            // TODO: encode the Wrapped banner in a shareable URL
            let publicLink = await getPublicLink(user);
            window.open(
              `https://twitter.com/intent/tweet?text=Check%20out%20my%20GitHub%20Wrapped!&url=${publicLink}`,
              "_blank"
            );
          }}
        >
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
