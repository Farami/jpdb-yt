const getVideoId = () => {
	const url = window.location.href;

	const regExp =
		/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	const match = url.match(regExp);
	return match?.[1] ?? null;
};

export default getVideoId;
