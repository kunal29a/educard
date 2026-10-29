# EduCard

EduCard is a frontend-only student productivity prototype built with React and Vite. It includes a responsive application shell, demo analytics, task management, study planning, and persisted light, dark, and system themes.

## Run locally

Requires Node.js 18 or newer and npm. From this folder:

```sh
npm install
npm run dev
```

To build a production bundle, run `npm run build`; to preview it, run `npm run preview`.

Run the focused utility and persistence tests with `npm test`.

## Frontend architecture

- `src/data/mockData.js` contains centralized sample student, task, subject, alert, and analytics records.
- `src/services/` provides async service-shaped functions as the future API boundary. They return sample data only; no server or fake HTTP endpoints are present.
- `src/App.jsx` contains page composition, route handling, interaction state, and reusable UI primitives.
- `src/styles.css` contains shared design tokens, intentional dark and light themes, and responsive layouts.
- Task changes, study-plan sessions, profile fields and goals, and the selected theme are stored in browser localStorage on this device. They are not synchronized to a server or account.
- Analytics can be exported as a CSV generated from the bundled sample analytics and current local task list.

Login and signup are demo flows with no real authentication. AI metrics and recommendations are illustrative sample values and are not model output. Account actions, email delivery, notification delivery, and cross-device data sync require backend integration; the report print action uses the browser's print dialog.
