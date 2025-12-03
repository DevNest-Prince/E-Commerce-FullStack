# E-Commerce FullStack

A robust and scalable full-stack E-Commerce web application built with Node.js, Express, MongoDB Atlas, and React.

---

## 🚀 Features

- User authentication (login/signup with OTP)
- Seller and Admin dashboards
- Product management (add, edit, delete)
- Shopping cart and order management
- Secure REST API
- Email verification for login
- Role-based access (User, Seller, Admin)
- Responsive UI for all devices

---

## 🛠 Tech Stack

- **Frontend:** React.js, Redux, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT, OTP via Email
- **Other:** Nodemailer (for emails), Mongoose (ODM)

---

## 📝 Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB Atlas account

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/febtechit/E-Commerce-FullStack.git
   cd E-Commerce-FullStack
   ```

2. **Install server dependencies:**

   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```sh
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` folder and add:

```
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

### Running the App

**Backend:**

```sh
cd server
npm start
```

**Frontend:**

```sh
cd client
npm start
```

---

## 📁 Folder Structure

```
E-Commerce-FullStack/
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── service/
│   │   ├── utils/
│   │   └── index.js
│   └── package.json
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── App.js
│   └── package.json
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome!  
- Fork the repository
- Create your feature branch (`git checkout -b feature/YourFeature`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a pull request

For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.