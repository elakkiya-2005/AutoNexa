import {Link} from 'react-router-dom';import {modules} from '../../data/modules.js'
export default function Landing(){return <div className="bg-white">
<header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><span className="text-lg font-bold">Auto<span className="text-brand">Nexa</span></span>
<nav className="hidden gap-6 text-sm text-slate-600 md:flex"><a href="#products">Products</a><a href="#how">How it works</a><a href="#faq">FAQ</a></nav>
<div className="flex gap-2"><Link to="/login" className="btn-ghost">Login</Link><Link to="/register" className="btn-primary">Get Started Free</Link></div></header>
<section className="mx-auto max-w-4xl px-4 py-16 text-center"><p className="text-sm font-medium text-accent">Connect. Automate. Grow.</p>
<h1 className="mt-3 text-4xl font-bold tracking-tight">Automate Your Business. Simplify Your Work.</h1>
<p className="mx-auto mt-4 max-w-2xl text-slate-600">Connect your favorite applications, automate repetitive tasks and manage your business from one simple platform.</p>
<div className="mt-7 flex justify-center gap-3"><Link to="/register" className="btn-primary">Get Started Free</Link><a href="#products" className="btn-ghost">Explore Products</a></div></section>
<section id="products" className="mx-auto max-w-6xl px-4 pb-14"><h2 className="mb-6 text-2xl font-semibold">Nine products, one account</h2>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{modules.map(m=><Link to={'/app/'+m.id} key={m.id} className="card p-5 transition hover:border-brand"><m.icon className="text-brand" size={20}/><h3 className="mt-3 font-semibold">{m.name}</h3><p className="mt-1 text-sm text-slate-600">{m.blurb}</p></Link>)}</div></section>
<section id="how" className="bg-slate-50 py-14"><div className="mx-auto max-w-6xl px-4"><h2 className="mb-6 text-2xl font-semibold">How AutoNexa works</h2>
<div className="grid gap-4 md:grid-cols-4">{['Create a workflow','Choose a trigger','Add actions','Test and activate'].map((t,i)=><div key={t} className="card p-5"><span className="text-xs text-accent">Step {i+1}</span><p className="mt-1 font-medium">{t}</p></div>)}</div></div></section>
<section id="faq" className="mx-auto max-w-3xl px-4 py-14"><h2 className="mb-4 text-2xl font-semibold">FAQ</h2>
{[['Is this connected to real services?','Not yet. This is a frontend-only demo; integrations are labelled as demo.'],['Are payments or emails real?','No. Backend and provider integrations come later.']].map(([q,a])=><details key={q} className="card mb-2 p-4"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2 text-sm text-slate-600">{a}</p></details>)}</section>
<footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">© AutoNexa</footer></div>}
