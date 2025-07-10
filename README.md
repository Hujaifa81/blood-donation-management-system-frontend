
# 🩸 Blood Donation Management System

> 🧪 **Test Admin Credentials**  
> Email: `admin@admin.com`  
> Password: `123456@aA`

A full-stack web application that enables users to request and manage blood donations with secure authentication and role-based access for donors, volunteers, and admins.

🔗 **Live Site:** [Visit Website](https://blood-donation-managemen-7ebd3.web.app/)  
🔗 **Frontend Repo:** [Frontend GitHub](https://github.com/Hujaifa81/blood-donation-management-system-frontend)  
🔗 **Backend Repo:** [Backend GitHub](https://github.com/Hujaifa81/blood-donation-management-system-backend)

---

## 🚀 Features

1. **Donation Request Management**:
   - Create, update, and delete blood donation requests.
   - Track donation status: Pending, In-progress, Completed.
   - Role-based moderation by Admins and Volunteers.

2. **Donor Discovery**:
   - Search by blood group, district, and upazila.
   - Role-based access for secure filtering.

3. **Blog Management**:
   - Admins/Volunteers can add, edit, publish, or delete blogs.
   - Blog pagination and content visibility controls.

4. **Donation via Stripe**:
   - Users can donate funds using Stripe payment gateway.
   - All donations tracked securely.

5. **Authentication & Authorization**:
   - Firebase Auth (Google & Email/Password).
   - JWT-based auth with secure HTTP-only cookies.
   - Protected routes for role-based access (admin, donor, volunteer).

6. **Admin Dashboard**:
   - User management with status/role control.
   - Blog and donation request moderation.

7. **Additional Features**:
   - Pagination across blogs and requests.
   - Dynamic role assignment and user status control.
   - Mobile responsive and dark mode support.

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Firebase Authentication
- Tailwind CSS + DaisyUI
- Axios (with interceptors)
- React Hook Form
- TanStack React Query
- Swiper.js
- Stripe (for payments)

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- JWT
- Cookie Parser
- CORS
- Stripe API

---

## 📦 Installation Guide

### Frontend Setup

1. **Clone the frontend repository:**
   ```bash
   git clone https://github.com/Hujaifa81/blood-donation-management-system-frontend.git
   cd blood-donation-management-system-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure `.env` file:**
   ```env
   VITE_baseURL=http://localhost:5000
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the frontend:**
   ```bash
   npm run dev
   ```

---

### Backend Setup

1. **Clone the backend repository:**
   ```bash
   git clone https://github.com/Hujaifa81/blood-donation-management-system-backend
   cd your-backend-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory:**
   ```env
   PORT=5000
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   PAYMENT_SECRET_KEY=your_stripe_secret_key
   NODE_ENV=development
   ```

4. **Run the server:**
   ```bash
   node index.js
   ```

---

## 🧪 Testing the App

- Register as a donor and update profile information.
- Create donation requests as a donor.
- Log in with **email:** `admin@admin.com` and **password:** `123456@aA` to access admin features and moderate requests or blogs.
- Test Stripe payment using card: `4242 4242 4242 4242`, any future expiry date, and CVV: `123`.


---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
