import {useState} from 'react'
const types=['Text input','Email','Phone','Dropdown','Checkbox','Radio','Date']
const input=(f)=>{const c='input mt-1';switch(f.type){
case 'Email':return <input className={c} type="email"/>;case 'Phone':return <input className={c} type="tel"/>;case 'Date':return <input className={c} type="date"/>
case 'Dropdown':return <select className={c}><option>Option 1</option><option>Option 2</option></select>
case 'Checkbox':return <label className="mt-1 flex gap-2 text-sm"><input type="checkbox"/>Yes</label>
case 'Radio':return <div className="mt-1 flex gap-4 text-sm"><label><input type="radio" name={f.id}/> A</label><label><input type="radio" name={f.id}/> B</label></div>
default:return <input className={c}/>}}
export default function FormBuilder(){
const[fields,setFields]=useState([{id:'a',type:'Text input',label:'Full name'},{id:'b',type:'Email',label:'Email'}])
const[sel,setSel]=useState(null);const[preview,setPreview]=useState(false);const[subs,setSubs]=useState([]);const[drag,setDrag]=useState(null);const[msg,setMsg]=useState('')
const add=t=>setFields(f=>[...f,{id:String(Date.now()),type:t,label:t}])
const drop=i=>{if(drag===null||drag===i)return;const f=[...fields];const[x]=f.splice(drag,1);f.splice(i,0,x);setFields(f);setDrag(null)}
const cur=fields.find(f=>f.id===sel)
const submit=e=>{e.preventDefault();setSubs(s=>[...s,{n:s.length+1,at:new Date().toLocaleTimeString(),note:'Demo submission'}]);setMsg('Submitted (demo — stored in this page only).')}
return <div className="space-y-3"><div className="flex gap-2"><button className="btn-ghost" onClick={()=>setPreview(!preview)}>{preview?'Back to editor':'Preview form'}</button>
<span className="self-center text-sm text-slate-500">{subs.length} demo submission(s)</span>{msg&&<span className="self-center text-sm text-green-700">{msg}</span>}</div>
<div className="grid gap-3 lg:grid-cols-[180px_1fr_220px]">
<div className="card space-y-1.5 p-3"><p className="text-xs font-medium text-slate-500">Add field</p>{types.map(t=><button key={t} className="btn-ghost w-full !justify-start !py-1.5 text-xs" onClick={()=>add(t)}>{t}</button>)}</div>
<form onSubmit={submit} className="card space-y-3 p-4">{!fields.length&&<p className="py-8 text-center text-sm text-slate-500">No fields yet. Add one from the left.</p>}
{fields.map((f,i)=><div key={f.id} draggable={!preview} onDragStart={()=>setDrag(i)} onDragOver={e=>e.preventDefault()} onDrop={()=>drop(i)} onClick={()=>!preview&&setSel(f.id)}
className={`rounded-lg p-2 text-sm ${!preview?'cursor-grab border border-dashed':''} ${sel===f.id&&!preview?'border-brand bg-brand-soft':'border-slate-200'}`}><span className="font-medium">{f.label}</span>{input(f)}</div>)}
<button className="btn-primary" type="submit">Submit</button></form>
<div className="card p-3 text-sm"><p className="mb-2 text-xs font-medium text-slate-500">Field settings</p>{cur?<><label className="text-xs">Label<input className="input mt-1" value={cur.label} onChange={e=>setFields(fs=>fs.map(f=>f.id===cur.id?{...f,label:e.target.value}:f))}/></label>
<button className="btn-ghost mt-3 text-red-600" onClick={()=>{if(confirm('Remove field?')){setFields(fs=>fs.filter(f=>f.id!==cur.id));setSel(null)}}}>Remove field</button></>:<p className="text-slate-500">Select a field. Drag fields to reorder.</p>}</div></div>
{subs.length>0&&<div className="card p-4"><p className="mb-2 text-sm font-medium">Submissions (demo)</p><table className="w-full text-sm"><tbody>{subs.map(s=><tr key={s.n} className="border-t border-slate-100"><td className="py-1.5">#{s.n}</td><td>{s.at}</td><td>{s.note}</td></tr>)}</tbody></table></div>}</div>}
