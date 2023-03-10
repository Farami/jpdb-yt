import { createChromeStorageStateHookLocal } from "use-chrome-storage";

export type FuriganaDisplay = "always" | "unknown" | "never";

interface Store {
	token: string | null;
	autoParse: boolean;
	furiganaDisplay: FuriganaDisplay;
}

const defaults: Store = {
	token: null,
	autoParse: false,
	furiganaDisplay: "always",
};

const SETTINGS_KEY = "settings";

const useSettingsStore = createChromeStorageStateHookLocal(
	SETTINGS_KEY,
	defaults,
);

export default useSettingsStore;
