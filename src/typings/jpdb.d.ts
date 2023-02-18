type TokenField =
	| "vocabulary_index"
	| "position_utf8"
	| "position_utf16"
	| "position_utf32"
	| "length_utf8"
	| "length_utf16"
	| "length_utf32"
	| "furigana";
type VocabFields =
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
	text: string;
	token_fields: TokenField[];
	vocabulary_fields: VocabFields[];
};

type VocabState =
	| "new"
	| "learning"
	| "known"
	| "due"
	| "failed"
	| "blacklisted"
	| "redundant"
	| "suspended"
	| "locked"
	| "unknown"; // TODO add missing states

type ParseResponse = {
	tokens: [number, number, number, string[]][];
	vocabulary: [[VocabState]][];
};

type Token = {
	text: string;
	furigana: (string | string[])[];
	state: VocabState;
	position: number;
};
