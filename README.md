# 🚀 AssetVerse  
### Corporate Asset Management System

AssetVerse is a full-stack B2B web application designed to help organizations efficiently manage corporate assets and employee assignments. The platform enables HR managers to track inventory, manage employees, approve asset requests, and upgrade subscription packages, while employees can request and manage assets across multiple companies.

---

## 🔗 Live Links

- **Live Site:** [Live site](https://asset-verse-d1aa8.web.app/) 
- **Client Repository:** [Client URL](https://github.com/Jerome-Mondol/assetVerse-client)  
- **Server Repository:** [Server URL](https://github.com/Jerome-Mondol/assetVerse-server)

---

## 🎯 Project Purpose

Managing company assets manually often leads to asset loss, poor tracking, and administrative overhead. AssetVerse provides a centralized and scalable solution for:

- Tracking company-owned assets
- Managing employee–asset assignments
- Preventing asset loss through accountability
- Supporting multi-company employee affiliations
- Enforcing subscription-based employee limits
- Streamlining HR operations

This project demonstrates real-world full-stack development practices including authentication, authorization, payment integration, analytics, and production deployment.

---

## 👥 User Roles

### HR Manager (Admin)
- Register and manage company profile
- Add, edit, and delete assets
- Approve or reject employee asset requests
- Automatically affiliate employees on first approval
- Track employee count against package limits
- Upgrade subscription packages via Stripe
- View analytics and payment history
- Full administrative access

### Employee
- Register independently without company affiliation
- Request assets from multiple companies
- View assigned assets from all affiliated companies
- Return returnable assets
- View team members per company
- Manage personal profile information

---

## ✨ Key Features

- Role-based authentication (HR & Employee)
- JWT-protected private routes
- Auto-affiliation logic on first asset approval
- Multi-company employee support
- Asset request and approval workflow
- Returnable vs non-returnable asset tracking
- Subscription package enforcement
- Stripe payment integration for upgrades
- Real-time analytics using Recharts
- Server-side pagination
- PDF/Print asset reports (optional feature)
- Fully responsive dashboard UI
- Professional design using DaisyUI only

---

## 🧭 Application Pages

### Public Pages
- Home
- Login
- Join as Employee
- Join as HR Manager
- 404 Error Page

### Employee Dashboard
- My Assets
- Request an Asset
- My Team
- Profile

### HR Manager Dashboard
- Asset List (Dashboard)
- Add Asset
- All Requests
- Employee List
- Upgrade Package
- Profile

---

## 🔐 Authentication & Authorization

- Email & Password authentication
- JWT token generation on login
- Role-based route protection
- `verifyToken` middleware for secured routes
- `verifyHR` middleware for admin-only access
- Persistent login on page reload
- Firebase domains properly authorized

---

## 💳 Payment Integration

- Stripe Checkout integration
- Secure package upgrade payments
- Immediate employee limit update on success
- Payment history stored in database

---

## 📊 Analytics

HR Dashboard includes real-time charts using **Recharts**:
- Pie Chart: Returnable vs Non-returnable assets
- Bar Chart: Top 5 most requested assets

---

## 🗂️ Database Collections

- users
- assets
- requests
- assignedAssets
- employeeAffiliations
- packages
- payments

MongoDB is used for all data persistence.

---

## 🧰 Technologies Used

### Frontend
- React
- React Router DOM
- Firebase Authentication
- Axios
- DaisyUI + Tailwind CSS
- Framer Motion
- Recharts
- Stripe JS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe API
- CORS
- dotenv

---



### Client (.env)
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=your_server_url
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## ⚙️ Environment Variables
### Server (.env)
```env
PORT=your_port
MONGO_URI=your_mongoDb_uro
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=your_client_url
