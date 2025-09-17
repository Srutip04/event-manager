import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Search, Calendar, Filter } from "lucide-react";
import EventCard from "../components/EventCard"; // make sure you have EventCard component

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    // Fetch events from API
    async function load() {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter((event) => event.date === filterDate);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, filterDate]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDateFilterChange = (e) => setFilterDate(e.target.value);
  const clearFilters = () => {
    setSearchTerm("");
    setFilterDate("");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-gray-600">Discover exciting events happening around you</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={filterDate}
                onChange={handleDateFilterChange}
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

        {/* Active filters display */}
        {(searchTerm || filterDate) && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                Search: "{searchTerm}"
              </span>
            )}
            {filterDate && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                Date: {new Date(filterDate).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {searchTerm || filterDate
              ? "Try adjusting your search criteria"
              : "There are no events available at the moment."}
          </p>
          {(searchTerm || filterDate) && (
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} showActions={false} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
