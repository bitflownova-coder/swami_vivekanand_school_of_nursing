'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, BookOpen, HelpCircle, Search, File, AlertCircle, X } from 'lucide-react';

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data
  const syllabi = [
    { id: 's1', year: 'First Year', title: 'First Year GNM Syllabus', size: '2.5 MB', type: 'PDF', date: '2024-01-15', category: 'Syllabus' },
    { id: 's2', year: 'Second Year', title: 'Second Year GNM Syllabus', size: '2.8 MB', type: 'PDF', date: '2024-01-15', category: 'Syllabus' },
    { id: 's3', year: 'Third Year', title: 'Third Year GNM Syllabus', size: '2.4 MB', type: 'PDF', date: '2024-01-15', category: 'Syllabus' },
    { id: 's4', year: 'Internship', title: 'Internship Guidelines & Logbook', size: '1.5 MB', type: 'PDF', date: '2024-01-15', category: 'Syllabus' },
  ];

  const questionBanks = [
    { id: 'q1', year: 'First Year', title: 'First Year Question Bank', size: '4.2 MB', type: 'PDF', date: '2023-12-10', category: 'Question Bank' },
    { id: 'q2', year: 'Second Year', title: 'Second Year Question Bank', size: '4.5 MB', type: 'PDF', date: '2023-12-10', category: 'Question Bank' },
    { id: 'q3', year: 'Third Year', title: 'Third Year Question Bank', size: '4.1 MB', type: 'PDF', date: '2023-12-10', category: 'Question Bank' },
  ];

  const otherResources = [
    { id: 'r1', title: 'Admission Form 2024-25', size: '1.2 MB', type: 'PDF', date: '2024-03-01', category: 'Forms' },
    { id: 'r2', title: 'Academic Calendar 2024', size: '0.8 MB', type: 'PDF', date: '2024-01-01', category: 'Calendar' },
    { id: 'r3', title: 'Student Handbook', size: '4.5 MB', type: 'PDF', date: '2023-08-15', category: 'Guide' },
    { id: 'r4', title: 'Scholarship Guidelines', size: '1.5 MB', type: 'PDF', date: '2023-09-10', category: 'Info' },
  ];

  // Combine all files for global search
  const allFiles = [...syllabi, ...questionBanks, ...otherResources];

  // Global Filter Function
  const filteredFiles = allFiles.filter(file => 
    file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (file.year && file.year.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (file.category && file.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper to determine icon and color based on file type/category
  const getFileStyle = (file: any) => {
    if (syllabi.find(s => s.id === file.id)) return { icon: FileText, colorClass: 'border-blue-500' };
    if (questionBanks.find(q => q.id === file.id)) return { icon: HelpCircle, colorClass: 'border-green-500' };
    return { icon: File, colorClass: 'border-purple-500' };
  };

  const FileCard = ({ file }: { file: any }) => {
    const { icon: Icon, colorClass } = getFileStyle(file);
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 hover:-translate-y-1 bg-white" style={{ borderLeftColor: colorClass.replace('border-', 'var(--') }}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('border-', 'bg-').replace('text-', 'bg-')}`}>
              <Icon className={`h-6 w-6 ${colorClass.replace('border-', 'text-')}`} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">{file.type}</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">{file.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="font-medium text-blue-600">{file.year || file.category}</span>
            <span>•</span>
            <span>{file.size}</span>
          </div>
          <Button className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-colors group-hover:border-blue-200">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Resources</h1>
            <p className="text-xl text-blue-100 mb-8 font-light">
              Access all your academic materials, syllabi, and forms in one place.
            </p>
            
            {/* Global Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for anything (e.g., 'First Year', 'Admission Form')..."
                className="pl-10 pr-10 py-6 text-lg rounded-full shadow-lg border-0 text-gray-900 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        
        {/* Conditional Rendering: Search Results vs Tabs */}
        {searchQuery ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
              <span className="text-sm text-gray-500">Found {filteredFiles.length} items</span>
            </div>
            
            {filteredFiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFiles.map((file) => (
                  <FileCard key={file.id} file={file} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms.</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 mt-2"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Default Tabs View */
          <Tabs defaultValue="syllabus" className="w-full space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto bg-white p-1 shadow-md rounded-full h-auto">
              <TabsTrigger value="syllabus" className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Syllabus
              </TabsTrigger>
              <TabsTrigger value="question-banks" className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Question Banks
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Other Resources
              </TabsTrigger>
            </TabsList>

            {/* Syllabus Content */}
            <TabsContent value="syllabus" className="animate-fade-in">
              <div className="mb-6 flex items-center gap-2 text-blue-800 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Detailed curriculum and course content for all academic years.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {syllabi.map((file) => <FileCard key={file.id} file={file} />)}
              </div>
            </TabsContent>

            {/* Question Banks Content */}
            <TabsContent value="question-banks" className="animate-fade-in">
              <div className="mb-6 flex items-center gap-2 text-green-800 bg-green-50 p-4 rounded-lg border border-green-100">
                <HelpCircle className="h-5 w-5" />
                <span className="font-medium">Previous year questions and practice sets for First, Second, and Third Year.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {questionBanks.map((file) => <FileCard key={file.id} file={file} />)}
              </div>
            </TabsContent>

            {/* Other Resources Content */}
            <TabsContent value="resources" className="animate-fade-in">
              <div className="mb-6 flex items-center gap-2 text-purple-800 bg-purple-50 p-4 rounded-lg border border-purple-100">
                <File className="h-5 w-5" />
                <span className="font-medium">Administrative forms, handbooks, and academic schedules.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherResources.map((file) => <FileCard key={file.id} file={file} />)}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Download Guidelines */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-yellow-100 p-3 rounded-full shrink-0">
              <AlertCircle className="h-8 w-8 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-900 mb-3">Important Download Instructions</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-yellow-800/80 text-sm list-disc pl-4">
                <li>All documents are provided in PDF format. Ensure you have a PDF reader installed.</li>
                <li>Files are regularly updated. Always check for the latest version before exams.</li>
                <li>If a download fails, try refreshing the page or clearing your browser cache.</li>
                <li>For access to restricted files, please log in to the student portal.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}