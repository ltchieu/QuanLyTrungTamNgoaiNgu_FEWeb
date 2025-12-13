/**
 * Datetime utility functions for handling Vietnam timezone (GMT+7)
 * This ensures consistent time handling across different server locations
 */

/**
 * Get current time in Vietnam timezone (GMT+7)
 * @returns Date object representing current time in Vietnam
 */
export const getVietnamTime = (): Date => {
  // Get current time in UTC
  const now = new Date();
  
  // Vietnam is UTC+7
  const vietnamOffset = 7 * 60; // 7 hours in minutes
  
  // Get local timezone offset in minutes
  const localOffset = now.getTimezoneOffset();
  
  // Calculate the difference and adjust
  const totalOffset = vietnamOffset + localOffset;
  
  // Create new date with Vietnam time
  return new Date(now.getTime() + totalOffset * 60 * 1000);
};

/**
 * Convert any date string to Vietnam timezone
 * @param dateString - ISO date string from backend
 * @returns Date object in Vietnam timezone
 */
export const toVietnamTime = (dateString: string): Date => {
  const date = new Date(dateString);
  return date; // Backend should already return Vietnam time
};

/**
 * Get time difference in seconds between two dates
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Difference in seconds
 */
export const getTimeDifferenceInSeconds = (date1: Date, date2: Date): number => {
  return Math.floor((date1.getTime() - date2.getTime()) / 1000);
};

/**
 * Format date to Vietnam locale string
 * @param date - Date to format
 * @returns Formatted date string (dd/MM/yyyy HH:mm:ss)
 */
export const formatVietnamDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(date);
};

/**
 * Format date to Vietnam locale (date only)
 * @param date - Date to format
 * @returns Formatted date string (dd/MM/yyyy)
 */
export const formatVietnamDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(dateObj);
};

/**
 * Check if a date has expired (Vietnam timezone)
 * @param expiryDate - The expiry date to check
 * @returns true if expired, false otherwise
 */
export const isExpired = (expiryDate: Date): boolean => {
  const now = getVietnamTime();
  return now.getTime() > expiryDate.getTime();
};
