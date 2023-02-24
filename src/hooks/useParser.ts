import chunkArray from "@src/helpers/chunkArray";
import { useCallback } from "react";
import useAxios from "./useAxios";

const useParser = () => {
	const axios = useAxios();

	const runParser = async (captions: Caption[]) => {
		if (captions.length === 0) {
			return [];
		}

		// something is really fucked on this video: https://www.youtube.com/watch?v=7DHOVziRwBA&list=PLbqkLu2V1bJJUQ2aLZjFdz8decGs1kHg-&index=2&t=1s
		// take all captions from the array, merge them, send them through the parser, then split them up into captions again
		const captionsBatches = chunkArray(captions, 100);
		let allBatches = [];
		for (const captionsBatch of captionsBatches) {
			const mergedCaptions = captionsBatch.map((c) => c.text).join("");
			let parsed = await _parse(mergedCaptions);

			const parsedBatch: ParsedCaption[] = [];
			for (const caption of captionsBatch) {
				let tokens: Token[] = [];
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
		return allBatches;
	};

	const _parse = useCallback(
		async (text: string) => {
			const body: ParseRequest = {
				text,
				token_fields: [
					"vocabulary_index",
					"position_utf16",
					"length_utf16",
					"furigana",
				],
				vocabulary_fields: ["card_state"],
			};

			const { data } = await axios.post<ParseResponse>("parse", body);

			// api returns position and length as utf8 byte positions
			let apiTokens = data.tokens.map((x) => ({
				vocabIndex: x[0],
				position: x[1],
				length: x[2],
				furigana: x[3],
			}));

			let tokens: Token[] = [];
			let runningToken: { position: number; length: number } = null;
			for (let i = 0; i < text.length; i++) {
				let apiToken = apiTokens.find((x) => x.position === i);

				if (apiToken) {
					if (runningToken) {
						tokens.push({
							text: text.slice(
								runningToken.position,
								runningToken.position + runningToken.length,
							),
							furigana: null,
							state: "unknown",
							position: i,
						});

						runningToken = null;
					}

					tokens.push({
						text: text.slice(
							apiToken.position,
							apiToken.position + apiToken.length,
						),
						furigana: apiToken.furigana,
						state: data.vocabulary[apiToken.vocabIndex]?.[0]?.[0] ?? "new", // bruh
						position: i,
					});

					i += apiToken.length - 1;
				} else {
					if (!runningToken) {
						runningToken = {
							position: i,
							length: 1,
						};
					} else {
						runningToken.length++;
					}
				}
			}

			console.log("parsing resulted in", data, "mapped to", tokens);

			return tokens;
		},
		[axios],
	);

	return runParser;
};

export default useParser;
