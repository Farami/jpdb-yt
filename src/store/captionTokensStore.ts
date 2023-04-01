import produce from "immer";
import { create } from "zustand";

type Store = {
	captions: ParsedCaption[];
	setCaptions: (captions: ParsedCaption[]) => void;
	updateTokenState: (vid: number, sid: number, state: VocabState) => void;
};

const useCaptionTokensStore = create<Store>((set) => ({
	captions: [],
	setCaptions: (captions) => set(() => ({ captions })),
	updateTokenState: (vid, sid, tokenState) =>
		set(
			produce<Store>((state) => {
				state.captions.forEach((caption) => {
					caption.text
						.filter((t) => t.vid === vid && t.sid === sid)
						.forEach((token) => {
							token.state[0] = tokenState;
						});
				});
			}),
		),
}));

export default useCaptionTokensStore;
