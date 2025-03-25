
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User, BookOpen, Award, FileText, Calendar, Phone, Mail, Home, Edit, Save } from 'lucide-react';

const StudentProfile = () => {
  const { currentUser, isAuthenticated, isStudent } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profile data 
  const [profileData, setProfileData] = useState({
    name: 'Jane Doe',
    email: 'student@school.edu',
    phone: '(555) 123-4567',
    address: '123 Campus Drive, University City, CA 94102',
    bio: 'Passionate student majoring in Computer Science with interests in artificial intelligence and web development.',
    studentId: 'S12345',
    grade: '11',
    enrollmentDate: '2022-09-01',
    emergencyContact: 'John Doe (Father) - (555) 987-6543',
    gpa: '3.8'
  });

  // Form state for editing
  const [formData, setFormData] = useState({...profileData});

  // Mock achievements
  const achievements = [
    { id: 1, title: 'Honor Roll', date: '2023-05-15', description: 'Maintained a GPA above 3.5 for three consecutive semesters' },
    { id: 2, title: 'Science Fair Winner', date: '2023-02-10', description: 'First place in regional science fair for innovative technology project' },
    { id: 3, title: 'Perfect Attendance', date: '2022-12-20', description: 'Achieved perfect attendance for the entire semester' }
  ];

  // Mock enrolled courses
  const enrolledCourses = [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', grade: 'A' },
    { id: 2, code: 'MATH202', name: 'Advanced Calculus', instructor: 'Prof. Johnson', grade: 'B+' },
    { id: 3, code: 'ENG105', name: 'Creative Writing', instructor: 'Ms. Davis', grade: 'A-' },
    { id: 4, code: 'PHYS201', name: 'Physics II', instructor: 'Dr. Wilson', grade: 'B' }
  ];

  // Redirect if not authenticated or not a student
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isStudent) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setProfileData({...formData});
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-gray-500">Manage your personal information and view your academic progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={profileData.name} />
                  <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-gray-500">Student ID: {profileData.studentId}</p>
                  <Badge className="mt-2">Grade {profileData.grade}</Badge>
                </div>
                <div className="w-full border-t border-gray-200 my-2 pt-4">
                  <div className="flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <Home className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                    <span className="text-sm">{profileData.address}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your personal and academic details</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "outline" : "default"} 
                    size="sm" 
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="grade">Grade</Label>
                          <Input 
                            id="grade" 
                            name="grade" 
                            value={formData.grade} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="emergencyContact">Emergency Contact</Label>
                          <Input 
                            id="emergencyContact" 
                            name="emergencyContact" 
                            value={formData.emergencyContact} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            name="bio" 
                            rows={4} 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Personal Details</h3>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Full Name:</dt>
                              <dd>{profileData.name}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Email:</dt>
                              <dd>{profileData.email}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Phone:</dt>
                              <dd>{profileData.phone}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Address:</dt>
                              <dd>{profileData.address}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Emergency Contact:</dt>
                              <dd>{profileData.emergencyContact}</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Academic Details</h3>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Student ID:</dt>
                              <dd>{profileData.studentId}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Grade:</dt>
                              <dd>{profileData.grade}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">GPA:</dt>
                              <dd>{profileData.gpa}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Enrollment Date:</dt>
                              <dd>{new Date(profileData.enrollmentDate).toLocaleDateString()}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-2">Bio</h3>
                        <p className="text-gray-700">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Courses you are currently taking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div 
                        key={course.id} 
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg flex items-center">
                              <BookOpen className="h-5 w-5 mr-2 text-primary" />
                              {course.code}: {course.name}
                            </h3>
                            <p className="text-gray-500">Instructor: {course.instructor}</p>
                          </div>
                          <Badge variant={
                            course.grade.startsWith('A') ? "success" : 
                            course.grade.startsWith('B') ? "secondary" : 
                            "outline"
                          }>
                            Grade: {course.grade}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your academic and extracurricular accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{achievement.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
