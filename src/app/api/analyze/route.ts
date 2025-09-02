import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

async function analyzeText(text: string) {
  const model = genAI.getGenerativeModel({ 
    model: process.env.GEMINI_MODEL_NAME!,
    safetySettings 
  });
  
  const prompt = `
    Analyze the following text and identify potential red flags for investment fraud.
    Provide a detailed analysis, a risk score from 0 to 100, a confidence score, and a final verdict.
    Format the output as a JSON object with the following keys:
    "detailedAnalysis", "riskScore", "confidenceScore", "finalVerdict".
    
    Text: "${text}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    // Clean the response to ensure it's valid JSON
    const jsonString = responseText.replace(/```json\n|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error analyzing text with Gemini:', error);
    throw new Error('Failed to analyze text');
  }
}

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (typeof text !== 'string') {
    return NextResponse.json({ error: 'Text must be a string' }, { status: 400 });
  }

  try {
    const analysis = await analyzeText(text);
    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json({ error: 'Failed to analyze text' }, { status: 500 });
  }
}
