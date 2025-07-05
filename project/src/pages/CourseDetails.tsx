import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Crown, PlayCircle, FileText, HelpCircle, ArrowLeft } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import pythonsLogo from '../assets/pythons.jpeg';
import waveLogo from '../assets/wave.jpeg';
import orangeLogo from '../assets/orange(2).jpeg';
import visaLogo from '../assets/visa.jpeg';
import { useNotification } from '../contexts/NotificationContext';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isEnrolled, enrollInCourse } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const course = mockCourses.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cours non trouvé</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-800">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const isUserEnrolled = isEnrolled(course.id);
  // Vérification supplémentaire du localStorage pour s'assurer de la cohérence
  const enrolledFromStorage = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  const isActuallyEnrolled = enrolledFromStorage.includes(course.id);
  // Force la mise à jour quand forceUpdate change
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wave');
  const [form, setForm] = useState({ name: '', email: '', phone: '', card: '' });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

  // Simule l'inscription persistante
  const addCourseToLocalStorage = (courseId: string) => {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(courseId)) {
      enrolled.push(courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <PlayCircle className="h-4 w-4" />;
    }
  };

  const handleEnroll = () => {
    if (user) {
      enrollInCourse(course.id);
    }
  };

  const handleFakePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      setShowPaymentModal(false);
      addCourseToLocalStorage(course.id);
      setShowToast({ type: 'success', message: 'Paiement réussi ! Vous êtes inscrit à ce cours.' });
      addNotification({
        type: 'success',
        title: 'Inscription réussie',
        message: `Vous êtes inscrit au cours : ${course.title}`
      });
      setTimeout(() => {
        setShowToast(null);
        navigate(`/course/${course.id}`);
      }, 2000);
    }, 2000);
  };

  // Validation simple
  const isStep2Valid = form.name.trim() && form.email.trim();
  const isStep3Valid = paymentMethod === 'card' ? form.card.trim() : form.phone.trim();

  // Fonction pour vérifier si on doit passer aux instructions de paiement
  const shouldShowPaymentInstructions = () => {
    return (paymentMethod === 'wave' || paymentMethod === 'orange') && form.phone.trim().length >= 8;
  };

  // Fonction pour obtenir les instructions de paiement
  const getPaymentInstructions = () => {
    const amount = (course.price * 655).toLocaleString();
    if (paymentMethod === 'wave') {
      return {
        title: 'Paiement Wave',
        instructions: [
          `Envoyez ${amount} CFA au numéro : 221 77 123 45 67`,
          'Ou scannez le QR code Wave ci-dessous',
          'Attendez la confirmation de paiement',
          'Cliquez sur "J\'ai payé" une fois le paiement effectué'
        ],
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=wave://pay?phone=221771234567&amount=' + (course.price * 655)
      };
    } else if (paymentMethod === 'orange') {
      return {
        title: 'Paiement Orange Money',
        instructions: [
          `Envoyez ${amount} CFA au numéro : 221 77 123 45 67`,
          'Ou utilisez le code USSD : #150*1*221771234567*' + (course.price * 655) + '#',
          'Attendez la confirmation de paiement',
          'Cliquez sur "J\'ai payé" une fois le paiement effectué'
        ],
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=orange://pay?phone=221771234567&amount=' + (course.price * 655)
      };
    }
    return null;
  };

  // Fonction de désinscription
  const handleUnenroll = () => {
    if (!window.confirm('Êtes-vous sûr de vouloir vous désinscrire de ce cours ?')) return;
    
    try {
      const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      const updated = enrolled.filter((id: string) => id !== course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(updated));
      
      // Force la mise à jour de l'interface
      setForceUpdate(prev => prev + 1);
      
      setShowToast({ type: 'success', message: 'Vous vous êtes désinscrit de ce cours.' });
      
      // Pas de notification pour éviter les problèmes de réapparition
      console.log(`Désinscription réussie du cours : ${course.title}`);
      
      setTimeout(() => {
        setShowToast(null);
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la désinscription:', error);
      setShowToast({ type: 'error', message: 'Erreur lors de la désinscription.' });
      setTimeout(() => {
        setShowToast(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/courses"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadgeColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                    {course.isPremium && (
                      <div className="flex items-center text-yellow-600">
                        <Crown className="h-4 w-4" />
                        <span className="text-sm font-medium ml-1">Premium</span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {course.description}
                  </p>
                </div>
                {isActuallyEnrolled && (
                  <button
                    onClick={handleUnenroll}
                    className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold"
                  >
                    Se désinscrire
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.studentsCount.toLocaleString()} étudiants</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                  <span>{course.rating} ({Math.floor(course.studentsCount * 0.3)} avis)</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contenu du cours</h2>
              {course.modulesSchedule && course.modulesSchedule.length > 0 && (
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">Dates</th>
                        <th className="px-4 py-2 border">Module</th>
                        <th className="px-4 py-2 border">Titre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.modulesSchedule.map((mod, idx) => (
                        <tr key={idx} className="text-gray-700">
                          <td className="px-4 py-2 border">{mod.start} - {mod.end}</td>
                          <td className="px-4 py-2 border font-semibold">{mod.module}</td>
                          <td className="px-4 py-2 border">{mod.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isActuallyEnrolled ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        {getLessonIcon(lesson.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 capitalize">{lesson.type}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructeur</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-600">Expert en {course.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {course.price === 0 ? 'Gratuit' : `${(course.price * 655).toLocaleString()} CFA`}
                </div>
                {course.price > 0 && (
                  <p className="text-sm text-gray-600">Accès à vie</p>
                )}
              </div>

              {user ? (
                isActuallyEnrolled || paymentSuccess ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 text-green-800 p-3 rounded-lg text-center font-medium">
                      ✓ Vous êtes inscrit à ce cours
                    </div>
                    <Link
                      to="/dashboard"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                    >
                      Continuer le cours
                    </Link>
                    <button
                      onClick={handleUnenroll}
                      className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                    >
                      Se désinscrire
                    </button>
                  </div>
                ) : (
                  course.price > 0 ? (
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full bg-iai-bordeaux text-white py-3 px-4 rounded-lg hover:bg-iai-blue transition-colors font-medium"
                    >
                      Payer {(course.price * 655).toLocaleString()} CFA et s'inscrire
                    </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                      className="w-full bg-iai-blue text-white py-3 px-4 rounded-lg hover:bg-iai-bordeaux transition-colors font-medium"
                  >
                      S'inscrire gratuitement
                  </button>
                  )
                )
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                  >
                    Se connecter pour s'inscrire
                  </Link>
                  <p className="text-sm text-gray-600 text-center">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800">
                      Créer un compte
                    </Link>
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Ce cours inclut :</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration} de contenu vidéo
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {course.lessons.length} leçons
                  </li>
                  <li className="flex items-center">
                    <Crown className="h-4 w-4 mr-2" />
                    Accès à vie
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Communauté d'apprenants
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast de feedback */}
      {showToast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded shadow-lg text-white font-semibold transition-all ${showToast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {showToast.message}
        </div>
      )}

      {/* Modale de paiement professionnelle multi-étapes */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-left relative">
            {/* Progression */}
            <div className="flex items-center mb-6">
              {[1,2,3,4,5].map((s) => (
                <div key={s} className={`flex-1 h-2 mx-1 rounded-full ${step >= s ? 'bg-iai-blue' : 'bg-gray-200'}`}></div>
              ))}
            </div>
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
                <svg className="animate-spin h-10 w-10 text-iai-blue mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span className="text-iai-blue font-medium">Paiement en cours...</span>
              </div>
            )}
            {/* Étape 1 : Résumé du cours */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Résumé du cours</h2>
                <div className="mb-2 font-semibold">{course.title}</div>
                <div className="mb-2 text-sm text-gray-600">Instructeur : {course.instructor}</div>
                <div className="mb-2 text-sm text-gray-600">Catégorie : {course.category}</div>
                <div className="mb-2 text-sm text-gray-600">Prix : <span className="font-bold">{(course.price * 655).toLocaleString()} CFA</span></div>
                <div className="mb-4 text-gray-600 text-sm">{course.description.slice(0, 100)}...</div>
                <button onClick={() => setStep(2)} className="bg-iai-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-iai-bordeaux transition-colors w-full">Suivant</button>
              </div>
            )}
            {/* Étape 2 : Infos personnelles */}
            {step === 2 && (
              <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
                <h2 className="text-xl font-bold mb-4">Vos informations</h2>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Nom</label>
                  <input type="text" required className="w-full px-3 py-2 border rounded" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Email</label>
                  <input type="email" required className="w-full px-3 py-2 border rounded" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900">Précédent</button>
                  <button type="submit" disabled={!isStep2Valid} className="bg-iai-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-iai-bordeaux transition-colors disabled:opacity-50">Suivant</button>
                </div>
              </form>
            )}
            {/* Étape 3 : Choix paiement */}
            {step === 3 && (
              <form onSubmit={e => { 
                e.preventDefault(); 
                if (shouldShowPaymentInstructions()) {
                  setStep(4);
                } else {
                  setStep(5);
                }
              }}>
                <h2 className="text-xl font-bold mb-4">Mode de paiement</h2>
                <div className="flex gap-4 mb-4">
                  <div
                    className={`flex-1 border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all ${paymentMethod === 'wave' ? 'border-iai-blue ring-2 ring-iai-blue' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('wave')}
                  >
                    <img src={waveLogo} alt="Wave" className="h-10 mb-2" />
                    <span className="font-medium">Wave</span>
                  </div>
                  <div
                    className={`flex-1 border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all ${paymentMethod === 'orange' ? 'border-iai-blue ring-2 ring-iai-blue' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('orange')}
                  >
                    <img src={orangeLogo} alt="Orange Money" className="h-10 mb-2" />
                    <span className="font-medium">Orange Money</span>
                  </div>
                  <div
                    className={`flex-1 border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-iai-blue ring-2 ring-iai-blue' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <img src={visaLogo} alt="Carte Visa" className="h-10 mb-2" />
                    <span className="font-medium">Carte Visa</span>
                  </div>
                </div>
                {paymentMethod !== 'card' && (
                  <div className="mb-3">
                    <label className="block mb-1 font-medium">Numéro de téléphone</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full px-3 py-2 border rounded" 
                      value={form.phone} 
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} 
                    />
                    {shouldShowPaymentInstructions() && (
                      <p className="text-sm text-green-600 mt-1">✓ Numéro valide - Vous serez redirigé vers les instructions de paiement</p>
                    )}
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <>
                    <div className="mb-3">
                      <label className="block mb-1 font-medium">Numéro de carte</label>
                      <input type="text" required className="w-full px-3 py-2 border rounded" value={form.card} onChange={e => setForm(f => ({ ...f, card: e.target.value }))} />
                    </div>
                    <div className="mb-3 flex gap-2">
                      <div className="flex-1">
                        <label className="block mb-1 font-medium">Date d'expiration</label>
                        <input type="text" required placeholder="MM/AA" className="w-full px-3 py-2 border rounded" />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-medium">CVC</label>
                        <input type="text" required placeholder="CVC" className="w-full px-3 py-2 border rounded" />
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-900">Précédent</button>
                  <button type="submit" disabled={!isStep3Valid} className="bg-iai-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-iai-bordeaux transition-colors disabled:opacity-50">
                    {shouldShowPaymentInstructions() ? 'Voir les instructions' : 'Suivant'}
                  </button>
                </div>
              </form>
            )}
            {/* Étape 4 : Instructions de paiement mobile */}
            {step === 4 && (paymentMethod === 'wave' || paymentMethod === 'orange') && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">{getPaymentInstructions()?.title}</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-center mb-4">
                    <img 
                      src={getPaymentInstructions()?.qrCode} 
                      alt="QR Code de paiement" 
                      className="mx-auto w-48 h-48 border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {getPaymentInstructions()?.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-iai-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Informations importantes :</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Le paiement doit être effectué depuis le numéro : {form.phone}</li>
                    <li>• Conservez la confirmation de paiement</li>
                    <li>• Votre inscription sera validée après confirmation</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(3)} 
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Retour
                  </button>
                  <button 
                    onClick={() => setStep(5)} 
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    J'ai payé
                  </button>
                </div>
              </div>
            )}

            {/* Étape 5 : Récapitulatif et paiement */}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
                <div className="mb-2"><span className="font-medium">Nom :</span> {form.name}</div>
                <div className="mb-2"><span className="font-medium">Email :</span> {form.email}</div>
                <div className="mb-2"><span className="font-medium">Paiement :</span> {paymentMethod === 'card' ? 'Carte bancaire' : paymentMethod === 'wave' ? 'Wave' : 'Orange Money'}</div>
                {paymentMethod !== 'card' && <div className="mb-2"><span className="font-medium">Téléphone :</span> {form.phone}</div>}
                {paymentMethod === 'card' && <div className="mb-2"><span className="font-medium">Carte :</span> **** **** **** {form.card.slice(-4)}</div>}
                <div className="mb-4"><span className="font-medium">Montant :</span> <span className="font-bold">{(course.price * 655).toLocaleString()} CFA</span></div>
                
                {(paymentMethod === 'wave' || paymentMethod === 'orange') && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Paiement mobile confirmé</span>
                    </div>
                  </div>
                )}
                
                <button onClick={handleFakePayment} className="bg-iai-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-iai-bordeaux transition-colors w-full" disabled={loading}>
                  {loading ? 'Finalisation en cours...' : 'Finaliser l\'inscription'}
                </button>
                <button type="button" onClick={() => setStep(paymentMethod === 'card' ? 3 : 4)} className="w-full mt-2 text-gray-500 hover:text-gray-900">
                  Précédent
                </button>
              </div>
            )}
            {/* Fermeture modale */}
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;