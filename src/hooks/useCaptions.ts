import getVideoId from "@src/helpers/getVideoId";
import { getLanguagesList, getSubtitles } from "@src/helpers/youtube";
import { useEffect, useState } from "react";

const useCaptions = () => {
	const [captions, setCaptions] = useState<Caption[]>([]);
	const videoId = getVideoId();

	useEffect(() => {
		const fetchCaptions = async () => {
			const languageList = await getLanguagesList();
			console.log("language list", languageList);
			const japaneseSubtitles = languageList.find(
				(x) => x.languageCode === "ja",
			);

			if (!japaneseSubtitles) {
				console.log("No japanese subtitles found.");
				return;
			}

			const subtitles = await getSubtitles(japaneseSubtitles);
			setCaptions(subtitles);
		};

		fetchCaptions();
	}, [videoId]);

	return captions;
};

export default useCaptions;
