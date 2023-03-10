type TokenFields =
	| "vocabulary_index"
	| "position_utf8"
	| "position_utf16"
	| "position_utf32"
	| "length_utf8"
	| "length_utf16"
	| "length_utf32"
	| "furigana";
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
};

type VocabState =
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

type KnownStates = "known" | "never-forget" | "failed";

type TokenResponse = [number, number, number, (string | string[])[]];
type TokenResponseGroup = TokenResponse[];
type VocabResponse = [VocabState[], string, string, string[]];

type ParseResponse = {
	tokens: TokenResponseGroup[];
	vocabulary: VocabResponse[];
};

type Token = {
	text: string;
	furigana: (string | string[])[];
	spelling: string;
	reading: string;
	meanings: string[];
	state: VocabState[];
	position: number;
};
