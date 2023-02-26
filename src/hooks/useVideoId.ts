import getVideoId from "@src/helpers/getVideoId";
import { useEffect, useState } from "react";

const useVideoId = () => {
	const [videoId, setVideoId] = useState(getVideoId());

	let oldHref = document.location.href;
	useEffect(() => {
		const body = document.querySelector("body");
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				if (oldHref !== document.location.href) {
					oldHref = document.location.href;
					setVideoId(getVideoId());
				}
			});
		});
		observer.observe(body, { childList: true, subtree: true });
	}, []);

	return videoId;
};

export default useVideoId;
