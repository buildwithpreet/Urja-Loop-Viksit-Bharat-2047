import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';

let genAI: GoogleGenerativeAI;
if (env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
}

export const generateDigesterOptimization = async (telemetryData: any) => {
  if (!genAI) {
    return {
      success: false,
      message: "AI not configured. Add GEMINI_API_KEY to .env"
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      You are an AI managing a Bio-CNG Digester plant.
      Current telemetry:
      - Temperature: ${telemetryData.temperature} °C
      - pH Level: ${telemetryData.ph}
      - Pressure: ${telemetryData.pressure} Bar
      
      Generate a short 1-2 sentence recommendation for optimizing methane yield and maintaining digester health based on this telemetry.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      recommendation: text
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    return {
      success: false,
      message: "Failed to generate AI insight."
    };
  }
};
