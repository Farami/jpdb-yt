import CaptionToken from "../CaptionToken";

type Props = {
  captionTokens: Token[];
};

function CaptionElement({ captionTokens }: Props) {
  return (
    <div className="flex items-end p-1 flex-1 self-center bg-[#080808C0]">
      {captionTokens.map((token) => (
        <CaptionToken token={token} />
      ))}
    </div>
  );
}

export default CaptionElement;
