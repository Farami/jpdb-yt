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
		// TODO the api does not return a result for an array element that has nothing to parse in it, breaking this
		const captionsBatches = chunkArray(captions, 100);
		let allBatches: Token[][] = [];
		for (const captionsBatch of captionsBatches) {
			allBatches = [
				...allBatches,
				...(await _parse(captionsBatch.map((x) => x.text))),
			];
		}

		const parsedCaptions: ParsedCaption[] = captions.map((caption, i) => ({
			...caption,
			text: allBatches[i],
		}));

		console.log("finished parsing", parsedCaptions.length, "captions");
		return parsedCaptions;
	};

	const _parse = useCallback(
		async (subtitles: string[]) => {
			const body: ParseRequest = {
				text: subtitles,
				token_fields: [
					"vocabulary_index",
					"position_utf16",
					"length_utf16",
					"furigana",
				],
				vocabulary_fields: [
					"card_state",
					"spelling",
					"reading",
					"meanings",
					"vid",
					"sid",
				],
			};

			console.log("body", body);

			const { data } = await axios.post<ParseResponse>("parse", body);

			// api returns position and length as utf16 byte positions
			let apiTokenGroups = data.tokens.map((group) =>
				group.map((x) => ({
					vocabIndex: x[0],
					position: x[1],
					length: x[2],
					furigana: x[3],
				})),
			);

			console.log(data);

			let tokenGroups: Token[][] = [];

			for (let textIndex = 0; textIndex < subtitles.length; textIndex++) {
				let text = subtitles[textIndex];
				let apiTokens = apiTokenGroups[textIndex];

				let tokens: Token[] = [];

				let runningToken: { position: number; length: number } = null;
				for (let i = 0; i < text.length; i++) {
					let apiToken = apiTokens.find((x) => x.position === i);

					if (apiToken) {
						if (runningToken) {
							tokens.push({
								vid: null,
								sid: null,
								text: text.slice(
									runningToken.position,
									runningToken.position + runningToken.length,
								),
								furigana: null,
								state: ["unknown"],
								spelling: "",
								reading: "",
								meanings: [],
								position: i,
							});

							runningToken = null;
						}

						let vocab = data.vocabulary[apiToken.vocabIndex];
						tokens.push({
							text: text.slice(
								apiToken.position,
								apiToken.position + apiToken.length,
							),
							furigana: apiToken.furigana,
							state: vocab?.[0] ?? ["not-in-deck"], // bruh
							spelling: vocab?.[1],
							reading: vocab?.[2],
							meanings: vocab?.[3] ?? [], // TODO improve types
							vid: vocab?.[4] ?? null,
							sid: vocab?.[5] ?? null,
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

				tokenGroups.push(tokens);
			}

			console.log("parsing resulted in", data, "mapped to", tokenGroups);

			return tokenGroups;
		},
		[axios],
	);

	return runParser;
};

export default useParser;
