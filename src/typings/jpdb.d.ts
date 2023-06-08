type TokenFields = "vocabulary_index" | "position" | "length" | "furigana";
type VocabularyFields =
	| "vid"
	| "sid"
	| "rid"
	| "spelling"
	| "reading"
	| "frequency_rank"
	| "meanings"
	| "card_level"
	| "card_state"
	| "due_at";

type ParseRequest = {
	text: string[];
	token_fields: TokenFields[];
	vocabulary_fields: VocabularyFields[];
	position_length_encoding: "utf8" | "utf16" | "utf32";
};

type VocabState =
	| "not-in-deck"
	| "new"
	| "learning"
	| "known"
	| "never-forget"
	| "due"
	| "failed"
	| "blacklisted"
	| "redundant"
	| "suspended"
	| "locked"
	| "unknown"; // TODO add missing states

type TokenResponse = [number, number, number, (string | string[])[]];
type TokenResponseGroup = TokenResponse[];
type VocabResponse = [VocabState[], string, string, string[], number, number];

type Deck = {
	id: number;
	name: string;
};

type ParseResponse = {
	tokens: TokenResponseGroup[];
	vocabulary: VocabResponse[];
};

type DecksResponse = {
	decks: [number, string][];
};

type Token = {
	vid: number | null;
	sid: number | null;
	text: string;
	furigana: (string | string[])[];
	spelling: string;
	reading: string;
	meanings: string[];
	state: VocabState[];
	position: number;
};
