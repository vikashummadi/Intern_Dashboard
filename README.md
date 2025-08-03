# Intern Dashboard - Full Stack Portal

A modern, responsive intern dashboard built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Authentication**: Login and signup forms (dummy authentication)
- **Dashboard**: Real-time display of intern information
- **Rewards System**: Visual representation of unlocked and locked rewards

### Backend
- **RESTful API**: Complete CRUD operations for intern data
- **MongoDB Integration**: Persistent data storage
- **Express Server**: Fast and scalable backend
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## 📋 Requirements

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd intern-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp env.example .env
```

Edit the `.env` file with your MongoDB connection string:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/intern-dashboard
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or if using MongoDB Atlas, update the MONGODB_URI in .env
```

### 5. Run the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 6. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 🎯 Usage

### Demo Mode
1. Click "Load Demo Dashboard" to see the application with sample data
2. No authentication required for demo mode

### Create Account
1. Click "Sign Up" tab
2. Fill in your details:
   - Full Name
   - Email
   - Password
   - Referral Code (e.g., yourname2025)
3. Submit the form

### Login
1. Use the email and password from your signup
2. Or use any existing intern's credentials

## 📊 API Endpoints

### GET `/api/interns`
- Returns all interns (without passwords)
- Used for login validation

### POST `/api/interns`
- Creates a new intern account
- Required fields: name, email, password, referralCode

### GET `/api/intern/:id`
- Returns specific intern by ID
- Used for detailed intern information

### GET `/api/demo-data`
- Returns dummy data for demo purposes
- No authentication required

## 🎨 Dashboard Features

### Statistics Cards
- **Intern Name**: Displays the logged-in intern's name
- **Referral Code**: Shows the unique referral code
- **Donations Raised**: Displays total amount raised (dummy data)

### Rewards Section
- **Unlocked Rewards**: Bronze, Silver, Gold, Platinum badges
- **Locked Rewards**: Diamond, Master, Legend badges (for demo)
- **Visual Indicators**: Icons and hover effects

## 🛡 Security Notes

⚠️ **Important**: This is a demo application with simplified security:
- Passwords are stored in plain text (not recommended for production)
- No JWT token validation
- No password hashing
- CORS is enabled for all origins

For production use, implement:
- Password hashing (bcrypt)
- JWT authentication
- Input validation
- Rate limiting
- HTTPS

## 📁 Project Structure

```
intern-dashboard/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── env.example         # Environment variables template
└── README.md          # This file
```

## 🧪 Testing with Postman

### Test API Endpoints

1. **Get All Interns**
   ```
   GET http://localhost:3000/api/interns
   ```

2. **Create New Intern**
   ```
   POST http://localhost:3000/api/interns
   Content-Type: application/json
   
   {
     "name": "Jane Doe",
     "email": "jane@example.com",
     "password": "password123",
     "referralCode": "janedoe2025"
   }
   ```

3. **Get Demo Data**
   ```
   GET http://localhost:3000/api/demo-data
   ```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/intern-dashboard
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check if MongoDB is running
2. Verify all dependencies are installed
3. Check the console for error messages
4. Ensure the correct port is available

## 🎉 Features Implemented

✅ **Frontend Requirements:**
- Dummy login/signup page
- Dashboard showing intern name
- Dummy referral code display
- Total donations raised display
- Rewards/unlockables section

✅ **Backend Requirements:**
- REST API with Express
- MongoDB integration
- Dummy data endpoints
- Postman-compatible API

✅ **Bonus Features:**
- Modern, responsive UI
- Smooth animations and transitions
- Demo mode for quick testing
- Local storage for session management
- Error handling and user feedback 