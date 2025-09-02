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

async function scoreAnswer(question: string, userAnswer: string, correctAnswer: string, explanation: string) {
  const model = genAI.getGenerativeModel({ 
    model: process.env.GEMINI_MODEL_NAME!,
    safetySettings 
  });
  
  const prompt = `
    You are an expert teacher evaluating a student's answer to a finance/stock market question.
    
    Question: "${question}"
    Correct Answer: "${correctAnswer}"
    Explanation: "${explanation}"
    Student's Answer: "${userAnswer}"
    
    Please analyze the student's answer and provide:
    1. A score from 0 to 100 based on accuracy, completeness, and understanding
    2. Detailed feedback explaining what they got right and what could be improved
    3. A confidence level in your scoring (high/medium/low)
    
    Consider:
    - Does the answer demonstrate understanding of the core concept?
    - Are key terms and ideas mentioned?
    - Is the answer complete and well-explained?
    - Does it show critical thinking?
    
    Format your response as a JSON object with these exact keys:
    {
      "score": number (0-100),
      "feedback": "detailed feedback string",
      "confidence": "high|medium|low",
      "keyPoints": ["point1", "point2", "point3"],
      "suggestions": ["suggestion1", "suggestion2"]
    }
    
    Be fair but thorough in your evaluation. A perfect answer should score 90-100, a good answer 70-89, an acceptable answer 50-69, and a poor answer below 50.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    
    // Clean the response to ensure it's valid JSON
    const jsonString = responseText.replace(/```json\n|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error scoring answer with Gemini:', error);
    throw new Error('Failed to score answer');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer, explanation } = await request.json();

    // Validate input
    if (!question || !userAnswer || !correctAnswer || !explanation) {
      return NextResponse.json({ 
        error: 'Missing required fields: question, userAnswer, correctAnswer, explanation' 
      }, { status: 400 });
    }

    if (typeof question !== 'string' || typeof userAnswer !== 'string' || 
        typeof correctAnswer !== 'string' || typeof explanation !== 'string') {
      return NextResponse.json({ 
        error: 'All fields must be strings' 
      }, { status: 400 });
    }

    const scoring = await scoreAnswer(question, userAnswer, correctAnswer, explanation);
    return NextResponse.json(scoring);
  } catch (error) {
    console.error('Error in score-answer API:', error);
    return NextResponse.json({ 
      error: 'Failed to score answer' 
    }, { status: 500 });
  }
}
