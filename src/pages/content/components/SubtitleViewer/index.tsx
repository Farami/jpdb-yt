import chunkArray from "@src/helpers/chunkArray";
import useCaptions from "@src/hooks/useCaptions";
import useCurrentVideoTime from "@src/hooks/useCurrentVideoTime";
import useParser from "@src/hooks/useParser";
import useVideoId from "@src/hooks/useVideoId";
import useAuthStore from "@src/store/auth";
import { useEffect, useMemo, useState } from "react";
import Caption from "../Caption";
import ParseButton from "../ParseButton";

export default function SubtitleViewer() {
	const videoTime = useCurrentVideoTime();
	const videoId = useVideoId();
	const captions = useCaptions();
	const parse = useParser();
	const [{ token }] = useAuthStore();

	const [parsedCaptions, setParsedCaptions] = useState<ParsedCaption[]>([]);

	// reset parsed captions when video id changes (otherwise captions would persist across different videos)
	useEffect(() => setParsedCaptions([]), [videoId]);

	const onParseButtonClick = async () => {
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
				(x) => x.start <= videoTime && x.start + x.dur >= videoTime,
			),
		[videoTime, parsedCaptions],
	);

	return (
		<div className="content-view">
			{token && captions.length > 0 && (
				<ParseButton
					onClick={onParseButtonClick}
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
