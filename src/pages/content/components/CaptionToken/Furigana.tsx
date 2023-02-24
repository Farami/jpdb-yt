import React from "react";

function Furigana({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: 15,
        fontWeight: "initial",
      }}
    >
      {text}
    </span>
  );
}

export default Furigana;
