import Label from "@src/components/atoms/Label";
import useSettingsStore from "@src/store/settings";
import React from "react";

function ColorSelect() {
  const [{ stateColors }, setSettings] = useSettingsStore();

  return (
    <div>
      {Object.keys(stateColors).map((state) => (
        <>
          <Label text={state} />
          <input
            type="color"
            className="w-full h-8 mb-4"
            value={stateColors[state]}
            onChange={(ev) =>
              setSettings((prev) => ({
                ...prev,
                stateColors: {
                  ...stateColors,
                  [state]: ev.currentTarget.value,
                },
              }))
            }
          />
        </>
      ))}
    </div>
  );
}

export default ColorSelect;
