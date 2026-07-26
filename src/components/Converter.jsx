import { useMemo, useState } from 'react'
import {
  BEIJING_ZONE,
  formatInputDate,
  formatInputTime,
  formatRelativeHours,
  formatTime,
  getRelativeHours,
  zonedTimeToDate,
} from '../lib/time'
import { getZoneInfo, zones } from '../lib/zones'
import { SwapIcon } from './Icons'

export default function Converter({ now, use24Hour }) {
  const [source, setSource] = useState(BEIJING_ZONE)
  const [target, setTarget] = useState('Asia/Dubai')
  const [dateValue, setDateValue] = useState(() => formatInputDate(now, BEIJING_ZONE))
  const [timeValue, setTimeValue] = useState(() => formatInputTime(now, BEIJING_ZONE))

  const converted = useMemo(() => {
    if (!dateValue || !timeValue) return null
    const [year, month, day] = dateValue.split('-').map(Number)
    const [hour, minute] = timeValue.split(':').map(Number)
    if (![year, month, day, hour, minute].every(Number.isFinite)) return null

    try {
      const date = zonedTimeToDate({ year, month, day, hour, minute }, source)
      return {
        date,
        result: formatTime(date, target, use24Hour, false),
        difference: formatRelativeHours(getRelativeHours(date, target)),
      }
    } catch {
      return null
    }
  }, [dateValue, timeValue, source, target, use24Hour])

  function swapZones() {
    setSource(target)
    setTarget(source)
    if (converted) {
      setDateValue(formatInputDate(converted.date, target))
      setTimeValue(formatInputTime(converted.date, target))
    }
  }

  return (
    <section className="converter" id="converter" aria-labelledby="converter-title">
      <h2 id="converter-title">时间换算</h2>
      <div className="converter-grid">
        <label>
          <span>日期</span>
          <input type="date" value={dateValue} onChange={(event) => setDateValue(event.target.value)} />
        </label>
        <label>
          <span>时间</span>
          <input type="time" value={timeValue} onChange={(event) => setTimeValue(event.target.value)} />
        </label>
        <ZoneSelect label="来源" value={source} onChange={setSource} />
        <button className="swap-button" type="button" onClick={swapZones} aria-label="交换来源和目的地">
          <SwapIcon />
        </button>
        <ZoneSelect label="目的地" value={target} onChange={setTarget} />
        <div className="conversion-result">
          <span>换算结果</span>
          <strong>{converted?.result ?? '—'}</strong>
        </div>
        <div className="conversion-difference">
          <span>相对北京时间</span>
          <strong>{converted?.difference ?? '等待输入'}</strong>
        </div>
      </div>
    </section>
  )
}

function ZoneSelect({ label, value, onChange }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {zones.map((item) => (
          <option value={item.zone} key={item.zone}>{item.name} · {item.zone}</option>
        ))}
      </select>
    </label>
  )
}
