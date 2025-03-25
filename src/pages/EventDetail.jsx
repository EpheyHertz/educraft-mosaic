
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, Calendar as CalendarIcon, Save } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching event data
    const fetchEvent = () => {
      setTimeout(() => {
        setEvent({
          id,
          title: `School Event ${id}`,
          date: "2024-05-15",
          time: "10:00 AM",
          location: "Main Auditorium",
          description: "Join us for this exciting school event where students will showcase their talents and achievements. This event is open to all students, parents, and faculty members.",
          image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070",
          category: "Academic",
          organizer: "School Administration",
          attendees: 156,
          additionalInfo: "Please arrive 15 minutes before the event starts. Refreshments will be provided after the event."
        });
        setLoading(false);
      }, 800);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center py-10">Event not found</div>;
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Main Info */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {event.category && (
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {event.category}
                </span>
              )}
              <span className="text-sm text-gray-500">Organized by: {event.organizer}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span>{event.attendees} Attendees</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden mb-8 h-80 bg-gray-100">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>

          <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">About this event</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            
            {event.additionalInfo && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                <p className="text-gray-600">{event.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
              <div className="space-y-4">
                <button className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Add to Calendar
                </button>
                
                <button className="w-full border border-primary text-primary rounded-lg py-3 font-medium hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <Save className="mr-2 h-5 w-5" />
                  Save Event
                </button>
                
                <button className="w-full bg-gray-100 text-gray-700 rounded-lg py-3 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Event
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="bg-gray-100 rounded-lg h-40 mb-2 flex items-center justify-center text-gray-400">
                  Map placeholder
                </div>
                <p className="text-gray-600 text-sm">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
