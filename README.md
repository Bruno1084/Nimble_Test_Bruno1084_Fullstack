# NimbleGravity Fullstack Test
Technical assessment built with React, TypeScript and Vite.

The application allows a candidate to:
- View available job positions
- Apply to a selected job by submitting a repository URL
- Handle loading, success and error states properly

## Tech Stack
- React 18
- TypeScript
- Vite
- CSS (plain CSS per component)
- Custom Hooks for data fetching
- Mock service layer (toggleable)
- pnpm

## Architecture
The project follows a modular architecture with clear separation of concerns:

- UI Layer → Reusable components grouped by feature (ui/, jobs/)
- Hooks Layer → Custom hooks encapsulating business logic and async state management
- Service Layer → Infrastructure layer responsible for API communication
- Mock Layer → Simulated API responses with delay and error scenarios

All services are abstracted behind a single entry point (services/index.ts), allowing easy switching between real API and mock services via environment variables.

## Project Structure
```
src/
 ├── components/              
 │    ├── ui/
 │    └── jobs/
 │
 ├── hooks/                       
 │    ├── useApplyToJob.ts
 │    └── useJobs.ts
 │
 ├── services/
 │    ├── candidateService.mock.ts
 │    ├── candidateService.ts
 │    ├── jobService.mock.ts
 │    ├── jobService.ts
 │    └── index.ts
 │
 ├── types/
 │
 ├── mocks/
 │
 ├── App.tsx
 │
 └── main.tsx
 ```

 ## Environment Variables

Create a `.env` file in the root directory:
```
VITE_USE_MOCK=true
```
true → Uses mock services
false → Uses real API endpoints

## How to Run
Install dependencies
```
pnpm install
```

Run the project
```
pnpm run dev
```
