import { CSSProperties, useState } from "react";

type Props = {
  token: Token;
};

const stateColor: { [key in VocabState]: string } = {
  learning: "#5EA77F",
  blacklisted: "#fff",
  due: "#FF4500",
  failed: "#FFC000",
  known: "#70C000",
  "never-forget": "#70C000",
  redundant: "#70C000",
  locked: "#FFD5D5",
  suspended: "#FFD5D5",
  new: "#CECECE",
  unknown: "#CB94FF",
};

function CaptionToken({ token: { text, furigana, state } }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  let style: CSSProperties = {
    color: stateColor[state] ?? "#fff",
    fontWeight: "bold",
    backgroundColor: isHovered ? "gray" : "",
    cursor: "pointer",
    paddingLeft: "2px",
    paddingRight: "2px",
  };

  const onHover = () => {
    console.log(text, furigana, state);
    setIsHovered(true);
  };

  const onLeave = () => setIsHovered(false);

  if (!furigana || furigana.length === 0) {
    furigana = [text];
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
      )
    ) ?? [];

  return (
    <div
      style={style}
      onMouseOver={onHover}
      onFocus={onHover}
      onMouseOut={onLeave}
      onBlur={onLeave}
    >
      {furiganaElements}
    </div>
  );
}

export default CaptionToken;
