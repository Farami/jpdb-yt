import React, { useState } from "react";

import "@pages/popup/Popup.css";
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <label>jpdb.io API token</label>
        <input
          value={settings.token}
          onChange={(ev) => setSettings({ token: ev.target.value })}
        />

        <button type="button" onClick={testToken}>
          Test token
        </button>
        <span>{testState}</span>
      </header>
    </div>
  );
};

export default Popup;
