import { User } from "@supabase/gotrue-js";
import Mousetrap from "mousetrap";
import { copyImage, copyPublicLink, download } from "./exports";
import { isSignedIn, signIn } from "./supabase";

/**
 * Add keyboard shortcuts here! They'll be bound in
 * Mousetrap below and can be accessed in tooltips.
 */
export const SHORTCUTS = {
  save: {
    sequence: "command+s",
    method: (e, user) => {
      e.preventDefault();
      download();
    },
  },
  copyImage: {
    sequence: "command+c",
    method: (e, user) => {
      e.preventDefault();
      copyImage();
    },
  },
  copyURL: {
    sequence: "command+shift+c",
    method: async (e, user) => {
      e.preventDefault();
      copyPublicLink(user);
    },
  },
  signIn: {
    sequence: "s",
    method: async (e, user) => {
      e.preventDefault();
      // Ignore if already signed in
      let signedIn = await isSignedIn();
      if (signedIn) return;

      signIn();
    },
  },
};

/**
 * Initializes keyboard shortcuts
 */
export function initShortcuts(user: User) {
  Object.values(SHORTCUTS).map((shortcut) =>
    Mousetrap.bind(shortcut.sequence, (e) => shortcut.method(e, user))
  );
}
