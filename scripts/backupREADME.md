---

# **Automated Backup with Cron in WSL**

## 📌 **Overview**

This setup automates backups using a **cron job inside WSL (Windows Subsystem for Linux)**.  
It runs a backup script (`backup.sh`) **every 10 minutes**, ensuring that:

- The project is built successfully before committing.
- The latest changes are saved on the current branch.
- The `backups` branch is updated to dzerkala the current branch.

Additionally, a **test cron job runs every minute** to verify that cron is working.

---

## 🛠️ **Installation Steps**

### **1️⃣ Ensure Cron is Installed and Running**

Since WSL does **not** start cron automatically, install it and start the service:

```bash
sudo apt update && sudo apt install cron -y
sudo service cron start
```

**Enable cron to start automatically in WSL:**

```bash
echo "sudo service cron start >/dev/null 2>&1" >> ~/.bashrc
```

To check if cron is running:

```bash
sudo service cron status
```

If it’s not running, start it:

```bash
sudo service cron start
```

---

### **2️⃣ Make `backup.sh` Executable**

Ensure the script is executable:

```bash
chmod +x /home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop/scripts/backup.sh
```

---

### **3️⃣ Add the Cron Jobs**

Edit your crontab:

```bash
crontab -e
```

Add these lines **at the bottom**:

```cron
*/10 * * * * /home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop/scripts/backup.sh >> /home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop/error.log 2>&1

* * * * * echo "Cron ran at $(date)" >> /home/yaroslav/test_cron.log
```

**Explanation:**

- **Backup Script (`backup.sh`) runs every 10 minutes.**
- **Test Job logs a timestamp every minute to confirm cron is active.**

Save and exit.

---

### **4️⃣ Verify the Cron Jobs**

To list your active cron jobs:

```bash
crontab -l
```

Expected output:

```
*/10 * * * * /home/yaroslav/code/.../backup.sh >> /home/yaroslav/code/.../error.log 2>&1
* * * * * echo "Cron ran at $(date)" >> /home/yaroslav/test_cron.log
```

---

### **5️⃣ Check If Cron is Running**

Run:

```bash
sudo service cron status
```

If it’s **not running**, restart it:

```bash
sudo service cron restart
```

---

### **6️⃣ Check If the Test Cron Job is Running**

The test job logs timestamps every minute to:

```bash
cat /home/yaroslav/test_cron.log
```

Expected output:

```
Cron ran at Sun Feb 9 12:10:01 UTC 2025
Cron ran at Sun Feb 9 12:11:01 UTC 2025
Cron ran at Sun Feb 9 12:12:01 UTC 2025
```

If this works, **cron is running correctly**.

---

## 🔍 **Checking Log Files for the Backup Job**

| **Log File**                        | **Purpose**                                  |
| ----------------------------------- | -------------------------------------------- |
| `/home/yaroslav/test_cron.log`      | Confirms if cron is running every minute.    |
| `/home/yaroslav/code/.../error.log` | Stores errors/output from `backup.sh`.       |
| `/var/log/syslog`                   | System log where cron execution is recorded. |

### **To Check Backup Script Logs:**

```bash
tail -f /home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop/error.log
```

### **To Check System-Wide Cron Logs:**

```bash
grep CRON /var/log/syslog | tail -20
```

If you don’t see your cron job running here, **cron may not be running properly**.

---

## 🔥 **What Happens if the Build Fails?**

1. The script **runs `npm run build`** and logs errors to:
   ```
   /home/yaroslav/code/.../error.log
   ```
2. If the build fails:

   - The script **stops immediately** (no backup is made).
   - The error log is opened in VS Code.
   - The backup branch is **not updated**.

3. **How to View the Error Log**:
   ```bash
   cat /home/yaroslav/code/.../error.log
   ```
   OR open it in VS Code:
   ```bash
   code /home/yaroslav/code/.../error.log
   ```

---

## 🔄 **How to Change the Cron Job Schedule**

To change how often the backup script runs:

1. Open crontab:
   ```bash
   crontab -e
   ```
2. Modify the first line:

   ```
   */10 * * * * /home/yaroslav/code/.../backup.sh
   ```

   - **Run Every 5 Minutes:**
     ```cron
     */5 * * * * /home/yaroslav/code/.../backup.sh
     ```
   - **Run Every Hour:**
     ```cron
     0 * * * * /home/yaroslav/code/.../backup.sh
     ```
   - **Run Once a Day at Midnight:**
     ```cron
     0 0 * * * /home/yaroslav/code/.../backup.sh
     ```

3. Save and exit.
4. Restart cron to apply changes:
   ```bash
   sudo service cron restart
   ```

---

## 🚀 **Manually Running the Backup Script**

To test if the script works **outside cron**, run:

```bash
/home/yaroslav/code/yaroslavgubich/barco_fresh/barco_blanco_shop/scripts/backup.sh
```

If it fails:

- Check file permissions:
  ```bash
  chmod +x /home/yaroslav/code/.../backup.sh
  ```
- Ensure absolute paths are used in `npm` and `git` commands.

---

## ❌ **Troubleshooting Cron Issues**

### **1️⃣ Crontab Shows Nothing (`crontab -l` is Empty)**

Run:

```bash
crontab -e
```

Re-add the cron jobs manually.

---

### **2️⃣ Cron Jobs Are Not Running**

- Restart cron:
  ```bash
  sudo service cron restart
  ```
- Check if cron is active:
  ```bash
  sudo service cron status
  ```
- Verify script permissions:
  ```bash
  chmod +x /home/yaroslav/code/.../backup.sh
  ```

---

### **3️⃣ The Test Cron Job (`test_cron.log`) Is Not Updating**

If the file is **empty**, cron **is not running**. Fix it by restarting the service:

```bash
sudo service cron restart
```

If it still doesn’t work, **force cron to start on WSL startup**:

```bash
echo "sudo service cron start >/dev/null 2>&1" >> ~/.bashrc
```

---

### **4️⃣ Backup Script Doesn’t Run But Test Job Works**

Check:

```bash
tail -f /home/yaroslav/code/.../error.log
```

Possible issues:

- The script is **not executable** → **Run `chmod +x backup.sh`**
- `npm run build` **fails** → **Check `error.log`**
- `git` **commands fail due to missing paths** → **Use absolute paths (`/usr/bin/git ...`)**

---

## 🎯 **Conclusion**

✅ **Your backup script runs automatically every 10 minutes**  
✅ **Your test cron job logs every minute to confirm cron is active**  
✅ **Logs help debug issues easily**

If anything breaks, restart cron:

```bash
sudo service cron restart
```

Here is a **README section** that explains **Chrome and ChromeDriver installation** in WSL/Ubuntu.

---

## **🛠️ Installing Chrome and ChromeDriver in WSL/Ubuntu**

For the backup automation to work properly, **Google Chrome** and **ChromeDriver** must be installed in WSL or Ubuntu. The script uses Chrome to display error logs in case of a failure.

### **1️⃣ Install Google Chrome**

Run the following commands to **install Google Chrome** in WSL/Ubuntu:

```bash
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install google-chrome-stable -y
```

After installation, verify that Chrome is installed:

```bash
google-chrome --version
```

✅ **If Chrome opens successfully, it is installed correctly.**

---

### **2️⃣ Install ChromeDriver**

ChromeDriver is required if the script needs to control Chrome programmatically.

1. **Find the latest version of ChromeDriver**:

   ```bash
   CHROME_VERSION=$(google-chrome --version | awk '{print $3}' | cut -d '.' -f1)
   echo "Detected Chrome version: $CHROME_VERSION"
   ```

2. **Download and install ChromeDriver**:

   ```bash
   wget https://chromedriver.storage.googleapis.com/$(curl -sS https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION)/chromedriver_linux64.zip
   unzip chromedriver_linux64.zip
   sudo mv chromedriver /usr/local/bin/
   sudo chmod +x /usr/local/bin/chromedriver
   rm chromedriver_linux64.zip
   ```

3. **Verify ChromeDriver installation**:
   ```bash
   chromedriver --version
   ```

✅ **If ChromeDriver runs without errors, it is installed correctly.**

---

### **3️⃣ Allow Chrome to Run in WSL (If Needed)**

If running inside **WSL** (Windows Subsystem for Linux), Chrome may need an X server to display graphical applications. Install **VcXsrv** or **X410** on Windows and enable `DISPLAY` forwarding.

1. **Check your WSL IP address**:

   ```bash
   ip addr | grep eth0
   ```

   Example output:

   ```
   inet 172.20.64.1/20 brd 172.20.79.255 scope global eth0
   ```

2. **Set up `DISPLAY` in WSL**:

   ```bash
   export DISPLAY=$(ip route | awk '/^default/ {print $3}'):0.0
   echo 'export DISPLAY=$(ip route | awk "/^default/ {print \$3}"):0.0' >> ~/.bashrc
   ```

3. **Start the X server on Windows**:
   - Install [VcXsrv](https://sourceforge.net/projects/vcxsrv/) or [X410](https://x410.dev/).
   - Start **VcXsrv** with the option **"Disable Access Control"**.

---

### **4️⃣ Troubleshooting**

- If **Chrome does not start**, try running:
  ```bash
  google-chrome --no-sandbox --disable-gpu --disable-software-rasterizer
  ```
- If **ChromeDriver gives errors**, ensure Chrome and ChromeDriver **versions match**:
  ```bash
  google-chrome --version
  chromedriver --version
  ```

---

✅ **Now, Chrome and ChromeDriver are fully installed and ready to use in WSL/Ubuntu!** 🚀

## 🚀 **Enjoy automatic backups inside WSL!**

This README ensures that **everything is documented**, from **installation** to **troubleshooting**, so your cron jobs always work smoothly. 🚀
