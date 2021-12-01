import Mousetrap from "mousetrap";
import { copy, download } from "./exports";

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
};

/**
 * Initializes keyboard shortcuts
 */
export function initShortcuts() {
  Object.values(SHORTCUTS).map((shortcut) =>
    Mousetrap.bind(shortcut.sequence, shortcut.method)
  );
}
