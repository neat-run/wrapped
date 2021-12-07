import React from "react";

const COMMON_SYMBOLS = new Map<string, string>([
  ["cmd", "⌘"],
  ["command", "⌘"],
  ["shift", "⇧"],
  ["esc", "esc"],
  ["alt", "⌥"],
  ["enter", "enter"],
  ["return", "enter"],
]);

/**
 * Keyboard shortcut to show in a tooltip or list
 * @param {string[]} shortcut strings spelling out the key sequence, eg. ["cmd", "s"] or ["command", "K"]
 * @returns inline span with styled keys
 */
function KeyboardShortcut({ shortcut }) {
  if (!shortcut) return <></>;

  return (
    <span className="ml-2 space-x-1 text-gray-300">
      {shortcut.split("+").map((key) => (
        <span key={key} className="bg-gray-700/80 rounded p-1 px-2">
          {/* Turn dev-friendly strings like "cmd" to user-friendly symbols like "⌘" */}
          {COMMON_SYMBOLS.get(key) || key.toUpperCase()}
        </span>
      ))}
    </span>
  );
}

export default KeyboardShortcut;
