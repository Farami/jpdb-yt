type Caption = {
	dur: number;
	start: number;
	text: string;
};

type ParsedCaption = {
	dur: number;
	start: number;
	text: string;
};

type CaptionsTrackList = {
	captionTracks?: CaptionsTrack[];
};

type CaptionsTrack = {
	baseUrl: string;
	isTranslatable: boolean;
	language: string;
	languageCode: string;
	name: { simpleText: string };
	vssId: string;
};
