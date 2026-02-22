import { mockCandidate } from "../mocks/mockData";
import { simulateDelay, randomFail } from "../mocks/mockUtils";
import type { Candidate } from "../types/candidate";
import type { ApplyPayload } from "../types/application";

export async function fetchCandidateByEmail(
  email: string
): Promise<Candidate> {
  await simulateDelay(700);

  if (!email.includes("@")) {
    throw new Error("Invalid email format.");
  }

  if (randomFail(0.1)) {
    throw new Error("Failed to load candidate.");
  }

  return mockCandidate;
}

export async function applyToJob(
  payload: ApplyPayload
): Promise<void> {
  await simulateDelay(1000);

  if (!payload.repoUrl.includes("github.com")) {
    throw new Error("Repository must be hosted on GitHub.");
  }

  if (payload.repoUrl.includes("fail")) {
    throw new Error("Application rejected by server.");
  }

  if (randomFail(0.1)) {
    throw new Error("Unexpected server error. Try again.");
  }

  return;
}

