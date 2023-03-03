type Props = {
	token: Token;
};

const stateColor: { [key in VocabState]: string } = {
	learning: "#5EA77F",
	blacklisted: "#343434",
	due: "#FF4500",
	failed: "#FFC000",
	known: "#70C000",
	redundant: "#70C000",
	locked: "#FFD5D5",
	suspended: "#FFD5D5",
	new: "#CECECE",
	unknown: "#CB94FF",
};

function CaptionToken({ token: { text, furigana, state } }: Props) {
	let style = { color: stateColor[state] ?? "#CB94FF", fontWeight: "bold" };

	if (!furigana || furigana.length === 0) {
		return <div style={style}>{text}</div>;
	}

	const furiganaElements =
		furigana.map((x) =>
			!Array.isArray(x) ? (
				<>{x}</>
			) : (
				<ruby>
					{x[0]}
					<rt>{x[1]}</rt>
				</ruby>
			),
		) ?? [];

	return <div style={style}>{furiganaElements}</div>;
}

export default CaptionToken;
