import { useEffect, useState } from "react";

export const getVideoId = () => {
	const url = window.location.href;

	const regExp =
		/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	const match = url.match(regExp);
	return match?.[1] ?? null;
};

const useVideoId = () => {
	const [videoId, setVideoId] = useState(getVideoId());

	let oldHref = document.location.href;
	useEffect(() => {
		const body = document.querySelector("body");
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				if (oldHref !== document.location.href) {
					console.log("url changed");
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
