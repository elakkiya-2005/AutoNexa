import {useState} from 'react'
const seed=[{id:'evt_1',path:'/hooks/demo-1',status:'Success',time:'Demo 10:02',headers:{'content-type':'application/json','user-agent':'demo-sender'},body:{event:'lead.created',email:'demo@example.com'}},
{id:'evt_2',path:'/hooks/demo-2',status:'Failed',time:'Demo 10:05',error:'Demo error: target returned 500',headers:{'content-type':'application/json'},body:{event:'order.paid',amount:0}},
{id:'evt_3',path:'/hooks/demo-1',status:'Pending',time:'Demo 10:09',headers:{'content-type':'application/json'},body:{event:'lead.updated'}}]
const color={Success:'bg-green-100 text-green-700',Failed:'bg-red-100 text-red-700',Pending:'bg-amber-100 text-amber-700'}
export default function Inspector(){const[ev,setEv]=useState(seed);const[sel,setSel]=useState(seed[1].id);const[f,setF]=useState('All');const[q,setQ]=useState('')
const cur=ev.find(e=>e.id===sel)
const retry=id=>{setEv(x=>x.map(e=>e.id===id?{...e,status:'Pending',error:null}:e));setTimeout(()=>setEv(x=>x.map(e=>e.id===id?{...e,status:'Success'}:e)),1200)}
const list=ev.filter(e=>(f==='All'||e.status===f)&&(e.path+e.id).includes(q))
return <div className="space-y-3"><p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Demo events only. Real webhook delivery needs the backend.</p>
<div className="grid gap-3 lg:grid-cols-[320px_1fr]"><div className="card p-3"><div className="mb-2 flex gap-2"><input className="input" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/><select className="input !w-28" value={f} onChange={e=>setF(e.target.value)}>{['All','Success','Failed','Pending'].map(s=><option key={s}>{s}</option>)}</select></div>
{list.map(e=><button key={e.id} onClick={()=>setSel(e.id)} className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${sel===e.id?'bg-brand-soft':'hover:bg-slate-50'}`}><span>{e.path}<br/><span className="text-xs text-slate-500">{e.time}</span></span><span className={`rounded-full px-2 py-0.5 text-xs ${color[e.status]}`}>{e.status}</span></button>)}
{!list.length&&<p className="py-6 text-center text-sm text-slate-500">No events match.</p>}</div>
{cur&&<div className="card space-y-3 p-4"><div className="flex items-center justify-between"><h2 className="font-semibold">{cur.id}</h2>{cur.status==='Failed'&&<button className="btn-primary" onClick={()=>retry(cur.id)}>Retry</button>}</div>
{cur.error&&<p className="rounded bg-red-50 p-2 text-sm text-red-700">{cur.error}</p>}
{[['Headers',cur.headers],['Body',cur.body]].map(([t,o])=><div key={t}><p className="mb-1 text-xs font-medium text-slate-500">{t}</p><pre className="overflow-x-auto rounded-lg bg-navy p-3 text-xs text-slate-100">{JSON.stringify(o,null,2)}</pre></div>)}</div>}</div></div>}
