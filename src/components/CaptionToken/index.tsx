import useSettingsStore from "@src/store/settings";
import { CSSProperties, useState } from "react";
import Popup from "../Popup";

type Props = {
  token: Token;
};

const knownStates: VocabState[] = ["known", "never-forget", "failed"];

function CaptionToken({ token }: Props) {
  let { text, furigana, state } = token;
  const [isHovered, setIsHovered] = useState(false);
  const [{ furiganaDisplay, stateColors }] = useSettingsStore();

  const isUnknown = state[0] === "unknown";

  let style: CSSProperties = {
    color: stateColors[state[0]] ?? "#fff",
    fontWeight: "bold",
    backgroundColor: isHovered && !isUnknown ? "gray" : "",
    cursor: isUnknown ? "default" : "pointer",
    paddingLeft: "2px",
    paddingRight: "2px",
  };

  const onHover = () => setIsHovered(true);
  const onLeave = () => setIsHovered(false);

  if (!furigana || furigana.length === 0) {
    furigana = [text];
  }

  function getFurigana(element: typeof furigana[0]) {
    switch (furiganaDisplay) {
      case "always":
        return <rt>{element[1]}</rt>;
      case "never":
        return null;
      case "unknown":
        return !knownStates.includes(state[0]) ? <rt>{element[1]}</rt> : null;
    }
  }

  const elements = furigana.map((x) =>
    !Array.isArray(x) ? (
      <ruby lang="ja">{x}</ruby>
    ) : (
      <ruby lang="ja">
        {x[0]}
        {getFurigana(x)}
      </ruby>
    )
  );

  return (
    <div
      style={style}
      onMouseOver={onHover}
      onFocus={onHover}
      onMouseOut={onLeave}
      onBlur={onLeave}
    >
      {isHovered && !isUnknown && <Popup token={token} />}
      {elements}
    </div>
  );
}

export default CaptionToken;
