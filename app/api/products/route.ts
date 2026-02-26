import { NextRequest, NextResponse } from "next/server";

// Используем let, чтобы массив можно было изменять (временно, до БД)
let products = [
  { id: 1, name: "Noir Coat", price: "$30", image: "https://lotus-botique.vercel.app/i3.jpg", type: "vertical" },
  { id: 2, name: "Silk Scarf", price: "$45", image: "https://lotus-botique.vercel.app/i.jpg", type: "horizontal" },
  { id: 3, name: "Minimalist Tote", price: "$18", image: "https://lotus-botique.vercel.app/i.jpg", type: "horizontal" },
  { id: 4, name: "Luna Dress", price: "$29", image: "https://lotus-botique.vercel.app/i3.jpg", type: "vertical" },
  { id: 5, name: "Wool Trousers", price: "$12", image: "https://lotus-botique.vercel.app/i3.jpg", type: "vertical" },
  { id: 6, name: "Essence Perfume", price: "$35", image: "https://lotus-botique.vercel.app/item.png", type: "square" },
  { id: 7, name: "Noir Coat", price: "$32", image: "https://lotus-botique.vercel.app/i3.jpg", type: "vertical" },
  { id: 8, name: "Silk Scarf", price: "$45", image: "https://lotus-botique.vercel.app/i.jpg", type: "horizontal" },
  { id: 9, name: "Minimalist Tote", price: "$18", image: "https://lotus-botique.vercel.app/i.jpg", type: "horizontal" },
  { id: 10, name: "Luna Dress", price: "$29", image: "https://lotus-botique.vercel.app/i3.jpg", type: "vertical" },
  { id: 11, name: "Wool Trousers", price: "$12", image: "https://lotus-botique.vercel.app/i3.jpg", type: "vertical" },
  { id: 12, name: "Essence Perfume", price: "$35", image: "https://lotus-botique.vercel.app/i.jpg", type: "horizontal" },
];

// --- GET: Получить все товары ---
export async function GET() {
  return NextResponse.json(products);
}

// --- POST: Создать новый товар ---
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Генерируем новый ID (максимальный существующий + 1)
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name: body.name || "Новый товар",
      price: body.price || "$0",
      image: body.image || "",
      type: body.type || "square"
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
}

// --- DELETE: Очистить весь список (массовое действие) ---
export async function DELETE() {
  products = [];
  return NextResponse.json({ message: "All products deleted" });
}

// --- PUT: Заменить весь список товаров ---
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json(); // Ожидаем массив новых товаров
    if (!Array.isArray(body)) {
      return NextResponse.json({ message: "Payload must be an array" }, { status: 400 });
    }
    products = body;
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Error updating products" }, { status: 500 });
  }
}