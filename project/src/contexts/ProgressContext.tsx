import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, Lesson, Module } from '../types';

interface ProgressContextType {
  userProgress: Record<string, UserProgress>;
  markLessonAsCompleted: (courseId: string, lessonId: string) => void;
  markModuleAsCompleted: (courseId: string, moduleId: string) => void;
  getCourseProgress: (courseId: string) => UserProgress | null;
  getLessonProgress: (courseId: string, lessonId: string) => boolean;
  getModuleProgress: (courseId: string, moduleId: string) => number;
  updateCurrentLesson: (courseId: string, lessonId: string) => void;
  saveQuizScore: (courseId: string, lessonId: string, score: number) => void;
  getQuizScore: (courseId: string, lessonId: string) => number | null;
  isLessonLocked: (courseId: string, lessonId: string, lessons: Lesson[]) => boolean;
  calculateModuleProgress: (courseId: string, moduleId: string, lessons: Lesson[]) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>({});

  // Charger la progression depuis localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        setUserProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Erreur lors du chargement de la progression:', error);
      }
    }
  }, []);

  // Sauvegarder la progression dans localStorage
  const saveProgress = (progress: Record<string, UserProgress>) => {
    setUserProgress(progress);
    localStorage.setItem('userProgress', JSON.stringify(progress));
  };

  const markLessonAsCompleted = (courseId: string, lessonId: string) => {
    const currentProgress = userProgress[courseId] || {
      courseId,
      completedLessons: [],
      completedModules: [],
      progress: 0,
      lastAccessed: new Date().toISOString(),
      quizScores: {}
    };

    if (!currentProgress.completedLessons.includes(lessonId)) {
      const updatedProgress = {
        ...currentProgress,
        completedLessons: [...currentProgress.completedLessons, lessonId],
        lastAccessed: new Date().toISOString()
      };

      saveProgress({
        ...userProgress,
        [courseId]: updatedProgress
      });
    }
  };

  const markModuleAsCompleted = (courseId: string, moduleId: string) => {
    const currentProgress = userProgress[courseId] || {
      courseId,
      completedLessons: [],
      completedModules: [],
      progress: 0,
      lastAccessed: new Date().toISOString(),
      quizScores: {}
    };

    if (!currentProgress.completedModules.includes(moduleId)) {
      const updatedProgress = {
        ...currentProgress,
        completedModules: [...currentProgress.completedModules, moduleId],
        lastAccessed: new Date().toISOString()
      };

      saveProgress({
        ...userProgress,
        [courseId]: updatedProgress
      });
    }
  };

  const getCourseProgress = (courseId: string): UserProgress | null => {
    return userProgress[courseId] || null;
  };

  const getLessonProgress = (courseId: string, lessonId: string): boolean => {
    const progress = userProgress[courseId];
    return progress ? progress.completedLessons.includes(lessonId) : false;
  };

  const getModuleProgress = (courseId: string, moduleId: string): number => {
    const progress = userProgress[courseId];
    return progress ? (progress.completedModules.includes(moduleId) ? 100 : 0) : 0;
  };

  const updateCurrentLesson = (courseId: string, lessonId: string) => {
    const currentProgress = userProgress[courseId] || {
      courseId,
      completedLessons: [],
      completedModules: [],
      progress: 0,
      lastAccessed: new Date().toISOString(),
      quizScores: {}
    };

    const updatedProgress = {
      ...currentProgress,
      currentLesson: lessonId,
      lastAccessed: new Date().toISOString()
    };

    saveProgress({
      ...userProgress,
      [courseId]: updatedProgress
    });
  };

  const saveQuizScore = (courseId: string, lessonId: string, score: number) => {
    const currentProgress = userProgress[courseId] || {
      courseId,
      completedLessons: [],
      completedModules: [],
      progress: 0,
      lastAccessed: new Date().toISOString(),
      quizScores: {}
    };

    const updatedProgress = {
      ...currentProgress,
      quizScores: {
        ...currentProgress.quizScores,
        [lessonId]: score
      },
      lastAccessed: new Date().toISOString()
    };

    saveProgress({
      ...userProgress,
      [courseId]: updatedProgress
    });
  };

  const getQuizScore = (courseId: string, lessonId: string): number | null => {
    const progress = userProgress[courseId];
    return progress ? progress.quizScores[lessonId] || null : null;
  };

  const isLessonLocked = (courseId: string, lessonId: string, lessons: Lesson[]): boolean => {
    const lessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex <= 0) return false; // Première leçon toujours débloquée

    const progress = userProgress[courseId];
    if (!progress) return lessonIndex > 0; // Toutes les leçons sauf la première sont verrouillées

    // Vérifier si la leçon précédente est complétée
    const previousLesson = lessons[lessonIndex - 1];
    return !progress.completedLessons.includes(previousLesson.id);
  };

  const calculateModuleProgress = (courseId: string, moduleId: string, lessons: Lesson[]): number => {
    const progress = userProgress[courseId];
    if (!progress) return 0;

    const moduleLessons = lessons.filter(lesson => 
      lesson.id.startsWith(moduleId) || lesson.id.includes(moduleId)
    );

    if (moduleLessons.length === 0) return 0;

    const completedLessons = moduleLessons.filter(lesson => 
      progress.completedLessons.includes(lesson.id)
    );

    return Math.round((completedLessons.length / moduleLessons.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      userProgress,
      markLessonAsCompleted,
      markModuleAsCompleted,
      getCourseProgress,
      getLessonProgress,
      getModuleProgress,
      updateCurrentLesson,
      saveQuizScore,
      getQuizScore,
      isLessonLocked,
      calculateModuleProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}; 