import React, { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import KeyboardShortcut from "./shortcut";

/**
 * Opens a modal to confirm something with the user
 * @param children element for trigger button
 * @param onSubmit method to call when submit is clicked. Cancel closes the modal.
 * @param defaultOpen whether the modal is open
 * @param title header to show
 * @param description paragraph to show
 * @returns modal
 */
function Modal({ children, onSubmit, defaultOpen, title, description }) {
  const [open, setOpen] = useState(defaultOpen);

  // Allow enter key to submit the modal
  useEffect(() => {
    const handleEnterKey = (e) => {
      if (!open) return;

      if (e.key && e.key == "Enter") {
        onSubmit();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [open]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger className="focus:outline-none">
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="bg-black/50 backdrop-blur-sm fixed inset-0" />
      <AlertDialog.Content className="bg-gray-900/80 backdrop-blur rounded-lg shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-96 p-4 focus:outline-none flex flex-col justify-between">
        <div
          className="fixed p-2 -translate-x-20 -translate-y-12 cursor-pointer hover:scale-105 transition"
          onClick={() => setOpen(false)}
        >
          <KeyboardShortcut shortcut={"esc"} />
        </div>
        <div className="space-y-6">
          <AlertDialog.Title className="font-bold text-2xl text-gray-200">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-400 my-2">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end space-x-3 pt-2">
            <AlertDialog.Cancel asChild>
              <button className="rounded-md hover:bg-gray-600/80 transition text-gray-300 py-1.5 px-4 focus:outline-none">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild onClick={onSubmit}>
              <button className="flex items-center rounded-md font-medium bg-gray-700/70 hover:bg-gray-600/80 transition text-white p-1.5 focus:outline-none">
                <p className="ml-2 mr-1">Confirm</p>
                <KeyboardShortcut shortcut="enter" />
              </button>
            </AlertDialog.Action>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default Modal;
