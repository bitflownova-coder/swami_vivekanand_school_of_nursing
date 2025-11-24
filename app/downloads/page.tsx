'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, BookOpen, HelpCircle, Search, File, AlertCircle } from 'lucide-react';

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data - In a real app, this would come from an API
  const syllabi = [
    { id: 's1', semester: 'Semester 1', title: 'First Semester Syllabus', size: '2.3 MB', type: 'PDF', date: '2024-01-15' },
    { id: 's2', semester: 'Semester 2', title: 'Second Semester Syllabus', size: '2.1 MB', type: 'PDF', date: '2024-01-15' },
    { id: 's3', semester: 'Semester 3', title: 'Third Semester Syllabus', size: '2.5 MB', type: 'PDF', date: '2024-01-15' },
    { id: 's4', semester: 'Semester 4', title: 'Fourth Semester Syllabus', size: '2.2 MB', type: 'PDF', date: '2024-01-15' },
    { id: 's5', semester: 'Semester 5', title: 'Fifth Semester Syllabus', size: '2.4 MB', type: 'PDF', date: '2024-06-20' },
    { id: 's6', semester: 'Semester 6', title: 'Sixth Semester Syllabus', size: '2.3 MB', type: 'PDF', date: '2024-06-20' },
    { id: 's7', semester: 'Semester 7', title: 'Seventh Semester Syllabus', size: '2.1 MB', type: 'PDF', date: '2024-06-20' },
    { id: 's8', semester: 'Semester 8', title: 'Eighth Semester Syllabus', size: '1.9 MB', type: 'PDF', date: '2024-06-20' },
  ];

  const questionBanks = [
    { id: 'q1', semester: 'Semester 1', title: 'First Semester Question Bank', size: '1.8 MB', type: 'PDF', date: '2023-12-10' },
    { id: 'q2', semester: 'Semester 2', title: 'Second Semester Question Bank', size: '1.9 MB', type: 'PDF', date: '2023-12-10' },
    { id: 'q3', semester: 'Semester 3', title: 'Third Semester Question Bank', size: '2.1 MB', type: 'PDF', date: '2023-12-10' },
    { id: 'q4', semester: 'Semester 4', title: 'Fourth Semester Question Bank', size: '2.0 MB', type: 'PDF', date: '2023-12-10' },
  ];

  const otherResources = [
    { id: 'r1', title: 'Admission Form 2024-25', size: '1.2 MB', type: 'PDF', date: '2024-03-01', category: 'Forms' },
    { id: 'r2', title: 'Academic Calendar 2024', size: '0.8 MB', type: 'PDF', date: '2024-01-01', category: 'Calendar' },
    { id: 'r3', title: 'Student Handbook', size: '4.5 MB', type: 'PDF', date: '2023-08-15', category: 'Guide' },
    { id: 'r4', title: 'Scholarship Guidelines', size: '1.5 MB', type: 'PDF', date: '2023-09-10', category: 'Info' },
  ];

  // Filter function
  const filterFiles = (files: any[]) => {
    return files.filter(file => 
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (file.semester && file.semester.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const FileCard = ({ file, icon: Icon, colorClass }: { file: any, icon: any, colorClass: string }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 hover:-translate-y-1" style={{ borderLeftColor: colorClass }}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('border-', 'bg-').replace('text-', 'bg-')}`}>
            <Icon className={`h-6 w-6 ${colorClass.replace('border-', 'text-')}`} />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">{file.type}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">{file.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>{file.size}</span>
          <span>•</span>
          <span>{file.date}</span>
        </div>
        <Button className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-colors group-hover:border-blue-200">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );

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
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for files (e.g., 'Semester 1', 'Syllabus')..."
                className="pl-10 py-6 text-lg rounded-full shadow-lg border-0 text-gray-900 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
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
              <span className="font-medium">Comprehensive course content and learning objectives for all semesters.</span>
            </div>
            
            {filterFiles(syllabi).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterFiles(syllabi).map((file) => (
                  <FileCard key={file.id} file={file} icon={FileText} colorClass="border-blue-500" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No syllabus files found matching your search.</div>
            )}
          </TabsContent>

          {/* Question Banks Content */}
          <TabsContent value="question-banks" className="animate-fade-in">
            <div className="mb-6 flex items-center gap-2 text-green-800 bg-green-50 p-4 rounded-lg border border-green-100">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Previous year questions and practice sets for exam preparation.</span>
            </div>

            {filterFiles(questionBanks).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterFiles(questionBanks).map((file) => (
                  <FileCard key={file.id} file={file} icon={HelpCircle} colorClass="border-green-500" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No question banks found matching your search.</div>
            )}
          </TabsContent>

          {/* Other Resources Content */}
          <TabsContent value="resources" className="animate-fade-in">
            <div className="mb-6 flex items-center gap-2 text-purple-800 bg-purple-50 p-4 rounded-lg border border-purple-100">
              <File className="h-5 w-5" />
              <span className="font-medium">Administrative forms, handbooks, and academic schedules.</span>
            </div>

            {filterFiles(otherResources).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterFiles(otherResources).map((file) => (
                  <FileCard key={file.id} file={file} icon={File} colorClass="border-purple-500" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No resources found matching your search.</div>
            )}
          </TabsContent>
        </Tabs>

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