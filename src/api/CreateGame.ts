export enum GameKind {
  Random = "Random",
  Custom = "Custom",
}

// Request Types
export type RandomGame = { kind: GameKind.Random };
export type CustomGame = { kind: GameKind.Custom; word: string };
export type CreateGameParams = RandomGame | CustomGame;

// Response Types
export type CreateGameResponse = { game: string };

export async function createGame(
  params: CreateGameParams,
): Promise<CreateGameResponse> {
  const request = new Request("http://localhost:3000/game/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const response = await fetch(request);
  return response.json();
}