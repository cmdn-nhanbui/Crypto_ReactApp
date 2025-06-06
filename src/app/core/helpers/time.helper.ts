export const formatTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp);

  return {
    timestamp,
    iso: date.toISOString(),
    utcString: date.toUTCString(),
    localString: date.toLocaleString(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
    timezoneOffsetMinutes: date.getTimezoneOffset(), // phút lệch UTC
  };
};

export const formatHours = (timestamp: number): string => {
  const { hours, minutes } = formatTimeStamp(timestamp);
  const formated = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formated;
};

export const formatDays = (timestamp: number): string => {
  const { day, month } = formatTimeStamp(timestamp);
  return `${day}/${month}`;
};
