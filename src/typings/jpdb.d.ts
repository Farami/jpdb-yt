type TokenField =
	| "vocabulary_index"
	| "position_utf8"
	| "position_utf32"
	| "length_utf8"
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

type ParseResponse = {
	tokens: Token[];
	vocabulary: Vocabulary[];
};

type Token = {};
type Vocabulary = {};
