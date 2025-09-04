import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Log agent queries and responses to the database
 * @param {Object} logData - The data to log
 * @param {string} logData.agentType - Type of agent (sebi-query, advisor-verifier, etc.)
 * @param {string} logData.query - Original user query
 * @param {string} [logData.response] - Agent response
 * @param {string} [logData.userAgent] - User agent string
 * @param {string} [logData.ipAddress] - Client IP address
 * @param {string} [logData.userId] - Clerk user ID if authenticated
 * @param {string} [logData.sessionId] - Session identifier
 * @param {boolean} [logData.success=true] - Whether the query was successful
 * @param {string} [logData.error] - Error message if failed
 * @param {Object} [logData.metadata] - Additional context data
 * @param {number} [logData.executionTime] - Response time in milliseconds
 * @returns {Promise<Object>} The created log entry with reportId
 */
export async function logAgentQuery(logData) {
  try {
    const {
      agentType,
      query,
      response,
      userAgent,
      ipAddress,
      userId,
      sessionId,
      success = true,
      error,
      metadata,
      executionTime
    } = logData;

    // Validate required fields
    if (!agentType || !query) {
      throw new Error('agentType and query are required fields');
    }

    const logEntry = await prisma.agentQuery.create({
      data: {
        agentType,
        query: query.substring(0, 2000), // Limit query length
        response: response ? response.substring(0, 10000) : null, // Limit response length
        userAgent,
        ipAddress,
        userId,
        sessionId,
        success,
        error,
        metadata,
        executionTime
      }
    });

    console.log(`Agent query logged: ${logEntry.reportId} - ${agentType}`);
    return logEntry;

  } catch (error) {
    console.error('Failed to log agent query:', error);
    // Don't throw the error to avoid breaking the main functionality
    return null;
  }
}

/**
 * Get request metadata for logging
 * @param {Request} request - Next.js request object
 * @returns {Object} Extracted metadata
 */
export function getRequestMetadata(request) {
  try {
    const userAgent = request.headers.get('user-agent') || null;
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const remoteAddr = request.headers.get('remote-addr');
    
    // Get IP address from various headers
    const ipAddress = forwardedFor?.split(',')[0] || realIp || remoteAddr || null;
    
    return {
      userAgent,
      ipAddress
    };
  } catch (error) {
    console.error('Failed to extract request metadata:', error);
    return {
      userAgent: null,
      ipAddress: null
    };
  }
}

/**
 * Wrapper function to time execution and log automatically
 * @param {string} agentType - Type of agent
 * @param {string} query - User query
 * @param {Function} executionFunction - Async function to execute
 * @param {Object} [additionalData] - Additional data for logging
 * @returns {Promise<Object>} Result with response and log entry
 */
export async function executeAndLog(agentType, query, executionFunction, additionalData = {}) {
  const startTime = Date.now();
  let response = null;
  let error = null;
  let success = true;

  try {
    response = await executionFunction();
  } catch (err) {
    error = err.message;
    success = false;
    throw err; // Re-throw to maintain original error handling
  } finally {
    const executionTime = Date.now() - startTime;
    
    const logEntry = await logAgentQuery({
      agentType,
      query,
      response: typeof response === 'string' ? response : JSON.stringify(response),
      success,
      error,
      executionTime,
      ...additionalData
    });

    if (success) {
      return { response, logEntry };
    }
  }
}
