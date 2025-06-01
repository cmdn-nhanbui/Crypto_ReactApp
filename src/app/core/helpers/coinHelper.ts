export function formatTimeStamp(timestamp: number) {
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
}

export function formatUSPrice(price: number): string {
  return price.toLocaleString('en-US', {});
}
