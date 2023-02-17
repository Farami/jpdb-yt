import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
	token: string | null;
}

interface Actions {
	setToken: (token: string) => void;
}

const defaults: Store = {
	token: null,
};

const useAuthStore = create<Store & Actions>()(
	persist(
		(set) => ({
			...defaults,
			setToken: (token: string) => set(() => ({ token })),
		}),
		{
			name: "auth-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
