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

    const error = validateRepoUrl(value);
    setValidationError(error);

    if (status === "success") {
      reset();
    }
  };

  const handleSubmit = async () => {
    const error = validateRepoUrl(repoUrl);

    if (error) {
      setValidationError(error);
      return;
    }

    await apply({
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      repoUrl: repoUrl,
    });
  };

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <div className="job-item">
      <h3 className="job-item__title">{job.title}</h3>

      <div className="job-item__controls">
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
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
      </div>

      {validationError && (
        <p className="job-item__validation-error">{validationError}</p>
      )}

      {status === "error" && error && (
        <p className="job-item__submit-error">{error}</p>
      )}

      {isSuccess && (
        <p className="job-item__success">Application sent successfully!</p>
      )}
    </div>
  );
}
