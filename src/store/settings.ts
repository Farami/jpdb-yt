import { createChromeStorageStateHookLocal } from "use-chrome-storage";

interface Store {
	autoShow: boolean;
}

const defaults: Store = {
	autoShow: false,
};

const SETTINGS_KEY = "settings";

const useSettingsStore = createChromeStorageStateHookLocal(
	SETTINGS_KEY,
	defaults,
);

export default useSettingsStore;
export { defaults };
