import { useCallback } from "react";
import useAxios from "./useAxios";

const useParser = () => {
	const axios = useAxios();

	const parse = useCallback(
		async (text: string) => {
			const body: ParseRequest = {
				text,
				token_fields: [
					"vocabulary_index",
					"position_utf8",
					"length_utf8",
					"furigana",
				],
				vocabulary_fields: ["card_state"],
			};

			const { data } = await axios.post<ParseResponse>("parse", body);

			// api returns position and length as utf8 byte positions
			const utf8 = new TextEncoder().encode(text);
			var decoder = new TextDecoder("utf-8");

			let apiTokens = data.tokens.map((x) => ({
				vocabIndex: x[0],
				position: x[1],
				length: x[2],
				furigana: x[3],
			}));

			let tokens: Token[] = [];
			let runningToken: { position: number; length: number } = null;
			for (let i = 0; i < utf8.length; i++) {
				let apiToken = apiTokens.find((x) => x.position === i);

				if (apiToken) {
					if (runningToken) {
						tokens.push({
							text: decoder.decode(
								utf8.buffer.slice(
									runningToken.position,
									runningToken.position + runningToken.length,
								),
							),
							furigana: null,
							state: "unknown",
							position: i,
						});

						runningToken = null;
					}

					tokens.push({
						text: decoder.decode(
							utf8.buffer.slice(
								apiToken.position,
								apiToken.position + apiToken.length,
							),
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

			console.log("parsed", text, "resulted in", data, "mapped to", tokens);

			return tokens;
		},
		[axios],
	);

	return parse;
};

export default useParser;
