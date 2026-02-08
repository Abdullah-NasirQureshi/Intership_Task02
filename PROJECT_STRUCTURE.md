# SISMS Project Structure

## Root Directory
```
sisms/
├── backend/                 # Node.js + Express backend
├── frontend/                # React + Vite frontend
├── .gitignore
└── README.md
```

## Backend Structure
```
backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── productController.js
│   ├── customerController.js
│   ├── saleController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js             # JWT verification
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Customer.js
│   └── Sale.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── customerRoutes.js
│   ├── saleRoutes.js
│   └── adminRoutes.js
├── .env.example
├── package.json
└── server.js
```

## Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Customers.jsx
│   │   └── Sales.jsx
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── productSlice.js
│   │   │   ├── customerSlice.js
│   │   │   └── saleSlice.js
│   │   └── store.js
│   ├── services/
│   │   └── authService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
