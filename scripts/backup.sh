#!/bin/bash
set -e  # Exit immediately if any command fails

# ----------------------------------
# Variables
# ----------------------------------
PROJECT_DIR="/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop"
BACKUP_BRANCH="backups"
ERROR_LOG="$PROJECT_DIR/error.log"
DEV_SERVER_LOG="/tmp/dev_server.log"    # Log file for the dev server

# ----------------------------------
# Navigate to the project directory
# ----------------------------------
cd "$PROJECT_DIR" || { 
  echo "❌ Project directory not found! Exiting." > "$ERROR_LOG"
  google-chrome --new-window "file://$ERROR_LOG"
  exit 1
}


# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# ----------------------------------
# 1️⃣ Run the Build Process
# ----------------------------------
echo "🚀 Running build process..."
if ! npm run build &> "$ERROR_LOG"; then
  echo "❌ Build failed! Opening error log in Chrome..."
  export $(dbus-launch)
  google-chrome --new-window "file://$ERROR_LOG"
  exit 1
fi
echo "✅ Build succeeded!"

# ----------------------------------
# 3️⃣ Commit Changes on the Current Branch
# ----------------------------------
echo "📌 Adding and committing changes on the current branch '$CURRENT_BRANCH'..."
git add .
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Backup commit at $TIMESTAMP"

# ----------------------------------
# 4️⃣ Reset error.log to Avoid Conflicts
# ----------------------------------
if [[ -f "$ERROR_LOG" ]]; then
  echo "⚠️ Resetting error.log to prevent conflicts..."
  git checkout -- "$ERROR_LOG"
fi

# ----------------------------------
# 5️⃣ Switch to (or Create) the Backup Branch
# ----------------------------------
if git show-ref --verify --quiet "refs/heads/$BACKUP_BRANCH"; then
  echo "🔄 Switching to backup branch '$BACKUP_BRANCH'..."
  git checkout "$BACKUP_BRANCH"
else
  echo "🆕 Backup branch '$BACKUP_BRANCH' does not exist. Creating it..."
  git checkout -b "$BACKUP_BRANCH"
fi

# ----------------------------------
# 6️⃣ Duplicate Everything to the Backup Branch
# ----------------------------------
echo "🔁 Syncing backup branch '$BACKUP_BRANCH' with '$CURRENT_BRANCH'..."
git reset --hard "$CURRENT_BRANCH"

# ----------------------------------
# 7️⃣ Switch Back to the Original Branch
# ----------------------------------
echo "🔙 Switching back to the working branch '$CURRENT_BRANCH'..."
git checkout "$CURRENT_BRANCH"

l $DEV_SERVER_PID

echo "✅ Backup completed successfully!"
