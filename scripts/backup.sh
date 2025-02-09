#!/bin/bash

# Exit on any error
set -e

# ----------------------------------
# Variables
# ----------------------------------
PROJECT_DIR="/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop"
BACKUP_BRANCH="backups"
ERROR_LOG="$PROJECT_DIR/error.log"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

cd "$PROJECT_DIR" || { echo "Project directory not found! Exiting."; exit 1; }

# ----------------------------------
# 1. Ensure clean working tree
# ----------------------------------
# If 'git status --porcelain' has any output, there are uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  echo "ERROR: You have uncommitted changes in $CURRENT_BRANCH."
  echo "Please commit or stash your changes before running this script."
  exit 1
fi

# ----------------------------------
# 2. Clear old error logs if exist
# ----------------------------------
[ -f "$ERROR_LOG" ] && rm -f "$ERROR_LOG"

# ----------------------------------
# 3. Run npm build (capture all output in error.log)
# ----------------------------------
echo "Running build process..."
# Capture success/failure in variable
if npm run build &> "$ERROR_LOG"; then
  echo "Build succeeded!"
else
  echo "Build failed. Check $ERROR_LOG for details."
  code -n "$ERROR_LOG"
  exit 1
fi

# ----------------------------------
# 4. Switch/create backups branch
# ----------------------------------
if ! git rev-parse --verify "$BACKUP_BRANCH" >/dev/null 2>&1; then
  echo "Backup branch '$BACKUP_BRANCH' does not exist. Creating it..."
  git checkout -b "$BACKUP_BRANCH"
else
  echo "Switching to existing backup branch '$BACKUP_BRANCH'..."
  git checkout "$BACKUP_BRANCH"
fi

# ----------------------------------
# 5. Add and commit changes
# ----------------------------------
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git add .
git commit -m "Backup commit at $TIMESTAMP" --quiet

# (Optionally) push to remote
# git push origin "$BACKUP_BRANCH"

# ----------------------------------
# 6. Switch back
# ----------------------------------
echo "Switching back to the working branch ($CURRENT_BRANCH)..."
git checkout "$CURRENT_BRANCH"

echo "Backup commit completed successfully on branch $BACKUP_BRANCH."
