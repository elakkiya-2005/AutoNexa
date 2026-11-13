import {useState,useCallback} from 'react'
import {ReactFlow,Background,Controls,addEdge,useNodesState,useEdgesState} from '@xyflow/react'
const init=[{id:'1',type:'input',position:{x:80,y:80},data:{label:'Trigger: Webhook'}},{id:'2',position:{x:80,y:200},data:{label:'Action: Google Sheets (demo)'}}]
const palette=[['Trigger: Schedule','input'],['Trigger: Form Submission','input'],['Action: Gmail (demo)'],['Action: HTTP Request'],['Action: Send Notification'],['Condition: If / Else']]
export default function Builder(){
const saved=JSON.parse(localStorage.getItem('an_flow')||'null')
const[nodes,setNodes,onN]=useNodesState(saved?.nodes||init);const[edges,setEdges,onE]=useEdgesState(saved?.edges||[{id:'e1',source:'1',target:'2'}])
const[name,setName]=useState(saved?.name||'Untitled workflow');const[active,setActive]=useState(false);const[msg,setMsg]=useState('')
const onConnect=useCallback(c=>setEdges(e=>addEdge(c,e)),[])
const add=(label,type)=>setNodes(n=>[...n,{id:String(Date.now()),type,position:{x:260,y:60+n.length*50},data:{label}}])
const sel=nodes.find(n=>n.selected)
const save=()=>{localStorage.setItem('an_flow',JSON.stringify({name,nodes,edges}));setMsg('Saved to browser storage (demo).')}
const test=()=>{setNodes(n=>n.map(x=>({...x,data:{...x.data,label:x.data.label.replace(/ ✓$/,'')+' ✓'}})));setMsg('Test run simulated: all steps Success (demo, nothing was sent).')}
const del=()=>{if(sel&&confirm('Remove this step?')){setNodes(n=>n.filter(x=>x.id!==sel.id));setEdges(e=>e.filter(x=>x.source!==sel.id&&x.target!==sel.id))}}
return <div className="space-y-3"><div className="flex flex-wrap items-center gap-2">
<input className="input !w-64" value={name} onChange={e=>setName(e.target.value)} aria-label="Workflow name"/>
<button className="btn-ghost" onClick={save}>Save</button><button className="btn-ghost" onClick={test}>Test workflow</button>
<button className="btn-primary" onClick={()=>{setActive(!active);setMsg(active?'Deactivated.':'Activated (demo — no backend yet).')}}>{active?'Deactivate':'Activate'}</button>
{sel&&<button className="btn-ghost text-red-600" onClick={del}>Remove step</button>}{msg&&<span className="text-sm text-slate-500">{msg}</span>}</div>
<div className="grid gap-3 lg:grid-cols-[200px_1fr]"><div className="card space-y-1.5 p-3"><p className="text-xs font-medium text-slate-500">Add step</p>{palette.map(([l,t])=><button key={l} className="btn-ghost w-full !justify-start !py-1.5 text-xs" onClick={()=>add(l,t)}>{l}</button>)}</div>
<div className="card h-[520px] overflow-hidden"><ReactFlow nodes={nodes} edges={edges} onNodesChange={onN} onEdgesChange={onE} onConnect={onConnect} fitView><Background/><Controls/></ReactFlow></div></div></div>}
