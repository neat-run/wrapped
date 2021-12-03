import React, { useState } from "react";
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

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Overlay className="bg-black/80 fixed inset-0" />
      <AlertDialog.Content className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 p-5 focus:outline-none flex flex-col justify-between">
        <div
          className="fixed -translate-x-20 -translate-y-12 cursor-pointer hover:scale-105 transition"
          onClick={() => setOpen(false)}
        >
          <KeyboardShortcut shortcut={"esc"} />
        </div>
        <div className="space-y-5">
          <AlertDialog.Title className="font-bold text-2xl text-gray-200">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-400 my-2">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end space-x-3">
            <AlertDialog.Cancel asChild>
              <button className="rounded-md hover:bg-gray-600/80 transition text-gray-300 py-1 px-4 focus:outline-none">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild onClick={onSubmit}>
              <button className="rounded-md font-medium bg-gray-700/70 hover:bg-gray-600/80 transition text-white py-1 px-4 focus:outline-none">
                YOLO, do it
              </button>
            </AlertDialog.Action>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default Modal;
