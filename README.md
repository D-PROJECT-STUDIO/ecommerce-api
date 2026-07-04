# E-Commerce API

This is my ecommerce backend project. I made it with Node.js, Express and MongoDB.

## Features

- Categories
- Products and product search
- Product filters
- Shopping cart
- Stock check
- Orders
- Order status

## Made with

- Node.js
- Express.js
- MongoDB
- Mongoose

## Run the project

```bash
git clone https://github.com/D-PROJECT-STUDIO/ecommerce-api.git
cd ecommerce-api
npm install
```

Make a `.env` file and put the same variables from `.env.example` inside it.

```bash
npm run seed
npm run dev
```

The server starts on `http://localhost:3000`.

## Environment Variables

| Variable | What it is | Example |
| --- | --- | --- |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Project mode | `development` |
| `MONGO_URI` | MongoDB URL | `mongodb://127.0.0.1:27017/ecommerce` |

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create a category |
| GET | `/api/categories/:id` | Get one category |
| PATCH | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=:id` | Filter by category |
| GET | `/api/products?minPrice=10&maxPrice=500` | Filter by price |
| GET | `/api/products?inStock=true` | Get products in stock |
| GET | `/api/products?search=phone` | Search products |
| POST | `/api/products` | Create a product |
| GET | `/api/products/:id` | Get one product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/cart` | Get the cart |
| POST | `/api/cart` | Add an item to the cart |
| PATCH | `/api/cart/:productId` | Change item quantity |
| DELETE | `/api/cart/:productId` | Remove one item |
| DELETE | `/api/cart` | Clear the cart |
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Checkout the cart |
| GET | `/api/orders/:id` | Get one order |
| PATCH | `/api/orders/:id/status` | Update order status |

## Filters

I can filter products by `category`, `minPrice`, `maxPrice`, `inStock=true` or `search`.

## Folder Structure

```text
ecommerce-api/
├── config/
├── controllers/
│   ├── cartController.js
│   ├── categoryController.js
│   ├── orderController.js
│   └── productController.js
├── db/
│   └── connectDB.js
├── middleware/
│   ├── asyncHandler.js
│   └── errorHandler.js
├── models/
│   ├── Cart.js
│   ├── Category.js
│   ├── Order.js
│   └── Product.js
├── postman/
├── routes/
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── utils/
│   └── AppError.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── seed.js
```

## Postman

I put the collection and environment files in the `postman` folder. Import both files and select `E-Commerce API Dev`.
