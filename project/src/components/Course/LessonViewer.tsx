import React, { useState, useEffect } from 'react';
import { PlayCircle, FileText, HelpCircle, Download, ExternalLink, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Lesson, Course } from '../../types';
import { useProgress } from '../../contexts/ProgressContext';
import { useNotification } from '../../contexts/NotificationContext';
import { courseContent } from '../../data/courseContent';

interface LessonViewerProps {
  lesson: Lesson;
  course: Course;
  onNextLesson?: () => void;
  onPreviousLesson?: () => void;
  hasNextLesson?: boolean;
  hasPreviousLesson?: boolean;
}

const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  course,
  onNextLesson,
  onPreviousLesson,
  hasNextLesson = false,
  hasPreviousLesson = false
}) => {
  const { markLessonAsCompleted, getLessonProgress } = useProgress();
  const { addNotification } = useNotification();
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    setIsCompleted(getLessonProgress(course.id, lesson.id));
  }, [lesson.id, course.id, getLessonProgress]);

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

  const handleMarkAsCompleted = () => {
    if (!isCompleted) {
      markLessonAsCompleted(course.id, lesson.id);
      setIsCompleted(true);
      addNotification({
        type: 'success',
        title: 'Leçon complétée',
        message: `Vous avez terminé : ${lesson.title}`
      });
    }
  };

  const handleQuizSubmit = () => {
    if (!lesson.quiz) return;

    let correctAnswers = 0;
    lesson.quiz.questions.forEach(question => {
      const userAnswer = quizAnswers[question.id];
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });

    const score = Math.round((correctAnswers / lesson.quiz.questions.length) * 100);
    setQuizScore(score);
    setShowQuizResults(true);

    if (score >= lesson.quiz.passingScore) {
      handleMarkAsCompleted();
    }
  };

  const renderContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {lesson.content ? (
              <video
                controls
                className="w-full h-full"
                onEnded={handleMarkAsCompleted}
              >
                <source src={lesson.content} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <PlayCircle className="h-16 w-16" />
                <span className="ml-4">Vidéo non disponible</span>
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="prose max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson.content || (courseContent as any)[lesson.id]?.content || 'Contenu non disponible' }}
            />
          </div>
        );

      case 'quiz':
        if (!lesson.quiz) return <div>Quiz non disponible</div>;

        return (
          <div className="space-y-6">
            {!showQuizResults ? (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Instructions du quiz</h4>
                  <p className="text-blue-700 text-sm">
                    Répondez à toutes les questions. Vous devez obtenir au moins {lesson.quiz.passingScore}% pour réussir.
                  </p>
                </div>

                <div className="space-y-6">
                  {lesson.quiz.questions.map((question, index) => (
                    <div key={question.id} className="bg-white border rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Question {index + 1}: {question.text}
                      </h4>

                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={quizAnswers[question.id] === option}
                                onChange={(e) => setQuizAnswers({
                                  ...quizAnswers,
                                  [question.id]: e.target.value
                                })}
                                className="h-4 w-4 text-blue-600"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {question.type === 'true-false' && (
                        <div className="space-y-3">
                          {['Vrai', 'Faux'].map((option) => (
                            <label key={option} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={quizAnswers[question.id] === option}
                                onChange={(e) => setQuizAnswers({
                                  ...quizAnswers,
                                  [question.id]: e.target.value
                                })}
                                className="h-4 w-4 text-blue-600"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {question.type === 'text' && (
                        <textarea
                          value={quizAnswers[question.id] || ''}
                          onChange={(e) => setQuizAnswers({
                            ...quizAnswers,
                            [question.id]: e.target.value
                          })}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Votre réponse..."
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleQuizSubmit}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Soumettre le quiz
                </button>
              </>
            ) : (
              <div className="bg-white border rounded-lg p-6">
                <div className="text-center">
                  <div className={`text-6xl mb-4 ${quizScore! >= lesson.quiz.passingScore ? 'text-green-500' : 'text-red-500'}`}>{quizScore}%</div>
                  <h3 className={`text-xl font-medium mb-2 ${quizScore! >= lesson.quiz.passingScore ? 'text-green-600' : 'text-red-600'}`}>{quizScore! >= lesson.quiz.passingScore ? 'Quiz réussi !' : 'Quiz échoué'}</h3>
                  <p className="text-gray-600 mb-4">Score minimum requis : {lesson.quiz.passingScore}%</p>
                  {quizScore! >= lesson.quiz.passingScore && (
                    <div className="flex items-center justify-center text-green-600 mb-4">
                      <CheckCircle className="h-6 w-6 mr-2" />
                      <span>Leçon marquée comme complétée</span>
                    </div>
                  )}
                </div>
                {/* Corrections détaillées */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Corrections du quiz</h4>
                  <div className="space-y-6">
                    {lesson.quiz.questions.map((question, idx) => {
                      const userAnswer = quizAnswers[question.id];
                      const isCorrect = userAnswer === question.correctAnswer;
                      return (
                        <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}> 
                          <div className="flex items-center mb-2">
                            <span className={`inline-block w-6 h-6 mr-2 rounded-full flex items-center justify-center text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>{isCorrect ? '✔' : '✗'}</span>
                            <span className="font-medium text-gray-900">Question {idx + 1} : {question.text}</span>
                          </div>
                          <div className="ml-8">
                            <div className="mb-1">
                              <span className="font-semibold">Votre réponse :</span> <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswer || <em>Non répondu</em>}</span>
                            </div>
                            {!isCorrect && (
                              <div className="mb-1">
                                <span className="font-semibold">Bonne réponse :</span> <span className="text-green-700">{question.correctAnswer}</span>
                              </div>
                            )}
                            {question.explanation && (
                              <div className="text-gray-700 mt-1"><span className="font-semibold">Explication :</span> {question.explanation}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Bouton pour recommencer le quiz si échec */}
                {quizScore! < lesson.quiz.passingScore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setShowQuizResults(false);
                        setQuizScore(null);
                      }}
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Recommencer le quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Type de contenu non supporté</p>
          </div>
        );
    }
  };

  const renderResources = () => {
    if (!lesson.resources || lesson.resources.length === 0) return null;

    return (
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Ressources</h4>
        <div className="space-y-2">
          {lesson.resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <Download className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{resource.title}</div>
                {resource.size && (
                  <div className="text-sm text-gray-500">{resource.size}</div>
                )}
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Lesson Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getLessonIcon(lesson.type)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{lesson.title}</h2>
              <p className="text-sm text-gray-600">{lesson.duration}</p>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Terminé</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPreviousLesson}
            disabled={!hasPreviousLesson}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasPreviousLesson
                ? 'text-gray-600 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Précédent</span>
          </button>

          <button
            onClick={onNextLesson}
            disabled={!hasNextLesson}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasNextLesson
                ? 'text-gray-600 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Suivant</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="p-6">
        {renderContent()}
        {renderResources()}

        {/* Complete Button */}
        {lesson.type !== 'quiz' && !isCompleted && (
          <div className="mt-6 pt-6 border-t">
            <button
              onClick={handleMarkAsCompleted}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Marquer comme terminé
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonViewer; 