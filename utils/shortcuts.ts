import Mousetrap from "mousetrap";
import { copy, download } from "./exports";
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
  copy: {
    sequence: "command+c",
    method: (e) => {
      e.preventDefault();
      copy();
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
