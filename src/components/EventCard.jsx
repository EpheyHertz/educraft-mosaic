
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // Parse event date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-primary/20">
      <div className="flex flex-col md:flex-row">
        {/* Calendar Date Display */}
        <div className="bg-primary text-white p-4 flex flex-col items-center justify-center md:w-24 md:h-auto">
          <span className="text-sm font-medium">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</span>
          <span className="text-3xl font-bold">{eventDate.getDate()}</span>
          <span className="text-sm">{eventDate.getFullYear()}</span>
        </div>
        
        {/* Event Content */}
        <div className="p-5 flex-1">
          <div className="mb-3">
            {event.category && (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                {event.category}
              </span>
            )}
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
              {event.title}
            </h3>
          </div>
          
          {/* Event Details */}
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-400" />
              <span>{event.location}</span>
            </div>
            {event.attendees && (
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-400" />
                <span>{event.attendees} attendees</span>
              </div>
            )}
          </div>
          
          {/* Event Description */}
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
          
          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end">
            <Link 
              to={`/events/${event.id}`}
              className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Event Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
