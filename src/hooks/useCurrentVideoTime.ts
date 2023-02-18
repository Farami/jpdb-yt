import { useEffect, useState } from "react";

const useCurrentVideoTime = () => {
	const [time, setTime] = useState(0);

	const onTimeUpdate = (event: Event) =>
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		setTime((event.target as any).currentTime);

	useEffect(() => {
		const player = document.getElementById("movie_player");

		if (!player) {
			return;
		}

		const video = player.querySelector("video");
		video.addEventListener("timeupdate", onTimeUpdate);

		return () => video.removeEventListener("timeupdate", onTimeUpdate);
	}, []);

	return time;
};

export default useCurrentVideoTime;
