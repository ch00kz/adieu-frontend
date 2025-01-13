import {
  CreateGameParams,
  CreateGameResponse,
  JoinGameParams,
  JoinGameResponse,
} from "../generated/types";
import { apiUrl } from "./utils";

export async function createGame(
  params: CreateGameParams,
): Promise<CreateGameResponse | string> {
  const request = new Request(`${apiUrl}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const response = await fetch(request);
  if (response.ok) {
    return response.json();
  } else {
    const { error }: { error: string } = await response.json();
    return Promise.resolve(error);
  }
}

export async function joinGame(
  gameId: string,
  params: JoinGameParams,
): Promise<JoinGameResponse> {
  const request = new Request(`${apiUrl}/game/${gameId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const response = await fetch(request);
  return response.json();
}
