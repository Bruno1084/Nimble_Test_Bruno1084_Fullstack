import { mockJobs } from "../mocks/mockData";
import { simulateDelay, randomFail } from "../mocks/mockUtils";
import type { Job } from "../types/job";

export async function fetchJobs(): Promise<Job[]> {
  await simulateDelay(800);

  if (randomFail(0.15)) {
    throw new Error("Failed to fetch jobs. Please try again.");
  }

  return mockJobs;
}