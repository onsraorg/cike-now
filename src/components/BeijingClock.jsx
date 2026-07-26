import { BEIJING_ZONE, formatDate, formatTime, formatUtcOffset } from '../lib/time'

export default function BeijingClock({ now, use24Hour }) {
  const time = formatTime(now, BEIJING_ZONE, use24Hour)
  const [main, period] = time.split(' ')

  return (
    <section className="beijing-clock" aria-labelledby="beijing-title">
      <h1 id="beijing-title">北京时间</h1>
      <div className="hero-time" aria-label={`北京时间 ${time}`}>
        {main}<span className="seconds-pulse">{period ? ` ${period}` : ''}</span>
      </div>
      <p className="hero-date">{formatDate(now, BEIJING_ZONE)}</p>
      <p className="hero-zone">{formatUtcOffset(now, BEIJING_ZONE)} · 亚洲 / 上海</p>
    </section>
  )
}
