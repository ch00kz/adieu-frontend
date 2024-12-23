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
export type CreateGuessResponse = { letters: Letter[] };

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
