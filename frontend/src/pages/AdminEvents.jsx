import { useEffect, useState } from "react";
import { api, setAuthToken } from "../lib/api";

export default function AdminEvents() {
  const [events,setEvents]=useState([]);
  const [form,setForm]=useState({title:"",description:"",date:"",time:""});
  useEffect(()=>{
    const t = localStorage.getItem("token");
    if (t) setAuthToken(t);
    load();
  },[]);
  async function load(){ setEvents((await api.get("/events")).data) }
  async function add(e){ e.preventDefault(); await api.post("/admin/events",form); load(); }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin Event Management</h1>
      <form onSubmit={add} className="space-y-2 mb-4">
        <input className="border p-2 w-full" placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})}/>
        <input className="border p-2 w-full" placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})}/>
        <input type="date" className="border p-2 w-full" onChange={e=>setForm({...form,date:e.target.value})}/>
        <input type="time" className="border p-2 w-full" onChange={e=>setForm({...form,time:e.target.value})}/>
        <button className="bg-blue-600 text-white px-4 py-2">Add Event</button>
      </form>
      <ul>
        {events.map(ev=>(
          <li key={ev.id} className="border p-2 my-2">{ev.title}</li>
        ))}
      </ul>
    </div>
  );
}
