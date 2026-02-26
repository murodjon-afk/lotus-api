import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Позволяет функции выполняться до 30 секунд (актуально для Vercel/Edge)
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'), // Оптимальная модель: быстрая и дешевая
      messages,
      system: `
        Ты — эксперт-консультант бренда Lotus Cosmetics. 
        Твоя специализация: уход за кожей, подбор косметики и объяснение составов.
        
        Твои принципы:
        1. Стиль общения: Премиальный, вежливый, минималистичный.
        2. Знания: Микробиом кожи, активные компоненты (ретинол, ниацинамид, пептиды), этапы ухода.
        3. Ограничение: Если вопрос не касается красоты или здоровья кожи, вежливо переведи тему обратно к Lotus.
        4. Лаконичность: Не пиши огромные тексты, давай четкие советы.
      `,
    });

    // Метод toTextStreamResponse() — самый стабильный для передачи чистого текста
    // без конфликтов типов в последних версиях SDK.
    return result.toTextStreamResponse();

  } catch (error) {
    console.error("AI_CHAT_ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Произошла ошибка при генерации ответа" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}