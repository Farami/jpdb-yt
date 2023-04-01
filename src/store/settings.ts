import { createChromeStorageStateHookLocal } from "use-chrome-storage";

type FuriganaDisplay = "always" | "unknown" | "never";

type StateColors = { [key in VocabState]: string };

const defaultStateColor: StateColors = {
	learning: "#5EA77F",
	blacklisted: "#fff",
	due: "#FF4500",
	failed: "#FFC000",
	known: "#70C000",
	"never-forget": "#70C000",
	redundant: "#70C000",
	locked: "#FFD5D5",
	suspended: "#FFD5D5",
	new: "#CECECE",
	unknown: "#CB94FF",
};

interface Store {
	token: string | null;
	autoParse: boolean;
	furiganaDisplay: FuriganaDisplay;
	stateColors: StateColors;
	miningDeckId?: number;
}

const defaults: Store = {
	token: null,
	autoParse: false,
	furiganaDisplay: "always",
	stateColors: defaultStateColor,
	miningDeckId: null,
};

const SETTINGS_KEY = "settings";

const useSettingsStore = createChromeStorageStateHookLocal(
	SETTINGS_KEY,
	defaults,
);

export default useSettingsStore;
export { FuriganaDisplay };
