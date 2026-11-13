import {useState} from 'react'
const all=[['Gmail','Email'],['Google Sheets','Productivity'],['Google Forms','Productivity'],['Webhooks','Developer'],['Slack','Messaging'],['Telegram','Messaging'],['HTTP Request','Developer']]
export default function Integrations(){const[q,setQ]=useState('');const[cat,setCat]=useState('All');const[on,setOn]=useState(()=>JSON.parse(localStorage.getItem('an_int')||'[]'))
const toggle=n=>{const x=on.includes(n)?on.filter(i=>i!==n):[...on,n];setOn(x);localStorage.setItem('an_int',JSON.stringify(x))}
const cats=['All',...new Set(all.map(a=>a[1]))]
const list=all.filter(([n,c])=>n.toLowerCase().includes(q.toLowerCase())&&(cat==='All'||c===cat))
return <div className="space-y-4"><div><h1 className="text-xl font-semibold">Integrations</h1><p className="text-sm text-slate-500">All connections are demo connections until the backend exists.</p></div>
<div className="flex flex-wrap gap-2"><input className="input max-w-xs" placeholder="Search integrations" value={q} onChange={e=>setQ(e.target.value)}/>{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`btn ${cat===c?'bg-brand text-white':'border border-slate-200 bg-white'}`}>{c}</button>)}</div>
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map(([n,c])=><div key={n} className="card p-4"><div className="flex justify-between"><h3 className="font-medium">{n}</h3><span className={`text-xs ${on.includes(n)?'text-green-700':'text-slate-400'}`}>{on.includes(n)?'Connected (demo)':'Not connected'}</span></div>
<p className="mt-1 text-xs text-slate-500">{c}</p><button className={on.includes(n)?'btn-ghost mt-3':'btn-primary mt-3'} onClick={()=>toggle(n)}>{on.includes(n)?'Disconnect':'Connect (demo)'}</button></div>)}</div>
{!list.length&&<p className="py-8 text-center text-sm text-slate-500">No integrations found.</p>}</div>}
