import {useState,useEffect} from 'react';import {useParams} from 'react-router-dom';import {modules} from '../../data/modules.js';import Builder from '../connect/Builder.jsx';import FormBuilder from '../forms/FormBuilder.jsx';import Inbox from '../chat/Inbox.jsx';import Kanban from '../projects/Kanban.jsx';import Inspector from '../hook/Inspector.jsx'
export default function ModulePage(){const{id}=useParams();const m=modules.find(x=>x.id===id);const[tab,setTab]=useState(0);const[q,setQ]=useState('')
const key='an_rows_'+id;const[rows,setRows]=useState(()=>m?(JSON.parse(localStorage.getItem(key)||'null')||m.seed):[])
useEffect(()=>{setTab(0);if(m)setRows(JSON.parse(localStorage.getItem(key)||'null')||m.seed)},[id])
if(!m)return <p>Page not found.</p>
const add=()=>{const r=[...rows,m.cols.map((c,i)=>i===0?'New item (demo)':'—')];setRows(r);localStorage.setItem(key,JSON.stringify(r))}
const del=i=>{if(!confirm('Delete this demo row?'))return;const r=rows.filter((_,j)=>j!==i);setRows(r);localStorage.setItem(key,JSON.stringify(r))}
const builder=id==='connect'&&m.pages[tab]==='Workflow Builder'
const shown=rows.filter(r=>r.join(' ').toLowerCase().includes(q.toLowerCase()))
return <div className="space-y-4"><div><h1 className="text-xl font-semibold">{m.name}</h1><p className="text-sm text-slate-500">{m.blurb}</p></div>
<div className="flex gap-1 overflow-x-auto border-b border-slate-200">{m.pages.map((p,i)=><button key={p} onClick={()=>setTab(i)} className={`whitespace-nowrap px-3 py-2 text-sm ${tab===i?'border-b-2 border-brand font-medium text-brand':'text-slate-500'}`}>{p}</button>)}</div>
{builder?<Builder/>:id==='forms'&&m.pages[tab]==='Form Builder'?<FormBuilder/>:id==='chat'&&m.pages[tab]==='Conversations'?<Inbox/>:id==='projects'&&m.pages[tab]==='Kanban'?<Kanban/>:id==='hook'&&m.pages[tab]==='Request Inspector'?<Inspector/>:<div className="card p-4"><div className="mb-3 flex gap-2"><input className="input max-w-xs" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/><button className="btn-primary ml-auto" onClick={add}>New</button></div>
<div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-500"><tr>{m.cols.map(c=><th key={c} className="py-2 pr-4">{c}</th>)}<th/></tr></thead>
<tbody>{shown.map((r,i)=><tr key={i} className="border-t border-slate-100">{r.map((c,j)=><td key={j} className="py-2 pr-4">{c}</td>)}<td><button className="text-xs text-red-600" onClick={()=>del(i)}>Delete</button></td></tr>)}</tbody></table>
{!shown.length&&<p className="py-8 text-center text-sm text-slate-500">Nothing found.</p>}</div></div>}</div>}
