import { NextRequest, NextResponse } from "next/server";

// Используем тот же массив (в реальности данные будут в БД)
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
];

// GET: Получить всех пользователей
export async function GET() {
  return NextResponse.json(users);
}

// POST: Создать нового пользователя
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
      role: body.role || "user"
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
}