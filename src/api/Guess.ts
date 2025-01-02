import {
  CreatePlayerGuessParams,
  CreatePlayerGuessResponse,
  GetGameScoresResponse,
  GetPlayerGuessesResponse,
} from "../generated/types";
import { apiUrl } from "./utils";

export async function createPlayerGuess(
  playerId: string,
  params: CreatePlayerGuessParams,
): Promise<CreatePlayerGuessResponse> {
  const request = new Request(`${apiUrl}/player/${playerId}/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const response = await fetch(request);
  return response.json();
}

export async function getPlayerGuesses(
  playerId: string,
): Promise<GetPlayerGuessesResponse> {
  const request = new Request(`${apiUrl}/player/${playerId}/guess`, {
    method: "GET",
  });
  const response = await fetch(request);
  return response.json();
}

export async function getGameScores(
  gameId: string,
): Promise<GetGameScoresResponse> {
  const request = new Request(`${apiUrl}/game/${gameId}/scores`, {
    method: "GET",
  });
  const response = await fetch(request);
  return response.json();
}
