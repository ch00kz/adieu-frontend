/*
 Generated by typeshare 1.13.2
*/

export type Game = 
	| { type: "Random", word?: undefined }
	| { type: "Custom", word: string };

export interface CreateGameParams {
	game: Game;
}

export interface CreateGameResponse {
	gameId: string;
}

export interface CreatePlayerGuessParams {
	guess: string;
}

export type Letter = 
	| { status: "Correct", letter: string }
	| { status: "InTheWord", letter: string }
	| { status: "Wrong", letter: string }
	| { status: "Unsubmitted", letter: string };

export interface PlayerGuess {
	letters: Letter[];
	isWinningGuess: boolean;
}

export interface CreatePlayerGuessResponse {
	guess: PlayerGuess;
}

export interface PlayerScore {
	player: string;
	username: string;
	guesses: number;
	hasWon: boolean;
	guessDuration: number;
}

export interface GetGameScoresResponse {
	playerScores: PlayerScore[];
}

export interface GetPlayerGuessesResponse {
	guesses: PlayerGuess[];
}

export interface JoinGameParams {
	username: string;
}

export interface JoinGameResponse {
	player: string;
	length: number;
}

