# VS Code Configuration Reference

This directory contains VS Code configurations for running and debugging the Phonebook and Notes full-stack applications.

---

## Files

| File | Purpose |
|------|---------|
| `tasks.json` | Background tasks for starting/stopping Vite dev servers |
| `launch.json` | Debug configurations for backends, frontends, and compound full-stack setups |
| `chrome-debug-profile/` | Isolated Chrome profile used for browser debugging (do not commit) |

---

## Tasks (tasks.json)

### Task: Start Phonebook React Vite Frontend

Launches the Vite dev server for the Phonebook frontend.

| Field | Value | Purpose |
|-------|-------|---------|
| `label` | `Start Phonebook React Vite Frontend` | Name shown in Command Palette |
| `type` | `shell` | Runs in system terminal |
| `command` | `npm run dev` | Starts Vite |
| `cwd` | `${workspaceFolder}/part3/phonebook-frontend` | Working directory |
| `isBackground` | `true` | Long-running task |
| `presentation.panel` | `new` | Opens a dedicated terminal panel |
| `presentation.reveal` | `silent` | Does not reveal terminal |
| `presentation.close` | `true` | Closes terminal when task ends |

#### Problem Matcher

Detects TypeScript errors and maps them to the Problems panel (`Ctrl+Shift+M`).

```regex
^([^\s].*)\((\d+|\d+,\d+|\d+,\d+,\d+,\d+)\):\s+(error\|warning\|info)\s+(TS\d+)\s*:\s*(.*)$
```

| Capture Group | Purpose | Example |
|---------------|---------|---------|
| Group 1 (`file`) | File path relative to `cwd` | `src/App.tsx` |
| Group 2 (`location`) | Line/column | `12,3` |
| Group 3 (`severity`) | `error`, `warning`, or `info` | `error` |
| Group 4 (`code`) | TS compiler code | `TS2322` |
| Group 5 (`message`) | Error description | `Type 'string' is not assignable to type 'number'` |

#### Background Watching

| Field | Value | Purpose |
|-------|-------|---------|
| `activeOnStart` | `true` | Begin monitoring immediately |
| `beginsPattern` | `.*` | Any output signals dev server started |
| `endsPattern` | `ready in\|http://localhost` | Signals server is ready, unblocks editor |

### Task: Start Notes React Vite Frontend

Identical to the Phonebook task but targets `notes-app/notes-frontend`.

| Field | Value |
|-------|-------|
| `label` | `Start Notes React Vite Frontend` |
| `cwd` | `${workspaceFolder}/notes-app/notes-frontend` |

### Task: Kill Vite On Stop

Kills port 5173 when the workspace closes or manually triggered.

| Field | Value |
|-------|-------|
| `label` | `Kill Vite On Stop` |
| `command` | `npx kill-port 5173` |
| `presentation.reveal` | `silent` |
| `presentation.panel` | `shared` |
| `presentation.close` | `true` |

> **Note:** On Windows, replace the command with `taskkill /f /im node.exe` or `npx kill-port 5173`.

---

## Debug Configurations (launch.json)

### Backend API Debuggers

| Name | Type | Request | Program | CWD |
|------|------|---------|---------|-----|
| `Phonebook Backend API` | `node` | `launch` | `${workspaceFolder}/part3/phonebook-backend/index.js` | `${workspaceFolder}/part3/phonebook-backend` |
| `Notes Backend API` | `node` | `launch` | `${workspaceFolder}/notes-app/notes-backend/index.js` | `${workspaceFolder}/notes-app/notes-backend` |

Both use:
- `runtimeExecutable`: `npm`
- `runtimeArgs`: `["run", "dev"]`
- `restart`: `true` (auto-restart on change via nodemon)
- `console`: `internalConsole`

### Frontend Browser Debuggers

| Name | Type | Request | URL | webRoot |
|------|------|---------|-----|---------|
| `Phonebook React Frontend` | `chrome` | `launch` | `http://localhost:5173` | `${workspaceFolder}/part3/phonebook-frontend` |
| `Notes React Frontend` | `chrome` | `launch` | `http://localhost:5173` | `${workspaceFolder}/notes-app/notes-frontend` |

Both use:
- `preLaunchTask`: Starts the corresponding Vite frontend task
- `postDebugTask`: `Kill Vite On Stop`
- `runtimeExecutable`: `/usr/bin/google-chrome`
- `userDataDir`: `${workspaceFolder}/.vscode/chrome-debug-profile` (isolated debug profile)
- `resolveSourceMapLocations`: Resolves sourcemaps for the frontend, excludes `node_modules` and Chrome extensions

### Compound Configurations

Run backend + frontend simultaneously from the Debug panel dropdown.

| Name | Configurations |
|------|----------------|
| `Launch Phonebook Full Stack` | `Phonebook Backend API`, `Phonebook React Frontend` |
| `Launch Notes Full Stack` | `Notes Backend API`, `Notes React Frontend` |

---

## Useful Commands

```bash
# Run a task
Ctrl+Shift+P → Tasks: Run Task → <task name>

# Start debugging
Ctrl+Shift+D → Select configuration from dropdown → F5

# View Problems panel
Ctrl+Shift+M

# View terminal output
Ctrl+`
```

---

## Troubleshooting

- **Task never starts:** Verify the target directory exists and `npm install` has been run
- **Port 5173 already in use:** Run `npx kill-port 5173` manually or trigger the `Kill Vite On Stop` task
- **Problems panel not showing errors:** Ensure your TypeScript compiler output matches the `problemMatcher` regex pattern
- **Debugger won't connect:** Confirm the Vite dev server is running and the URL (`http://localhost:5173`) matches
- **Wrong working directory:** Check that `cwd` paths align with your project structure
- **Chrome profile conflicts:** The `chrome-debug-profile/` directory isolates debug sessions from your main Chrome profile
