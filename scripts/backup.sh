#!/bin/bash
set -e  # Exit immediately if any command fails

# ----------------------------------
# Variables
# ----------------------------------
PROJECT_DIR="/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop"
BACKUP_BRANCH="backups"
ERROR_LOG="$PROJECT_DIR/error.log"
SANITY_URL="http://localhost:3000/sanity"
TEMP_BODY="/tmp/sanity_body.txt"  # Temporary file for the response body

# Navigate to the project directory
cd "$PROJECT_DIR" || { echo "❌ Project directory not found! Exiting."; exit 1; }

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# ----------------------------------
# 1️⃣ Run the Build Process
# ----------------------------------
echo "🚀 Running build process..."
if ! npm run build &> "$ERROR_LOG"; then
  echo "❌ Build failed. Opening error log in VS Code..."
  code -n "$ERROR_LOG"
  exit 1
fi
echo "✅ Build succeeded!"

# ----------------------------------
# 2️⃣ Check the Sanity Endpoint
# ----------------------------------
echo "🔍 Checking sanity endpoint at $SANITY_URL..."

# Temporarily disable exit-on-error so that curl failures do not exit the script.
set +e
response=$(curl -sS -o "$TEMP_BODY" -w "HTTPSTATUS:%{http_code}" "$SANITY_URL" 2>&1)
curl_exit=$?
set -e

if [ $curl_exit -ne 0 ]; then
  # If curl failed, set an artificial status code and capture the error message.
  http_status="000"
  sanity_body="$response"
else
  # If curl succeeded, extract the HTTP status code from the response.
  http_status=$(echo "$response" | sed -e 's/.*HTTPSTATUS://')
  sanity_body=$(cat "$TEMP_BODY")
fi

# Debug output for troubleshooting
echo "Sanity Status: $http_status"
echo "Sanity Body: $sanity_body"

# Determine if the sanity check failed:
# - If the HTTP status is not 200 (or is our artificial "000")
# - Or if the response body (case-insensitive) contains "missing required html"
if [ "$http_status" -ne 200 ] || echo "$sanity_body" | grep -qi "missing required html"; then
  echo "❌ Sanity check failed! Endpoint returned status code $http_status."
  {
    echo "❌ Sanity check failed!"
    echo "Status code: $http_status"
    echo "Response:"
    echo "$sanity_body"
  } > "$ERROR_LOG"
  echo "Opening error log in VS Code..."
  code -n "$ERROR_LOG"
  exit 1
fi
echo "✅ Sanity check passed!"

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

echo "✅ Backup completed successfully!"
