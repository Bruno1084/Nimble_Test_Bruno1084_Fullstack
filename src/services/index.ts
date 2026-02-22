const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

import * as jobsMock from "./jobsService.mock";
import * as jobsReal from "./jobsService";

import * as candidateMock from "./candidateService.mock";
import * as candidateReal from "./candidateService";

// Candidate
export const fetchCandidateByEmail = USE_MOCK
  ? candidateMock.fetchCandidateByEmail
  : candidateReal.fetchCandidateByEmail;

// Jobs
export const fetchJobs = USE_MOCK
  ? jobsMock.fetchJobs
  : jobsReal.fetchJobs;

// Apply
export const applyToJob = USE_MOCK
  ? candidateMock.applyToJob
  : candidateReal.applyToJob;