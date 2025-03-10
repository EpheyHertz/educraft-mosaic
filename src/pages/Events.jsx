
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import EventCard from '../components/EventCard';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Annual Science Fair",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Main Auditorium",
      description: "Showcase of student science projects"
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: "2024-03-20",
      time: "2:00 PM",
      location: "Multiple Classrooms",
      description: "Quarterly meeting with parents"
    },
    // Add more events as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">School Events</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <Calendar mode="single" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Events;
