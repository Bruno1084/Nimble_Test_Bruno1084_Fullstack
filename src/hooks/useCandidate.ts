import { useEffect, useState } from "react";
import { fetchCandidateByEmail } from "../services";
import type { UseCandidateReturn } from "../types/useCandidate.type";
import type { Candidate } from "../types/candidate";

export type GetStatus = "idle" | "loading" | "success" | "error";

export function useCandidate(email: string): UseCandidateReturn {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [status, setStatus] = useState<GetStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;

    async function loadCandidate() {
      try {
        setStatus("loading");
        setError(null);

        const data = await fetchCandidateByEmail(email);

        if (!cancelled) {
          setCandidate(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setStatus("error");
        }
      }
    }

    loadCandidate();

    return () => {
      cancelled = true;
    };
  }, [email]);

  return { candidate, status, error };
}