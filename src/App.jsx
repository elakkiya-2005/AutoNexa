import {Routes,Route,Navigate} from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx';import Landing from './pages/landing/Landing.jsx';import Auth from './pages/auth/Auth.jsx'
import Integrations from './pages/integrations/Integrations.jsx';import {Forgot,Reset,Verify} from './pages/auth/Extra.jsx';import {History,Settings,Help} from './pages/dashboard/Misc.jsx';import Overview from './pages/dashboard/Overview.jsx';import ModulePage from './pages/modules/ModulePage.jsx'
const Soon=({t})=><div className="card p-6"><h1 className="text-lg font-semibold">{t}</h1><p className="text-sm text-slate-500">Planned for the next frontend phase.</p></div>
export default function App(){return <Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Auth/>}/><Route path="/forgot-password" element={<Forgot/>}/><Route path="/reset-password" element={<Reset/>}/><Route path="/verify-email" element={<Verify/>}/><Route path="/register" element={<Auth mode="register"/>}/>
<Route path="/app" element={<AppLayout/>}><Route index element={<Overview/>}/><Route path="integrations" element={<Integrations/>}/><Route path="history" element={<History/>}/><Route path="settings" element={<Settings/>}/><Route path="help" element={<Help/>}/><Route path=":id" element={<ModulePage/>}/></Route>
<Route path="*" element={<Navigate to="/"/>}/></Routes>}
