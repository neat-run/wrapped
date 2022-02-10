import * as RadixTooltip from "@radix-ui/react-tooltip";
import KeyboardShortcut from "./shortcut";

function Tooltip({ children, content, shortcut = "" }) {
  return (
    <RadixTooltip.Root delayDuration={0}>
      <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        side="top"
        sideOffset={5}
        align="center"
        className="text-white bg-gray-800/80 p-2 rounded text-sm"
      >
        {content}
        <KeyboardShortcut shortcut={shortcut} />
        <RadixTooltip.Arrow
          offset={5}
          width={11}
          height={5}
          className="fill-gray-800/80"
        />
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  );
}

export default Tooltip;
