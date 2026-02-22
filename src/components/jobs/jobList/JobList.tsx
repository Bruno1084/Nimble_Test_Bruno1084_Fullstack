import { JobItem } from "../jobItem/JobItem";
import type { Job } from "../../../types/job";
import type { Candidate } from "../../../types/candidate";
import "./jobList.css";

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
}

export function JobList({ jobs, candidate }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="job-list__empty">
        <p>No open positions available.</p>
      </div>
    );
  }

  return (
    <section className="job-list">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </section>
  );
}
