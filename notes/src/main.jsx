import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Plus, Search, Pin, Trash2, CheckCircle2, Circle, LayoutDashboard, StickyNote, Columns3, Settings, Smartphone, Monitor, Cloud, GripVertical } from 'lucide-react'
import { supabase, hasSupabase } from './lib/supabase'
import './styles.css'

const seed = [
  { id:'1', title:'Finalizar página do cliente', content:'Revisar mobile, CTA e formulário.', color:'yellow', status:'doing', priority:'Alta', pinned:true, completed:false },
  { id:'2', title:'Ideia: automação de conteúdo', content:'Transformar notas em roteiro + checklist.', color:'blue', status:'ideas', priority:'Média', pinned:false, completed:false },
  { id:'3', title:'Comprar óleo do carro', content:'Confirmar especificação e filtro.', color:'red', status:'todo', priority:'Alta', pinned:true, completed:false },
  { id:'4', title:'Publicar vídeo curto', content:'Revisar legenda e hashtags.', color:'green', status:'done', priority:'Baixa', pinned:false, completed:true },
]

const columns = [
  ['ideas','Ideias'], ['todo','A fazer'], ['doing','Fazendo'], ['done','Concluído']
]

function useNotes(){
  const [notes,setNotes]=useState(()=>JSON.parse(localStorage.getItem('notebox-notes')||'null')||seed)
  const [loading,setLoading]=useState(false)

  useEffect(()=>localStorage.setItem('notebox-notes',JSON.stringify(notes)),[notes])

  useEffect(()=>{
    if(!hasSupabase) return
    let channel
    ;(async()=>{
      setLoading(true)
      const { data, error } = await supabase.from('notes').select('*').order('created_at',{ascending:true})
      if(!error && data?.length) setNotes(data.map(n=>({...n, color:n.color||'yellow'})))
      setLoading(false)
      channel = supabase.channel('notes-sync').on('postgres_changes',{event:'*',schema:'public',table:'notes'},async()=>{
        const { data } = await supabase.from('notes').select('*').order('created_at',{ascending:true})
        if(data) setNotes(data)
      }).subscribe()
    })()
    return ()=>{ if(channel) supabase.removeChannel(channel) }
  },[])

  const persist = async (next, changed) => {
    setNotes(next)
    if(hasSupabase && changed){
      const payload = {title:changed.title,content:changed.content,color:changed.color,status:changed.status,priority:changed.priority,pinned:changed.pinned,completed:changed.completed}
      await supabase.from('notes').upsert({id:changed.id,...payload})
    }
  }

  return {notes,setNotes:persist,loading}
}

function App(){
  const [session,setSession]=useState(null)
  const [authLoading,setAuthLoading]=useState(hasSupabase)
  useEffect(()=>{
    if(!hasSupabase) return
    supabase.auth.getSession().then(({data})=>{setSession(data.session);setAuthLoading(false)})
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{setSession(next);setAuthLoading(false)})
    return ()=>subscription.unsubscribe()
  },[])

  if(hasSupabase && authLoading) return <div className="auth-page"><div className="auth-card"><div className="logo big">N</div><h2>NoteBox</h2><p>Carregando sua área...</p></div></div>
  if(hasSupabase && !session) return <Auth/>

  return <Workspace/>
}

function Workspace(){
  const {notes,setNotes,loading}=useNotes()
  const [query,setQuery]=useState('')
  const [view,setView]=useState('board')
  const [widget,setWidget]=useState(false)
  const filtered=useMemo(()=>notes.filter(n=>(n.title+' '+(n.content||'')).toLowerCase().includes(query.toLowerCase())),[notes,query])

  const addNote=()=>{
    const n={id:crypto.randomUUID(),title:'Nova anotação',content:'Clique para editar...',color:'yellow',status:'todo',priority:'Média',pinned:false,completed:false}
    setNotes([...notes,n],n)
  }
  const patch=(id,p)=>{
    const next=notes.map(n=>n.id===id?{...n,...p}:n)
    setNotes(next,next.find(n=>n.id===id))
  }
  const remove=async(id)=>{
    setNotes(notes.filter(n=>n.id!==id))
    if(hasSupabase) await supabase.from('notes').delete().eq('id',id)
  }

  return <div className="app">
    <aside>
      <div className="brand"><div className="logo">N</div><div><b>NoteBox</b><small>workspace pessoal</small></div></div>
      <nav>
        <button className={view==='board'?'active':''} onClick={()=>setView('board')}><Columns3/>Quadro</button>
        <button className={view==='notes'?'active':''} onClick={()=>setView('notes')}><StickyNote/>Notas</button>
        <button onClick={()=>setWidget(!widget)}><Monitor/>Widget desktop</button>
        <button><LayoutDashboard/>Dashboard</button>
        <button><Settings/>Configurações</button>
      </nav>
      <div className="sync"><Cloud/><div><b>{hasSupabase?'Sincronização ativa':'Modo local'}</b><span>{hasSupabase?'Supabase conectado':'Configure .env para nuvem'}</span></div></div>
    </aside>

    <main>
      <header>
        <div><h1>Minhas notas</h1><p>{loading?'Sincronizando...':'Organize ideias e tarefas em qualquer dispositivo.'}</p></div>
        <div className="actions"><div className="search"><Search/><input placeholder="Pesquisar..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="primary" onClick={addNote}><Plus/>Nova nota</button></div>
      </header>

      <div className="device-row"><span><Monitor/>Desktop</span><span><Smartphone/>Mobile/PWA</span><span><Cloud/>Web sincronizada</span></div>

      {view==='board' ? <div className="board">
        {columns.map(([key,label])=><section className="column" key={key}>
          <div className="column-head"><b>{label}</b><span>{filtered.filter(n=>n.status===key).length}</span></div>
          <div className="stack">
            {filtered.filter(n=>n.status===key).map(n=><Card key={n.id} n={n} patch={patch} remove={remove}/>) }
            <button className="add-card" onClick={()=>{const n={id:crypto.randomUUID(),title:'Nova nota',content:'',color:'yellow',status:key,priority:'Média',pinned:false,completed:key==='done'};setNotes([...notes,n],n)}}><Plus/>Adicionar</button>
          </div>
        </section>)}
      </div> : <div className="notes-grid">{filtered.map(n=><Card key={n.id} n={n} patch={patch} remove={remove}/>)}</div>}
    </main>

    {widget && <div className="widget">
      <div className="widget-head"><span>📌 Hoje</span><button onClick={()=>setWidget(false)}>×</button></div>
      {notes.filter(n=>n.pinned&&!n.completed).slice(0,5).map(n=><label key={n.id}><input type="checkbox" checked={n.completed} onChange={e=>patch(n.id,{completed:e.target.checked,status:e.target.checked?'done':n.status})}/><span>{n.title}</span></label>)}
      <button className="widget-add" onClick={addNote}>+ Nova anotação</button>
    </div>}
  </div>
}

function Card({n,patch,remove}){
  return <article className={`card ${n.color}`}>
    <div className="card-top"><GripVertical className="drag"/><button onClick={()=>patch(n.id,{pinned:!n.pinned})} title="Fixar"><Pin className={n.pinned?'pin-on':''}/></button></div>
    <input className="title-edit" value={n.title} onChange={e=>patch(n.id,{title:e.target.value})}/>
    <textarea value={n.content||''} onChange={e=>patch(n.id,{content:e.target.value})}/>
    <div className="card-footer">
      <select value={n.status} onChange={e=>patch(n.id,{status:e.target.value,completed:e.target.value==='done'})}>{columns.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select>
      <button className="check" onClick={()=>patch(n.id,{completed:!n.completed,status:!n.completed?'done':'todo'})}>{n.completed?<CheckCircle2/>:<Circle/>}</button>
      <button className="trash" onClick={()=>remove(n.id)}><Trash2/></button>
    </div>
  </article>
}

function Auth(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [mode,setMode]=useState('login')
  const [message,setMessage]=useState('')
  const submit=async(e)=>{
    e.preventDefault(); setMessage('')
    const action=mode==='login'?supabase.auth.signInWithPassword({email,password}):supabase.auth.signUp({email,password})
    const {error}=await action
    if(error) setMessage(error.message)
    else if(mode==='signup') setMessage('Conta criada. Se a confirmação por e-mail estiver ativa, confirme o e-mail antes de entrar.')
  }
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><div className="logo big">N</div><h2>{mode==='login'?'Entrar no NoteBox':'Criar sua conta'}</h2><p>Suas notas ficam sincronizadas entre PC, web e celular.</p><input type="email" required placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" required minLength="6" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)}/>{message&&<div className="auth-message">{message}</div>}<button className="primary auth-submit" type="submit">{mode==='login'?'Entrar':'Criar conta'}</button><button type="button" className="auth-switch" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'Ainda não tenho conta':'Já tenho uma conta'}</button></form></div>
}

if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(()=>{})) }

createRoot(document.getElementById('root')).render(<App/>)
