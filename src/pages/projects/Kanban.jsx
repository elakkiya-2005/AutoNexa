import {useState,useEffect} from 'react'
const cols=['To do','In progress','Done'];const pri={High:'bg-red-100 text-red-700',Medium:'bg-amber-100 text-amber-700',Low:'bg-slate-100 text-slate-600'}
const seed=[{id:'1',t:'Design review',c:'To do',p:'High',who:'Demo User',due:''},{id:'2',t:'Write docs',c:'In progress',p:'Low',who:'Demo User',due:''},{id:'3',t:'Set up project',c:'Done',p:'Medium',who:'Demo User',due:''}]
export default function Kanban(){
const[tasks,setTasks]=useState(()=>JSON.parse(localStorage.getItem('an_kanban')||'null')||seed);const[drag,setDrag]=useState(null);const[q,setQ]=useState('');const[pf,setPf]=useState('All');const[n,setN]=useState({t:'',p:'Medium',who:'Demo User',due:''});const[err,setErr]=useState('')
useEffect(()=>localStorage.setItem('an_kanban',JSON.stringify(tasks)),[tasks])
const add=e=>{e.preventDefault();if(!n.t.trim())return setErr('Task title is required');setErr('');setTasks(t=>[...t,{...n,id:String(Date.now()),c:'To do'}]);setN({...n,t:''})}
const drop=c=>{if(drag){setTasks(t=>t.map(x=>x.id===drag?{...x,c}:x));setDrag(null)}}
const shown=tasks.filter(t=>t.t.toLowerCase().includes(q.toLowerCase())&&(pf==='All'||t.p===pf))
const pct=tasks.length?Math.round(tasks.filter(t=>t.c==='Done').length/tasks.length*100):0
return <div className="space-y-3">
<form onSubmit={add} className="card flex flex-wrap items-start gap-2 p-3"><div><input className="input" placeholder="New task title" value={n.t} onChange={e=>setN({...n,t:e.target.value})}/>{err&&<span className="text-xs text-red-600">{err}</span>}</div>
<select className="input !w-28" value={n.p} onChange={e=>setN({...n,p:e.target.value})}>{Object.keys(pri).map(p=><option key={p}>{p}</option>)}</select>
<input className="input !w-40" value={n.who} onChange={e=>setN({...n,who:e.target.value})} aria-label="Assignee"/><input type="date" className="input !w-40" value={n.due} onChange={e=>setN({...n,due:e.target.value})}/><button className="btn-primary">Add task</button></form>
<div className="flex flex-wrap items-center gap-2"><input className="input max-w-xs" placeholder="Search tasks" value={q} onChange={e=>setQ(e.target.value)}/><select className="input !w-32" value={pf} onChange={e=>setPf(e.target.value)}>{['All',...Object.keys(pri)].map(p=><option key={p}>{p}</option>)}</select>
<div className="ml-auto flex items-center gap-2 text-sm"><span>Progress {pct}%</span><div className="h-2 w-32 rounded bg-slate-200"><div className="h-2 rounded bg-brand" style={{width:pct+'%'}}/></div></div></div>
<div className="grid gap-3 md:grid-cols-3">{cols.map(c=><div key={c} onDragOver={e=>e.preventDefault()} onDrop={()=>drop(c)} className="min-h-[200px] rounded-xl bg-slate-100 p-3"><p className="mb-2 text-sm font-medium">{c} <span className="text-slate-400">{shown.filter(t=>t.c===c).length}</span></p>
{shown.filter(t=>t.c===c).map(t=><div key={t.id} draggable onDragStart={()=>setDrag(t.id)} className="card mb-2 cursor-grab p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{t.t}</span><button className="text-xs text-red-600" onClick={()=>confirm('Delete task?')&&setTasks(x=>x.filter(y=>y.id!==t.id))}>Delete</button></div>
<div className="mt-2 flex items-center gap-2 text-xs"><span className={`rounded-full px-2 py-0.5 ${pri[t.p]}`}>{t.p}</span><span className="text-slate-500">{t.who}{t.due&&' · '+t.due}</span></div></div>)}</div>)}</div></div>}
