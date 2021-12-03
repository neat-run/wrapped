import * as ProgressPrimitive from "@radix-ui/react-progress";
import { styled } from "@stitches/react";
import { blackA } from "@radix-ui/colors";
import React, { useEffect, useState } from "react";

interface Iprops {
  status: Number;
}

function ProgressBar({ status }: Iprops) {
  const [progress, setProgress] = useState(status);
  //   useEffect(() => {
  //     setTimeout(() => setProgress(66), 500);
  //   }, []);

  const StyledProgress = styled(ProgressPrimitive.Root, {
    position: "relative",
    overflow: "hidden",
    background: blackA.blackA9,
    borderRadius: "99999px",
    width: 500,
    height: 25,
  });

  const StyledIndicator = styled(ProgressPrimitive.Indicator, {
    backgroundColor: "white",
    height: "100%",
    transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",
  });

  // Exports
  const Progress = StyledProgress;
  const ProgressIndicator = StyledIndicator;
  return (
    <Progress value={66}>
      <ProgressIndicator style={{ width: `${progress}%` }} />
    </Progress>
  );
}

export default ProgressBar;
