type Props = {
  text: string;
};

function CaptionElement({ text }: Props) {
  return (
    <div
      className="subtitleElement flex items-end mt-1 mb-1 flex-1 self-center bg-[#080808C0] text-white font-bold pl-1 pr-1 h-[61.5px]"
      key={text}
    >
      {text}
    </div>
  );
}

export default CaptionElement;
