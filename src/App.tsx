import { useJobs } from "./hooks/useJobs";
import { useCandidate } from "./hooks/useCandidate";
import { JobList } from "./components/jobs/jobList/JobList";
import { Spinner } from "./components/ui/spinner/Spinner";

const CANDIDATE_EMAIL = "sosabruno3384@gmail.com";

function App() {
  const {
    candidate,
    status: candidateStatus,
    error: candidateError,
  } = useCandidate(CANDIDATE_EMAIL);

  const { jobs, status: jobsStatus, error: jobsError } = useJobs();

  // Global loading
  if (candidateStatus === "loading" || jobsStatus === "loading") {
    return <Spinner />;
  }

  // Candidate error
  if (candidateStatus === "error") {
    return <p>{candidateError}</p>;
  }

  // Jobs error
  if (jobsStatus === "error") {
    return <p>{jobsError}</p>;
  }

  // Safety guard
  if (!candidate) return null;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Open Positions</h1>
        <p>Apply by submitting your GitHub repository URL.</p>
      </header>

      <main className="app-content">
        <JobList jobs={jobs} candidate={candidate} />
      </main>
    </div>
  );
}

export default App