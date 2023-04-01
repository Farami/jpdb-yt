import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useDecks = () => {
	const axios = useAxios();
	const [decks, setDecks] = useState<Deck[]>([]);

	useEffect(() => {
		if (!axios) {
			return;
		}

		run();

		async function run() {
			const { data: decksResponse } = await axios.post<DecksResponse>(
				"list-user-decks",
				{
					fields: ["id", "name"],
				},
			);

			setDecks(
				decksResponse.decks.map(([id, name]) => ({
					id,
					name,
				})),
			);
		}
	}, [axios]);

	return decks;
};

export default useDecks;
