import { NextRequest, NextResponse } from "next/server";

// Обновленная структура: без image, но с массивом orders
let users = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    email: "alice@example.com", 
    role: "admin", 
    orders: ["1", "5"] // ID продуктов
  },
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json(users, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Проверка на существующего юзера
    const userExists = users.find(u => u.email === body.email);
    
    if (userExists) {
      return NextResponse.json(userExists, { status: 200, headers: corsHeaders });
    }

    // Создание нового пользователя с правильной структурой
    const newUser = {
      id: users.length + 1,
      name: body.name || "Unknown User",
      email: body.email,
      role: body.role || "user",
      orders: body.orders || [] // Пустой массив заказов по умолчанию
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400, headers: corsHeaders });
  }
}