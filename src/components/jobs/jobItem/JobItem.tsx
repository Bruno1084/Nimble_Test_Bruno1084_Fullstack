import { useState } from "react";
import { useApplyToJob } from "../../../hooks/useApplyToJob";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/input/Input";
import { Spinner } from "../../ui/spinner/Spinner";
import type { Job } from "../../../types/job";
import type { Candidate } from "../../../types/candidate";
import "./jobItem.css";

interface JobItemProps {
  job: Job;
  candidate: Candidate;
}

export function JobItem({ job, candidate }: JobItemProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { apply, status, error, reset } = useApplyToJob();

  const validateRepoUrl = (value: string) => {
    if (!value.trim()) {
      return "Repository URL is required.";
    }

    if (!value.startsWith("http")) {
      return "Repository URL must start with http or https.";
    }

    if (!value.includes("github.com")) {
      return "Repository must be hosted on GitHub.";
    }

    return null;
  };

  const handleChange = (value: string) => {
    setRepoUrl(value);
    const err = validateRepoUrl(value);
    setValidationError(err);

    if (status === "success") {
      reset();
    }
  };

  const handleSubmit = async () => {
    const err = validateRepoUrl(repoUrl);

    if (err) {
      setValidationError(err);
      return;
    }

    // This is the catch. The endpoint requires applicationId.
    await apply({
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      applicationId: candidate.applicationId,
      repoUrl,
    });
  };

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>

      <div className="job-form">
        <Input
          value={repoUrl}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="https://github.com/your-username/your-repo"
          disabled={isSubmitting || isSuccess}
        />

        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            isSuccess ||
            !!validationError ||
            repoUrl.trim() === ""
          }
        >
          {isSubmitting ? <Spinner size="small" /> : "Submit"}
        </Button>
      </div>

      {validationError && <p className="job-validation">{validationError}</p>}

      {status === "error" && error && <p className="job-error">{error}</p>}

      {isSuccess && (
        <p className="job-success">Application sent successfully!</p>
      )}
    </div>
  );
}
