
import React, { useState } from 'react';
import { FileText, FolderOpen, Download, Share2, Search, Plus, Book, Video, Image, File, Grid, List, MoreVertical } from 'lucide-react';

const TeacherResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock resources data
  const resources = [
    {
      id: 1,
      title: 'Quadratic Functions Worksheet',
      type: 'document',
      format: 'PDF',
      size: '1.2 MB',
      subject: 'Advanced Mathematics',
      category: 'worksheets',
      dateUploaded: '2023-04-15',
      downloads: 45,
      icon: <FileText size={24} className="text-red-500" />
    },
    {
      id: 2,
      title: 'Algebra Fundamentals Slide Deck',
      type: 'presentation',
      format: 'PPTX',
      size: '5.8 MB',
      subject: 'Algebra II',
      category: 'presentations',
      dateUploaded: '2023-04-12',
      downloads: 32,
      icon: <Image size={24} className="text-indigo-500" />
    },
    {
      id: 3,
      title: 'Calculus Introduction Video',
      type: 'video',
      format: 'MP4',
      size: '45.3 MB',
      subject: 'Calculus',
      category: 'videos',
      dateUploaded: '2023-04-08',
      downloads: 78,
      icon: <Video size={24} className="text-blue-500" />
    },
    {
      id: 4,
      title: 'Math Formulas Cheat Sheet',
      type: 'document',
      format: 'PDF',
      size: '0.8 MB',
      subject: 'All Mathematics',
      category: 'reference',
      dateUploaded: '2023-04-05',
      downloads: 120,
      icon: <FileText size={24} className="text-red-500" />
    },
    {
      id: 5,
      title: 'Geometry Proofs Examples',
      type: 'document',
      format: 'DOCX',
      size: '1.5 MB',
      subject: 'Geometry',
      category: 'examples',
      dateUploaded: '2023-04-01',
      downloads: 28,
      icon: <File size={24} className="text-green-500" />
    },
    {
      id: 6,
      title: 'Statistics Data Analysis Project',
      type: 'spreadsheet',
      format: 'XLSX',
      size: '2.3 MB',
      subject: 'Statistics',
      category: 'projects',
      dateUploaded: '2023-03-28',
      downloads: 35,
      icon: <FileText size={24} className="text-emerald-500" />
    }
  ];
  
  // Resource categories
  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'worksheets', name: 'Worksheets', count: resources.filter(r => r.category === 'worksheets').length },
    { id: 'presentations', name: 'Presentations', count: resources.filter(r => r.category === 'presentations').length },
    { id: 'videos', name: 'Videos', count: resources.filter(r => r.category === 'videos').length },
    { id: 'reference', name: 'Reference Materials', count: resources.filter(r => r.category === 'reference').length },
    { id: 'examples', name: 'Examples', count: resources.filter(r => r.category === 'examples').length },
    { id: 'projects', name: 'Projects', count: resources.filter(r => r.category === 'projects').length }
  ];
  
  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Resource Library</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Plus size={18} />
            <span>Upload Resource</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories sidebar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-fit lg:col-span-1">
          <h3 className="font-medium mb-3">Categories</h3>
          <ul className="space-y-1">
            {categories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                    selectedCategory === category.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Resources list */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {resource.icon}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-medium text-sm truncate" title={resource.title}>
                        {resource.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {resource.format} • {resource.size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span>{resource.subject}</span>
                    <div className="flex items-center gap-3">
                      <button className="text-gray-500 hover:text-primary transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-primary transition-colors">
                        <Share2 size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredResources.map(resource => (
                    <tr key={resource.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {resource.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{resource.title}</div>
                            <div className="text-xs text-gray-500">{resource.dateUploaded}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{resource.format}</td>
                      <td className="px-4 py-3 text-sm">{resource.size}</td>
                      <td className="px-4 py-3 text-sm">{resource.subject}</td>
                      <td className="px-4 py-3 text-sm">{resource.downloads}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-primary transition-colors">
                            <Download size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-primary transition-colors">
                            <Share2 size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <FolderOpen size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-500">No resources found</h3>
              <p className="text-gray-400 mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherResourceLibrary;
