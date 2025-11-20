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
    console.error("Configuration Error: API_KEY is missing.");
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
    
    // NEW: 帮助用户定位 403 错误的来源域名
    if (typeof window !== 'undefined') {
        console.log("DEBUG INFO: Please ensure this origin is allowed in your Google Cloud Console API Key settings:", window.location.origin);
    }
    
    let errorReason = 'AI 服务遇到未知错误，已显示基础结果。';
    const status = error.status;
    const msg = error.message || '';

    // 详细的错误诊断逻辑
    if (msg.includes('API key not valid') || status === 400) {
      errorReason = 'API Key 无效 (400)。请检查密钥是否正确。';
    } else if (status === 403) {
      // 这是最可能的线上错误原因
      errorReason = '访问被拒绝 (403)。请按 F12 查看控制台，将显示的 Origin 添加到 Google Cloud Console 的 API Key 白名单中。';
    } else if (status === 429) {
      errorReason = '请求过多 (429)。API 配额已耗尽。';
    } else if (msg.includes('fetch failed')) {
      errorReason = '网络请求失败，请检查网络连接。';
    }

    return {
      ...fallbackResult,
      // 将错误代码附带在后面，方便您在网页上直接看到原因
      reasoning: `${errorReason} [Err: ${status || 'Unknown'}]`
    };
  }
};