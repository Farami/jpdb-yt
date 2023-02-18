import CaptionToken from "../CaptionToken";

type Props = {
  caption: Token[];
};

function CaptionElement({ caption }: Props) {
  return (
    <div className="caption">
      {caption.map((token) => (
        <CaptionToken token={token} />
      ))}
    </div>
  );
}

export default CaptionElement;
