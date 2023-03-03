import CaptionToken from "../CaptionToken";

type Props = {
	captionTokens: Token[];
};

function CaptionElement({ captionTokens }: Props) {
	return (
		<div className="caption">
			{captionTokens.map((token) => (
				<CaptionToken token={token} />
			))}
		</div>
	);
}

export default CaptionElement;
