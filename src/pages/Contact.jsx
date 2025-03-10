
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary" />
                  <span>123 Education Street, Academic City, ST 12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" />
                  <span>info@schoolname.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-primary" />
                  <span>Monday - Friday: 8:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
                <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            {/* Placeholder for Google Maps or custom map implementation */}
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
              Map View
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
