#!/bin/bash
set -e  # Exit immediately if any command fails

# ----------------------------------
# Variables
# ----------------------------------
PROJECT_DIR="/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop"
BACKUP_BRANCH="backups"
ERROR_LOG="$PROJECT_DIR/error.log"

# Change to the project directory
cd "$PROJECT_DIR" || { echo "Project directory not found!"; exit 1; }

# ----------------------------------
# 1. Run the build process
# ----------------------------------
echo "Running build process..."
if ! npm run build &> "$ERROR_LOG"; then
  echo "❌ Build failed. Check $ERROR_LOG for details."
  code -n "$ERROR_LOG"   # Open the error log in VS Code (optional)
  exit 1
fi

echo "✅ Build succeeded!"

# ----------------------------------
# 2. Commit changes on the current branch
# ----------------------------------
# At this point, only a successful build has occurred. Now we commit any changes.
echo "Adding and committing changes on the current branch..."
git add .
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Backup commit at $TIMESTAMP"

# Get the name of the current branch (after commit)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# ----------------------------------
# 3. Switch to (or create) the backup branch and duplicate everything
# ----------------------------------
if git show-ref --verify --quiet "refs/heads/$BACKUP_BRANCH"; then
  echo "Switching to backup branch '$BACKUP_BRANCH'..."
  git checkout "$BACKUP_BRANCH"
else
  echo "Backup branch '$BACKUP_BRANCH' does not exist. Creating it..."
  git checkout -b "$BACKUP_BRANCH"
fi

echo "Duplicating current branch '$CURRENT_BRANCH' to backup branch..."
# Make the backup branch an exact duplicate of the current branch
git reset --hard "$CURRENT_BRANCH"

# ----------------------------------
# 4. Switch back to the original branch
# ----------------------------------
echo "Switching back to the working branch '$CURRENT_BRANCH'..."
git checkout "$CURRENT_BRANCH"

echo "✅ Backup completed successfully."
