# ServiceFix - Quick Start Guide

## Step-by-Step Setup for Windows

### 1. Backend Setup (Flask)

```powershell
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

✅ You should see:
```
* Running on http://127.0.0.1:5000
* Press CTRL+C to quit
```

### 2. Frontend Setup (React)

Open **a new PowerShell window** and:

```powershell
# Navigate to frontend folder
cd frontend

# Install dependencies (this may take a few minutes)
npm install

# Start the development server
npm start
```

✅ Your browser should automatically open `http://localhost:3000`

### 3. Test the Application

**Step 1: Submit a Service Request**
- Click "Request Service" (or you're already on the home page)
- Fill in the form with test data:
  - Name: "John Doe"
  - Phone: "555-1234"
  - Description: "Need help fixing my plumbing"
- Click "Submit Request"
- You should see a success message

**Step 2: View the Request on Orders Board**
- Click "Orders Board" in the navigation
- You should see your request with status "New"

**Step 3: Log In as Yurii**
- Click "Provider Login" in the navigation
- Username: `Yurii123`
- Password: `Yurii123`
- Click "Login"
- You should be redirected to the Dashboard

**Step 4: Accept the Order**
- On the Dashboard, you should see your request under "New Orders"
- Click the "✓ Accept" button
- You should see a success notification
- The order will move to "Accepted Orders" section

**Step 5: Verify on Orders Board**
- Log out by clicking "Logout"
- Go to "Orders Board"
- The order should now show status "Accepted"

### 4. Key Features to Try

✨ **Real-time Updates**
- Have two browser windows open (one with Orders Board, one with Dashboard)
- Submit a request in one window
- Watch it appear in the other automatically

🎨 **Responsive Design**
- Open DevTools (F12)
- Click the device toolbar icon
- Test on mobile, tablet, and desktop sizes

⚠️ **Notifications**
- Try submitting with empty fields
- Try logging in with wrong credentials
- See error messages appear

## 🔧 Troubleshooting

### "Port 5000 already in use" (Backend)
```powershell
# Kill the process using port 5000
netstat -ano | findstr :5000
# Note the PID, then:
taskkill /PID <PID> /F
```

### "npm: The term 'npm' is not recognized"
```powershell
# Node.js/npm not installed
# Download from: https://nodejs.org/
# Install and restart PowerShell
```

### "ModuleNotFoundError: No module named 'flask'"
```powershell
# Ensure you activated the virtual environment
venv\Scripts\activate
# Then install packages again
pip install -r requirements.txt
```

### "CORS error" in browser console
- Ensure backend is running on port 5000
- Check the API URL in frontend components

### Database reset
- Delete `backend/servicefix.db`
- Restart backend server
- It will recreate the database automatically

## 📚 File Structure Overview

```
Order/
├── backend/
│   ├── app.py              ← Main Flask application
│   ├── requirements.txt    ← Python dependencies
│   └── servicefix.db       ← SQLite database (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── components/     ← React components
│   │   ├── styles/         ← CSS files
│   │   └── App.js          ← Main React component
│   └── package.json        ← npm dependencies
│
└── README.md               ← Full documentation
```

## 🎯 What Happens Behind the Scenes

1. **Frontend** sends a request to **Backend** API
2. **Backend** validates the data
3. **Backend** stores in SQLite database
4. **Backend** returns response to **Frontend**
5. **Frontend** shows notification to user

## 💡 Tips

- Keep backend terminal open while developing
- Keep frontend terminal open for live reload
- Use browser DevTools (F12) to debug
- Check browser Console for error messages
- Check terminal output for backend errors

## 🚀 You're Ready!

Your ServiceFix application is now running. Start by:
1. Submitting a service request
2. Viewing it on the orders board
3. Logging in as Yurii
4. Accepting the order

Enjoy! 🎉
