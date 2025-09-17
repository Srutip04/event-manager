import { useState } from "react";
import { api, setAuthToken } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await api.post("/auth/token", new URLSearchParams({
      username: form.email, password: form.password
    }), { headers: {"Content-Type":"application/x-www-form-urlencoded"} });
    localStorage.setItem("token", res.data.access_token);
    setAuthToken(res.data.access_token);
    nav("/");
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-2">
        <input className="border p-2 w-full" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="border p-2 w-full" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="bg-green-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}
