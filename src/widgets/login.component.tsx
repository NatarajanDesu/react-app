import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async () => {

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login attempt:', formData);
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
  <div className="absolute -inset-10 opacity-50">
  <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
    <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
    <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
    </div>
    </div>

  {/* Login Card */}
  <div className="relative w-full max-w-md">
  <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
    {/* Header */}
    <div className="text-center space-y-2">
  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
  <Lock className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
  <p className="text-gray-300">Sign in to your account</p>
  </div>

  {/* Form */}
  <div className="space-y-4">
    {/* Email Field */}
    <div className="space-y-2">
  <label className="text-sm font-medium text-gray-200 block">
    Email Address
  </label>
  <div className="relative">
  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  <input
    type="email"
  name="email"
  value={formData.email}
  onChange={handleInputChange}
  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
    errors.email
      ? 'border-red-500 focus:ring-red-500/50'
      : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
  }`}
  placeholder="Enter your email"
    />
    </div>
  {errors.email && (
    <p className="text-red-400 text-sm flex items-center gap-1">
      {errors.email}
      </p>
  )}
  </div>

  {/* Password Field */}
  <div className="space-y-2">
  <label className="text-sm font-medium text-gray-200 block">
    Password
    </label>
    <div className="relative">
  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  <input
    type={showPassword ? 'text' : 'password'}
  name="password"
  value={formData.password}
  onChange={handleInputChange}
  className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
    errors.password
      ? 'border-red-500 focus:ring-red-500/50'
      : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
  }`}
  placeholder="Enter your password"
  />
  <button
    type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
    >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
    </div>
  {errors.password && (
    <p className="text-red-400 text-sm flex items-center gap-1">
      {errors.password}
      </p>
  )}
  </div>

  {/* Remember Me & Forgot Password */}
  <div className="flex items-center justify-between text-sm">
  <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
  <input
    type="checkbox"
  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-white/10 border-white/20"
    />
    <span>Remember me</span>
  </label>
  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
    Forgot password?
    </a>
    </div>

    {/* Submit Button */}
    <button
  onClick={handleSubmit}
  disabled={isLoading}
  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
    {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          Sign In
        <ArrowRight className="w-5 h-5" />
        </>
)}
  </button>
  </div>

  {/* Divider */}
  <div className="relative">
  <div className="absolute inset-0 flex items-center">
  <div className="w-full border-t border-white/10"></div>
    </div>
    <div className="relative flex justify-center text-sm">
  <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
  </div>
  </div>

  {/* Social Login */}
  <div className="grid grid-cols-2 gap-3">
  <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 text-white hover:scale-105">
  <svg className="w-5 h-5" viewBox="0 0 24 24">
  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  Google
  </button>
  <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 text-white hover:scale-105">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  Twitter
  </button>
  </div>

  {/* Sign Up Link */}
  <p className="text-center text-gray-300">
    Don't have an account?{' '}
  <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
    Sign up
  </a>
  </p>
  </div>
  </div>
  </div>);
};

export default LoginScreen;
