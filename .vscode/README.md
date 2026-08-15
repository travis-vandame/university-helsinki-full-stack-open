# VS Code Tasks Reference

## Overview

This directory contains VS Code task configurations for running and managing the Notes frontend development server. Tasks are defined in `tasks.json` and can be triggered from the Command Palette (`Ctrl+Shift+P`) or via the Run Task dropdown.

---

## Task: Start Notes Vite Frontend

Launches the Vite development server for the `notes-frontend` project.

### Configuration Fields

| Field | Value | Purpose |
|-------|-------|---------|
| `label` | `Start Notes Vite Frontend` | Human-readable name shown in the Command Palette |
| `type` | `shell` | Executes the command in the system terminal (vs `process` which runs in the built-in terminal) |
| `command` | `npm run dev` | The actual command run in the terminal |
| `cwd` | `${workspaceFolder}/notes-frontend` | Sets the working directory so all relative paths resolve correctly |
| `isBackground` | `true` | Tells VS Code this is a long-running task. Prevents the progress spinner and allows dependent tasks to work |

### Problem Matcher

The `problemMatcher` scans terminal output for TypeScript compiler errors and maps them to the VS Code Problems panel.

#### Pattern Breakdown

```regex
^([^\\s].*)\\((\\d+|\\d+,\\d+|\\d+,\\d+,\\d+,\\d+)\\):\\s+(error|warning|info)\\s+(TS\\d+)\\s*:\\s*(.*)$
```

| Capture Group | Purpose | Example |
|---------------|---------|---------|
| Group 1 (`file`) | File path relative to `cwd` | `src/App.tsx` |
| Group 2 (`location`) | Line/column numbers | `12,3` or `12` |
| Group 3 (`severity`) | Error level: `error`, `warning`, or `info` | `error` |
| Group 4 (`code`) | Compiler code (e.g., `TS2322`) | `TS2322` |
| Group 5 (`message`) | The actual error description | `Type 'string' is not assignable to type 'number'` |

#### Background Watching

Because Vite runs indefinitely, the `background` property tells VS Code when the server is ready:

| Field | Value | Purpose |
|-------|-------|---------|
| `activeOnStart` | `true` | Start monitoring output as soon as the task launches |
| `beginsPattern` | `.*` | Any terminal output signals compilation has started |
| `endsPattern` | `ready in\|http://localhost` | Signals the server is live — unblocks the editor |

---

## Task: Kill Vite On Stop

Kills any running Vite or `npm run dev` processes when the workspace is closed.

### Configuration Fields

| Field | Value | Purpose |
|-------|-------|---------|
| `label` | `Kill Vite On Stop` | Triggered automatically on workspace close |
| `command` | `pkill -f 'vite\|npm run dev'` | Finds and kills matching processes by name |
| `reveal` | `silent` | Don't show the terminal when running |
| `panel` | `shared` | Reuse the same terminal panel if multiple tasks are run |
| `close` | `true` | Close the terminal after the task completes |

> **Note:** On Windows, replace the `command` with: `taskkill /f /im node.exe` or `npx kill-port 5173`

---

## Useful Commands

```bash
# Open Command Palette and select a task
Ctrl+Shift+P → Tasks: Run Task

# Run task defined in tasks.json
Ctrl+Shift+P → Tasks: Run Task → Start Notes Vite Frontend

# View Problems panel (shows errors from problemMatcher)
Ctrl+Shift+M

# View terminal output
Ctrl+`
```

## Troubleshooting

- **Task never starts:** Check that `notes-frontend/` exists and `npm install` has been run
- **Problems panel not showing errors:** Verify `problemMatcher` regex matches your compiler output format
- **Server won't stop:** Run the `Kill Vite On Stop` task manually or use `pkill -f vite` in the terminal
- **Wrong working directory:** Ensure `cwd` path matches where your frontend lives
