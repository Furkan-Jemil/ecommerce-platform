🛒 E-Commerce Platform — System Design Document

Tech Stack

Frontend: React + Zustand + TanStack Query

Backend: Express.js

Database: Neon (PostgreSQL) + Drizzle ORM

Auth: BetterAuth

Image Storage: ImageKit

Deployment: (Vercel / Railway / Render – optional)

1️⃣ System Overview
High-Level Architecture
[ React Frontend ]
   ├── Zustand (global UI & auth state)
   ├── TanStack Query (server state)
   ↓
[ Express API Server ]
   ├── BetterAuth (Auth & Sessions)
   ├── Business Logic (Cart, Orders, Products)
   ├── Drizzle ORM
   ↓
[ Neon PostgreSQL ]
   ├── Users
   ├── Products
   ├── Orders
   ├── Payments
   ↓
[ ImageKit ]
   └── Product Images / User Avatars

Core Principles

Stateless backend

Client-side caching via TanStack Query

Strict DB schema via Drizzle

Secure auth with session/JWT

Scalable image delivery (CDN)

2️⃣ User Flow
👤 Authentication Flow

User opens app

Registers / logs in via BetterAuth

Backend creates session / JWT

Zustand stores auth state

TanStack Query fetches user profile

🛍️ Shopping Flow

User browses products

Product list fetched via TanStack Query

User adds product to cart (Zustand)

Cart synced with backend

Checkout → order created

Payment processed (future extension)

Order saved in DB

🧑‍💼 Admin Flow

Admin logs in

Uploads product image → ImageKit

Saves product metadata in DB

Products visible to users

3️⃣ Goals & Non-Goals
🎯 Goals

Secure authentication & authorization

Fast product browsing

Reliable cart & order management

Scalable image storage

Clean, type-safe database access

Real-world e-commerce architecture

🚫 Non-Goals (for v1)

❌ Multi-vendor marketplace

❌ Real payment gateway (Stripe/Chapa)

❌ Recommendation system

❌ Real-time chat

❌ Microservices architecture