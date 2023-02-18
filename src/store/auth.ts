import { createChromeStorageStateHookLocal } from "use-chrome-storage";

interface Store {
	token: string | null;
}

const defaults: Store = {
	token: null,
};

const SETTINGS_KEY = "auth";

const useAuthStore = createChromeStorageStateHookLocal(SETTINGS_KEY, defaults);

export default useAuthStore;
