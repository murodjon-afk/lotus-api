import { NextRequest, NextResponse } from "next/server";

// ВАЖНО: Массив должен быть импортирован или быть общим с основным роутом, 
// иначе в этом файле будет свой пустой список users.
let users = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    email: "alice@example.com", 
    role: "admin", 
    orders: ["1", "5"] 
  },
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type Props = {
  params: Promise<{ id: string }>;
};

// OPTIONS: Обработка предварительных запросов браузера
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: Получить одного пользователя
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const userId = Number(id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404, headers: corsHeaders });
  }
  return NextResponse.json(user, { headers: corsHeaders });
}

// PUT: Обновить данные (например, добавить товар в orders)
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const userId = Number(id);
  const body = await request.json();

  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404, headers: corsHeaders });
  }

  // Обновляем данные пользователя
  users[index] = { ...users[index], ...body, id: userId };

  return NextResponse.json({ 
    message: "User updated successfully", 
    user: users[index] 
  }, { headers: corsHeaders });
}

// DELETE: Удалить пользователя
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  const initialLength = users.length;
  // Обрати внимание: это изменит локальную переменную users только в этом файле
  // В идеале данные должны храниться в БД или общем модуле
  const updatedUsers = users.filter((u) => u.id !== userId);

  if (updatedUsers.length === initialLength) {
    return NextResponse.json({ message: "User not found" }, { status: 404, headers: corsHeaders });
  }

  return NextResponse.json({ message: `User ${userId} deleted` }, { headers: corsHeaders });
}