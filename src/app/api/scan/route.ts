import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { isUrlSafe } from '@/lib/security';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function analyzeUrl(url: string) {
  const model = genAI.getGenerativeModel({ 
  model: process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash' 
});

  const prompt = `
    Analyze the URL "${url}" for potential investment fraud red flags.
    Provide a detailed analysis, a risk score from 0 to 100, a confidence score, and a final verdict.
    Format the output as a JSON object with the following keys:
    "detailedAnalysis", "riskScore", "confidenceScore", "finalVerdict".
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    const jsonString = responseText.replace(/```json\n|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error analyzing URL with Gemini:', error);
    throw new Error('Failed to analyze URL');
  }
}

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (typeof url !== 'string') {
    return NextResponse.json({ error: 'URL must be a string' }, { status: 400 });
  }

  const safe = await isUrlSafe(url);
  if (!safe) {
    return NextResponse.json(
      { error: 'The provided URL is invalid or points to a disallowed resource.' },
      { status: 400 }
    );
  }

  try {
    const analysis = await analyzeUrl(url);
    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json({ error: 'Failed to analyze URL' }, { status: 500 });
  }
}
