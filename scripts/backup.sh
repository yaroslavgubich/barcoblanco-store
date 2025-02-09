#!/bin/bash

set -e  # Exit on error

# ----------------------------------
# Variables
# ----------------------------------
PROJECT_DIR="/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop"
BACKUP_BRANCH="backups"
ERROR_LOG="$PROJECT_DIR/error.log"

cd "$PROJECT_DIR" || { echo "Project directory not found!"; exit 1; }

# Get the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# ----------------------------------
# 1. Commit changes on the current branch
# ----------------------------------
if [[ -n $(git status --porcelain) ]]; then
  TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
  echo "Committing changes on $CURRENT_BRANCH..."
  git add .
  git commit -m "Backup commit at $TIMESTAMP"
fi

# ----------------------------------
# 2. Run the build process
# ----------------------------------
echo "Running build..."
if ! npm run build &> "$ERROR_LOG"; then
  echo "Build failed. Check $ERROR_LOG"
  code -n "$ERROR_LOG"
  exit 1
fi

# ----------------------------------
# 3. Duplicate everything to the backups branch
# ----------------------------------
if ! git rev-parse --verify "$BACKUP_BRANCH" >/dev/null 2>&1; then
  echo "Backup branch does not exist. Creating it..."
  git checkout -b "$BACKUP_BRANCH"
else
  echo "Switching to the backup branch..."
  git checkout "$BACKUP_BRANCH"
fi

# Reset the backup branch to be identical to the current branch
echo "Syncing backup branch with $CURRENT_BRANCH..."
git reset --hard "$CURRENT_BRANCH"

# ----------------------------------
# 4. Switch back to the original branch
# ----------------------------------
echo "Switching back to $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "✅ Backup completed successfully (offline)."
