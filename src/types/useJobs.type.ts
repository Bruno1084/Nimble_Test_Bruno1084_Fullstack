import type { GetStatus } from "./status";
import type { Job } from "./job";

export interface UseJobsReturn {
  jobs: Job[];
  status: GetStatus;
  error: string | null;
}
