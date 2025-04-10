
import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Calendar, Settings, Bell, Search, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState([
    { label: 'Total Students', value: '0', icon: Users },
    { label: 'Total Teachers', value: '0', icon: BookOpen },
    { label: 'Active Courses', value: '0', icon: Calendar },
  ]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch student count
        const { count: studentCount, error: studentError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'student');
          
        if (studentError) throw studentError;
        
        // Fetch teacher count
        const { count: teacherCount, error: teacherError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'teacher');
          
        if (teacherError) throw teacherError;
        
        // Fetch course count
        const { count: courseCount, error: courseError } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
          
        if (courseError) throw courseError;
        
        // Fetch recent activities
        const { data: recentActivities, error: activitiesError } = await supabase
          .from('enrollments')
          .select('created_at, student_id, profiles:student_id(first_name, last_name)')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (activitiesError) throw activitiesError;
        
        // Update stats
        setStats([
          { label: 'Total Students', value: studentCount.toString(), icon: Users },
          { label: 'Total Teachers', value: teacherCount.toString(), icon: BookOpen },
          { label: 'Active Courses', value: courseCount.toString(), icon: Calendar },
        ]);
        
        // Transform activities data
        const activities = recentActivities.map(activity => ({
          id: activity.student_id,
          title: 'New student enrollment',
          name: activity.profiles ? `${activity.profiles.first_name} ${activity.profiles.last_name}` : 'Unknown student',
          time: new Date(activity.created_at).toLocaleString()
        }));
        
        setActivities(activities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
            <button className="p-2 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            <button className="p-2">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="font-medium">{activity.title}: {activity.name}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No recent activities found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link 
                to="/admin/forms?tab=student"
                className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span>Add New Student</span>
              </Link>
              <Link 
                to="/admin/forms?tab=teacher"
                className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span>Add New Teacher</span>
              </Link>
              <Link 
                to="/admin/forms?tab=course"
                className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                <span>Create Course</span>
              </Link>
              <Link 
                to="/admin/forms?tab=event"
                className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                <span>Add Event</span>
              </Link>
              <button 
                className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Settings className="mr-2 h-5 w-5 text-primary" />
                <span>View Reports</span>
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link 
                to="/admin/forms"
                className="flex items-center justify-center w-full bg-primary text-white rounded-md px-4 py-2 mt-2 hover:bg-primary/90 transition-colors"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                All Management Forms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
