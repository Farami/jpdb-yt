import chunkArray from "@src/helpers/chunkArray";
import useCaptions from "@src/hooks/useCaptions";
import useCurrentVideoTime from "@src/hooks/useCurrentVideoTime";
import useParser from "@src/hooks/useParser";
import useAuthStore from "@src/store/auth";
import { useEffect, useMemo, useState } from "react";
import Caption from "../Caption";

export default function App() {
  const videoTime = useCurrentVideoTime();
  const captions = useCaptions();
  const parse = useParser();
  const [{ token }] = useAuthStore();

  const [parsedCaptions, setParsedCaptions] = useState<ParsedCaption[]>([]);

  useEffect(() => {
    if (!token || captions.length === 0) {
      return;
    }

    const runParser = async () => {
      // something is really fucked on this video: https://www.youtube.com/watch?v=7DHOVziRwBA&list=PLbqkLu2V1bJJUQ2aLZjFdz8decGs1kHg-&index=2&t=1s
      // take all captions from the array, merge them, send them through the parser, then split them up into captions again
      // do 100 captions at a time
      const captionsBatches = chunkArray(captions, 50);
      let allBatches = [];
      for (const captionsBatch of captionsBatches) {
        const mergedCaptions = captionsBatch.map((c) => c.text).join("");
        let parsed = await parse(mergedCaptions);

        const parsedBatch: ParsedCaption[] = [];
        for (const caption of captionsBatch) {
          let tokens = [];
          let textLength = 0;

          while (textLength < caption.text.length && parsed.length > 0) {
            textLength += parsed[0].text.length;
            tokens.push(parsed[0]);
            parsed = parsed.slice(1);
          }

          parsedBatch.push({
            start: caption.start,
            dur: caption.dur,
            text: tokens,
          });
        }

        allBatches = [...allBatches, ...parsedBatch];
      }

      console.log("finished parsing", allBatches.length, "captions");
      setParsedCaptions(allBatches);
    };

    runParser();
  }, [captions, token]);

  const currentCaptions = useMemo(
    () =>
      parsedCaptions?.filter(
        (x) => x.start <= videoTime && x.start + x.dur >= videoTime
      ),
    [videoTime, parsedCaptions]
  );

  return (
    <div className="content-view">
      {currentCaptions?.length > 0 &&
        currentCaptions.map((caption) => <Caption caption={caption.text} />)}
    </div>
  );
}
