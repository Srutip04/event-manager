import { useEffect, useState } from "react";
import { api, setAuthToken } from "../lib/api";
import { Calendar, Search, Plus, Filter, Trash2, Edit } from "lucide-react";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", image_url: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setAuthToken(t);
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await api.get("/events");
    setEvents(res.data);
    setFilteredEvents(res.data);
    setLoading(false);
  }

  async function add(e) {
    e.preventDefault();
    await api.post("/admin/events", form);
    setForm({ title: "", description: "", date: "", time: "", image_url: "" });
    load();
  }

  async function remove(id) {
    await api.delete(`/admin/events/${id}`);
    load();
  }

  // Filters
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter((event) => event.date === filterDate);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filterDate, events]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterDate("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
          <p className="text-gray-600">Create, edit, and manage your events</p>
        </div>
      </div>

      {/* Create Event Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-blue-600" /> Create New Event
        </h2>
        <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded-md"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-2 rounded-md"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded-md"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            className="border p-2 rounded-md"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <input
            className="border p-2 rounded-md md:col-span-2"
            placeholder="Image URL"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors md:col-span-2">
            Add Event
          </button>
        </form>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {(searchTerm || filterDate) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your filters or create a new event.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {ev.image_url && (
                <img src={ev.image_url} alt={ev.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{ev.description}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {ev.date} at {ev.time}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => alert("Edit functionality not yet implemented")}
                    className="flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => remove(ev.id)}
                    className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
