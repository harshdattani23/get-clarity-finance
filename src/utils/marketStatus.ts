/**
 * Utility functions for checking Indian stock market status
 * NSE/BSE operating hours: 9:15 AM - 3:30 PM IST on weekdays (excluding holidays)
 */

// Indian Stock Market Trading Holidays for 2025
// Source: NSE and BSE official holiday calendar
const INDIAN_MARKET_HOLIDAYS_2025: string[] = [
  '2025-01-26', // Republic Day
  '2025-03-14', // Holi
  '2025-03-31', // Ram Navami 
  '2025-04-14', // Mahavir Jayanti
  '2025-04-18', // Good Friday
  '2025-05-01', // Maharashtra Day
  '2025-08-15', // Independence Day
  '2025-08-27', // Ganesh Chaturthi
  '2025-10-02', // Gandhi Jayanti
  '2025-10-21', // Dussehra
  '2025-11-01', // Diwali (Laxmi Puja)
  '2025-11-05', // Bhai Dooj
  '2025-11-15', // Guru Nanak Jayanti
  '2025-12-25', // Christmas
  // Special trading holidays (muhurat trading days are not included)
  // Note: Actual dates may vary slightly based on lunar calendar
];

// Additional holidays for 2024 (in case we're still in 2024)
const INDIAN_MARKET_HOLIDAYS_2024: string[] = [
  '2024-01-26', // Republic Day
  '2024-03-08', // Holi
  '2024-03-25', // Good Friday
  '2024-03-29', // Ram Navami
  '2024-04-11', // Eid ul Fitr
  '2024-04-14', // Dr. Babasaheb Ambedkar Jayanti
  '2024-04-17', // Mahavir Jayanti
  '2024-05-01', // Maharashtra Day
  '2024-06-17', // Eid ul Adha
  '2024-08-15', // Independence Day
  '2024-08-26', // Janmashtami
  '2024-09-07', // Ganesh Chaturthi
  '2024-10-02', // Gandhi Jayanti
  '2024-10-12', // Dussehra
  '2024-11-01', // Diwali
  '2024-11-02', // Diwali (Balipratipada)
  '2024-11-15', // Guru Nanak Jayanti
  '2024-12-25', // Christmas
];

function isMarketHoliday(date: Date): boolean {
  const year = date.getFullYear();
  const holidays = year === 2025 ? INDIAN_MARKET_HOLIDAYS_2025 : 
                   year === 2024 ? INDIAN_MARKET_HOLIDAYS_2024 : [];
  
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  return holidays.includes(dateString);
}

function getNextTradingDay(fromDate: Date): Date {
  let nextDay = new Date(fromDate);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  
  // Keep incrementing until we find a trading day
  while (nextDay.getUTCDay() === 0 || nextDay.getUTCDay() === 6 || isMarketHoliday(nextDay)) {
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  }
  
  return nextDay;
}

function getTodayHolidayName(date: Date): string | null {
  const dateString = date.toISOString().split('T')[0];
  
  // Holiday name mapping
  const holidayNames: { [key: string]: string } = {
    '2025-01-26': 'Republic Day',
    '2025-03-14': 'Holi',
    '2025-03-31': 'Ram Navami',
    '2025-04-14': 'Mahavir Jayanti',
    '2025-04-18': 'Good Friday',
    '2025-05-01': 'Maharashtra Day',
    '2025-08-15': 'Independence Day',
    '2025-08-27': 'Ganesh Chaturthi',
    '2025-10-02': 'Gandhi Jayanti',
    '2025-10-21': 'Dussehra',
    '2025-11-01': 'Diwali',
    '2025-11-05': 'Bhai Dooj',
    '2025-11-15': 'Guru Nanak Jayanti',
    '2025-12-25': 'Christmas',
    // 2024 holidays
    '2024-01-26': 'Republic Day',
    '2024-03-08': 'Holi',
    '2024-03-25': 'Good Friday',
    '2024-03-29': 'Ram Navami',
    '2024-04-11': 'Eid ul Fitr',
    '2024-04-14': 'Dr. Babasaheb Ambedkar Jayanti',
    '2024-04-17': 'Mahavir Jayanti',
    '2024-05-01': 'Maharashtra Day',
    '2024-06-17': 'Eid ul Adha',
    '2024-08-15': 'Independence Day',
    '2024-08-26': 'Janmashtami',
    '2024-09-07': 'Ganesh Chaturthi',
    '2024-10-02': 'Gandhi Jayanti',
    '2024-10-12': 'Dussehra',
    '2024-11-01': 'Diwali',
    '2024-11-02': 'Diwali (Balipratipada)',
    '2024-11-15': 'Guru Nanak Jayanti',
    '2024-12-25': 'Christmas',
  };
  
  return holidayNames[dateString] || null;
}

function getNextTradingDayString(nextTradingDay: Date, currentTime: Date): string {
  const isSameDate = nextTradingDay.toDateString() === currentTime.toDateString();
  const isTomorrow = nextTradingDay.toDateString() === new Date(currentTime.getTime() + 24 * 60 * 60 * 1000).toDateString();
  
  if (isSameDate) {
    return '9:15 AM Today';
  } else if (isTomorrow) {
    return '9:15 AM Tomorrow';
  } else {
    const dayName = nextTradingDay.toLocaleDateString('en-IN', { weekday: 'long' });
    return `9:15 AM ${dayName}`;
  }
}

export interface MarketStatus {
  isOpen: boolean;
  status: 'Open' | 'Closed' | 'Pre-Market' | 'After-Hours' | 'Holiday';
  nextEvent: {
    event: 'Open' | 'Close';
    time: string;
    timeUntil: string;
  };
  holidayName?: string;
  isHoliday: boolean;
}

export function getIndianMarketStatus(): MarketStatus {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + istOffset);
  
  const dayOfWeek = istTime.getUTCDay(); // 0 = Sunday, 6 = Saturday
  const hours = istTime.getUTCHours();
  const minutes = istTime.getUTCMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;
  
  // Market timings in IST (in minutes from midnight)
  const marketOpen = 9 * 60 + 15; // 9:15 AM
  const marketClose = 15 * 60 + 30; // 3:30 PM
  const preMarketStart = 9 * 60; // 9:00 AM
  
  // Check if today is a market holiday
  const holidayName = getTodayHolidayName(istTime);
  if (holidayName) {
    const nextTradingDay = getNextTradingDay(istTime);
    nextTradingDay.setUTCHours(9, 15, 0, 0);
    
    return {
      isOpen: false,
      status: 'Holiday',
      isHoliday: true,
      holidayName,
      nextEvent: {
        event: 'Open',
        time: getNextTradingDayString(nextTradingDay, istTime),
        timeUntil: formatTimeUntil(nextTradingDay.getTime() - istTime.getTime())
      }
    };
  }
  
  // Check if it's weekend
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const nextTradingDay = getNextTradingDay(istTime);
    nextTradingDay.setUTCHours(9, 15, 0, 0);
    
    return {
      isOpen: false,
      status: 'Closed',
      isHoliday: false,
      nextEvent: {
        event: 'Open',
        time: getNextTradingDayString(nextTradingDay, istTime),
        timeUntil: formatTimeUntil(nextTradingDay.getTime() - istTime.getTime())
      }
    };
  }
  
  // Check market status for weekdays
  if (currentTimeInMinutes >= marketOpen && currentTimeInMinutes < marketClose) {
    // Market is open
    const closeTime = new Date(istTime);
    closeTime.setUTCHours(15, 30, 0, 0);
    
    return {
      isOpen: true,
      status: 'Open',
      isHoliday: false,
      nextEvent: {
        event: 'Close',
        time: '3:30 PM',
        timeUntil: formatTimeUntil(closeTime.getTime() - istTime.getTime())
      }
    };
  } else if (currentTimeInMinutes >= preMarketStart && currentTimeInMinutes < marketOpen) {
    // Pre-market
    const openTime = new Date(istTime);
    openTime.setUTCHours(9, 15, 0, 0);
    
    return {
      isOpen: false,
      status: 'Pre-Market',
      isHoliday: false,
      nextEvent: {
        event: 'Open',
        time: '9:15 AM',
        timeUntil: formatTimeUntil(openTime.getTime() - istTime.getTime())
      }
    };
  } else {
    // Market is closed (after hours or before pre-market)
    const nextTradingDay = currentTimeInMinutes >= marketClose ? 
      getNextTradingDay(istTime) : istTime;
    
    const nextOpenTime = new Date(nextTradingDay);
    nextOpenTime.setUTCHours(9, 15, 0, 0);
    
    if (currentTimeInMinutes >= marketClose) {
      // After market close - next open could be tomorrow or later (accounting for holidays)
      const nextEventTime = getNextTradingDayString(nextOpenTime, istTime);
      
      return {
        isOpen: false,
        status: 'Closed',
        isHoliday: false,
        nextEvent: {
          event: 'Open',
          time: nextEventTime,
          timeUntil: formatTimeUntil(nextOpenTime.getTime() - istTime.getTime())
        }
      };
    } else {
      // Before pre-market - next open is today
      return {
        isOpen: false,
        status: 'Closed',
        isHoliday: false,
        nextEvent: {
          event: 'Open',
          time: '9:15 AM',
          timeUntil: formatTimeUntil(nextOpenTime.getTime() - istTime.getTime())
        }
      };
    }
  }
}

function formatTimeUntil(milliseconds: number): string {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

export function getMarketStatusColor(status: MarketStatus['status']): string {
  switch (status) {
    case 'Open':
      return 'bg-green-400 text-green-400';
    case 'Pre-Market':
      return 'bg-yellow-400 text-yellow-400';
    case 'Holiday':
      return 'bg-purple-400 text-purple-400';
    case 'Closed':
    case 'After-Hours':
    default:
      return 'bg-red-400 text-red-400';
  }
}

export function isMarketDay(): boolean {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  const dayOfWeek = istTime.getUTCDay();
  
  // Check if it's a weekday and not a holiday
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  const isHoliday = isMarketHoliday(istTime);
  
  return isWeekday && !isHoliday;
}

export function getLastTradingDay(): string {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  // Find the most recent weekday
  let lastTradingDay = new Date(istTime);
  
  while (lastTradingDay.getUTCDay() === 0 || lastTradingDay.getUTCDay() === 6) {
    lastTradingDay.setUTCDate(lastTradingDay.getUTCDate() - 1);
  }
  
  // If today is a weekday and market has closed, use today
  // If today is a weekday and market hasn't closed, use today for live data
  // If today is weekend, use the most recent weekday
  
  return lastTradingDay.toLocaleDateString('en-IN');
}
