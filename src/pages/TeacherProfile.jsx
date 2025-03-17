
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  User, Mail, Phone, Award, Calendar, 
  BookOpen, FileEdit, Save, X, Upload 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const TeacherProfile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock teacher data - in a real app, fetch based on ID
  const [teacher, setTeacher] = useState({
    id: id || '1',
    name: 'Dr. John Smith',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    subject: 'Mathematics',
    department: 'Science & Mathematics',
    email: 'john.smith@eduproacademy.edu',
    phone: '(555) 123-4567',
    office: 'Building A, Room 204',
    officeHours: 'Monday & Wednesday: 2:00 PM - 4:00 PM',
    education: [
      { degree: 'Ph.D. in Mathematics', institution: 'Stanford University', year: '2010' },
      { degree: 'M.Sc. in Applied Mathematics', institution: 'MIT', year: '2005' },
      { degree: 'B.Sc. in Mathematics', institution: 'UCLA', year: '2003' }
    ],
    bio: 'Dr. Smith has been teaching mathematics for over 15 years. He specializes in calculus and advanced algebra, with research interests in numerical analysis and computational mathematics. He has published numerous papers in leading mathematics journals and has received multiple teaching excellence awards throughout his career.',
    classes: [
      { id: 1, name: 'Algebra II', grade: '10th Grade', students: 28, schedule: 'MWF 8:30 AM - 9:45 AM' },
      { id: 2, name: 'Advanced Mathematics', grade: '11th Grade', students: 24, schedule: 'MWF 10:30 AM - 11:45 AM' },
      { id: 3, name: 'Calculus', grade: '12th Grade', students: 22, schedule: 'TTh 1:00 PM - 2:15 PM' },
      { id: 4, name: 'Pre-Algebra', grade: '9th Grade', students: 32, schedule: 'TTh 2:30 PM - 3:45 PM' }
    ],
    publications: [
      { title: 'Novel Approaches to Teaching Calculus in High School Settings', journal: 'Mathematics Education Journal', year: '2018' },
      { title: 'Bridging the Gap: From Basic Algebra to Advanced Mathematics', journal: 'Education Review', year: '2016' }
    ],
    awards: [
      { name: 'Teacher of the Year', issuer: 'EduPro Academy', year: '2021' },
      { name: 'Excellence in Mathematics Education', issuer: 'National Education Board', year: '2019' }
    ]
  });
  
  const [formData, setFormData] = useState(teacher);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setTeacher(formData);
    setIsEditing(false);
    // In a real app, send to API here
  };
  
  const handleCancel = () => {
    setFormData(teacher);
    setIsEditing(false);
  };
  
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20">
                  <img 
                    src={teacher.avatar} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
                      <Upload size={18} />
                    </Button>
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-center">{teacher.name}</h1>
              <p className="text-gray-600 mb-2">{teacher.subject} Teacher</p>
              <p className="text-gray-500 mb-4">{teacher.department}</p>
              
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2">
                  <FileEdit size={16} /> Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSubmit} className="flex items-center gap-1">
                    <Save size={16} /> Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
                    <X size={16} /> Cancel
                  </Button>
                </div>
              )}
              
              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Award size={16} className="mt-1 flex-shrink-0" />
                  <span>{teacher.officeHours}</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                  <TabsTrigger value="publications">Publications & Awards</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Biography</h2>
                      {!isEditing ? (
                        <p className="text-gray-700">{teacher.bio}</p>
                      ) : (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full h-40 p-3 border rounded-md"
                        />
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Education</h2>
                      <div className="space-y-4">
                        {teacher.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4">
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-gray-600">{edu.institution}, {edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="classes">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Current Classes</h2>
                      <div className="space-y-4">
                        {teacher.classes.map(cls => (
                          <div key={cls.id} className="p-4 border rounded-md hover:border-primary/40 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="font-medium text-lg">{cls.name}</h3>
                                <p className="text-sm text-gray-600">{cls.grade} • {cls.students} students</p>
                              </div>
                              <div className="mt-2 md:mt-0 flex items-center gap-2 text-gray-600">
                                <Calendar size={16} />
                                <span>{cls.schedule}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="publications">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Publications</h2>
                        <div className="space-y-4">
                          {teacher.publications.map((pub, index) => (
                            <div key={index} className="p-4 border rounded-md">
                              <h3 className="font-medium">{pub.title}</h3>
                              <p className="text-sm text-gray-600">{pub.journal}, {pub.year}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Awards & Recognition</h2>
                        <div className="space-y-4">
                          {teacher.awards.map((award, index) => (
                            <div key={index} className="flex gap-3 p-4 border rounded-md">
                              <Award className="text-primary" size={24} />
                              <div>
                                <h3 className="font-medium">{award.name}</h3>
                                <p className="text-sm text-gray-600">{award.issuer}, {award.year}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
