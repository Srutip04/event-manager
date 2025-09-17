// src/components/EventCard.jsx
import { Calendar, Clock, MapPin, Edit2, Trash2 } from "lucide-react";

export default function EventCard({ event, showActions = false, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="p-4 flex flex-col justify-between h-full">
        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{event.description}</p>
        </div>

        {/* Meta Info */}
        <div className="mt-3 text-sm text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Admin Actions */}
        {showActions && (
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => onEdit?.(event)}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => onDelete?.(event)}
              className="inline-flex items-center text-red-600 hover:text-red-800 text-sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
