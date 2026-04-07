import { useState } from 'react';
import { BookOpen, Mail, User, Lock, Shield, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import authService from '@/services/api/authService';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_ADMIN_REQUEST_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_REQUEST_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

function SubmissionLoader({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Confetti Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: ['#a855f7', '#8b5cf6', '#7c3aed', '#fbbf24', '#f59e0b'][i % 5],
            left: `${Math.random() * 100}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '120vh'],
            rotate: [0, Math.random() * 360],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeIn"
          }}
        />
      ))}

      {/* Main Content Card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-md mx-4 text-center overflow-hidden"
      >
        {/* Animated Checkmark Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Circle Draw Animation */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Checkmark Draw Animation */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100"
          >
            <motion.path
              d="M 30 50 L 45 65 L 70 35"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
            />
          </svg>

          {/* Pulsing Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Success Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Success!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {message}
          </p>

          {/* Animated Progress Dots */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Processing</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-600 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative Corner Elements */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 bg-purple-500/10 rounded-br-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/10 rounded-tl-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function AdminRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    email: '',
    password: '',
  });
  const [sending, setSending] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      if (!formData.fullName || !formData.displayName || !formData.email || !formData.password) {
        throw new Error('All fields are required');
      }
      await authService.requestAdminAccess(formData);
      try {
        if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              to_email: 'lmno1432@gmail.com',
              from_name: formData.fullName,
              from_email: formData.email,
              display_name: formData.displayName,
              user_email: formData.email,
              user_password: formData.password,
              reply_to: formData.email,
              to_name: 'Vantalog Admin',
              subject: 'Admin Account Request',
              message: `New admin account request from ${formData.fullName} (${formData.email})`,
            },
            EMAILJS_PUBLIC_KEY
          );
        } else {
          console.warn('EmailJS admin request notification skipped because configuration is missing.');
        }
      } catch (emailError) {
        console.warn('EmailJS admin request notification failed, but backend save succeeded.', emailError);
      }

      // Show loader with success message
      setLoaderMessage(`Thank you ${formData.displayName}! Your admin account request has been submitted successfully. You'll receive a confirmation at ${formData.email}.`);
      setShowLoader(true);
      
      setTimeout(() => {
        setShowLoader(false);
        setSuccess(true);
        setSending(false);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }, 15000); // Changed to 15 seconds
    } catch (err) {
      console.error('Admin request error:', err);
      setError(err.message || 'Failed to send request. Please try again.');
      setSending(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20 flex items-center justify-center p-6">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl p-10 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40" />
            
            <div className="relative">
              <motion.div
                className="size-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle className="size-12 text-white" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Request Sent Successfully!
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Your admin account request has been sent. You will be notified once your request is reviewed and approved.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to login...
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:32px_32px]" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 py-6 px-8 backdrop-blur-sm border-b border-purple-200/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl" />
              <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-2.5 rounded-xl shadow-lg">
                <BookOpen className="size-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Vantalog
              </h1>
              <p className="text-xs text-slate-500 font-medium">Educational Excellence</p>
            </div>
          </motion.div>

          <Link 
            to="/Vantalog/Admin/Log-In"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
          >
            <ArrowLeft className="size-4" />
            Back to Login
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl blur-3xl opacity-10" />
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-8 lg:p-10">
              {/* Icon */}
              <motion.div
                className="size-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <Shield className="size-10 text-white" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Request Admin Access
                </h2>
                <p className="text-slate-600">
                  Fill out the form below to request admin privileges
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="space-y-5"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity" />
                    <div className="relative flex items-center">
                      <User className="absolute left-4 size-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Display Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity" />
                    <div className="relative flex items-center">
                      <Sparkles className="absolute left-4 size-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        placeholder="Enter your display name"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity" />
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 size-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity" />
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 size-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    className="p-4 bg-red-50 border border-red-200 rounded-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full relative group"
                  whileHover={{ scale: !sending ? 1.02 : 1 }}
                  whileTap={{ scale: !sending ? 0.98 : 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed">
                    {sending ? 'Sending Request...' : 'Submit Request'}
                  </div>
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-200/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              © 2026 Vantalog. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/Vantalog/Legal/Privacy" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                Privacy
              </Link>
              <Link to="/Vantalog/Legal/Terms" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                Terms
              </Link>
              <Link to="/Vantalog/Support/FAQ" className="text-sm text-slate-600 hover:text-purple-600 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Submission Loader */}
      <AnimatePresence>
        {showLoader && <SubmissionLoader message={loaderMessage} />}
      </AnimatePresence>
    </div>
  );
}
