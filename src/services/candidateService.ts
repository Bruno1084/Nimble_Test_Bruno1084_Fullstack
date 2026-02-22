import type { Candidate } from "../types/candidate";
import type { ApplyPayload } from "../types/application";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchCandidateByEmail(
  email: string
): Promise<Candidate> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch candidate data");
  }

  return response.json();
}

export async function applyToJob(
  payload: ApplyPayload,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    }
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `HTTP error: ${response.status}`
    );
  }

  const result = await response.json();

  if (!result.ok) {
    throw new Error("Application failed");
  }
}