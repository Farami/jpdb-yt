import React from "react";

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

function CaptionToken({ token }: Props) {
  let color = stateColor[token.state] ?? "#CB94FF";

  if (token.furigana) {
    // when furigana is passed split the text into the separate parts again
  }

  return <span style={{ color, fontWeight: "bold" }}>{token.text}</span>;
}

export default CaptionToken;
