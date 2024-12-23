// Request Types
export type CreateGuessParams = { guess: string };

// Response Types
export enum Status {
  Correct = "Correct",
  InTheWord = "InTheWord",
  Wrong = "Wrong",
  Unsubmitted = "Unsubmitted",
}
export type Letter = { letter: string; status: Status };
export type PlayerGuess = { letters: Letter[]; is_winning_guess: boolean };
export type CreateGuessResponse = { guess: PlayerGuess };

export async function createGuess(
  player: string,
  params: CreateGuessParams,
): Promise<CreateGuessResponse> {
  const request = new Request(`http://localhost:3000/player/${player}/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const response = await fetch(request);
  return response.json();
}

export type GetGuessesReponses = { guesses: PlayerGuess[] };

export async function getGuesses(player: string): Promise<GetGuessesReponses> {
  const request = new Request(
    `http://localhost:3000/player/${player}/guesses`,
    {
      method: "GET",
    },
  );
  const response = await fetch(request);
  return response.json();
}

export type GameGuess = {
  player: string;
  username: string;
  guesses: number;
  has_won: boolean;
};

export type GetGameGuessesResponse = {
  guesses: GameGuess[];
};

export async function getGameGuesses(
  game: string,
): Promise<GetGameGuessesResponse> {
  const request = new Request(`http://localhost:3000/game/${game}/guesses`, {
    method: "GET",
  });
  const response = await fetch(request);
  return response.json();
}
