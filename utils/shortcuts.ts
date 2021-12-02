import Mousetrap from "mousetrap";
import { copyImage, copyPublicLink, download } from "./exports";
import { getUser, signIn } from "./supabase";

/**
 * Add keyboard shortcuts here! They'll be bound in
 * Mousetrap below and can be accessed in tooltips.
 */
export const SHORTCUTS = {
  save: {
    sequence: "command+s",
    method: (e) => {
      e.preventDefault();
      download();
    },
  },
  copyImage: {
    sequence: "command+c",
    method: (e) => {
      e.preventDefault();
      copyImage();
    },
  },
  copyURL: {
    sequence: "command+shift+c",
    method: async (e) => {
      e.preventDefault();
      copyPublicLink();
    },
  },
  signIn: {
    sequence: "s",
    method: async (e) => {
      e.preventDefault();
      // Ignore if already signed in
      let signedIn = await getUser();
      if (signedIn) return;

      signIn();
    },
  },
};

/**
 * Initializes keyboard shortcuts
 */
export function initShortcuts() {
  Object.values(SHORTCUTS).map((shortcut) =>
    Mousetrap.bind(shortcut.sequence, shortcut.method)
  );
}
