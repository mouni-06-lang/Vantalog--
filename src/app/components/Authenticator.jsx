import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, RefreshCw, CheckCircle, AlertCircle, GraduationCap, Sparkles, Eye } from 'lucide-react';

// List of valid authenticator codes
const VALID_CODES = [
  '589746', '624831', '980357', '741023', '790635', '578623', '417638', '470528', '741293', '509486',
  '796108', '798254', '563271', '462107', '672804', '710692', '482675', '682513', '647893', '681047',
  '307162', '409372', '704619', '190823', '694207', '827406', '834526', '906185', '956832', '450721',
  '920347', '291536', '572048', '840329', '856231', '697038', '178234', '850429', '806374', '563208',
  '804369', '207693', '408235', '625704', '743618', '837054', '925643', '432078', '756438', '945206',
  '176425', '402815', '782145', '567981', '156438', '731256', '760315', '794856', '780913', '365829',
  '906538', '708216', '621739', '956378', '796084', '750916', '609124', '869135', '924578', '316572',
  '586391', '538142', '130487', '401937', '762941', '948563', '815796', '975031', '340865', '961052',
  '108694', '425038', '410537', '436581', '138549', '768091', '708316', '865341', '185793', '290564',
  '456738', '507329', '506138', '279046', '607843', '789436', '708243', '216905', '781426', '125786',
];

export default function Authenticator({ onSuccess, onBack }) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputRef = useRef(null);

  // Generate a random code on mount
  useEffect(() => {
    generateNewCode();
  }, []);

  const generateNewCode = () => {
    const randomCode = VALID_CODES[Math.floor(Math.random() * VALID_CODES.length)];
    setDisplayedCode(randomCode);
    setUserInput('');
    setError('');
    setIsHuman(false);
    inputRef.current?.focus();
  };

  const handleHumanVerification = () => {
    setVerifying(true);
    setTimeout(() => {
      setIsHuman(true);
      setVerifying(false);
      inputRef.current?.focus();
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isHuman) {
      setError('Please verify that you are human first');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (userInput === displayedCode) {
      // Success animation
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      // Invalid code - AUTO-GENERATE NEW CODE
      setError('Incorrect code. A new code has been generated.');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        generateNewCode();
        inputRef.current?.focus();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-violet-50">
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl"
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

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 py-6 px-8 backdrop-blur-sm border-b border-purple-200/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl" 
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-gradient-to-br from-purple-600 to-violet-600 p-2.5 rounded-xl shadow-lg">
                <GraduationCap className="size-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Vantalog
              </h1>
              <p className="text-xs text-slate-500 font-medium">Security Verification</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] p-6">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-3xl opacity-10" />
          
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-10">
            {/* Icon */}
            <motion.div 
              className="size-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30 relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-200, 200],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              />
              <Shield className="size-10 text-white relative z-10" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Security Verification
              </h2>
              <p className="text-slate-600 mb-5">
                Verify you're human and enter the security code
              </p>
            </motion.div>

            {/* Human Verification - Modern Captcha Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="p-6 bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 rounded-2xl border-2 border-purple-200 relative overflow-hidden">
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <motion.button
                    onClick={handleHumanVerification}
                    disabled={isHuman || verifying}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isHuman 
                        ? 'bg-purple-600 border-purple-600' 
                        : verifying
                        ? 'bg-purple-100 border-purple-300'
                        : 'bg-white border-purple-300 hover:border-purple-500 cursor-pointer'
                    }`}
                    whileHover={!isHuman && !verifying ? { scale: 1.1 } : {}}
                    whileTap={!isHuman && !verifying ? { scale: 0.9 } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {isHuman ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                        >
                          <CheckCircle className="size-7 text-white" />
                        </motion.div>
                      ) : verifying ? (
                        <motion.div
                          key="loading"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="size-6 text-purple-600" />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.button>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {isHuman ? "Verified! You're human ✓" : "I'm not a robot"}
                    </p>
                    <div className="flex items-center gap-2">
                      <Shield className="size-3.5 text-purple-600" />
                      <span className="text-xs text-gray-600">reCAPTCHA · Privacy · Terms</span>
                    </div>
                  </div>

                  {/* Animated logo */}
                  <motion.div
                    className="flex-shrink-0"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="relative w-10 h-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg opacity-20" />
                      <div className="absolute inset-1 bg-white rounded-md flex items-center justify-center">
                        <Eye className="size-5 text-purple-600" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Verification progress bar */}
                {verifying && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-violet-600"
                  />
                )}
              </div>
            </motion.div>

            {/* Authenticator Code Display */}
            <AnimatePresence mode="wait">
              {isHuman && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 rounded-2xl border-2 border-purple-200 relative overflow-hidden shadow-lg mb-6">
                    {/* Pattern Background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #9333ea 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="size-4 text-purple-600" />
                        <p className="text-sm font-semibold text-purple-900">Security Code</p>
                      </div>

                      {/* Code Display with Enhanced Animation */}
                      <div className="flex justify-center items-center gap-2.5">
                        {displayedCode.split('').map((digit, index) => (
                          <motion.div
                            key={index}
                            className="relative w-12 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
                            initial={{ opacity: 0, y: -20, rotateY: -180 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              rotateY: 0,
                            }}
                            transition={{
                              opacity: { delay: index * 0.1 },
                              y: { delay: index * 0.1 },
                              rotateY: { delay: index * 0.1, duration: 0.6 }
                            }}
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/50 to-transparent"
                              animate={{
                                x: [-100, 100],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                            
                            {/* Floating animation */}
                            <motion.span
                              className="text-2xl font-bold text-slate-800 relative z-10"
                              animate={{
                                y: [0, -3, 0],
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.15,
                                ease: "easeInOut"
                              }}
                            >
                              {digit}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Refresh Button */}
                      <motion.button
                        onClick={generateNewCode}
                        className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        title="Generate new code"
                      >
                        <RefreshCw className="size-4 text-purple-600" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Form */}
            <AnimatePresence mode="wait">
              {!success && isHuman ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Enter the 6-digit security code
                    </label>
                    <motion.input
                      ref={inputRef}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={userInput}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setUserInput(value);
                        setError('');
                      }}
                      className={`w-full px-6 py-4 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all tracking-[0.5em] ${
                        error
                          ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100'
                      }`}
                      placeholder="______"
                      animate={{
                        x: shake ? [-10, 10, -10, 10, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200"
                      >
                        <AlertCircle className="size-5 text-red-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-red-600">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full relative group"
                    disabled={userInput.length !== 6}
                    whileHover={{ scale: userInput.length === 6 ? 1.02 : 1 }}
                    whileTap={{ scale: userInput.length === 6 ? 0.98 : 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className={`relative py-4 px-6 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${
                      userInput.length === 6
                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-purple-600/30'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}>
                      <Lock className="size-5" />
                      Verify & Continue
                    </div>
                  </motion.button>
                </motion.form>
              ) : success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="size-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-green-400/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <CheckCircle className="size-14 text-green-600 relative z-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Verification Successful!</h3>
                  <p className="text-slate-600">Redirecting you to your dashboard...</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Back Button */}
            {!success && (
              <motion.button
                onClick={onBack}
                className="w-full mt-6 py-3 text-slate-600 hover:text-purple-600 font-medium transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ← Back to Login
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
