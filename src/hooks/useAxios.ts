import useSettingsStore from "@src/store/settings";
import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
	const [{ token }] = useSettingsStore();

	const instance = useMemo(
		() =>
			axios.create({
				baseURL: "https://jpdb.io/api/v1/",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[token],
	);

	return instance;
};

export default useAxios;
