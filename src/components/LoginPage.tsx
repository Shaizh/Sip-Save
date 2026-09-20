import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setActiveTab, showToast } = useApp();

  const [identifier, setIdentifier] = useState('fathima@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      showToast('Please enter your email/mobile and password.', 'error');
      return;
    }
    login(identifier, password);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your registered email address.', 'error');
      return;
    }
    showToast(`Password reset instructions have been sent to ${forgotEmail}.`, 'success');
    setShowForgotModal(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cream-beige">
      <div className="max-w-md w-full space-y-8 bg-warm-white p-8 sm:p-10 rounded-3xl border border-taupe/20 shadow-md relative">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-espresso text-soft-gold shadow-xs">
            <Coffee className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
              Welcome to Sip & Save
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
              Sign in to manage table reservations & pre-order menu items.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Mobile */}
          <div>
            <label className="block text-xs font-bold text-espresso uppercase tracking-wider mb-1.5">
              Email or Mobile Number <span className="text-terracotta">*</span>
            </label>
            <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. fathima@gmail.com or 9876543210"
                className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider">
                Password <span className="text-terracotta">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-semibold text-caramel hover:text-deep-coffee transition cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="block w-full pl-10 pr-10 py-2.5 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-taupe hover:text-espresso cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-taupe/40 text-espresso focus:ring-caramel accent-espresso"
              />
              <span className="text-xs text-charcoal/80 font-medium">Remember Me</span>
            </label>
            <span className="text-xs text-taupe">Customer-Only Portal</span>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-warm-white bg-caramel hover:bg-deep-coffee shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>Login to Customer Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer / Switch to Register */}
        <div className="pt-4 border-t border-taupe/20 text-center space-y-2">
          <p className="text-xs text-charcoal/70">
            Don't have a Sip & Save account yet?
          </p>
          <button
            onClick={() => setActiveTab('register')}
            className="text-sm font-bold text-caramel hover:text-deep-coffee hover:underline cursor-pointer"
          >
            Create New Account (+10 Welcome Points)
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-xs p-4">
          <div className="bg-warm-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-taupe/25 shadow-xl">
            <div className="flex items-center gap-2 text-espresso">
              <HelpCircle className="w-5 h-5 text-caramel" />
              <h3 className="font-bold text-lg text-espresso font-serif">Reset Password</h3>
            </div>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              Enter your registered email address and we'll simulate sending password recovery instructions.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-sm border border-taupe/30 rounded-xl focus:outline-hidden focus:border-caramel bg-warm-white text-charcoal"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-charcoal/70 hover:bg-cream-beige rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-warm-white bg-caramel hover:bg-deep-coffee rounded-lg shadow-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
