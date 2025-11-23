import { GoogleGenAI, Type } from "@google/genai";
import { STORIES_PROMPT } from "../constants";
import { StoryResponse } from "../types";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateBedtimeStory = async (): Promise<StoryResponse | null> => {
  if (!ai) {
    console.warn("API Key not found. Returning mock data.");
    return {
      title: "Le Petit Nuage",
      content: "Il était une fois un petit nuage qui voulait faire une sieste. Il se posa doucement sur une montagne et s'endormit aussitôt."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: STORIES_PROMPT,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "content"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as StoryResponse;
  } catch (error) {
    console.error("Error generating story:", error);
    return {
      title: "Douce Nuit",
      content: "Les étoiles scintillent doucement dans le ciel. Tout est calme, tout est paisible. Repose-toi bien."
    };
  }
};