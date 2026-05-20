import { NextResponse } from "next/server";
import { chatModel, getSustainabilityContext } from "@/lib/gemini";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

export async function POST(req: Request) {
  try {
    const { message, mode, userId, history } = await req.json();

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json({ 
        success: true, 
        response: "I'm currently in demo mode as the API key is not configured. How can I help you with UrjaLoop today? (Simulation: Segregation is key!)" 
      });
    }

    const systemPrompt = getSustainabilityContext(mode || "urban");
    
    const chat = chatModel.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(`${systemPrompt}\n\nUser Question: ${message}`);
    const responseText = result.response.text();

    // Log to DB if user is present
    if (userId && userId !== 'demo-user') {
      await supabaseAdmin.from('chatbot_logs').insert({
        user_id: userId,
        query: message,
        response: responseText,
        metadata: { mode }
      });
    }

    return NextResponse.json({ success: true, response: responseText });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
