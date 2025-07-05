import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React & TypeScript - Guide Complet',
    description: 'Maîtrisez React et TypeScript pour créer des applications web modernes et performantes.',
    instructor: 'Marie Dupont',
    duration: '12h 30min',
    level: 'Intermédiaire',
    category: 'Développement Web',
    price: 99,
    rating: 4.8,
    studentsCount: 1250,
    imageUrl: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPremium: true,
    lessons: [
      { id: '1-1', title: 'Introduction à React', duration: '15min', type: 'video' },
      { id: '1-2', title: 'Configuration TypeScript', duration: '20min', type: 'video' },
      { id: '1-3', title: 'Composants et Props', duration: '25min', type: 'video' },
      { id: '1-4', title: 'Quiz - Bases de React', duration: '10min', type: 'quiz' },
    ],
    modulesSchedule: [
      { start: '1 avril', end: '12 avril', module: 'Module 1', title: 'Introduction à React' },
      { start: '12 avril', end: '20 avril', module: 'Module 2', title: 'Composants et Props' },
      { start: '20 avril', end: '30 avril', module: 'Module 3', title: 'Hooks et Avancés' }
    ]
  },
  {
    id: '2',
    title: 'Design UI/UX avec Figma',
    description: 'Apprenez à créer des interfaces utilisateur attrayantes avec Figma.',
    instructor: 'Jean Martin',
    duration: '8h 45min',
    level: 'Débutant',
    category: 'Design',
    price: 79,
    rating: 4.6,
    studentsCount: 890,
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPremium: true,
    lessons: [
      { id: '2-1', title: 'Interface Figma', duration: '12min', type: 'video' },
      { id: '2-2', title: 'Outils de base', duration: '18min', type: 'video' },
      { id: '2-3', title: 'Créer un wireframe', duration: '30min', type: 'video' },
    ],
    modulesSchedule: [
      { start: '1 avril', end: '8 avril', module: 'Module 1', title: 'Découverte de Figma' },
      { start: '8 avril', end: '15 avril', module: 'Module 2', title: 'Outils et Techniques' },
      { start: '15 avril', end: '22 avril', module: 'Module 3', title: 'Projets Pratiques' }
    ]
  },
  {
    id: '3',
    title: 'Python pour les Débutants',
    description: 'Découvrez la programmation avec Python, langage idéal pour commencer.',
    instructor: 'Sophie Bernard',
    duration: '15h 20min',
    level: 'Débutant',
    category: 'Programmation',
    price: 59,
    rating: 4.7,
    studentsCount: 2100,
    imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPremium: false,
    lessons: [
      { id: '3-1', title: 'Installation Python', duration: '10min', type: 'video' },
      { id: '3-2', title: 'Variables et types', duration: '20min', type: 'video' },
      { id: '3-3', title: 'Structures conditionnelles', duration: '25min', type: 'video' },
    ],
    modulesSchedule: [
      { start: '1 avril', end: '10 avril', module: 'Module 1', title: 'Introduction à Python' },
      { start: '10 avril', end: '20 avril', module: 'Module 2', title: 'Variables et Types' },
      { start: '20 avril', end: '30 avril', module: 'Module 3', title: 'Structures de Contrôle' },
      { start: '1 mai', end: '10 mai', module: 'Module 4', title: 'Fonctions et Modules' }
    ]
  },
  {
    id: '4',
    title: 'Marketing Digital Avancé',
    description: 'Stratégies avancées de marketing digital pour développer votre business.',
    instructor: 'Pierre Lemoine',
    duration: '10h 15min',
    level: 'Avancé',
    category: 'Marketing',
    price: 129,
    rating: 4.9,
    studentsCount: 650,
    imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPremium: true,
    lessons: [
      { id: '4-1', title: 'Stratégie SEO avancée', duration: '45min', type: 'video' },
      { id: '4-2', title: 'Publicité Facebook', duration: '35min', type: 'video' },
      { id: '4-3', title: 'Analytics et métriques', duration: '40min', type: 'video' },
    ],
    modulesSchedule: [
      { start: '1 avril', end: '8 avril', module: 'Module 1', title: 'SEO Avancé' },
      { start: '8 avril', end: '15 avril', module: 'Module 2', title: 'Publicité Social Media' },
      { start: '15 avril', end: '22 avril', module: 'Module 3', title: 'Analytics et ROI' },
      { start: '22 avril', end: '30 avril', module: 'Module 4', title: 'Stratégies Intégrées' }
    ]
  },
  {
    id: '5',
    title: 'Photographie Numérique',
    description: 'Techniques de photographie et retouche pour créer des images professionnelles.',
    instructor: 'Léa Moreau',
    duration: '6h 30min',
    level: 'Intermédiaire',
    category: 'Créatif',
    price: 69,
    rating: 4.5,
    studentsCount: 450,
    imageUrl: 'https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPremium: false,
    lessons: [
      { id: '5-1', title: 'Réglages de base', duration: '15min', type: 'video' },
      { id: '5-2', title: 'Composition', duration: '20min', type: 'video' },
      { id: '5-3', title: 'Retouche Lightroom', duration: '30min', type: 'video' },
    ],
    modulesSchedule: [
      { start: '1 avril', end: '8 avril', module: 'Module 1', title: 'Fondamentaux Photo' },
      { start: '8 avril', end: '15 avril', module: 'Module 2', title: 'Composition et Cadrage' },
      { start: '15 avril', end: '22 avril', module: 'Module 3', title: 'Retouche et Post-traitement' }
    ]
  },
  {
    id: '6',
    title: 'Gestion de Projet Agile',
    description: 'Méthodologies agiles et outils pour gérer efficacement vos projets.',
    instructor: 'Thomas Roux',
    duration: '9h 45min',
    level: 'Intermédiaire',
    category: 'Gestion',
    price: 89,
    rating: 4.4,
    studentsCount: 780,
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPremium: true,
    lessons: [
      { id: '6-1', title: 'Principes Agile', duration: '25min', type: 'video' },
      { id: '6-2', title: 'Scrum Framework', duration: '30min', type: 'video' },
      { id: '6-3', title: 'Outils de gestion', duration: '20min', type: 'video' },
    ],
    modulesSchedule: [
      { start: '1 avril', end: '10 avril', module: 'Module 1', title: 'Principes Agile' },
      { start: '10 avril', end: '20 avril', module: 'Module 2', title: 'Scrum Framework' },
      { start: '20 avril', end: '30 avril', module: 'Module 3', title: 'Outils et Pratiques' }
    ]
  }
];