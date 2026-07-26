import { useEffect, useState } from 'react'
import BeijingClock from './components/BeijingClock'
import Converter from './components/Converter'
import Header from './components/Header'
import Timeline from './components/Timeline'
import TimezoneTable from './components/TimezoneTable'

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [use24Hour, setUse24Hour] = useState(true)

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="app" id="top">
      <Header use24Hour={use24Hour} onToggleFormat={() => setUse24Hour((value) => !value)} />
      <main>
        <div className="hero-shell">
          <BeijingClock now={now} use24Hour={use24Hour} />
          <Timeline now={now} use24Hour={use24Hour} />
        </div>
        <Converter now={now} use24Hour={use24Hour} />
        <TimezoneTable now={now} use24Hour={use24Hour} />
      </main>
      <footer><span>此刻 · 世界时间</span><span>所有换算均在你的浏览器中完成</span></footer>
    </div>
  )
}
