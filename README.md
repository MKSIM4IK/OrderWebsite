# ServiceFix - Service Request Management Platform

A full-stack web application for managing service requests. Clients can submit service requests, and Yurii (the service provider) can review and accept them.

## 🌟 Features

- **Client Portal**: Submit service requests with name, phone, and description
- **Public Orders Board**: View all submitted requests and their status
- **Provider Dashboard**: Secure login area for Yurii to manage orders
- **Order Management**: Accept and track service requests
- **Real-time Updates**: Orders update automatically every 5 seconds
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **Secure Authentication**: JWT-based authentication with hashed passwords

## 📋 Tech Stack

**Backend:**
- Flask (Python Web Framework)
- SQLAlchemy (ORM)
- SQLite (Database)
- JWT (JSON Web Tokens)
- bcrypt (Password Hashing)
- Flask-CORS (Cross-Origin Resource Sharing)

**Frontend:**
- React 18
- React Router v6
- Axios (HTTP Client)
- React Toastify (Notifications)
- CSS3 (Responsive Design)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open on `http://localhost:3000`

## 🔐 Default Login Credentials

- **Username**: `Yurii123`
- **Password**: `Yurii123`

## 📱 Application Pages

### Public Pages
1. **Request Service** (`/`)
   - Submit a new service request
   - Enter name, phone, and service description
   - Receive confirmation after submission

2. **Orders Board** (`/orders`)
   - View all submitted service requests
   - See order status (New or Accepted)
   - Real-time updates

### Protected Pages
3. **Provider Login** (`/login`)
   - Login form for Yurii
   - Secure authentication

4. **Dashboard** (`/dashboard`)
   - View all new orders
   - Accept service requests
   - View accepted orders history
   - Show order statistics

## 🔄 API Endpoints

### Authentication
- `POST /api/login` - Authenticate provider
- `GET /api/verify-token` - Verify JWT token

### Orders
- `POST /api/orders` - Create new order (public)
- `GET /api/orders` - Get all orders (public, sorted latest first)
- `POST /api/orders/<id>/accept` - Accept order (protected)

### Health
- `GET /health` - Health check endpoint

## 📊 Database Schema

### Users Table
```
- id (Primary Key)
- username (String, Unique)
- password_hash (String)
- created_at (DateTime)
```

### Orders Table
```
- id (Primary Key)
- client_name (String)
- phone (String)
- description (Text)
- status (String: 'new' or 'accepted')
- created_at (DateTime)
- accepted_at (DateTime, nullable)
```

## 🎨 UI/UX Features

- **Clean Modern Design**: Gradient headers and card-based layout
- **Responsive Grid**: Mobile-first design that adapts to all screen sizes
- **Real-time Feedback**: Toast notifications for success/error messages
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper labels, semantic HTML, keyboard navigation
- **Status Indicators**: Visual badges for order status (New/Accepted)

## 🛡️ Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Token-based session management
- **CORS Configuration**: Controlled cross-origin requests
- **Protected Routes**: Dashboard accessible only after login
- **Token Expiration**: 24-hour token validity

## 🔧 Configuration

### Backend (app.py)
- `SQLALCHEMY_DATABASE_URI`: SQLite database path
- `SECRET_KEY`: JWT signing key (change in production)
- `JWT_EXPIRATION_HOURS`: Token validity duration

### Frontend (src/App.js)
- Backend API base URL: `http://localhost:5000`
- Can be modified in component files (e.g., `ClientForm.js`)

## 📝 Usage Workflow

1. **Client submits request** → POST `/api/orders`
2. **Order appears on board** → GET `/api/orders`
3. **Yurii logs in** → POST `/api/login` (receives JWT token)
4. **Yurii accepts order** → POST `/api/orders/<id>/accept`
5. **Client sees updated status** → Order shows as "Accepted"

## 🚨 Troubleshooting

### CORS Errors
- Ensure backend is running on port 5000
- Check that Flask-CORS is installed
- Verify API URLs in frontend components

### Database Issues
- Delete `backend/servicefix.db` to reset database
- Restart backend server to reinitialize
- Check file permissions in backend folder

### Login Issues
- Default credentials: `Yurii123` / `Yurii123`
- Check browser localStorage for token
- Clear browser cache and try again

### Port Already in Use
- Backend: `lsof -i :5000` (macOS/Linux) or `netstat -ano | findstr :5000` (Windows)
- Frontend: Change port with `PORT=3001 npm start`

## 📦 Project Structure

```
Order/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt        # Python dependencies
│   └── servicefix.db          # SQLite database (auto-created)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ClientForm.js
│   │   │   ├── OrderList.js
│   │   │   ├── LoginPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Navigation.js
│   │   │   └── ProtectedRoute.js
│   │   ├── styles/            # CSS files
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🎯 Future Enhancements

- Multiple service providers
- Provider profile and ratings
- Payment integration
- Email notifications
- File uploads for service details
- Service categories
- Search and filter functionality
- Admin panel for user management

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Support

For issues or questions, please check the troubleshooting section or review the code comments.

---

**Built with ❤️ as a Fixly-inspired service request platform**
