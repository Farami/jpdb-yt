import useAxios from "@src/hooks/useAxios";
import useCaptionTokensStore from "@src/store/captionTokensStore";
import useSettingsStore from "@src/store/settings";
import { CSSProperties, useState } from "react";
import Popup from "../Popup";

type Props = {
  token: Token;
};

const knownStates: VocabState[] = ["known", "never-forget", "failed"];

function CaptionToken({ token }: Props) {
  const axios = useAxios();
  let { text, furigana, state, vid, sid } = token;
  const [isHovered, setIsHovered] = useState(false);
  const [{ furiganaDisplay, stateColors, miningDeckId }] = useSettingsStore();
  const updateTokenState = useCaptionTokensStore(
    (store) => store.updateTokenState
  );

  const isUnknown = state[0] === "unknown";

  let style: CSSProperties = {
    color: stateColors[state[0]] ?? "#fff",
    fontWeight: "bold",
    backgroundColor: isHovered && !isUnknown ? "gray" : "",
    cursor: isUnknown ? "default" : "pointer",
    paddingLeft: "2px",
    paddingRight: "2px",
  };

  const onHover = () => {
    console.log(state);
    setIsHovered(true);
  };
  const onLeave = () => setIsHovered(false);

  const onDoubleClick = async () => {
    if (!miningDeckId) {
      return;
    }

    const response = await axios.post("deck/add-vocabulary", {
      id: miningDeckId,
      vocabulary: [[vid, sid]],
    });

    if (response.status === 200 && token.state[0] === "not-in-deck") {
      updateTokenState(vid, sid, "new");
    }
  };

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
      onDoubleClick={onDoubleClick}
      // prevent selection on doubleclick
      onMouseDown={(ev) => ev.detail > 1 && ev.preventDefault()}
    >
      {isHovered && !isUnknown && <Popup token={token} />}
      {elements}
    </div>
  );
}

export default CaptionToken;
