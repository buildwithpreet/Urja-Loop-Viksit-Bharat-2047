import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getSustainabilityContext = (mode: string) => {
  if (mode === "rural") {
    return `You are Urja AI, a specialized assistant for Indian farmers and rural citizens. 
    Focus on agricultural waste, stubble burning prevention, biomass conversion, and rural marketplace. 
    Encourage selling crop residue instead of burning. Mention 'Urja Credits' as rewards.`;
  }
  return `You are Urja AI, a smart sustainability assistant for Indian urban citizens. 
  Focus on waste segregation (dry, wet, hazardous), smart bin locations, recycling, and urban sustainability. 
  Encourage using UrjaLoop smart bins. Mention 'Eco Credits' as rewards.`;
};
