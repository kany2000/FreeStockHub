import { GoogleGenAI, Type } from '@google/genai';
import { AISearchResult, Category } from '../types';

// Ensure API Key is present (handled by system environment)
const apiKey = process.env.API_KEY || '';
// Initialize conditionally to avoid immediate crash if key is missing during static analysis
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getSearchSuggestions = async (userQuery: string): Promise<AISearchResult> => {
  const fallbackResult: AISearchResult = {
    keywords: [userQuery],
    recommendedCategories: [Category.ALL],
    reasoning: 'AI 服务暂时繁忙，已为您显示基础结果。'
  };

  if (!userQuery.trim()) {
    return {
      keywords: [],
      recommendedCategories: [Category.ALL],
      reasoning: ''
    };
  }

  // 1. Check if API Key exists
  if (!apiKey || !ai) {
    console.error("Configuration Error: API_KEY is missing. Please create a .env file with API_KEY=your_key");
    return {
      ...fallbackResult,
      reasoning: '未配置 API Key，仅显示基础搜索结果。'
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
      throw new Error('No response text received from AI');
    }

    const result = JSON.parse(text) as AISearchResult;
    return result;

  } catch (error: any) {
    // Log the full error object for debugging
    console.error("AI Search Error Details:", error);
    
    // Check for common error types
    let errorReason = 'AI 服务暂时繁忙，已为您显示基础结果。';
    if (error.message?.includes('API key not valid') || error.status === 400 || error.status === 403) {
      errorReason = 'API Key 无效或已过期。';
    } else if (error.status === 429) {
      errorReason = 'AI 服务请求过于频繁，请稍后再试。';
    }

    return {
      ...fallbackResult,
      reasoning: errorReason
    };
  }
};