import { useJobs } from "./hooks/useJobs";
import { JobList } from "./components/jobs/jobList/JobList";
import { Spinner } from "./components/ui/spinner/Spinner";
import { mockCandidate } from "./mocks/mockData";

export function App() {
  const { jobs, status, error } = useJobs();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Open Positions</h1>
        <p>Apply by submitting your GitHub repository URL.</p>
      </header>

      <main className="app-content">
        {status === "loading" && <Spinner />}

        {status === "error" && (
          <div className="app-error">
            <p>{error}</p>
          </div>
        )}

        {status === "success" && (
          <JobList jobs={jobs} candidate={mockCandidate} />
        )}
      </main>
    </div>
  );
}
