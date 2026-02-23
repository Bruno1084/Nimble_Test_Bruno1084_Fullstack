const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

import * as jobsMock from "./jobsService.mock";
import * as jobsReal from "./jobsService";

import * as candidateMock from "./candidateService.mock";
import * as candidateReal from "./candidateService";

const jobsService = USE_MOCK ? jobsMock : jobsReal;
const candidateService = USE_MOCK ? candidateMock : candidateReal;

export const fetchJobs = jobsService.fetchJobs;
export const fetchCandidateByEmail = candidateService.fetchCandidateByEmail;
export const applyToJob = candidateService.applyToJob;