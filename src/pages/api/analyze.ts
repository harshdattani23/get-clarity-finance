import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL_NAME = process.env.GEMINI_MODEL_NAME;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

if (!GEMINI_MODEL_NAME) {
  throw new Error('GEMINI_MODEL_NAME environment variable is not set. Please set it to your desired Gemini model, e.g., "gemini-1.5-flash".');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

// Define the new, flexible response structures
type AnalysisPayload = {
  isSuspicious: boolean;
  reason: string;
  scamType: 'Phishing' | 'Pump & Dump' | 'Impersonation' | 'Investment Scheme' | 'Other' | 'Not a Scam';
  keywords: string[];
};

type AnswerPayload = {
  answer: string;
};

export type ApiResponse = 
  | { type: 'analysis'; payload: AnalysisPayload }
  | { type: 'answer'; payload: AnswerPayload };

// --- Database Logic ---
type AnalysisRecord = {
    id: number;
    timestamp: string;
    scamType: 'Phishing' | 'Pump & Dump' | 'Impersonation' | 'Investment Scheme' | 'Other' | 'Not a Scam';
    keywords: string[];
    reason: string;
};

type Database = {
    analyses: AnalysisRecord[];
};

const dbPath = path.resolve(process.cwd(), 'db.json');

async function saveAnalysisResult(payload: AnalysisPayload) {
    if (!payload.isSuspicious) return; // Only save suspicious results

    const newRecord: AnalysisRecord = {
        id: new Date().getTime(),
        timestamp: new Date().toISOString(),
        scamType: payload.scamType,
        keywords: payload.keywords,
        reason: payload.reason,
    };

    try {
        let dbData: Database = { analyses: [] };
        if (fs.existsSync(dbPath)) {
            const fileContent = fs.readFileSync(dbPath, 'utf-8');
            dbData = JSON.parse(fileContent);
        }
        dbData.analyses.push(newRecord);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    } catch (error) {
        console.error('Error saving analysis to db.json:', error);
    }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { content } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ message: 'Content is required' });
  }

  const prompt = `
    You are an AI assistant for investors in the Indian securities market. Your goal is to promote investor education and safety.
    You have two primary functions based on the user's input: Analyze Content for Fraud or Answer Investor Questions.

    First, classify the user's input into one of two categories: "analysis" or "question".

    User Input: "${content}"

    Based on the classification, provide a response in a valid JSON object format ONLY.

    - If the input is classified as "analysis", use this structure:
        {
          "type": "analysis",
          "payload": {
            "isSuspicious": boolean,
            "reason": "A concise explanation for your decision.",
            "scamType": "Classify into one: 'Phishing', 'Pump & Dump', 'Impersonation', 'Investment Scheme', 'Other', or 'Not a Scam'.",
            "keywords": ["Extract up to 3 key entities or phrases from the content, like company names, specific claims, or URLs (e.g., 'HDFC Bank', 'guaranteed 25% return', 'myfriend.info/login')."]
          }
        }

    - If the input is classified as "question", use this structure:
        {
          "type": "answer",
          "payload": {
            "answer": "A helpful and educational answer to the user's question, framed for a typical retail investor in India. Do not give financial advice. If you use SEBI as a source, provide a Markdown link."
          }
        }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json|```/g, '').trim();

    try {
      const jsonResponse: ApiResponse = JSON.parse(cleanedText);
      
      // Asynchronously save the result to our DB if it's a suspicious analysis
      if (jsonResponse.type === 'analysis' && jsonResponse.payload.isSuspicious) {
        await saveAnalysisResult(jsonResponse.payload);
      }
      
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      res.status(500).json({ message: 'Error parsing JSON response from AI.' });
    }
  } catch (error) {
    console.error('Error with Generative AI:', error);
    res.status(500).json({ message: 'Failed to get a response from the AI service.' });
  }
}
