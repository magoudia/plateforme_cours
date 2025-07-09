import React, { useState } from 'react';
import { ChevronDown, ChevronRight, PlayCircle, FileText, HelpCircle, Lock, CheckCircle, Clock } from 'lucide-react';
import { Module, Lesson, Course } from '../../types';
import { useProgress } from '../../contexts/ProgressContext';

interface CourseModulesProps {
  course: Course;
  onLessonSelect: (lesson: Lesson) => void;
  currentLessonId?: string;
}

const CourseModules: React.FC<CourseModulesProps> = ({ course, onLessonSelect, currentLessonId }) => {
  const { getLessonProgress, isLessonLocked, calculateModuleProgress } = useProgress();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'text':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4 text-purple-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'exercise':
        return <HelpCircle className="h-4 w-4 text-red-500" />;
      default:
        return <PlayCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLessonStatus = (lesson: Lesson) => {
    const isCompleted = getLessonProgress(course.id, lesson.id);
    const isLocked = isLessonLocked(course.id, lesson.id, course.lessons);
    const isCurrent = currentLessonId === lesson.id;

    if (isCompleted) {
      return { icon: <CheckCircle className="h-4 w-4 text-green-500" />, className: 'text-green-600' };
    } else if (isLocked) {
      return { icon: <Lock className="h-4 w-4 text-gray-400" />, className: 'text-gray-400' };
    } else if (isCurrent) {
      return { icon: <PlayCircle className="h-4 w-4 text-blue-500" />, className: 'text-blue-600 font-medium' };
    } else {
      return { icon: <Clock className="h-4 w-4 text-gray-400" />, className: 'text-gray-600' };
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    const isLocked = isLessonLocked(course.id, lesson.id, course.lessons);
    if (!isLocked) {
      onLessonSelect(lesson);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Contenu du cours</h3>
        <p className="text-sm text-gray-600 mt-1">
          {course.totalModules} modules • {course.totalLessons} leçons
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {course.modules.map((module) => {
          const moduleProgress = calculateModuleProgress(course.id, module.id, course.lessons);
          const isExpanded = expandedModules.has(module.id);
          const completedLessons = module.lessons.filter(lesson => 
            getLessonProgress(course.id, lesson.id)
          ).length;

          return (
            <div key={module.id} className="bg-white">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-500">
                    {completedLessons}/{module.lessons.length} leçons
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{moduleProgress}%</span>
                  </div>
                </div>
              </button>

              {/* Module Lessons */}
              {isExpanded && (
                <div className="px-6 pb-4">
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => {
                      const status = getLessonStatus(lesson);
                      const isLocked = isLessonLocked(course.id, lesson.id, course.lessons);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson)}
                          disabled={isLocked}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                            isLocked
                              ? 'cursor-not-allowed opacity-50'
                              : 'hover:bg-gray-50 cursor-pointer'
                          } ${status.className}`}
                        >
                          {status.icon}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{lesson.title}</span>
                              {lesson.type === 'quiz' && (
                                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                                  Quiz
                                </span>
                              )}
                            </div>
                            {lesson.description && (
                              <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-1">
                              {getLessonIcon(lesson.type)}
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseModules; 