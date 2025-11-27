# E-Commerce FullStack

This is a full-stack E-Commerce web application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (login/signup with OTP)
- Seller and Admin dashboards
- Product management (add, edit, delete)
- Order management
- Secure REST API
- Email verification for login

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT, OTP via Email

## Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/febtechit/E-Commerce-FullStack.git
   cd E-Commerce-FullStack
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
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
```
cd server
npm start
```

**Frontend:**
```
cd client
npm start
```

## Folder Structure

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
│       └── ...
│   └── package.json
│
└── README.md
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

This project is licensed under the MIT License.