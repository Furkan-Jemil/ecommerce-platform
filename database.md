4️⃣ Database Schema (Drizzle + Neon)
🧑 Users
users {
  id: uuid (PK)
  name: varchar
  email: varchar (unique)
  password_hash: varchar
  role: enum('USER', 'ADMIN')
  created_at: timestamp
}

📦 Products
products {
  id: uuid (PK)
  name: varchar
  description: text
  price: numeric
  stock: int
  image_url: text
  created_at: timestamp
}

🛒 Carts
carts {
  id: uuid (PK)
  user_id: uuid (FK → users)
  updated_at: timestamp
}

🧾 Cart Items
cart_items {
  id: uuid (PK)
  cart_id: uuid (FK → carts)
  product_id: uuid (FK → products)
  quantity: int
}

📑 Orders
orders {
  id: uuid (PK)
  user_id: uuid (FK → users)
  total_price: numeric
  status: enum('PENDING', 'PAID', 'CANCELLED')
  created_at: timestamp
}

📦 Order Items
order_items {
  id: uuid (PK)
  order_id: uuid (FK → orders)
  product_id: uuid (FK → products)
  quantity: int
  price_at_purchase: numeric
}

5️⃣ State Management Strategy
Zustand (Client State)

Auth user

Cart (optimistic updates)

UI state (modals, theme)

TanStack Query (Server State)

Products

Orders

User profile

Admin product list

✔️ Never mix server data into Zustand

6️⃣ Image Handling (ImageKit)
Flow

Frontend requests upload token

Backend signs ImageKit request

Image uploaded directly to ImageKit

Image URL stored in DB

CDN serves optimized images