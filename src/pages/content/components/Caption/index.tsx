import useParser from "@src/hooks/useParser";
import React, { useEffect, useState } from "react";

type Props = {
  caption: Caption;
};

function CaptionElement({ caption }: Props) {
  const [parsedText, setParsedText] = useState(caption);

  const parse = useParser();

  useEffect(() => {
    parse(caption.text);
  }, [parse, caption]);

  return <div className="caption">{caption.text}</div>;
}

export default CaptionElement;
