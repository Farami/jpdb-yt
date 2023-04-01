import React from "react";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[];
};

function Select({ id, value, children, onChange }: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={({ currentTarget: { value } }) => onChange(value)}
      className="relative mb-4 px-2 py-1 text-sm font-medium text-white bg-gray-700 w-full appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-600 outline-none"
    >
      <>{children}</>
    </select>
  );
}

export default Select;
