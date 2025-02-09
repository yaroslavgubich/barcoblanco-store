#!/bin/bash

# Variables
PROJECT_DIR="/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop"
BACKUP_BRANCH="backups"
ERROR_LOG="$PROJECT_DIR/error.log"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Navigate to the project directory
cd "$PROJECT_DIR" || exit

# Run the build process
echo "Running build process..."
npm run build 2> "$ERROR_LOG"

# Check if the build failed
if [ $? -ne 0 ]; then
    echo "Build failed. Check error.log for details."
    code -n "$ERROR_LOG" # Open the error log in VS Code
    exit 1
fi

# Build succeeded
echo "Build succeeded. Switching to backup branch..."

# Ensure the backups branch exists
if ! git rev-parse --verify "$BACKUP_BRANCH" >/dev/null 2>&1; then
    git checkout -b "$BACKUP_BRANCH"
else
    git checkout "$BACKUP_BRANCH"
fi

# Merge changes from yar-feature into backups (avoiding conflicts)
git merge --no-ff --no-commit "$CURRENT_BRANCH"

# Add and commit all changes
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git add .
git commit -m "Backup commit at $TIMESTAMP" --quiet

# Switch back to the original branch
echo "Switching back to the working branch ($CURRENT_BRANCH)..."
git checkout "$CURRENT_BRANCH"

echo "Backup commit completed successfully on branch $BACKUP_BRANCH."
