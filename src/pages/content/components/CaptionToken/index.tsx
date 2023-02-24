import React from "react";
import Furigana from "./Furigana";

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
  let color = stateColor[state] ?? "#CB94FF";

  const furiganaElements = furigana
    ?.filter(Array.isArray)
    .map((x) => <Furigana text={x[1]} />);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ display: "flex", marginBottom: -10 }}>
        {furiganaElements}
      </span>
      <span style={{ color, fontWeight: "bold" }}>{text}</span>
    </div>
  );
}

export default CaptionToken;
