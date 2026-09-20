/**
 * Time formatting and validation utilities for Café Sip & Save booking slots.
 */

// Café opening: 10:00 AM (600 mins), Café last seating: 9:30 PM (1290 mins)
export const CAFE_OPEN_MINUTES = 600; // 10:00 AM
export const CAFE_CLOSE_MINUTES = 1320; // 10:00 PM
export const CAFE_LAST_BOOKING_MINUTES = 1290; // 9:30 PM

/**
 * Converts a time string (12-hour or 24-hour) to total minutes from midnight (0-1439).
 * Supports "7:15 PM", "07:15 pm", "19:15", "10:00 AM", etc.
 */
export function timeToMinutes(timeStr: string): number | null {
  if (!timeStr) return null;
  const clean = timeStr.trim();

  // Try 12-hour format: e.g. "7:15 PM", "12:30 AM", "09:00 PM"
  const match12 = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const period = match12[3].toUpperCase();

    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Try 24-hour format: e.g. "19:15", "07:30"
  const match24 = clean.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const hours = parseInt(match24[1], 10);
    const minutes = parseInt(match24[2], 10);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    return hours * 60 + minutes;
  }

  return null;
}

/**
 * Converts minutes from midnight into a clean 12-hour display string (e.g. "7:15 PM").
 */
export function minutesTo12Hour(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  let hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const minStr = minutes.toString().padStart(2, '0');
  return `${hours}:${minStr} ${period}`;
}

/**
 * Converts minutes from midnight into 24-hour string for <input type="time"> (e.g. "19:15").
 */
export function minutesTo24Hour(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Converts a 12-hour string (e.g. "7:15 PM") to 24-hour string (e.g. "19:15") for HTML input.
 */
export function time12To24(time12: string): string {
  const mins = timeToMinutes(time12);
  if (mins === null) return '19:00';
  return minutesTo24Hour(mins);
}

export const timeTo24H = time12To24;

/**
 * Converts a 24-hour string (e.g. "19:15") from HTML input to 12-hour string (e.g. "7:15 PM").
 */
export function time24To12(time24: string): string {
  const mins = timeToMinutes(time24);
  if (mins === null) return '7:00 PM';
  return minutesTo12Hour(mins);
}

export const timeTo12H = time24To12;

/**
 * Normalizes any valid time string into standard 12-hour "h:mm A" string.
 */
export function normalizeTimeString(timeStr: string): string {
  const mins = timeToMinutes(timeStr);
  if (mins === null) return timeStr.trim();
  return minutesTo12Hour(mins);
}

/**
 * Checks if a requested slot time falls inside the café's operating hours.
 */
export function validateCafeHours(timeStr: string): { valid: boolean; message?: string } {
  const mins = timeToMinutes(timeStr);
  if (mins === null) {
    return { valid: false, message: 'Please enter a valid time.' };
  }
  if (mins < CAFE_OPEN_MINUTES) {
    return {
      valid: false,
      message: 'Sip & Save opens at 10:00 AM. Please select a time at or after 10:00 AM.',
    };
  }
  if (mins > CAFE_LAST_BOOKING_MINUTES) {
    return {
      valid: false,
      message: 'Last booking slot is 9:30 PM (café closes at 10:00 PM).',
    };
  }
  return { valid: true };
}

/**
 * Checks if two booking times conflict on the same table.
 * Standard table reservation window is 30 minutes.
 */
export function timesOverlap(timeA: string, timeB: string, windowMinutes: number = 30): boolean {
  if (!timeA || !timeB) return false;
  if (timeA.trim().toLowerCase() === timeB.trim().toLowerCase()) return true;

  const minA = timeToMinutes(timeA);
  const minB = timeToMinutes(timeB);

  if (minA === null || minB === null) {
    return timeA.trim().toLowerCase() === timeB.trim().toLowerCase();
  }

  // Conflict if the two times are strictly closer than windowMinutes apart
  return Math.abs(minA - minB) < windowMinutes;
}
