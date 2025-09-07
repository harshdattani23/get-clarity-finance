import { prisma } from '../prisma';
import { PrismaClientKnownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library';

export class DatabaseService {
  private static instance: DatabaseService;
  
  private constructor() {}
  
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Execute a database query with proper error handling and connection management
   */
  async executeQuery<T>(
    operation: () => Promise<T>,
    retries: number = 2
  ): Promise<T> {
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        return await operation();
      } catch (error) {
        console.error(`Database query attempt ${attempt} failed:`, error);
        
        // Handle connection pool exhaustion
        if (this.isConnectionError(error)) {
          if (attempt <= retries) {
            console.log(`Retrying database query after connection error (attempt ${attempt + 1}/${retries + 1})`);
            // Wait before retrying
            await this.delay(1000 * attempt);
            continue;
          }
        }
        
        // Re-throw the error if we've exhausted retries or it's not a connection error
        throw error;
      }
    }
    
    throw new Error('Database query failed after all retry attempts');
  }

  /**
   * Check if the error is a connection-related error
   */
  private isConnectionError(error: any): boolean {
    if (error instanceof PrismaClientKnownRequestError) {
      // P2037 = Too many connections
      // P1008 = Operations timed out
      return error.code === 'P2037' || error.code === 'P1008';
    }
    
    if (error instanceof PrismaClientInitializationError) {
      // Check for connection timeout or pool exhaustion
      return error.message.includes('connection') || 
             error.message.includes('timeout') ||
             error.message.includes('pool');
    }
    
    return false;
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get a fresh connection with timeout
   */
  async withConnection<T>(operation: () => Promise<T>, timeoutMs: number = 10000): Promise<T> {
    return Promise.race([
      this.executeQuery(operation),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), timeoutMs)
      )
    ]);
  }

  /**
   * Disconnect from database (useful for cleanup)
   */
  async disconnect(): Promise<void> {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }

  /**
   * Health check for database connection
   */
  async healthCheck(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

export const databaseService = DatabaseService.getInstance();
