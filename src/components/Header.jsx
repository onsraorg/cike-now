import { ClockIcon } from './Icons'

export default function Header({ use24Hour, onToggleFormat }) {
  return (
    <header className="app-header">
      <a className="brand" href="#top" aria-label="此刻首页">
        <span className="brand-mark"><ClockIcon size={29} /></span>
        <strong>此刻</strong><span>/ NOW</span>
      </a>
      <nav aria-label="主导航">
        <a className="active" href="#world">世界时间</a>
        <a href="#converter">时间换算</a>
      </nav>
      <button className="format-toggle" type="button" onClick={onToggleFormat} aria-pressed={use24Hour}>
        <ClockIcon size={20} />
        <span>{use24Hour ? '24 小时制' : '12 小时制'}</span>
        <span className={`switch ${use24Hour ? 'on' : ''}`} aria-hidden="true"><i /></span>
      </button>
    </header>
  )
}
