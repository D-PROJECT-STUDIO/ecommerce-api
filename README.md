# E-Commerce API

This is a backend API for a simple e-commerce store. It manages categories, products, a shopping cart, and orders.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Create, read, update, and delete categories
- Create, read, update, and delete products
- Filter and search products
- Add, update, remove, and clear cart items
- Check product stock before checkout
- Create orders and update order status

## Prerequisites

- Node.js
- MongoDB
- npm

## Installation

```bash
git clone https://github.com/D-PROJECT-STUDIO/ecommerce-api.git
cd ecommerce-api
npm install
```

Create a `.env` file using the same variables from `.env.example`.

```bash
npm run seed
npm run dev
```

The server starts on `http://localhost:3000`.

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Project mode | `development` |
| `MONGO_URI` | MongoDB connection URL | `mongodb://127.0.0.1:27017/ecommerce` |

## API Endpoints

### Categories

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get one category |
| POST | `/api/categories` | Create a category |
| PATCH | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get one product with its category |
| POST | `/api/products` | Create a product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

Product filters can be combined:

- `/api/products?category=:id`
- `/api/products?minPrice=10&maxPrice=500`
- `/api/products?inStock=true`
- `/api/products?search=phone`

### Cart

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/cart` | Get the cart |
| POST | `/api/cart/items` | Add a product to the cart |
| PATCH | `/api/cart/items/:productId` | Change an item quantity |
| DELETE | `/api/cart/items/:productId` | Remove an item |
| DELETE | `/api/cart` | Clear the cart |

### Orders

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Checkout the cart |
| GET | `/api/orders/:id` | Get one order |
| PATCH | `/api/orders/:id/status` | Update order status |

## Folder Structure

```text
ecommerce-api/
|-- config/
|-- controllers/
|-- db/
|-- middleware/
|-- models/
|   |-- cart.model.js
|   |-- category.model.js
|   |-- order.model.js
|   `-- product.model.js
|-- postman/
|-- routes/
|-- utils/
|-- .env.example
|-- .gitignore
|-- app.js
|-- package.json
`-- seed.js
```

- `config` holds project configuration files.
- `controllers` contains the API logic.
- `db` contains the MongoDB connection.
- `middleware` contains the central error handler.
- `models` contains the Mongoose schemas.
- `postman` contains the exported collection and environment.
- `routes` contains the API routes.
- `utils` contains reusable error helpers.

## Postman

Import these two files from the `postman` folder:

- `ecommerce-api.postman_collection.json`
- `E-Commerce API Dev.postman_environment.json`

Select the `E-Commerce API Dev` environment before running the requests.
