<meta>
description: Start the Vite development server
</meta>

# Start Development Server

<background_information>
- **Mission**: Start the Vite development server for this React application
- **Success Criteria**:
  - Server is running and accessible
  - URL is displayed to the user
  - No port conflicts
</background_information>

<instructions>
## Step 1: Check Current Status

**Verify if server is already running**:
- Use PowerShell command:
  ```powershell
  Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -ge 5173 -and $_.LocalPort -le 5180 }
  ```
- If any process found:
  - Report: "ℹ️ 開発サーバーは既に起動しています"
  - Display the URL (e.g., `http://localhost:5173/`)
  - **EXIT** (do not start a new server)

## Step 2: Start Development Server

**Execute startup command**:
- Working directory: Project root (`c:\cursor\mydocuments\webapp-template-react`)
- Command: `npm run dev`
- Shell options: `block_until_ms: 0` (run in background)
- Description: "Vite開発サーバーを起動"

## Step 3: Wait for Startup

**Allow server to initialize**:
- Wait 3-5 seconds for Vite to start
- Use: `Start-Sleep -Seconds 4`

## Step 4: Verify and Report

**Read terminal output**:
- Read the terminal file to find the port number
- Look for pattern: `Local: http://localhost:{PORT}/`

**Display success message**:
```
✅ 開発サーバーを起動しました

📍 URL: http://localhost:{PORT}/
```

</instructions>

<error_handling>
- **Port already in use**: Vite automatically tries ports 5174, 5175, etc.
- **Startup failure**: Display terminal error output
- **Network issues**: Report error and suggest checking Node.js installation
</error_handling>
