import {useState} from 'react'
const seed=[['run_101','Lead to Sheet','Success','Demo'],['run_102','Form alert','Failed','Demo error: step 2 timed out'],['run_103','Daily report','Pending','Demo'],['run_104','Lead to Sheet','Failed','Demo error: invalid token']]
const col={Success:'text-green-700',Failed:'text-red-700',Pending:'text-amber-700'}
export function History(){const[r,setR]=useState(seed);const[f,setF]=useState('All');const[open,setOpen]=useState(null)
const retry=id=>{setR(x=>x.map(y=>y[0]===id?[y[0],y[1],'Pending','Demo']:y));setTimeout(()=>setR(x=>x.map(y=>y[0]===id?[y[0],y[1],'Success','Demo']:y)),1200)}
return <div className="space-y-3"><h1 className="text-xl font-semibold">Execution History</h1><p className="text-sm text-slate-500">Demo runs only.</p>
<select className="input !w-36" value={f} onChange={e=>setF(e.target.value)}>{['All','Success','Failed','Pending'].map(s=><option key={s}>{s}</option>)}</select>
<div className="card divide-y divide-slate-100">{r.filter(x=>f==='All'||x[2]===f).map(x=><div key={x[0]} className="p-3 text-sm"><div className="flex items-center gap-3"><span className="w-20 text-slate-500">{x[0]}</span><span className="flex-1">{x[1]}</span><span className={col[x[2]]}>{x[2]}</span>
{x[2]==='Failed'&&<><button className="btn-ghost !py-1" onClick={()=>setOpen(open===x[0]?null:x[0])}>Details</button><button className="btn-primary !py-1" onClick={()=>retry(x[0])}>Retry</button></>}</div>{open===x[0]&&<p className="mt-2 rounded bg-red-50 p-2 text-red-700">{x[3]}</p>}</div>)}</div></div>}
export function Settings(){const[s,setS]=useState(()=>JSON.parse(localStorage.getItem('an_settings')||'{"name":"Demo User","ws":"Demo Workspace","mail":true}'));const[ok,setOk]=useState(false)
return <div className="card max-w-lg space-y-3 p-5"><h1 className="text-xl font-semibold">Settings</h1>
<label className="block text-sm">Display name<input className="input mt-1" value={s.name} onChange={e=>setS({...s,name:e.target.value})}/></label>
<label className="block text-sm">Workspace name<input className="input mt-1" value={s.ws} onChange={e=>setS({...s,ws:e.target.value})}/></label>
<label className="flex gap-2 text-sm"><input type="checkbox" checked={s.mail} onChange={e=>setS({...s,mail:e.target.checked})}/>Email notifications (demo preference)</label>
<button className="btn-primary" onClick={()=>{localStorage.setItem('an_settings',JSON.stringify(s));setOk(true)}}>Save</button>{ok&&<span className="ml-2 text-sm text-green-700">Saved</span>}</div>}
export function Help(){return <div className="max-w-2xl space-y-3"><h1 className="text-xl font-semibold">Help & Support</h1>
{[['How do I build a workflow?','Open AutoNexa Connect, choose Workflow Builder, add a trigger and actions, then test.'],['Are integrations real?','Not yet. All connections are demo until the backend is built.'],['Where is my data stored?','Demo data is kept in your browser localStorage only.']].map(([q,a])=><details key={q} className="card p-4"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2 text-sm text-slate-600">{a}</p></details>)}</div>}
