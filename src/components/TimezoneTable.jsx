import { useMemo, useState } from 'react'
import { dayPeriod, formatRelativeHours, formatTime, formatUtcOffset, getHourFraction, getRelativeHours } from '../lib/time'
import { featuredZoneIds, zones } from '../lib/zones'
import { MoonIcon, SearchIcon, SunIcon } from './Icons'

const filters = ['全部', '亚洲', '欧洲', '美洲', '大洋洲', '非洲']

export default function TimezoneTable({ now, use24Hour }) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('全部')
  const [visibleCount, setVisibleCount] = useState(18)

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    const result = zones.filter((item) => {
      const regionMatch = region === '全部' || item.region === region
      return regionMatch && (!keyword || item.search.includes(keyword))
    })
    return result.sort((a, b) => {
      const aFeatured = featuredZoneIds.indexOf(a.zone)
      const bFeatured = featuredZoneIds.indexOf(b.zone)
      if (aFeatured !== -1 || bFeatured !== -1) {
        if (aFeatured === -1) return 1
        if (bFeatured === -1) return -1
        return aFeatured - bFeatured
      }
      return a.name.localeCompare(b.name, 'zh-CN')
    })
  }, [query, region])

  const shown = filtered.slice(0, visibleCount)

  function chooseRegion(value) {
    setRegion(value)
    setVisibleCount(18)
  }

  return (
    <section className="world-times" id="world" aria-labelledby="world-title">
      <div className="world-toolbar">
        <h2 id="world-title">世界时间</h2>
        <label className="search-box">
          <SearchIcon />
          <span className="sr-only">搜索城市或时区</span>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(18) }} placeholder="搜索城市或时区" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="清空搜索">×</button>}
        </label>
        <div className="region-filters" aria-label="按地区筛选">
          {filters.map((item) => (
            <button type="button" className={region === item ? 'active' : ''} onClick={() => chooseRegion(item)} key={item}>{item}</button>
          ))}
        </div>
        <span className="zone-count">{filtered.length} 个时区</span>
      </div>

      <div className="table-header" aria-hidden="true">
        <span>城市 / 时区</span><span>当地时间</span><span>相对北京时间</span><span>时区</span><span>日夜状态</span>
      </div>
      <div className="timezone-list" aria-live="polite">
        {shown.map((item) => <TimeRow item={item} now={now} use24Hour={use24Hour} key={item.zone} />)}
        {!shown.length && <div className="empty-state">没有找到匹配的城市或时区</div>}
      </div>
      {visibleCount < filtered.length && (
        <button className="load-more" type="button" onClick={() => setVisibleCount((count) => count + 30)}>
          加载更多 <span>({filtered.length - visibleCount})</span>
        </button>
      )}
    </section>
  )
}

function TimeRow({ item, now, use24Hour }) {
  const hour = getHourFraction(now, item.zone)
  const position = `${(hour / 24) * 100}%`
  const period = dayPeriod(now, item.zone)
  const isDay = period === '清晨' || period === '白昼'

  return (
    <article className="timezone-row">
      <div className="zone-identity">
        <i style={{ backgroundColor: item.color }} />
        <span><strong>{item.name}</strong><small>{item.detail}</small></span>
      </div>
      <time>{formatTime(now, item.zone, use24Hour)}</time>
      <span className="relative-time">{formatRelativeHours(getRelativeHours(now, item.zone))}</span>
      <span className="utc-offset">{formatUtcOffset(now, item.zone)}</span>
      <div className="day-status">
        <span className="period-icon">{isDay ? <SunIcon /> : <MoonIcon />}</span>
        <div className="mini-rail"><i style={{ left: position }} /></div>
        <span>{period}</span>
      </div>
    </article>
  )
}
