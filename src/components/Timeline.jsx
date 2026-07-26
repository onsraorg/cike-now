import { formatTime, getHourFraction } from '../lib/time'
import { getZoneInfo, timelineZoneIds } from '../lib/zones'
import { MoonIcon, SunIcon } from './Icons'

const ticks = Array.from({ length: 13 }, (_, index) => index * 2)

export default function Timeline({ now, use24Hour }) {
  return (
    <section className="timeline" aria-label="全球时间轨">
      <div className="city-markers">
        {timelineZoneIds.map((zone, index) => {
          const info = getZoneInfo(zone)
          const position = (getHourFraction(now, zone) / 24) * 100
          return (
            <div className={`city-marker city-${index}`} style={{ left: `${position}%`, '--marker': info.color }} key={zone}>
              <span className="city-name">{info.name}</span>
              <span className="city-time">{formatTime(now, zone, use24Hour, false)}</span>
              <i />
            </div>
          )
        })}
      </div>
      <div className="day-rail">
        <span className="night-symbol start"><MoonIcon /></span>
        <span className="sun-symbol"><SunIcon size={23} /></span>
        <span className="night-symbol end"><MoonIcon /></span>
      </div>
      <div className="timeline-ticks" aria-hidden="true">
        {ticks.map((hour) => <span key={hour}>{String(hour).padStart(2, '0')}</span>)}
      </div>
      <div className="timeline-dates"><span>今天</span><span>明天</span></div>
    </section>
  )
}
