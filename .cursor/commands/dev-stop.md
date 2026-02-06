<meta>
description: Stop all running Vite development servers
</meta>

# Stop Development Server

<background_information>
- **Mission**: Stop all running Vite development servers on ports 5173-5180
- **Success Criteria**:
  - All dev servers are terminated
  - User is informed of stopped processes
  - No orphaned processes remain
</background_information>

<instructions>
## Step 1: Find Running Servers

**Search for listening processes**:
- Use PowerShell command:
  ```powershell
  Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -ge 5173 -and $_.LocalPort -le 5180 } | ForEach-Object { $proc = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; [PSCustomObject]@{Port=$_.LocalPort; PID=$_.OwningProcess; Process=$proc.ProcessName} }
  ```
- Store results: list of `{Port, PID, ProcessName}`

**Validate results**:
- If no processes found:
  - Report: "ℹ️ 開発サーバーは起動していません"
  - **EXIT**

## Step 2: Stop All Servers

**Terminate each process**:
- For each found process:
  ```powershell
  Stop-Process -Id {PID} -Force
  ```
- Track stopped: `Port {PORT} (PID: {PID})`

## Step 3: Report Results

**Display summary**:
```
✅ 開発サーバーを停止しました

停止したプロセス:
- ポート 5173 (PID: 12345)
- ポート 5174 (PID: 12346)
```

**If multiple servers stopped**:
- List all stopped ports and PIDs

</instructions>

<safety_checks>
- Only stop Node.js processes on development ports (5173-5180)
- Do not stop Cursor's internal Node processes
- Verify process name is `node` before stopping
</safety_checks>
