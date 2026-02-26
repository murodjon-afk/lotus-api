import { NextRequest, NextResponse } from "next/server";

// В реальном приложении этот массив должен быть в базе данных
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

type Props = {
  params: Promise<{ id: string }>;
};

// --- GET: Получить один товар ---
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

// --- PUT: Обновить товар целиком ---
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  const body = await request.json();

  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // Обновляем данные в массиве
  products[index] = { ...products[index], ...body, id: productId };

  return NextResponse.json({ message: "Product updated", product: products[index] });
}

// --- DELETE: Удалить товар ---
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  const initialLength = products.length;
  products = products.filter((p) => p.id !== productId);

  if (products.length === initialLength) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: `Product ${productId} deleted successfully` });
}

// --- POST: Обычно POST живет в папке /api/products/route.ts (без ID), 
// но если вам нужно создать что-то по конкретному пути, вот пример:
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct = {
    id: products.length + 1,
    ...body
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}