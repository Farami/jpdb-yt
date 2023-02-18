import { useCallback, useMemo } from "react";
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
				vocabulary_fields: ["card_level", "card_state"],
			};

			const { data } = await axios.post<ParseResponse>("parse", body);

			console.log(data);
		},
		[axios],
	);

	return parse;
};

export default useParser;
