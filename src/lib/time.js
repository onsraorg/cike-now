export const BEIJING_ZONE = 'Asia/Shanghai'

const partFormatterCache = new Map()

function partFormatter(timeZone) {
  if (!partFormatterCache.has(timeZone)) {
    partFormatterCache.set(
      timeZone,
      new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
      }),
    )
  }
  return partFormatterCache.get(timeZone)
}

export function getZoneParts(date, timeZone) {
  return Object.fromEntries(
    partFormatter(timeZone)
      .formatToParts(date)
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, Number(value)]),
  )
}

export function getZoneOffset(date, timeZone) {
  const p = getZoneParts(date, timeZone)
  const represented = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second)
  return represented - Math.floor(date.getTime() / 1000) * 1000
}

export function formatTime(date, timeZone, use24Hour = true, includeSeconds = true) {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hourCycle: use24Hour ? 'h23' : 'h12',
  }).format(date)
}

export function formatDate(date, timeZone, options = {}) {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: options.weekday === false ? undefined : 'long',
  }).format(date)
}

export function getRelativeHours(date, timeZone) {
  return (getZoneOffset(date, timeZone) - getZoneOffset(date, BEIJING_ZONE)) / 3_600_000
}

export function formatRelativeHours(hours) {
  if (hours === 0) return '与北京相同'
  const direction = hours > 0 ? '快' : '慢'
  const amount = Math.abs(hours)
  const formatted = Number.isInteger(amount) ? amount : amount.toFixed(1)
  return `${direction} ${formatted} 小时`
}

export function formatUtcOffset(date, timeZone) {
  const hours = getZoneOffset(date, timeZone) / 3_600_000
  const sign = hours >= 0 ? '+' : '−'
  const absolute = Math.abs(hours)
  const whole = Math.floor(absolute)
  const minutes = Math.round((absolute - whole) * 60)
  return `UTC ${sign}${whole}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`
}

export function getHourFraction(date, timeZone) {
  const p = getZoneParts(date, timeZone)
  return p.hour + p.minute / 60 + p.second / 3600
}

export function dayPeriod(date, timeZone) {
  const hour = getZoneParts(date, timeZone).hour
  if (hour >= 6 && hour < 12) return '清晨'
  if (hour >= 12 && hour < 18) return '白昼'
  if (hour >= 18 && hour < 21) return '傍晚'
  return '夜间'
}
