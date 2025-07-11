import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Home from './pages/Home';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetails from './pages/CourseDetails';
import CourseLearning from './pages/CourseLearning';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Notifications from './pages/Notifications';
import QuizPythonInteractif from './pages/QuizPythonInteractif';

function App() {
  return (
    <NotificationProvider>
      <ProgressProvider>
        <Router>
          <AuthProvider>
            <Header />
            <main className="pt-16 min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CourseCatalog />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route
                  path="/course/:id/learn"
                  element={
                    <ProtectedRoute>
                      <CourseLearning />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route path="/quiz-python-interactif" element={<QuizPythonInteractif />} />
              </Routes>
            </main>
            <Footer />
          </AuthProvider>
        </Router>
      </ProgressProvider>
    </NotificationProvider>
  );
}

export default App;