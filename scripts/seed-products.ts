import "dotenv/config";
import { db } from "../db";
import { products } from "../db/schema/products";
import { randomUUID } from "crypto";

async function seedProducts() {
  const now = Date.now();
  const sampleProducts = [
    {
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: "59.99",
      stock: 25,
      description: "High-quality wireless headphones with noise cancellation.",
      imageUrl:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: "89.99",
      stock: 15,
      description: "Track your health and daily activities easily.",
      imageUrl:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Gaming Mouse RGB",
      category: "Electronics",
      price: "29.99",
      stock: 30,
      description: "Precision gaming mouse with customizable RGB lighting.",
      imageUrl:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: "79.99",
      stock: 20,
      description: "Durable mechanical keyboard with blue switches.",
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Portable Power Bank 20000mAh",
      category: "Electronics",
      price: "39.99",
      stock: 45,
      description: "Fast-charging high-capacity power bank.",
      imageUrl:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Men's Casual T-Shirt",
      category: "Fashion",
      price: "19.99",
      stock: 50,
      description: "Comfortable cotton t-shirt for everyday wear.",
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Women's Summer Dress",
      category: "Fashion",
      price: "34.99",
      stock: 35,
      description: "Lightweight and stylish summer dress.",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Men's Denim Jeans",
      category: "Fashion",
      price: "49.99",
      stock: 28,
      description: "Classic slim-fit denim jeans.",
      imageUrl:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Unisex Hoodie",
      category: "Fashion",
      price: "44.99",
      stock: 40,
      description: "Warm and comfortable hoodie for all seasons.",
      imageUrl:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sports Running Shoes",
      category: "Fashion",
      price: "69.99",
      stock: 22,
      description: "Lightweight running shoes with strong grip.",
      imageUrl:
        "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Office Backpack",
      category: "Accessories",
      price: "34.99",
      stock: 40,
      description: "Durable backpack for school and office use.",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Leather Wallet",
      category: "Accessories",
      price: "24.99",
      stock: 60,
      description: "Premium leather wallet with multiple slots.",
      imageUrl:
        "https://images.unsplash.com/photo-1519121782439-2f3c2c8e8a19?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Stylish Sunglasses",
      category: "Accessories",
      price: "14.99",
      stock: 70,
      description: "UV-protected fashionable sunglasses.",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Analog Wrist Watch",
      category: "Accessories",
      price: "54.99",
      stock: 18,
      description: "Elegant analog watch for formal wear.",
      imageUrl:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Phone Protective Case",
      category: "Accessories",
      price: "12.99",
      stock: 80,
      description: "Shockproof phone case for daily protection.",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "LED Desk Lamp",
      category: "Home",
      price: "27.99",
      stock: 26,
      description: "Adjustable brightness desk lamp.",
      imageUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Ceramic Coffee Mug",
      category: "Home",
      price: "9.99",
      stock: 100,
      description: "Durable ceramic mug for hot drinks.",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Bedside Alarm Clock",
      category: "Home",
      price: "22.99",
      stock: 33,
      description: "Digital alarm clock with LED display.",
      imageUrl:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mini Air Humidifier",
      category: "Home",
      price: "31.99",
      stock: 21,
      description: "Portable humidifier for fresh air.",
      imageUrl:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Soft Throw Pillow",
      category: "Home",
      price: "18.99",
      stock: 55,
      description: "Comfortable decorative throw pillow.",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
  ].map((product) => ({
    ...product,
    id: randomUUID(),
    createdAt: new Date(now),
    updatedAt: new Date(now),
  }));

  try {
    await db.insert(products).values(sampleProducts);
    console.log("Sample products inserted successfully!");
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    process.exit();
  }
}

seedProducts();
