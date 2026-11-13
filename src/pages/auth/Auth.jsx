import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';import {Eye,EyeOff} from 'lucide-react'
export default function Auth({mode='login'}){const nav=useNavigate();const reg=mode==='register'
const[f,setF]=useState({name:'',email:'',password:''});const[show,setShow]=useState(false);const[err,setErr]=useState({})
const submit=e=>{e.preventDefault();const x={}
if(reg&&!f.name.trim())x.name='Name is required'
if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email address'
if(f.password.length<8)x.password='Password must be at least 8 characters'
setErr(x);if(!Object.keys(x).length){localStorage.setItem('an_user',f.email);nav(reg?'/verify-email':'/app')}}
const F=({k,label,type='text'})=><label className="mb-3 block text-sm font-medium">{label}<div className="relative"><input className="input mt-1" type={k==='password'&&show?'text':type} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/>
{k==='password'&&<button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-3.5 text-slate-400" aria-label="Toggle password">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button>}</div>{err[k]&&<span className="text-xs text-red-600">{err[k]}</span>}</label>
return <div className="grid min-h-screen place-items-center p-4"><form onSubmit={submit} className="card w-full max-w-sm p-6" noValidate>
<h1 className="mb-1 text-xl font-semibold">{reg?'Create your account':'Welcome back'}</h1><p className="mb-5 text-sm text-slate-500">Demo only — no account is created on a server.</p>
{reg&&F({k:'name',label:'Full name'})}{F({k:'email',label:'Email',type:'email'})}{F({k:'password',label:'Password',type:'password'})}
{!reg&&<label className="mb-4 flex items-center gap-2 text-sm"><input type="checkbox"/>Remember me</label>}
{!reg&&<Link to="/forgot-password" className="mb-3 block text-sm text-brand">Forgot password?</Link>}<button className="btn-primary w-full justify-center">{reg?'Create account':'Log in'}</button>
<p className="mt-4 text-center text-sm text-slate-500">{reg?<>Have an account? <Link className="text-brand" to="/login">Log in</Link></>:<>New here? <Link className="text-brand" to="/register">Get started</Link></>}</p></form></div>}
