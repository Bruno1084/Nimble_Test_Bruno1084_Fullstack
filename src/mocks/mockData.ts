import type { Job } from "../types/job";
import type { Candidate } from "../types/candidate";

export const mockJobs: Job[] = [
  { id: "4416372005", title: "Fullstack Developer" },
  { id: "9100000001", title: "Frontend Developer" },
  { id: "8200000002", title: "Backend Developer" },
];

export const mockCandidate: Candidate = {
  uuid: "a1b2c3d4-5678",
  candidateId: "a1b2c3d4",
  applicationId: "app-1234",
  firstName: "Bruno",
  lastName: "Sosa",
  email: "bruno@example.com",
};