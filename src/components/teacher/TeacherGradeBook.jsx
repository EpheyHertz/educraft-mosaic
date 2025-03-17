
import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, CheckCircle, AlertCircle, Book, UserX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  teacherClasses, 
  gradeOptions, 
  getStudentsForClass, 
  studentsData 
} from '@/utils/classData';

const TeacherGradeBook = () => {
  const [selectedClass, setSelectedClass] = useState(teacherClasses[0]?.id || '');
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);
  const [gradeValue, setGradeValue] = useState('');
  const [showAtRiskOnly, setShowAtRiskOnly] = useState(false);
  
  useEffect(() => {
    if (selectedClass) {
      const className = teacherClasses.find(c => c.id === selectedClass)?.name || '';
      const classStudents = getStudentsForClass(className);
      setStudents(classStudents);
    } else {
      setStudents([]);
    }
  }, [selectedClass]);
  
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setEditingGrade(null);
  };
  
  const startEditGrade = (studentId, currentGrade) => {
    setEditingGrade(studentId);
    setGradeValue(currentGrade);
  };
  
  const saveGrade = (studentId) => {
    if (!gradeValue) {
      toast.error("Please select a grade");
      return;
    }
    
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, grade: gradeValue } 
        : student
    ));
    
    setEditingGrade(null);
    toast.success("Grade updated successfully!");
  };
  
  const cancelEdit = () => {
    setEditingGrade(null);
  };
  
  const exportGrades = () => {
    toast.success("Grades exported successfully!");
  };
  
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const isAtRisk = (student) => {
    return student.grade.startsWith('D') || student.grade === 'F' || student.attendance < 80;
  };
  
  const filteredStudents = students.filter(student => {
    // Filter by search term
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by at-risk status if enabled
    const matchesRisk = showAtRiskOnly ? isAtRisk(student) : true;
    
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gradebook</h2>
        <Button onClick={exportGrades} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Grades
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1" htmlFor="classSelect">
            Select Class
          </label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-md p-2"
          >
            {teacherClasses.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.grade})
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">
            Search Students
          </label>
          <div className="relative">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 flex items-end">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="atRiskFilter"
              checked={showAtRiskOnly}
              onChange={() => setShowAtRiskOnly(!showAtRiskOnly)}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label htmlFor="atRiskFilter" className="text-sm cursor-pointer flex items-center">
              <AlertCircle className="mr-1 h-4 w-4 text-orange-500" />
              Show at-risk students only
            </label>
          </div>
        </div>
      </div>
      
      {selectedClass ? (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Current Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {editingGrade === student.id ? (
                              <div className="flex justify-center items-center space-x-2">
                                <select
                                  value={gradeValue}
                                  onChange={(e) => setGradeValue(e.target.value)}
                                  className="border border-gray-200 dark:border-gray-700 rounded p-1 text-sm"
                                >
                                  <option value="">Select Grade</option>
                                  {gradeOptions.map(grade => (
                                    <option key={grade} value={grade}>{grade}</option>
                                  ))}
                                </select>
                                <Button 
                                  onClick={() => saveGrade(student.id)} 
                                  size="sm" 
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button 
                                  onClick={cancelEdit} 
                                  size="sm" 
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                >
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEditGrade(student.id, student.grade)}
                                className={`font-bold ${getGradeColor(student.grade)}`}
                              >
                                {student.grade}
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className={`font-medium ${student.attendance < 80 ? 'text-red-500' : 'text-green-500'}`}>
                              {student.attendance}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {isAtRisk(student) ? (
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                At Risk
                              </div>
                            ) : (
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Good Standing
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                          <UserX className="mx-auto h-8 w-8 mb-2" />
                          <p>No students found matching your criteria.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              Total Students: <span className="font-medium">{students.length}</span>
            </div>
            <div className="flex space-x-4">
              <div>
                <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-1"></span>
                A/B Grades: <span className="font-medium">
                  {students.filter(s => s.grade.startsWith('A') || s.grade.startsWith('B')).length}
                </span>
              </div>
              <div>
                <span className="inline-block h-3 w-3 rounded-full bg-yellow-500 mr-1"></span>
                C Grades: <span className="font-medium">
                  {students.filter(s => s.grade.startsWith('C')).length}
                </span>
              </div>
              <div>
                <span className="inline-block h-3 w-3 rounded-full bg-red-500 mr-1"></span>
                D/F Grades: <span className="font-medium">
                  {students.filter(s => s.grade.startsWith('D') || s.grade === 'F').length}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Book className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No class selected</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please select a class to view and manage student grades.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherGradeBook;
