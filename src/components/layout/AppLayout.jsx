import {useState} from 'react';import {NavLink,Outlet,Link} from 'react-router-dom'
import {LayoutDashboard,Plug,History,Settings,LifeBuoy,Search,Bell,Menu,X} from 'lucide-react'
import {modules} from '../../data/modules.js'
const item=({isActive})=>`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${isActive?'bg-brand-soft text-brand font-medium':'text-slate-600 hover:bg-slate-100'}`
export default function AppLayout(){const[open,setOpen]=useState(false);const[q,setQ]=useState('')
const links=[['/app','Overview',LayoutDashboard,true],...modules.map(m=>['/app/'+m.id,m.name,m.icon]),['/app/integrations','Integrations',Plug],['/app/history','Execution History',History],['/app/settings','Settings',Settings],['/app/help','Help & Support',LifeBuoy]]
return <div className="min-h-screen lg:pl-64">
<aside className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto border-r border-slate-200 bg-white p-3 transition-transform lg:translate-x-0 ${open?'':'-translate-x-full'}`}>
<Link to="/" className="mb-3 block px-3 py-2 text-lg font-bold">Auto<span className="text-brand">Nexa</span></Link>
<nav className="space-y-0.5">{links.map(([to,l,I,end])=><NavLink key={to} to={to} end={end} className={item} onClick={()=>setOpen(false)}><I size={16}/>{l}</NavLink>)}</nav></aside>
<header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-2.5 backdrop-blur">
<button className="lg:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
<select className="input !w-auto"><option>Demo Workspace</option><option>Personal</option></select>
<div className="relative max-w-sm flex-1"><Search size={14} className="absolute left-3 top-3 text-slate-400"/><input className="input pl-8" placeholder="Search products…" value={q} onChange={e=>setQ(e.target.value)}/>
{q&&<div className="card absolute mt-1 w-full p-1 shadow-lg">{modules.filter(m=>m.name.toLowerCase().includes(q.toLowerCase())).map(m=><Link key={m.id} to={'/app/'+m.id} onClick={()=>setQ('')} className="block rounded px-3 py-2 text-sm hover:bg-slate-50">{m.name}</Link>)}</div>}</div>
<button className="btn-ghost ml-auto !p-2" aria-label="Notifications" onClick={()=>alert('No notifications (demo)')}><Bell size={16}/></button>
<div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-white">DU</div></header>
<main className="p-4 lg:p-6"><Outlet/></main></div>}
