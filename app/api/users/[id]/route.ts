import { NextRequest, NextResponse } from "next/server";

// Временная база данных (в реальности - БД)
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
];

type Props = {
  params: Promise<{ id: string }>;
};

// GET: Получить одного пользователя по ID
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const userId = Number(id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

// PUT: Обновить данные пользователя
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const userId = Number(id);
  const body = await request.json();

  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Обновляем данные, сохраняя ID
  users[index] = { ...users[index], ...body, id: userId };

  return NextResponse.json({ 
    message: "User updated successfully", 
    user: users[index] 
  });
}

// DELETE: Удалить пользователя
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  const initialLength = users.length;
  users = users.filter((u) => u.id !== userId);

  if (users.length === initialLength) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: `User ${userId} deleted` });
}