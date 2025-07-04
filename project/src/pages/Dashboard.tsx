import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Récupère les cours inscrits depuis localStorage (simulation front)
  const localEnrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');

  if (!user) {
    return null;
  }

  // Fusionne les cours inscrits du user et du localStorage (évite les doublons)
  const enrolledCourses = mockCourses.filter(course => 
    user.enrolledCourses.includes(course.id) || localEnrolled.includes(course.id)
  );

  const totalHours = enrolledCourses.reduce((acc, course) => {
    const hours = parseFloat(course.duration.split('h')[0]);
    return acc + hours;
  }, 0);

  const recentCourses = enrolledCourses.slice(0, 3);
  const recommendedCourses = mockCourses
    .filter(course => !user.enrolledCourses.includes(course.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user.name} !
          </h1>
          <p className="text-gray-600 mt-2">
            Continuez votre apprentissage et atteignez vos objectifs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.length}
                </h3>
                <p className="text-gray-600">Cours inscrits</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {totalHours.toFixed(0)}h
                </h3>
                <p className="text-gray-600">Temps total</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {Math.floor(enrolledCourses.length * 0.6)}
                </h3>
                <p className="text-gray-600">Cours terminés</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.length > 0 ? Math.floor((enrolledCourses.length * 0.6 / enrolledCourses.length) * 100) : 0}%
                </h3>
                <p className="text-gray-600">Progression</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Mes cours</h2>
                <Link
                  to="/courses"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Voir tout
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                      </div>
                      <Play className="h-5 w-5 text-blue-600" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Aucun cours inscrit
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Explorez notre catalogue pour commencer votre apprentissage
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Parcourir les cours
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recommandé pour vous</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-blue-600 font-medium">
                          {course.price === 0 ? 'Gratuit' : `${(course.price * 655).toLocaleString()} CFA`}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{course.level}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/courses"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Explorer les cours</h3>
                <p className="text-sm text-gray-600">Découvrez de nouveaux sujets</p>
              </div>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
            >
              <Award className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Mes certificats</h3>
                <p className="text-sm text-gray-600">Voir vos accomplissements</p>
              </div>
            </Link>
            
            <div className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <CheckCircle className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Objectifs</h3>
                <p className="text-sm text-gray-600">Définir vos objectifs d'apprentissage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;