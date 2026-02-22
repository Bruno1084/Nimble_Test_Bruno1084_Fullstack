import type { Job } from "../types/job";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchJobs(signal?: AbortSignal): Promise<Job[]> {
	const response = await fetch(`${BASE_URL}/api/jobs/get-list`, { signal });

	if (!response.ok) {
		const errorBody = await response.json().catch(() => null);
		throw new Error(
			errorBody?.message || `HTTP error: ${response.status}`
		);
	}

	return response.json();
}
