import {useState} from 'react'
const seed=[{id:1,name:'Demo Contact A',st:'Open',m:[['them','Hi, I need help (demo)']]},{id:2,name:'Demo Contact B',st:'Resolved',m:[['them','Thanks! (demo)']]},{id:3,name:'Demo Contact C',st:'Open',m:[['them','Pricing question (demo)']]}]
export default function Inbox(){const[c,setC]=useState(seed);const[sel,setSel]=useState(1);const[q,setQ]=useState('');const[f,setF]=useState('All');const[t,setT]=useState('')
const cur=c.find(x=>x.id===sel)
const send=e=>{e.preventDefault();if(!t.trim())return;setC(c.map(x=>x.id===sel?{...x,m:[...x.m,['me',t]]}:x));setT('')}
const list=c.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())&&(f==='All'||x.st===f))
return <div className="space-y-3"><p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Demo inbox. No real messages are sent; WhatsApp and other channels are not connected.</p>
<div className="grid gap-3 lg:grid-cols-[280px_1fr]"><div className="card p-3"><div className="mb-2 flex gap-2"><input className="input" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)}/><select className="input !w-28" value={f} onChange={e=>setF(e.target.value)}>{['All','Open','Resolved'].map(s=><option key={s}>{s}</option>)}</select></div>
{list.map(x=><button key={x.id} onClick={()=>setSel(x.id)} className={`mb-1 block w-full rounded-lg px-3 py-2 text-left text-sm ${sel===x.id?'bg-brand-soft':'hover:bg-slate-50'}`}>{x.name}<span className="block text-xs text-slate-500">{x.st}</span></button>)}{!list.length&&<p className="py-4 text-center text-sm text-slate-500">No conversations.</p>}</div>
{cur&&<div className="card flex h-[460px] flex-col p-3"><div className="mb-2 flex items-center justify-between"><b className="text-sm">{cur.name}</b><button className="btn-ghost !py-1" onClick={()=>setC(c.map(x=>x.id===sel?{...x,st:x.st==='Open'?'Resolved':'Open'}:x))}>Mark {cur.st==='Open'?'resolved':'open'}</button></div>
<div className="flex-1 space-y-2 overflow-y-auto">{cur.m.map(([w,x],i)=><div key={i} className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${w==='me'?'ml-auto bg-brand text-white':'bg-slate-100'}`}>{x}</div>)}</div>
<form onSubmit={send} className="mt-2 flex gap-2"><input className="input" placeholder="Type a reply (demo)" value={t} onChange={e=>setT(e.target.value)}/><button className="btn-primary">Send</button></form></div>}</div></div>}
