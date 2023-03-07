import React, { useState } from "react";

import useAuthStore from "@src/store/auth";
import useAxios from "@src/hooks/useAxios";

const Popup = () => {
  const axios = useAxios();
  const [settings, setSettings] = useAuthStore();

  const [testState, setTestState] = useState("");

  const testToken = async () => {
    const response = await axios.get("ping");
    const status = response.status;

    setTestState(status === 200 ? "success" : "failed");

    setTimeout(() => setTestState(""), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 px-6 w-80 dark:bg-neutral-800">
      <header className="font-bold text-lg pb-6 dark:text-white">
        jpdb.io youtube subtitle parser
      </header>
      <label
        htmlFor="token"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        API token
      </label>
      <input
        id="token"
        className="border text-sm rounded-lg block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        value={settings.token}
        onChange={(ev) => setSettings({ token: ev.target.value })}
      />

      <button
        type="button"
        onClick={testToken}
        className="text-white border bg-gray-700 border-gray-600 w-full p-2 my-2"
      >
        Test token
      </button>
      <span className="text-white text-md">{testState}</span>
    </div>
  );
};

export default Popup;
