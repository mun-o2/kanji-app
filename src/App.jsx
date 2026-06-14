import React, { useState, createContext, useContext } from 'react'
import './App.css'
import mock from './mockData'

const AppContext = createContext(null)

function useApp() {
  return useContext(AppContext)
}

function Nav({ onNavigate }) {
  return (
    <header className="nav">
      <div className="brand">サークル幹事アプリ (MVP)</div>
      <nav>
        <button onClick={() => onNavigate('home')}>ホーム</button>
        <button onClick={() => onNavigate('create')}>イベント作成</button>
        <button onClick={() => onNavigate('admin')}>幹事ダッシュボード</button>
        <button onClick={() => onNavigate('day-access')}>当日アクセス</button>
      </nav>
    </header>
  )
}

function Home({ navigate }) {
  const { events } = useApp()
  return (
    <main className="container">
      <h2>サークルホーム</h2>
      <div className="card-list">
        {events.map((e) => (
          <div className="card" key={e.id}>
            <h3>{e.title}</h3>
            <p>{e.date}</p>
            <div className="card-actions">
              <button onClick={() => navigate('rsvp', { eventId: e.id })}>出欠回答</button>
              <button onClick={() => navigate('admin', { eventId: e.id })}>幹事画面</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

function CreateEvent({ navigate }) {
  const { events, setEvents } = useApp()
  const [title, setTitle] = useState('飲み会')
  const [date, setDate] = useState('2026-07-01')

  function submit(e) {
    e.preventDefault()
    const id = Date.now().toString()
    setEvents([...events, { id, title, date, participants: [] }])
    navigate('home')
  }

  return (
    <main className="container">
      <h2>イベント作成</h2>
      <form className="card" onSubmit={submit}>
        <label>タイトル<input value={title} onChange={(e)=>setTitle(e.target.value)} /></label>
        <label>日付<input value={date} onChange={(e)=>setDate(e.target.value)} /></label>
        <div className="card-actions">
          <button type="submit">作成</button>
          <button type="button" onClick={() => navigate('home')}>キャンセル</button>
        </div>
      </form>
    </main>
  )
}

function RSVP({ navigate, params }) {
  const { events, setEvents } = useApp()
  const event = events.find((ev) => ev.id === params.eventId)
  const [name, setName] = useState('')

  if (!event) return <div className="container"><p>イベントが見つかりません</p></div>

  return (
    <main className="container">
      <h2>出欠回答 — {event.title}</h2>
      <div className="card">
        <label>お名前<input value={name} onChange={(e)=>setName(e.target.value)} /></label>
        <div className="card-actions">
          <button onClick={() => navigate('pin-setup', { eventId: event.id, name })} disabled={!name}>次へ（4桁暗証番号設定）</button>
          <button onClick={() => navigate('home')}>戻る</button>
        </div>
      </div>
    </main>
  )
}

function PINSetup({ navigate, params }) {
  const { events, setEvents } = useApp()
  const { eventId, name } = params
  const [pin, setPin] = useState('')

  function submit() {
    if (!/^\d{4}$/.test(pin)) return alert('4桁の数字を入力してください')
    setEvents(events.map(ev => {
      if (ev.id !== eventId) return ev
      const pid = Date.now().toString()
      return { ...ev, participants: [...ev.participants, { id: pid, name, pin, status: '未回答', seat: null } ] }
    }))
    navigate('rsvp-done')
  }

  return (
    <main className="container">
      <h2>4桁暗証番号設定</h2>
      <div className="card">
        <p>名前: <strong>{name}</strong></p>
        <label>暗証番号<input value={pin} onChange={(e)=>setPin(e.target.value)} maxLength={4} /></label>
        <div className="card-actions">
          <button onClick={submit}>登録</button>
          <button onClick={() => navigate('rsvp', { eventId })}>戻る</button>
        </div>
      </div>
    </main>
  )
}

function RSVPDone({ navigate }) {
  return (
    <main className="container">
      <div className="card">
        <h3>回答完了</h3>
        <p>ありがとうございます。幹事からの連絡をお待ちください。</p>
        <div className="card-actions">
          <button onClick={() => navigate('home')}>ホームへ</button>
        </div>
      </div>
    </main>
  )
}

function DayAccess({ navigate }) {
  const { events } = useApp()
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [eventId, setEventId] = useState(events[0]?.id || '')

  function submit() {
    navigate('day', { eventId, name, pin })
  }

  return (
    <main className="container">
      <h2>当日アクセス</h2>
      <div className="card">
        <label>イベント
          <select value={eventId} onChange={(e)=>setEventId(e.target.value)}>
            {events.map(ev=> <option key={ev.id} value={ev.id}>{ev.title} {ev.date}</option>)}
          </select>
        </label>
        <label>名前<input value={name} onChange={(e)=>setName(e.target.value)} /></label>
        <label>4桁暗証番号<input value={pin} onChange={(e)=>setPin(e.target.value)} /></label>
        <div className="card-actions">
          <button onClick={submit}>アクセス</button>
        </div>
      </div>
    </main>
  )
}

function DayPage({ navigate, params }) {
  const { events, setEvents } = useApp()
  const { eventId, name, pin } = params
  const event = events.find(ev=>ev.id===eventId)
  if(!event) return <div className="container"><p>イベントが見つかりません</p></div>
  const participant = event.participants.find(p=>p.name===name && p.pin===pin)
  if(!participant) return <div className="container"><p>参加者が見つかりません</p></div>

  function updateStatus(status){
    setEvents(events.map(ev=>{
      if(ev.id!==eventId) return ev
      return {...ev, participants: ev.participants.map(p=> p.id===participant.id ? {...p, status} : p)}
    }))
  }

  return (
    <main className="container">
      <h2>当日 — {event.title}</h2>
      <div className="card">
        <p>名前: <strong>{participant.name}</strong></p>
        <p>席: {participant.seat ?? '未割当'}</p>
        <p>会費: 4000円（サンプル）</p>
        <div className="card-actions">
          <button onClick={()=>updateStatus('到着')}>到着</button>
          <button onClick={()=>updateStatus('遅刻')}>遅刻</button>
          <button onClick={()=>updateStatus('欠席')}>欠席</button>
        </div>
      </div>
    </main>
  )
}

function AdminDashboard({ navigate, params }) {
  const { events, setEvents } = useApp()
  const event = events.find(ev=>ev.id===params?.eventId) || events[0]
  if(!event) return <div className="container"><p>イベントがありません</p></div>

  return (
    <main className="container">
      <h2>幹事ダッシュボード — {event.title}</h2>
      <div className="card">
        <h3>参加者一覧</h3>
        <ul>
          {event.participants.map(p=> (
            <li key={p.id}>{p.name} — {p.status} — PIN:{p.pin} — 席:{p.seat ?? '未'}</li>
          ))}
        </ul>
        <div className="card-actions">
          <button onClick={()=>navigate('auto-settings', { eventId: event.id })}>自動席割設定</button>
        </div>
      </div>
    </main>
  )
}

function AutoSettings({ navigate, params }){
  const { events } = useApp()
  const event = events.find(ev=>ev.id===params.eventId)
  const [tableSize, setTableSize] = useState(4)
  return (
    <main className="container">
      <h2>自動席割設定</h2>
      <div className="card">
        <label>1テーブルあたり人数<input type="number" value={tableSize} onChange={(e)=>setTableSize(Number(e.target.value))} /></label>
        <div className="card-actions">
          <button onClick={()=>navigate('auto-result', { eventId: event.id, tableSize })}>割当を実行</button>
        </div>
      </div>
    </main>
  )
}

function AutoResult({ navigate, params }){
  const { events, setEvents } = useApp()
  const { eventId, tableSize=4 } = params
  const event = events.find(ev=>ev.id===eventId)
  if(!event) return <div className="container"><p>イベントが見つかりません</p></div>

  // simple shuffle and assign
  const ppl = [...event.participants]
  for(let i=ppl.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1)); [ppl[i],ppl[j]]=[ppl[j],ppl[i]]
  }
  const assignments = {}
  ppl.forEach((p, idx)=>{
    const table = Math.floor(idx / tableSize) + 1
    assignments[p.id] = `T${table}-S${(idx%tableSize)+1}`
  })

  // apply assignments
  setEvents(events.map(ev=> ev.id===eventId ? {...ev, participants: ev.participants.map(p=> ({...p, seat: assignments[p.id]}))} : ev))

  return (
    <main className="container">
      <h2>自動席割結果</h2>
      <div className="card">
        <ul>
          {event.participants.map(p=> (
            <li key={p.id}>{p.name} — {assignments[p.id]}</li>
          ))}
        </ul>
        <div className="card-actions">
          <button onClick={()=>navigate('admin', { eventId })}>幹事画面へ</button>
        </div>
      </div>
    </main>
  )
}

export default function App(){
  const [events, setEvents] = useState(mock.events)
  const [page, setPage] = useState({ name: 'home', params: {} })

  function navigate(name, params={}){ setPage({ name, params }) }

  const ctx = { events, setEvents }

  return (
    <AppContext.Provider value={ctx}>
      <div className="app-root">
        <Nav onNavigate={(p)=>navigate(p)} />
        {page.name === 'home' && <Home navigate={(n,p)=>navigate(n,p)} />}
        {page.name === 'create' && <CreateEvent navigate={(n,p)=>navigate(n,p)} />}
        {page.name === 'rsvp' && <RSVP navigate={(n,p)=>navigate(n,p)} params={page.params} />}
        {page.name === 'pin-setup' && <PINSetup navigate={(n,p)=>navigate(n,p)} params={page.params} />}
        {page.name === 'rsvp-done' && <RSVPDone navigate={(n,p)=>navigate(n,p)} />}
        {page.name === 'day-access' && <DayAccess navigate={(n,p)=>navigate(n,p)} />}
        {page.name === 'day' && <DayPage navigate={(n,p)=>navigate(n,p)} params={page.params} />}
        {page.name === 'admin' && <AdminDashboard navigate={(n,p)=>navigate(n,p)} params={page.params} />}
        {page.name === 'auto-settings' && <AutoSettings navigate={(n,p)=>navigate(n,p)} params={page.params} />}
        {page.name === 'auto-result' && <AutoResult navigate={(n,p)=>navigate(n,p)} params={page.params} />}
      </div>
    </AppContext.Provider>
  )
}
