import Mousetrap from "mousetrap";
import { download } from "./exports";

/**
 * Initializes keyboard shortcuts
 */
export function initShortcuts() {
  Mousetrap.bind("command+s", (e) => {
    e.preventDefault();
    download();
  });
}
