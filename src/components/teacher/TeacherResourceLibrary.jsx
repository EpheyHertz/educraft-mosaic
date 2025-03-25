
import React, { useState } from 'react';
import { FileText, FolderOpen, Download, Upload, Plus, Search, Filter, Grid, List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const TeacherResourceLibrary = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    subject: '',
    type: '',
    grade: '',
    file: null
  });

  // Sample data - would be from an API in a real app
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Algebra Worksheet Pack',
      description: 'Collection of worksheets covering algebra topics',
      subject: 'Mathematics',
      type: 'Worksheet',
      grade: '9th Grade',
      date: '2024-04-10',
      downloads: 45,
      fileType: 'pdf'
    },
    {
      id: 2,
      title: 'Cell Biology Presentation',
      description: 'Comprehensive slides for teaching cell structure and function',
      subject: 'Science',
      type: 'Presentation',
      grade: '10th Grade',
      date: '2024-03-22',
      downloads: 32,
      fileType: 'ppt'
    },
    {
      id: 3,
      title: 'World History Timeline',
      description: 'Visual timeline of major historical events',
      subject: 'History',
      type: 'Visual Aid',
      grade: '11th Grade',
      date: '2024-04-05',
      downloads: 28,
      fileType: 'pdf'
    },
    {
      id: 4,
      title: 'Grammar Exercises',
      description: 'Practice exercises for advanced grammar concepts',
      subject: 'English',
      type: 'Worksheet',
      grade: '10th Grade',
      date: '2024-04-15',
      downloads: 37,
      fileType: 'doc'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewResource(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewResource(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleUpload = () => {
    // In a real app, this would be an API call
    const fileType = newResource.file ? newResource.file.name.split('.').pop() : 'pdf';
    
    const resource = {
      id: resources.length + 1,
      ...newResource,
      date: new Date().toISOString().split('T')[0],
      downloads: 0,
      fileType
    };
    
    setResources([...resources, resource]);
    setUploadDialogOpen(false);
    toast.success('Resource uploaded successfully!');
    
    // Reset form
    setNewResource({
      title: '',
      description: '',
      subject: '',
      type: '',
      grade: '',
      file: null
    });
  };

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    return (
      (searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSubject === 'all' || resource.subject === selectedSubject) &&
      (selectedType === 'all' || resource.type === selectedType)
    );
  });

  // Get unique subjects and types for filters
  const subjects = ['all', ...new Set(resources.map(r => r.subject))];
  const types = ['all', ...new Set(resources.map(r => r.type))];

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-10 w-10 text-blue-500" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="h-10 w-10 text-orange-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resource Library</h2>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
              <DialogDescription>
                Share educational materials with your students and colleagues.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Resource Title</label>
                <Input 
                  name="title"
                  value={newResource.title}
                  onChange={handleInputChange}
                  placeholder="Grammar Worksheet Pack"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('subject', value)}
                    value={newResource.subject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Physical Education">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resource Type</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('type', value)}
                    value={newResource.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Worksheet">Worksheet</SelectItem>
                      <SelectItem value="Presentation">Presentation</SelectItem>
                      <SelectItem value="Visual Aid">Visual Aid</SelectItem>
                      <SelectItem value="Lesson Plan">Lesson Plan</SelectItem>
                      <SelectItem value="Quiz">Quiz/Test</SelectItem>
                      <SelectItem value="Reference">Reference Material</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade Level</label>
                <Select 
                  onValueChange={(value) => handleSelectChange('grade', value)}
                  value={newResource.grade}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                    <SelectItem value="All Grades">All Grades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  name="description"
                  value={newResource.description}
                  onChange={handleInputChange}
                  placeholder="A brief description of the resource..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">File Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <input
                    type="file"
                    id="resource-file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="resource-file" 
                    className="cursor-pointer block"
                  >
                    <Plus className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {newResource.file ? newResource.file.name : 'Click to select a file or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Supports PDF, DOCX, PPTX, etc. (Max 20MB)
                    </p>
                  </label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleUpload}>
                Upload Resource
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <Select 
            value={selectedSubject} 
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedType} 
            onValueChange={setSelectedType}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md overflow-hidden">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`} 
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Resources Display */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-8">
          <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {getFileIcon(resource.fileType)}
                <div className="ml-3">
                  <h3 className="font-medium text-lg">{resource.title}</h3>
                  <span className="text-xs text-gray-500">{resource.subject} • {resource.type}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Added: {new Date(resource.date).toLocaleDateString()}</span>
                <span>{resource.downloads} downloads</span>
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFileIcon(resource.fileType)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                        <div className="text-sm text-gray-500">{resource.subject}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(resource.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3">Edit</button>
                    <button className="text-primary hover:text-primary/80">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherResourceLibrary;
