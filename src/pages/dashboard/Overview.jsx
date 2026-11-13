import {Link} from 'react-router-dom';import {modules} from '../../data/modules.js'
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid} from 'recharts'
const data=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>({d,runs:[12,19,8,24,17,6,10][i]}))
export default function Overview(){return <div className="space-y-6">
<div><h1 className="text-xl font-semibold">Welcome back</h1><p className="text-sm text-slate-500">All figures below are clearly demo data.</p></div>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Active workflows','3'],['Runs this week (demo)','96'],['Failed (demo)','4'],['Connected apps','0 of 7']].map(([a,b])=><div key={a} className="card p-4"><p className="text-xs text-slate-500">{a}</p><p className="mt-1 text-2xl font-semibold">{b}</p></div>)}</div>
<div className="card p-4"><h2 className="mb-3 text-sm font-medium">Executions (demo data)</h2><div className="h-60"><ResponsiveContainer><AreaChart data={data}><CartesianGrid stroke="#e2e8f0" vertical={false}/><XAxis dataKey="d"/><YAxis/><Tooltip/><Area dataKey="runs" stroke="#2563eb" fill="#dbeafe"/></AreaChart></ResponsiveContainer></div></div>
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{modules.map(m=><Link key={m.id} to={'/app/'+m.id} className="card flex items-center gap-3 p-3 hover:border-brand"><m.icon size={18} className="text-brand"/><span className="text-sm font-medium">{m.name}</span></Link>)}</div></div>}
