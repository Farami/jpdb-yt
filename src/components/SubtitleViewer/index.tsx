import chunkArray from "@src/helpers/chunkArray";
import useCaptions from "@src/hooks/useCaptions";
import useCurrentVideoTime from "@src/hooks/useCurrentVideoTime";
import useParser from "@src/hooks/useParser";
import useVideoId from "@src/hooks/useVideoId";
import useSettingsStore from "@src/store/settings";
import { useEffect, useMemo, useState } from "react";
import Caption from "../Caption";
import ParseButton from "../ParseButton";

export default function SubtitleViewer() {
  const videoTime = useCurrentVideoTime();
  const videoId = useVideoId();
  const captions = useCaptions();
  const parse = useParser();
  const [{ token, autoParse }] = useSettingsStore();

  const [parsedCaptions, setParsedCaptions] = useState<ParsedCaption[]>([]);

  // reset parsed captions when video id changes (otherwise captions would persist across different videos)
  useEffect(() => setParsedCaptions([]), [videoId]);

  useEffect(() => {
    if (autoParse) {
      parse(captions).then(setParsedCaptions);
    }
  }, [captions]);

  const toggleSubtitles = async () => {
    if (parsedCaptions.length > 0) {
      setParsedCaptions([]);
    } else {
      setParsedCaptions(await parse(captions));
    }
  };

  // plural because they can overlap
  const currentCaptions = useMemo(
    () =>
      parsedCaptions?.filter(
        (x) => x.start <= videoTime && x.start + x.dur >= videoTime
      ),
    [videoTime, parsedCaptions]
  );

  return (
    <div className="text-6xl absolute flex flex-col content-center justify-center w-full bottom-24 z-50">
      {token && captions.length > 0 && (
        <ParseButton
          onClick={toggleSubtitles}
          active={parsedCaptions.length === 0}
        />
      )}
      {currentCaptions?.length > 0 &&
        currentCaptions.map((caption) => (
          <Caption captionTokens={caption.text} />
        ))}
    </div>
  );
}
