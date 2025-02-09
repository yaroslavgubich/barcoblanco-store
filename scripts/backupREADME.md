# Automated Backup with Cron in WSL

This setup automates backups by running a script every **10 minutes** using `cron` inside **WSL (Windows Subsystem for Linux)**.

## 📌 How It Works

1. **Every 10 minutes**, the cron job runs `backup.sh` to:
   - Build the project.
   - If the build succeeds, commit changes.
   - Duplicate the current branch to `backups`.
   
2. **Every minute**, a test cron job logs timestamps to verify that cron is working.

## 🛠️ Installation Steps

### 1️⃣ Make Sure Cron is Installed and Running in WSL

```bash
sudo apt update && sudo apt install cron -y
sudo service cron start
