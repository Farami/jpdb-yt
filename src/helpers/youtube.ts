import he from "he";
import axios from "axios";
import striptags from "striptags";
import getVideoId from "@src/helpers/getVideoId";

function extractCaptions(html: string): CaptionsTrackList {
	const splittedHtml = html.split('"captions":');

	if (splittedHtml.length > 1) {
		const videoDetails = splittedHtml[1].split(',"videoDetails')[0];
		const jsonObj = JSON.parse(videoDetails.replace("\n", ""));
		return jsonObj["playerCaptionsTracklistRenderer"];
	}

	return null;
}

async function getLanguagesList() {
	const videoId = getVideoId();

	const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
	const { data } = await axios.get<string>(videoURL);
	const decodedData = data.replace("\\u0026", "&").replace("\\", "");

	const captionJSON = extractCaptions(decodedData);

	// ensure we have access to captions data
	if (!(captionJSON && "captionTracks" in captionJSON)) {
		throw new Error(`Could not find captions for video: ${videoId}`);
	}

	return captionJSON.captionTracks.map((track) => {
		return {
			...track,
			language: track.name.simpleText,
		};
	});
}

async function getSubtitles(subtitle: CaptionsTrack): Promise<Caption[]> {
	if (!subtitle?.baseUrl) {
		throw new Error("Subtitle object received is not valid");
	}

	const { data: transcript } = await axios.get(subtitle.baseUrl);

	const lines = transcript
		.replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', "")
		.replace("</transcript>", "")
		.split("</text>")
		.filter((line: string) => line?.trim())
		.map((line: string) => {
			const startRegex = /start="([\d.]+)"/;
			const durRegex = /dur="([\d.]+)"/;

			const [, start] = startRegex.exec(line);
			// rome-ignore lint/suspicious/noSparseArray: <explanation>
			const [, dur] = durRegex.exec(line) || [, 0.0];

			const htmlText = line
				.replace(/<text.+>/, "")
				.replace(/&amp;/gi, "&")
				.replace(/<\/?[^>]+(>|$)/g, "");

			const decodedText = he.decode(htmlText);
			const text = striptags(decodedText);

			return {
				start: parseFloat(start as string),
				dur: parseFloat(dur as string),
				text,
			};
		});

	return lines;
}

export { getLanguagesList, extractCaptions, getSubtitles };
