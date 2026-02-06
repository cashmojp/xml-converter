<meta>
description: Restart the Vite development server
</meta>

# Restart Development Server

<background_information>
- **Mission**: Stop and restart the Vite development server (clean restart)
- **Success Criteria**:
  - All old servers are stopped
  - New server is started successfully
  - New URL is displayed
- **Use Cases**:
  - After changing `tailwind.config.js`
  - After modifying `vite.config.ts`
  - When server becomes unresponsive
</background_information>

<instructions>
## Step 1: Stop Existing Servers

**Execute shutdown**:
- Find all Node.js processes on ports 5173-5180
- Use PowerShell:
  ```powershell
  Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -ge 5173 -and $_.LocalPort -le 5180 } | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
  ```
- Track stopped ports for reporting

**Report stop status**:
- If servers stopped: "🔄 開発サーバーを停止しました"
- If no servers running: "ℹ️ サーバーは起動していませんでした"

## Step 2: Wait for Cleanup

**Allow processes to terminate**:
- Wait 2 seconds for cleanup
- Use: `Start-Sleep -Seconds 2`

## Step 3: Start New Server

**Execute startup**:
- Working directory: Project root
- Command: `npm run dev`
- Shell options: `block_until_ms: 0`
- Wait 4 seconds for startup

## Step 4: Verify and Report

**Read terminal output**:
- Find new port number from terminal
- Pattern: `Local: http://localhost:{PORT}/`

**Display complete status**:
```
✅ 開発サーバーを再起動しました

📍 URL: http://localhost:{PORT}/
```

</instructions>

<timing_notes>
- Total operation time: ~6-8 seconds
- Stop phase: immediate
- Cleanup wait: 2 seconds
- Startup wait: 4 seconds
</timing_notes>

<error_handling>
- **Stop fails**: Continue to startup anyway (may use different port)
- **Startup fails**: Display error and suggest manual `npm run dev`
- **Port conflict**: Vite will auto-increment port number
</error_handling>
