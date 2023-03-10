import useSettingsStore from "@src/store/settings";
import React from "react";

type Props = {
  token: Token;
};

function Popup({ token: { state, reading, spelling, meanings } }: Props) {
  const [{ stateColors }] = useSettingsStore();

  return (
    <div
      lang="ja"
      className="flex absolute text-white flex-col bottom-28 gap-4 bg-black w-auto max-w-7xl opacity-80 p-4 rounded-lg cursor-default"
    >
      <div className="flex-col w-full">
        <div className="flex-1 text-5xl font-bold">
          {reading} {reading !== spelling ? `(${spelling})` : null}
        </div>
        {state.map((x) => (
          <div
            className={"flex-0.5 border rounded-md pb-2 text-2xl font-bold"}
            style={{ color: stateColors[x] }}
          >
            {x}
          </div>
        ))}
      </div>
      <hr />
      <div className="flex-col">
        {meanings.map((meaning, i) => (
          <div className="text-2xl">
            {i + 1}. {meaning}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popup;
