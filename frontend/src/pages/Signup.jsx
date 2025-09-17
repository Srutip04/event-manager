import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"normal" });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    await api.post("/auth/signup", form);
    nav("/login");
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Signup</h1>
      <form onSubmit={submit} className="space-y-2">
        <input className="border p-2 w-full" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="border p-2 w-full" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="border p-2 w-full" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <select className="border p-2 w-full" onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="normal">Normal</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2">Signup</button>
      </form>
    </div>
  );
}
