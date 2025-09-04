# Agent Non-Chat Validation Implementation

## Overview
All SEBI Verify AI agents now have strict validation to prevent misuse as general chat interfaces. Each agent only accepts domain-specific structured payloads and rejects generic conversational input.

## Validation System Architecture

### Core Validation Utility (`src/lib/agentValidation.ts`)

```typescript
export function isGeneralChat(input?: unknown): boolean {
  // Detects patterns like:
  // - Generic greetings: "hi", "hello", "hey", "namaste"
  // - Chat requests: "tell me a joke", "how are you", "who are you"
  // - OpenAI-style message arrays: { messages: [...] }
  // - Short/vague inputs without domain context
}
```

## Agent-Specific Validation Rules

### 1. Deepfake Detector (`/api/agents/deepfake-detector`)
**Required Fields:**
- `mediaUrl` (HTTP/HTTPS/YouTube URL) OR `transcript` (min 20 characters)

**Proper Usage:**
```json
{
  "mediaUrl": "https://www.youtube.com/watch?v=abc123",
  "mediaType": "video"
}
```

```json
{
  "transcript": "This is a transcript of suspicious financial advice claiming guaranteed returns...",
  "mediaType": "audio"
}
```

**Rejected Examples:**
```json
// ❌ General chat
{
  "mediaUrl": "hello"
} 
// Response: { "error": "This endpoint analyzes specific media. It is not a chat interface.", "code": "INVALID_INPUT_NOT_CHAT" }

// ❌ Too short
{
  "transcript": "hi there"
}
// Response: { "error": "transcript too short to analyze (min 20 chars)", "code": "INVALID_INPUT_NOT_CHAT" }

// ❌ Invalid URL
{
  "mediaUrl": "not-a-url"
}
// Response: { "error": "mediaUrl must be an http(s) URL (YouTube supported) or provide transcript", "code": "INVALID_INPUT_NOT_CHAT" }
```

### 2. Social Media Monitor (`/api/agents/social-monitor`)
**Required Fields:**
- `content` (string, min 10 characters)
- `platform` (string, e.g., "WhatsApp", "Telegram", "Twitter")

**Proper Usage:**
```json
{
  "content": "🚀 URGENT: Buy XYZ stock now! Guaranteed 200% returns in 24 hours! WhatsApp me for insider tips!",
  "platform": "WhatsApp",
  "groupName": "Stock Tips Group",
  "userCount": 500
}
```

**Rejected Examples:**
```json
// ❌ Missing platform
{
  "content": "Some message"
}
// Response: { "error": "platform is required (e.g., WhatsApp, Telegram, X/Twitter)", "code": "INVALID_INPUT_NOT_CHAT" }

// ❌ General chat
{
  "content": "hello how are you",
  "platform": "WhatsApp"
}
// Response: { "error": "This endpoint analyzes social messages. It is not a chat interface.", "code": "INVALID_INPUT_NOT_CHAT" }
```

### 3. Announcement Verifier (`/api/agents/announcement-verifier`)
**Required Fields:**
- `announcement` (string, min 15 characters)
- `company` (string)

**Proper Usage:**
```json
{
  "announcement": "XYZ Corp announces a strategic merger with ABC Ltd, expected to increase market share by 25% and create synergies worth $100M annually.",
  "company": "XYZ Corp",
  "announcementType": "merger",
  "source": "BSE"
}
```

**Rejected Examples:**
```json
// ❌ Missing company
{
  "announcement": "Some announcement"
}
// Response: { "error": "company is required (string)", "code": "INVALID_INPUT_NOT_CHAT" }

// ❌ Chat pattern
{
  "announcement": "tell me a joke",
  "company": "ABC Corp"
}
// Response: { "error": "This endpoint verifies corporate announcements. It is not a chat interface.", "code": "INVALID_INPUT_NOT_CHAT" }
```

### 4. SEBI Query Agent (`/api/agents/sebi-query`)
**Required Fields:**
- `question` (string with SEBI/registry domain keywords)

**Proper Usage:**
```json
{
  "question": "Is Zerodha registered with SEBI?"
}
```

```json
{
  "question": "Show me all Alternative Investment Funds registered in Maharashtra"
}
```

```json
{
  "question": "Verify registration number INP000001234 in SEBI database"
}
```

**Rejected Examples:**
```json
// ❌ No SEBI context
{
  "question": "What's the weather today?"
}
// Response: { "error": "This endpoint is for SEBI registry queries only. Provide a SEBI/registration-related question.", "code": "INVALID_INPUT_NOT_CHAT" }

// ❌ General chat
{
  "question": "hi there"
}
// Response: { "error": "This endpoint is for SEBI registry queries only. Provide a SEBI/registration-related question.", "code": "INVALID_INPUT_NOT_CHAT" }
```

### 5. Advisor Verifier (`/api/agents/advisor-verifier`)
**Required Fields:**
- `name` (string, min 3 characters) OR `registrationNumber` (string, min 3 characters)

**Proper Usage:**
```json
{
  "name": "Zerodha Broking Ltd",
  "checkType": "name"
}
```

```json
{
  "registrationNumber": "INZ000031633",
  "checkType": "registration"
}
```

**Rejected Examples:**
```json
// ❌ Missing both fields
{}
// Response: { "error": "name or registrationNumber is required", "code": "INVALID_INPUT_NOT_CHAT" }

// ❌ Chat pattern in name
{
  "name": "hello"
}
// Response: { "error": "This endpoint verifies advisors/brokers. It is not a chat interface.", "code": "INVALID_INPUT_NOT_CHAT" }
```

## Error Response Format

All validation failures return HTTP 400 with this structure:
```json
{
  "error": "Specific validation error message",
  "code": "INVALID_INPUT_NOT_CHAT"
}
```

## Chat Pattern Detection

The system detects and blocks:
- **Greetings:** "hi", "hello", "hey", "namaste", "hola"
- **Chat questions:** "how are you", "who are you", "what can you do"
- **Content requests:** "tell me a joke", "story", "poem"
- **Vague questions:** Questions without domain keywords that end with "?"
- **OpenAI-style payloads:** Objects with `messages` arrays
- **Very short inputs:** Less than 3-4 characters

## Success Response Examples

### Deepfake Detector Success:
```json
{
  "success": true,
  "analysis": {
    "isDeepfake": false,
    "confidence": 85,
    "riskLevel": "low",
    "indicators": ["No suspicious patterns detected"],
    "recommendations": ["Content appears authentic", "Always verify through official channels"]
  },
  "reportId": "GC-DF-1704389472000-abc123",
  "message": "✅ LOW RISK: Content appears relatively authentic. However, always verify investment advice with SEBI-registered advisors before making decisions."
}
```

### SEBI Query Success:
```json
{
  "answer": "✅ **Zerodha is registered with SEBI**\n\n**📋 Registration Details**\n• Registration Number: INZ000031633\n• Entity Type: Equity Broker\n• Status: Active ✓\n\n**🏢 Authorized Segments**\n• Equity Broker\n• Equity Derivative Broker",
  "query_type": "verify_registration",
  "data_count": 1,
  "has_data": true,
  "reportId": "GC-SQ-1704389472000-xyz789"
}
```

## Implementation Benefits

1. **Prevents Misuse:** Agents cannot be used as general chatbots
2. **Domain Focus:** Each agent stays within its specialized purpose
3. **Clear Errors:** Users get specific guidance on proper usage
4. **Security:** Reduces risk of prompt injection or unintended responses
5. **Compliance:** Ensures agents remain focused on financial fraud detection

## Testing the Validation

You can test the validation by sending these requests:

**✅ Valid Request:**
```bash
curl -X POST http://localhost:3000/api/agents/deepfake-detector \
  -H "Content-Type: application/json" \
  -d '{"mediaUrl": "https://www.youtube.com/watch?v=example", "mediaType": "video"}'
```

**❌ Invalid Request:**
```bash
curl -X POST http://localhost:3000/api/agents/deepfake-detector \
  -H "Content-Type: application/json" \
  -d '{"mediaUrl": "hello"}'
# Returns: {"error": "This endpoint analyzes specific media. It is not a chat interface.", "code": "INVALID_INPUT_NOT_CHAT"}
```

This validation system ensures all SEBI Verify agents remain focused on their specialized financial fraud detection and verification tasks, preventing misuse as general chat interfaces while providing clear guidance to users on proper usage.
