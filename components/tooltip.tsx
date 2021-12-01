import * as RadixTooltip from "@radix-ui/react-tooltip";
import KeyboardShortcut from "./shortcut";

function Tooltip({ children, content, shortcut = [] }) {
  return (
    <RadixTooltip.Root delayDuration={0}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        side="top"
        align="center"
        className="text-white bg-gray-800 bg-opacity-80 p-2 rounded text-sm"
      >
        {content}
        <KeyboardShortcut shortcut={shortcut} />
        <RadixTooltip.Arrow offset={5} width={11} height={5} />
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  );
}

export default Tooltip;
