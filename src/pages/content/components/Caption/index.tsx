import React from "react";

type Props = {
  caption: Caption;
};

function CaptionElement({ caption }: Props) {
  return <div className="caption">{caption.text}</div>;
}

export default CaptionElement;
