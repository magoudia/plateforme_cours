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
    totalModules: 4,
    totalLessons: 16,
    certificate: true,
    lessons: [
      { id: '1-1', title: 'Introduction à React', duration: '15min', type: 'video' },
      { id: '1-2', title: 'Configuration TypeScript', duration: '20min', type: 'video' },
      { id: '1-3', title: 'Composants et Props', duration: '25min', type: 'video' },
      { id: '1-4', title: 'Quiz - Bases de React', duration: '10min', type: 'quiz' },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Introduction à React',
        description: 'Découvrez les fondamentaux de React et préparez votre environnement de développement',
        order: 1,
        lessons: [
          {
            id: '1-1',
            title: 'Qu\'est-ce que React ?',
            description: 'Introduction aux concepts fondamentaux de React',
            duration: '15min',
            type: 'text',
            content: 'text'
          },
          {
            id: '1-2',
            title: 'Installation et configuration',
            description: 'Mise en place de votre environnement de développement',
            duration: '20min',
            type: 'text',
            content: 'text'
          },
          {
            id: '1-3',
            title: 'Premier composant React',
            description: 'Création de votre premier composant React',
            duration: '25min',
            type: 'text',
            content: 'text'
          },
          {
            id: '1-4',
            title: 'Quiz - Introduction React',
            description: 'Testez vos connaissances sur les bases de React',
            duration: '10min',
            type: 'quiz',
            quiz: {
              id: 'quiz-1-4',
              questions: [
                {
                  id: 'q1',
                  text: 'React est une bibliothèque JavaScript créée par :',
                  type: 'multiple-choice',
                  options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
                  correctAnswer: 'Facebook',
                  explanation: 'React a été créé par Facebook (maintenant Meta) en 2013.'
                },
                {
                  id: 'q2',
                  text: 'React utilise un DOM virtuel pour optimiser les performances.',
                  type: 'true-false',
                  correctAnswer: 'Vrai',
                  explanation: 'Le DOM virtuel permet à React de minimiser les manipulations du DOM réel.'
                }
              ],
              passingScore: 70,
              timeLimit: 10
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Composants et Props',
        description: 'Apprenez à créer et utiliser des composants React avec les props',
        order: 2,
        lessons: [
          {
            id: '2-1',
            title: 'Création de composants',
            description: 'Comment créer des composants fonctionnels et de classe',
            duration: '30min',
            type: 'text',
            content: 'text'
          },
          {
            id: '2-2',
            title: 'Props et communication',
            description: 'Passage de données entre composants via les props',
            duration: '25min',
            type: 'text',
            content: 'text'
          },
          {
            id: '2-3',
            title: 'Composants enfants',
            description: 'Utilisation des enfants dans les composants',
            duration: '20min',
            type: 'text',
            content: 'text'
          },
          {
            id: '2-4',
            title: 'Exercice pratique',
            description: 'Création d\'une application de liste de tâches',
            duration: '45min',
            type: 'exercise',
            resources: [
              {
                id: 'res-2-4-1',
                title: 'Fichier de départ',
                type: 'doc',
                url: '#',
                size: '2.5 KB'
              }
            ]
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Hooks et État',
        description: 'Maîtrisez les hooks React pour gérer l\'état et les effets',
        order: 3,
        lessons: [
          {
            id: '3-1',
            title: 'useState Hook',
            description: 'Gestion de l\'état local avec useState',
            duration: '30min',
            type: 'text',
            content: 'text'
          },
          {
            id: '3-2',
            title: 'useEffect Hook',
            description: 'Gestion des effets de bord avec useEffect',
            duration: '35min',
            type: 'text',
            content: 'text'
          },
          {
            id: '3-3',
            title: 'Autres hooks utiles',
            description: 'useContext, useReducer et hooks personnalisés',
            duration: '40min',
            type: 'text',
            content: 'text'
          },
          {
            id: '3-4',
            title: 'Quiz - Hooks React',
            description: 'Testez vos connaissances sur les hooks',
            duration: '15min',
            type: 'quiz',
            quiz: {
              id: 'quiz-3-4',
              questions: [
                {
                  id: 'q1',
                  text: 'Quel hook utilisez-vous pour gérer l\'état local ?',
                  type: 'multiple-choice',
                  options: ['useEffect', 'useState', 'useContext', 'useReducer'],
                  correctAnswer: 'useState',
                  explanation: 'useState est le hook principal pour gérer l\'état local.'
                },
                {
                  id: 'q2',
                  text: 'useEffect s\'exécute après chaque rendu par défaut.',
                  type: 'true-false',
                  correctAnswer: 'Vrai',
                  explanation: 'useEffect s\'exécute après chaque rendu, mais peut être contrôlé avec des dépendances.'
                }
              ],
              passingScore: 80,
              timeLimit: 15
            }
          }
        ]
      },
      {
        id: 'module-4',
        title: 'TypeScript avec React',
        description: 'Intégrez TypeScript dans vos projets React',
        order: 4,
        lessons: [
          {
            id: '4-1',
            title: 'Configuration TypeScript',
            description: 'Mise en place de TypeScript dans un projet React',
            duration: '25min',
            type: 'text',
            content: 'text'
          },
          {
            id: '4-2',
            title: 'Types pour les props',
            description: 'Définition des types pour les props des composants',
            duration: '30min',
            type: 'text',
            content: 'text'
          },
          {
            id: '4-3',
            title: 'Projet final',
            description: 'Création d\'une application complète avec React et TypeScript',
            duration: '60min',
            type: 'exercise',
            resources: [
              {
                id: 'res-4-3-1',
                title: 'Spécifications du projet',
                type: 'pdf',
                url: '#',
                size: '150 KB'
              },
              {
                id: 'res-4-3-2',
                title: 'Assets du projet',
                type: 'doc',
                url: '#',
                size: '2.1 MB'
              }
            ]
          }
        ]
      }
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
    totalModules: 3,
    totalLessons: 12,
    certificate: true,
    lessons: [
      { id: '2-1', title: 'Interface Figma', duration: '12min', type: 'video' },
      { id: '2-2', title: 'Outils de base', duration: '18min', type: 'video' },
      { id: '2-3', title: 'Créer un wireframe', duration: '30min', type: 'video' },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Découverte de Figma',
        description: 'Présentation de l\'interface et des outils de base',
        order: 1,
        lessons: [
          {
            id: '2-1',
            title: 'Interface Figma',
            description: 'Navigation dans l\'interface de Figma',
            duration: '12min',
            type: 'text',
            content: 'text'
          },
          {
            id: '2-2',
            title: 'Outils de base',
            description: 'Utilisation des outils de dessin et de sélection',
            duration: '18min',
            type: 'text',
            content: 'text'
          },
          {
            id: '2-3',
            title: 'Créer un wireframe',
            description: 'Création de votre premier wireframe',
            duration: '30min',
            type: 'text',
            content: 'text'
          }
        ]
      }
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
    totalModules: 4,
    totalLessons: 20,
    certificate: true,
    lessons: [
      { id: '3-1', title: 'Installation Python', duration: '10min', type: 'video' },
      { id: '3-2', title: 'Variables et types', duration: '20min', type: 'video' },
      { id: '3-3', title: 'Structures conditionnelles', duration: '25min', type: 'video' },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Introduction à Python',
        description: 'Premiers pas avec Python',
        order: 1,
        lessons: [
          {
            id: '3-1',
            title: 'Installation Python',
            description: 'Installation et configuration de Python',
            duration: '10min',
            type: 'text',
            content: `
    <h2>Qu'est-ce que Python&nbsp;?</h2>
    <p>
      Python est un langage de programmation interprété, multiplateforme et open-source. Il est apprécié pour sa syntaxe claire, sa polyvalence (web, data science, IA, automation) et sa grande communauté.
    </p>
    <div style="margin:1em 0;">
      <a href="https://youtu.be/PmpheCTL6yk" target="_blank" rel="noopener noreferrer">
        ▶️ Introduction à Python (vidéo)
      </a>
    </div>
    <h3>Exemple&nbsp;:</h3>
    <pre><code class="language-python"># Afficher un message
print("Bonjour le monde !")
</code></pre>
    <h2>Installer Python</h2>
    <p>
      Téléchargez Python sur le <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">site officiel</a>.<br/>
      Vérifiez l'installation&nbsp;:
    </p>
    <pre><code class="language-bash">python --version
# ou
python3 --version
</code></pre>
    <div style="margin:1em 0;">
      <a href="https://youtu.be/rq-36A2SvhE" target="_blank" rel="noopener noreferrer">
        ▶️ Tutoriel installation Python (vidéo)
      </a>
    </div>
    <h2>Les bases de Python</h2>
    <h3>Variables et types</h3>
    <pre><code class="language-python">age = 25              # Entier (int)
nom = "Alice"         # Chaîne (str)
solde = 150.75        # Flottant (float)
est_actif = True      # Booléen (bool)
print(f"{nom} a {age} ans.")
</code></pre>
    <h3>Opérations</h3>
    <pre><code class="language-python">resultat = 10 + 3 * 2  # Priorité des opérations
message = "Python" + " " + "Génial"  # Concatenation
</code></pre>
    <div style="margin:1em 0;">
      <a href="https://youtu.be/psaDHhZ0cPs" target="_blank" rel="noopener noreferrer">
        ▶️ Les bases de Python (vidéo)
      </a>
    </div>
    <h2>Pour aller plus loin</h2>
    <ul>
      <li><a href="https://youtu.be/PmpheCTL6yk" target="_blank" rel="noopener noreferrer">Introduction à Python</a></li>
      <li><a href="https://youtu.be/rq-36A2SvhE" target="_blank" rel="noopener noreferrer">Installation de Python</a></li>
      <li><a href="https://youtu.be/psaDHhZ0cPs" target="_blank" rel="noopener noreferrer">Bases de Python</a></li>
    </ul>
  `
          },
          {
            id: '3-2',
            title: 'Variables et types',
            description: 'Déclaration et utilisation des variables',
            duration: '20min',
            type: 'text',
            content: 'text'
          },
          {
            id: '3-3',
            title: 'Structures conditionnelles',
            description: 'Utilisation des if, elif, else',
            duration: '25min',
            type: 'text',
            content: 'text'
          }
        ]
      }
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
    totalModules: 4,
    totalLessons: 15,
    certificate: true,
    lessons: [
      { id: '4-1', title: 'Stratégie SEO avancée', duration: '45min', type: 'video' },
      { id: '4-2', title: 'Publicité Facebook', duration: '35min', type: 'video' },
      { id: '4-3', title: 'Analytics et métriques', duration: '40min', type: 'video' },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'SEO Avancé',
        description: 'Techniques avancées de référencement naturel',
        order: 1,
        lessons: [
          {
            id: '4-1',
            title: 'Stratégie SEO avancée',
            description: 'Optimisation pour les moteurs de recherche',
            duration: '45min',
            type: 'text',
            content: 'text'
          }
        ]
      }
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
    totalModules: 3,
    totalLessons: 10,
    certificate: false,
    lessons: [
      { id: '5-1', title: 'Réglages de base', duration: '15min', type: 'video' },
      { id: '5-2', title: 'Composition', duration: '20min', type: 'video' },
      { id: '5-3', title: 'Retouche Lightroom', duration: '30min', type: 'video' },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Fondamentaux Photo',
        description: 'Bases de la photographie numérique',
        order: 1,
        lessons: [
          {
            id: '5-1',
            title: 'Réglages de base',
            description: 'Comprendre les paramètres de base de l\'appareil',
            duration: '15min',
            type: 'text',
            content: 'text'
          },
          {
            id: '5-2',
            title: 'Composition',
            description: 'Règles de composition photographique',
            duration: '20min',
            type: 'text',
            content: 'text'
          },
          {
            id: '5-3',
            title: 'Retouche Lightroom',
            description: 'Post-traitement avec Adobe Lightroom',
            duration: '30min',
            type: 'text',
            content: 'text'
          }
        ]
      }
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
    totalModules: 3,
    totalLessons: 12,
    certificate: true,
    lessons: [
      { id: '6-1', title: 'Principes Agile', duration: '25min', type: 'video' },
      { id: '6-2', title: 'Scrum Framework', duration: '30min', type: 'video' },
      { id: '6-3', title: 'Outils de gestion', duration: '20min', type: 'video' },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Principes Agile',
        description: 'Fondamentaux des méthodologies agiles',
        order: 1,
        lessons: [
          {
            id: '6-1',
            title: 'Principes Agile',
            description: 'Les 12 principes du manifeste Agile',
            duration: '25min',
            type: 'text',
            content: 'text'
          },
          {
            id: '6-2',
            title: 'Scrum Framework',
            description: 'Introduction au framework Scrum',
            duration: '30min',
            type: 'text',
            content: 'text'
          },
          {
            id: '6-3',
            title: 'Outils de gestion',
            description: 'Outils pour la gestion de projet agile',
            duration: '20min',
            type: 'text',
            content: 'text'
          }
        ]
      }
    ],
    modulesSchedule: [
      { start: '1 avril', end: '10 avril', module: 'Module 1', title: 'Principes Agile' },
      { start: '10 avril', end: '20 avril', module: 'Module 2', title: 'Scrum Framework' },
      { start: '20 avril', end: '30 avril', module: 'Module 3', title: 'Outils et Pratiques' }
    ]
  }
];