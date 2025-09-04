// Shared validation utilities to ensure agent APIs are not used as chat endpoints
// and enforce structured payloads per agent.

export type ValidationResult = {
  valid: boolean;
  error?: string;
};

const CHATY_GREETINGS = [
  'hi', 'hello', 'hey', 'yo', 'hola', 'namaste', 'help', 'hey there', 'hi there'
];

const CHATY_PATTERNS: RegExp[] = [
  /tell me a joke/i,
  /how are you\b/i,
  /who are you\b/i,
  /what can you do/i,
  /chat\b/i,
  /conversation/i,
  /talk to me/i,
  /story/i,
  /poem/i
];

export function isGeneralChat(input?: unknown): boolean {
  if (!input) return false;
  if (typeof input === 'string') {
    const s = input.trim();
    if (s.length <= 3) return true; // too short, likely chatty
    const lower = s.toLowerCase();
    if (CHATY_GREETINGS.includes(lower)) return true;
    if (/\b(joke|poem|story)\b/i.test(lower)) return true;
    if (CHATY_PATTERNS.some(rx => rx.test(s))) return true;
    // If it's a question without any domain keywords, treat with suspicion
    if (/\?$/.test(s) && !/(sebi|broker|registration|aif|announcement|youtube|video|whatsapp|telegram|ipo|pump|dump|fraud|scam)/i.test(s)) {
      return true;
    }
    return false;
  }
  // Reject typical chat payloads
  if (typeof input === 'object' && input !== null) {
    const obj = input as Record<string, unknown>;
    if (Array.isArray((obj as any).messages)) return true; // OpenAI-style chat
    if (typeof (obj as any).prompt === 'string' && isGeneralChat((obj as any).prompt)) return true;
  }
  return false;
}

// Deepfake detector: require either mediaUrl (http/https or youtu) or transcript (min length)
export function validateDeepfakePayload(body: any): ValidationResult {
  const { mediaUrl, transcript } = body || {};
  if (!mediaUrl && !transcript) {
    return { valid: false, error: 'Media URL or transcript is required' };
  }
  if (isGeneralChat(transcript || mediaUrl)) {
    return { valid: false, error: 'This endpoint analyzes specific media. It is not a chat interface.' };
  }
  if (mediaUrl && typeof mediaUrl === 'string') {
    const ok = /^(https?:\/\/)/i.test(mediaUrl) || /youtu\.be\//i.test(mediaUrl) || /youtube\.com\//i.test(mediaUrl);
    if (!ok) return { valid: false, error: 'mediaUrl must be an http(s) URL (YouTube supported) or provide transcript' };
  }
  if (transcript && typeof transcript === 'string' && transcript.trim().length < 20) {
    return { valid: false, error: 'transcript too short to analyze (min 20 chars)' };
  }
  return { valid: true };
}

// Social monitor: require content and platform
export function validateSocialMonitorPayload(body: any): ValidationResult {
  const { content, platform } = body || {};
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'content is required (string)' };
  }
  if (!platform || typeof platform !== 'string') {
    return { valid: false, error: 'platform is required (e.g., WhatsApp, Telegram, X/Twitter)' };
  }
  if (isGeneralChat(content)) {
    return { valid: false, error: 'This endpoint analyzes social messages. It is not a chat interface.' };
  }
  if (content.trim().length < 10) {
    return { valid: false, error: 'content too short to analyze (min 10 chars)' };
  }
  return { valid: true };
}

// Announcement verifier: require announcement and company
export function validateAnnouncementPayload(body: any): ValidationResult {
  const { announcement, company } = body || {};
  if (!announcement || typeof announcement !== 'string') {
    return { valid: false, error: 'announcement is required (string)' };
  }
  if (!company || typeof company !== 'string') {
    return { valid: false, error: 'company is required (string)' };
  }
  if (isGeneralChat(announcement)) {
    return { valid: false, error: 'This endpoint verifies corporate announcements. It is not a chat interface.' };
  }
  if (announcement.trim().length < 15) {
    return { valid: false, error: 'announcement too short to verify (min 15 chars)' };
  }
  return { valid: true };
}

// SEBI query: require question to contain SEBI/registry context, or structured fields
export function validateSebiQueryPayload(body: any): ValidationResult {
  const { question } = body || {};
  if (!question || typeof question !== 'string') {
    return { valid: false, error: 'question is required (string)' };
  }
  const q = question.toLowerCase();
  const domainKeywords = /(sebi|registered|registration|aif|broker|intermediary|registry|segments|reg no|reg\. no|regn|rera)/i;
  if (isGeneralChat(question) || !domainKeywords.test(q)) {
    return { valid: false, error: 'This endpoint is for SEBI registry queries only. Provide a SEBI/registration-related question.' };
  }
  return { valid: true };
}

// Advisor verifier: require name or registrationNumber
export function validateAdvisorVerifierPayload(body: any): ValidationResult {
  const { name, registrationNumber } = body || {};
  if (!name && !registrationNumber) {
    return { valid: false, error: 'name or registrationNumber is required' };
  }
  if (name && isGeneralChat(name)) {
    return { valid: false, error: 'This endpoint verifies advisors/brokers. It is not a chat interface.' };
  }
  if (name && typeof name === 'string' && name.trim().length < 3) {
    return { valid: false, error: 'name too short (min 3 chars)' };
  }
  if (registrationNumber && typeof registrationNumber === 'string' && registrationNumber.trim().length < 3) {
    return { valid: false, error: 'registrationNumber seems invalid (min 3 chars)' };
  }
  return { valid: true };
}

