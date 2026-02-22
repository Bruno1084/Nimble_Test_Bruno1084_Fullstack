import { useState, useRef } from "react";
import { applyToJob } from "../services/candidateService";
import type { PostStatus } from "../types/status";
import type { ApplyPayload } from "../types/application";
import type { UseApplyToJobReturn } from "../types/useApplyToJob.type";

export function useApplyToJob(): UseApplyToJobReturn {
  const [status, setStatus] = useState<PostStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController>(null);

  const apply = async (payload: ApplyPayload) => {
    // Prevents double submit
    if (status === "submitting") return;

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setStatus("submitting");
      setError(null);

      await applyToJob(payload, controller.signal);

      setStatus("success");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      setError(
        err instanceof Error ? err.message : "Unexpected error occurred"
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
  };

  return ({ apply, status, error, reset });
}