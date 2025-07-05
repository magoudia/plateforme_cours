export interface User {
  id: string;
  email: string;
  name: string;
  enrolledCourses: string[];
}

export interface ModuleSchedule {
  start: string; // ex: '1 avril'
  end: string;   // ex: '12 avril'
  module: string; // ex: 'Module 1'
  title: string;  // ex: 'Introduction à React'
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  price: number;
  rating: number;
  studentsCount: number;
  imageUrl: string;
  lessons: Lesson[];
  isPremium: boolean;
  modulesSchedule?: ModuleSchedule[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  isCompleted?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
}