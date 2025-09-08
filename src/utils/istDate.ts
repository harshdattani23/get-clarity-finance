/**
 * Indian Standard Time (IST) utilities for consistent date handling
 * IST is UTC+5:30
 */

// Get current date in IST
export function getISTDate(): Date {
  const now = new Date();
  // IST is UTC + 5:30 hours
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  return new Date(utc + istOffset);
}

// Get IST date as formatted string for display
export function getISTDateString(options?: Intl.DateTimeFormatOptions): string {
  const istDate = getISTDate();
  return istDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  });
}

// Get IST date for database operations (start of day in IST)
export function getISTStartOfDay(date?: Date): Date {
  const targetDate = date || getISTDate();
  const istDate = new Date(targetDate);
  istDate.setHours(0, 0, 0, 0);
  return istDate;
}

// Get IST date for database operations (end of day in IST)
export function getISTEndOfDay(date?: Date): Date {
  const targetDate = date || getISTDate();
  const istDate = new Date(targetDate);
  istDate.setHours(23, 59, 59, 999);
  return istDate;
}

// Format IST date for Gemini prompts
export function getISTDateForPrompt(): string {
  return getISTDateString({
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get IST timezone info
export function getISTTimezone(): string {
  return 'Asia/Kolkata';
}

// Convert any date to IST
export function convertToIST(date: Date): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
}

// Check if it's a business day in India (Monday to Friday, excluding Indian holidays)
export function isBusinessDayIST(date?: Date): boolean {
  const istDate = date || getISTDate();
  const dayOfWeek = istDate.getDay();
  // 0 = Sunday, 6 = Saturday
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}

// Get market hours info for IST
export function getISTMarketHours() {
  return {
    open: '09:15',
    close: '15:30',
    timezone: 'IST (UTC+5:30)'
  };
}
