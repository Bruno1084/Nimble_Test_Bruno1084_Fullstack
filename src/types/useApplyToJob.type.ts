import type { PostStatus } from "./status";
import type { ApplyPayload } from "./application";

export interface UseApplyToJobReturn {
  apply: (payload: ApplyPayload) => Promise<void>;
  status: PostStatus;
  error: string | null;
  reset: () => void;
};
