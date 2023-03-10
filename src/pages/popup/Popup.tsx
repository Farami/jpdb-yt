import React, { useState } from "react";

import useSettingsStore, { FuriganaDisplay } from "@src/store/settings";
import useAxios from "@src/hooks/useAxios";
import Checkbox from "@src/components/atoms/Checkbox";

const Popup = () => {
  const axios = useAxios();
  const [settings, setSettings] = useSettingsStore();

  const [testState, setTestState] = useState("");

  const testToken = async () => {
    const response = await axios.get("ping");
    const status = response.status;

    setTestState(status === 200 ? "success" : "failed");

    setTimeout(() => setTestState(""), 2000);
  };

  return (
    <div className="py-2 px-6 w-96 dark:bg-neutral-800">
      <header className="font-bold text-lg pb-6 dark:text-white">
        jpdb.io youtube subtitle parser
      </header>

      <div className="flex flex-col justify-center">
        <label
          htmlFor="token"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          API token
        </label>
        <input
          id="token"
          className="border text-sm rounded-lg block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4"
          value={settings.token}
          onChange={(ev) =>
            setSettings((prev) => ({ ...prev, token: ev.target.value }))
          }
        />

        <Checkbox
          label="Parse automatically"
          checked={settings.autoParse}
          onChange={() =>
            setSettings((prev) => ({
              ...prev,
              autoParse: !prev.autoParse,
            }))
          }
        />

        <label className="mb-2 text-sm font-medium text-white">
          Show Furigana
        </label>
        <select
          value={settings.furiganaDisplay}
          onChange={(x) =>
            setSettings((prev) => ({
              ...prev,
              furiganaDisplay: x.currentTarget.value as FuriganaDisplay,
            }))
          }
          className="relative mb-2 px-2 py-1 text-sm font-medium text-white bg-gray-700 w-full appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-600 outline-none"
        >
          <option value="always">always</option>
          <option value="unknown">on unknown</option>
          <option value="never">never</option>
        </select>

        <button
          type="button"
          onClick={testToken}
          className="text-white border bg-gray-700 border-gray-600 w-full p-2 my-2"
        >
          Test token
        </button>
        <span className="text-white text-md">{testState}</span>
      </div>
    </div>
  );
};

export default Popup;
