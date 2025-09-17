import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(()=>{ api.get("/events").then(r=>setEvents(r.data)) },[]);
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Events</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {events.map(e=>(
          <div key={e.id} className="border p-4 rounded">
            <h2 className="text-xl">{e.title}</h2>
            <p>{e.date} {e.time}</p>
            <p>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
