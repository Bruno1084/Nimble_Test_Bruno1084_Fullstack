import type { Candidate } from "./candidate";
import type { GetStatus } from "./status";

export interface UseCandidateReturn {
  candidate: Candidate | null;
  status: GetStatus;
  error: string | null;
}