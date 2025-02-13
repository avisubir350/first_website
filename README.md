# ShopEase E-commerce Website

A full-stack e-commerce website built with HTML, CSS, JavaScript, and Node.js.

## Features

- User authentication (login/register)
- Product catalog with categories
- Shopping cart functionality
- Order management
- Payment processing (Stripe integration)
- Responsive design with animations
- Admin dashboard
- Product ratings and reviews

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Stripe account (for payment processing)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopease-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
shopease-ecommerce/
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── middleware/
│   └── auth.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

### Orders
- GET /api/orders - Get user orders
- POST /api/orders - Create new order
- PATCH /api/orders/:id/status - Update order status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Stripe](https://stripe.com/)
- [Font Awesome](https://fontawesome.com/)
#   f i r s t _ w e b s i t e  
 #   f i r s t _ w e b s i t e  
 