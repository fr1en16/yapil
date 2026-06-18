import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, task } = body;

    // Simple validation
    if (!name || !phone || !service) {
      return NextResponse.json(
        { success: false, error: "Не заполнены обязательные поля" },
        { status: 400 }
      );
    }

    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Имя: ${name}`);
    console.log(`Телефон: ${phone}`);
    console.log(`Услуга: ${service}`);
    console.log(`Задача: ${task || "Не указана"}`);
    console.log("===================================");

    // Dynamic integration with Telegram if environment variables are set
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text = `
<b>Новая заявка с сайта!</b>
<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Услуга:</b> ${service}
<b>Задача:</b> ${task || "Не указана"}
      `;

      try {
        const tgResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: "HTML",
            }),
          }
        );
        if (!tgResponse.ok) {
          console.error("Ошибка отправки в Telegram:", await tgResponse.text());
        }
      } catch (err) {
        console.error("Исключение при отправке в Telegram:", err);
      }
    }

    // CRM Integration (Supabase Leads)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nmlymgzbznlmmwarkxtv.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbHltZ3piem5sbW13YXJreHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjQzODgsImV4cCI6MjA4Mjk0MDM4OH0.HAIQaAkNVGaqhTEuivRd-EsjV36D7VARxw9IpH05zW8";

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const crmResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseAnonKey,
            "Authorization": `Bearer ${supabaseAnonKey}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({
            name,
            phone,
            service,
            contact_method: "Телефон",
            source: "Next.js API Route",
            status: "new",
            notes: task || "",
          }),
        });

        if (!crmResponse.ok) {
          const errText = await crmResponse.text();
          console.error("Ошибка при отправке лида в Supabase CRM:", errText);
        } else {
          console.log("Лид успешно добавлен в Supabase CRM!");
        }
      } catch (err) {
        console.error("Исключение при отправке лида в Supabase CRM:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Ошибка в API обработчике формы контактов:", error);
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
