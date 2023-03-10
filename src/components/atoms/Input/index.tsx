import React, { CSSProperties, HTMLInputTypeAttribute } from "react";

type Props = {
  type?: HTMLInputTypeAttribute;
  id?: string;
  value: string;
  onChange: (value: string) => void;
  style?: CSSProperties;
};

function Input({ type, id, value, style, onChange }: Props) {
  return (
    <input
      type={type}
      id={id}
      className="border text-sm rounded-lg block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4"
      value={value}
      onChange={(ev) => onChange(ev.target.value)}
      style={style}
    />
  );
}

export default Input;
