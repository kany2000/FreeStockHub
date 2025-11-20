import { GoogleGenAI, Type } from '@google/genai';
import { AISearchResult, Category } from '../types';

// Ensure API Key is present (handled by system environment)
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getSearchSuggestions = async (userQuery: string): Promise<AISearchResult> => {
  if (!userQuery.trim()) {
    return {
      keywords: [],
      recommendedCategories: [Category.ALL],
      reasoning: ''
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      User is looking for free stock photos.
      Query: "${userQuery}"
      
      Task:
      1. Analyze the user's visual intent.
      2. Generate 3-5 effective English search keywords that would work best on sites like Unsplash or Pexels.
      3. Identify which categories from the following list match best: ${Object.values(Category).join(', ')}.
      4. Provide a very brief reasoning (in Chinese) for the suggestions.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Effective English search terms'
            },
            recommendedCategories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Matching categories from the provided list'
            },
            reasoning: {
              type: Type.STRING,
              description: 'Brief explanation in Chinese'
            }
          },
          required: ['keywords', 'recommendedCategories', 'reasoning']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response from AI');
    }

    const result = JSON.parse(text) as AISearchResult;
    return result;

  } catch (error) {
    console.error("AI Search Error:", error);
    // Fallback in case of error
    return {
      keywords: [userQuery],
      recommendedCategories: [Category.ALL],
      reasoning: 'AI 服务暂时繁忙，已为您显示基础结果。'
    };
  }
};