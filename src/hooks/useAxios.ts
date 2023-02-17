import useAuthStore from "@src/store/auth";
import axios from "axios";

const useAxios = () => {
	const token = useAuthStore((store) => store.token);

	const instance = axios.create({
		baseURL: "https://jpdb.io/api/v1/",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return instance;
};

export default useAxios;
