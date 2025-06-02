import { formatTimeStamp } from './coinHelper';

export const formatHours = (timestamp: number): string => {
  const { hours, minutes } = formatTimeStamp(timestamp);
  const formated = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formated;
};

export const formatDays = (timestamp: number): string => {
  const { day, month } = formatTimeStamp(timestamp);
  return `${day}/${month}`;
};
