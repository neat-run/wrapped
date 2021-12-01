import React from "react";

const COMMON_SYMBOLS = new Map<string, string>([
  ["cmd", "⌘"],
  ["command", "⌘"],
  ["alt", "⌥"],
  ["enter", "↩"],
  ["return", "↩"],
]);

/**
 * Keyboard shortcut to show in a tooltip or list
 * @param {string[]} shortcut strings spelling out the key sequence, eg. ["cmd", "s"] or ["command", "K"]
 * @returns inline span with styled keys
 */
function KeyboardShortcut({ shortcut }) {
  if (!shortcut.length) return <></>;

  return (
    <span className="ml-2 space-x-1">
      {shortcut.map((key) => (
        <span key={key} className="bg-gray-600 rounded p-1">
          {/* Turn dev-friendly strings like "cmd" to user-friendly symbols like "⌘" */}
          {COMMON_SYMBOLS.get(key) || key.toUpperCase()}
        </span>
      ))}
    </span>
  );
}

export default KeyboardShortcut;
