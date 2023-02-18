import useCaptions from "@src/hooks/useCaptions";
import useCurrentVideoTime from "@src/hooks/useCurrentVideoTime";
import { useEffect, useMemo } from "react";
import Caption from "../Caption";

export default function App() {
  const videoTime = useCurrentVideoTime();
  const captions = useCaptions();

  useEffect(() => console.log(captions), [captions]);

  const currentCaption = useMemo(
    () =>
      captions.find(
        (x) => x.start <= videoTime && x.start + x.dur >= videoTime
      ),
    [videoTime]
  );

  useEffect(() => console.log(currentCaption), [currentCaption]);

  return (
    <div className="content-view">
      {currentCaption && <Caption caption={currentCaption} />}
    </div>
  );
}
