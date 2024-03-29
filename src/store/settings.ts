import { createChromeStorageStateHookLocal } from "use-chrome-storage";

type FuriganaDisplay = "always" | "unknown" | "never";

type StateColors = { [key in VocabState]: string };

const defaultStateColor: StateColors = {
	"not-in-deck": "#32538C",
	learning: "#5EA77F",
	blacklisted: "#FFFFFF",
	due: "#FF4500",
	failed: "#FFC000",
	known: "#70C000",
	"never-forget": "#70C000",
	redundant: "#70C000",
	locked: "#FFD5D5",
	suspended: "#FFD5D5",
	new: "#4B8DFF",
	unknown: "#FFFFFF",
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
export { FuriganaDisplay, defaults };
