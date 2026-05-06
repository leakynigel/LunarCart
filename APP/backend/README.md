# LunarCart Backend Setup

If you encounter issues during `npm install` related to `||` not being a valid statement separator, especially when `sqlite3` is being installed, it's likely that your `npm` is configured to use PowerShell as its script shell.

To resolve this, you can configure `npm` to use `cmd.exe` for running scripts:

```bash
npm config set script-shell "cmd.exe"
```

After running this command, try `npm install` again.