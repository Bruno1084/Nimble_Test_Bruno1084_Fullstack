import { useState, useEffect } from "react";
import { fetchJobs } from "../services/jobsService";
import type { Job } from "../types/job";
import type { UseJobsReturn } from "../types/useJobs.type";
import type { GetStatus } from "../types/status";

export function useJobs(): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<GetStatus>("idle");
  const [error, setError] = useState(Object);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadJobs() {
      try {
        setStatus("loading");
        setError(null);

        const jobs = await fetchJobs(abortController.signal);

        setJobs(jobs);
        setStatus("success");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // Request was aborted
          return;
        }

        setError(
          err instanceof Error ? err.message : "Unexpected error occurred"
        );
        setStatus("error");
      }
    }

    loadJobs();

    return () => {
      abortController.abort();
    };
  }, []);

  return ({ jobs, status, error });
}