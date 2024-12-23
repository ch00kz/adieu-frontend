// Request Types
export type JoinGameParams = { username: string };

// Response Types
export type JoinGameResponse = { player: string; length: number };

export async function joinGame(
  game: string,
  params: JoinGameParams,
): Promise<JoinGameResponse> {
  const request = new Request(`http://localhost:3000/game/${game}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const response = await fetch(request);
  return response.json();
}
