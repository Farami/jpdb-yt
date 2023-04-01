import Label from "@src/components/atoms/Label";
import useSettingsStore, { defaults } from "@src/store/settings";

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
      <button
        onClick={() =>
          setSettings((prev) => ({
            ...prev,
            stateColors: defaults.stateColors,
          }))
        }
        className="border text-sm rounded-lg block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4"
      >
        Reset
      </button>
    </div>
  );
}

export default ColorSelect;
