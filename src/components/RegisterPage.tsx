import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  User as UserIcon,
  Phone,
  Mail,
  Lock,
  Tag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerUser, setActiveTab } = useApp();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Required fields check
    if (!fullName.trim() || !mobile.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please provide a valid email address (e.g. name@domain.com).');
      return;
    }

    // Mobile validation
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify and retry.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    const result = registerUser({
      fullName,
      mobile: cleanMobile,
      email,
      password,
      referralCode: referralCode.trim() || undefined,
    });

    if (result.success) {
      // Redirect to login page
      setTimeout(() => {
        setActiveTab('login');
      }, 900);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cream-beige">
      <div className="max-w-md w-full space-y-6 bg-warm-white p-8 sm:p-10 rounded-3xl border border-taupe/20 shadow-md relative">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-espresso text-soft-gold shadow-xs">
            <Coffee className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Create Customer Account
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70">
            Join Sip & Save and unlock table reservations with +10 welcome loyalty points!
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-espresso uppercase tracking-wider mb-1">
              Full Name <span className="text-terracotta">*</span>
            </label>
            <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                id="register-fullname"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Fathima"
                className="block w-full pl-10 pr-3.5 py-2 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-espresso uppercase tracking-wider mb-1">
              Mobile Number <span className="text-terracotta">*</span>
            </label>
            <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="register-mobile"
                type="tel"
                required
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="block w-full pl-10 pr-3.5 py-2 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
              />
            </div>
            <p className="text-[10px] text-taupe mt-0.5">Used for SMS booking confirmations</p>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-espresso uppercase tracking-wider mb-1">
              Email Address <span className="text-terracotta">*</span>
            </label>
            <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="register-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. fathima@gmail.com"
                className="block w-full pl-10 pr-3.5 py-2 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider mb-1">
                Password <span className="text-terracotta">*</span>
              </label>
              <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-taupe">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  id="register-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="block w-full pl-8 pr-2.5 py-2 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider mb-1">
                Confirm <span className="text-terracotta">*</span>
              </label>
              <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-taupe">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  id="register-confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="block w-full pl-8 pr-2.5 py-2 text-sm text-charcoal placeholder-taupe bg-transparent focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Optional Referral Code */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider">
                Referral Code (Optional)
              </label>
              <span className="text-[11px] text-caramel font-semibold">Try: FATHIMA123</span>
            </div>
            <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                <Tag className="w-4 h-4" />
              </div>
              <input
                id="register-referral"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Enter friend's code"
                className="block w-full pl-10 pr-3.5 py-2 text-sm text-charcoal uppercase placeholder-taupe bg-transparent focus:outline-hidden"
              />
            </div>
            <p className="text-[10px] text-taupe mt-0.5">
              Awards +30 points to your friend once verified!
            </p>
          </div>

          {/* Create Account button */}
          <button
            id="register-submit-btn"
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-warm-white bg-caramel hover:bg-deep-coffee shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Redirect to login */}
        <div className="pt-3 border-t border-taupe/20 text-center">
          <p className="text-xs text-charcoal/70">
            Already have an account?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className="font-bold text-caramel hover:text-deep-coffee hover:underline cursor-pointer"
            >
              Log In here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
