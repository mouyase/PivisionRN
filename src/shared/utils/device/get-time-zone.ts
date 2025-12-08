/**
 * 获取当前时区
 *
 * 优先从设备日历获取，fallback 到 Intl API
 */

import { Localization } from "@/src/lib/expo/localization";

export function getTimeZone(): string {
  const calendars = Localization.getCalendars();
  if (calendars.length > 0 && calendars[0].timeZone !== null) {
    return calendars[0].timeZone;
  }

  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
