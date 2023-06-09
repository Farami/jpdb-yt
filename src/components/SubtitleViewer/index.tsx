import useCaptions from "@src/hooks/useCaptions";
import useCurrentVideoTime from "@src/hooks/useCurrentVideoTime";
import useVideoId from "@src/hooks/useVideoId";
import useSettingsStore from "@src/store/settings";
import { useEffect, useMemo, useState } from "react";
import Caption from "../Caption";
import ParseButton from "../ParseButton";

export default function SubtitleViewer() {
  const videoTime = useCurrentVideoTime();
  const videoId = useVideoId();
  const captions = useCaptions();
  const [{ autoShow }] = useSettingsStore();

  const [showCaptions, setShowCaptions] = useState(autoShow);
  console.log("autoShow", autoShow);
  console.log("showCaptions", showCaptions);

  useEffect(() => setShowCaptions(autoShow), [captions]);

  const currentCaption = useMemo(
    () =>
      captions
        ?.filter((x) => x.start <= videoTime && x.start + x.dur >= videoTime)
        .sort((a, b) => b.start - a.start)?.[0],
    [videoTime, captions]
  );

  return (
    <div className="subtitleViewer text-6xl absolute flex flex-col content-center justify-center w-full bottom-24 z-50">
      {captions.length > 0 && (
        <ParseButton
          onClick={() => setShowCaptions(!showCaptions)}
          active={showCaptions}
        />
      )}
      {showCaptions && currentCaption && <Caption text={currentCaption.text} />}
    </div>
  );
}
