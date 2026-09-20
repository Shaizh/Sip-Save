import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Coffee,
  Award,
  LogOut,
  Edit3,
  Lock,
  Tag,
  CheckCircle2,
  Shield,
  RotateCcw,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    reservations,
    updateProfile,
    changePassword,
    logout,
    resetDemoData,
    setActiveTab,
    showToast,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-warm-white rounded-3xl border border-taupe/20 shadow-xs space-y-4">
        <UserIcon className="w-12 h-12 text-caramel mx-auto" />
        <h2 className="text-xl font-serif font-bold text-espresso">Please Log In</h2>
        <p className="text-xs text-charcoal/70">
          Log in to view and manage your customer account profile.
        </p>
        <button
          onClick={() => setActiveTab('login')}
          className="w-full py-2.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm transition cursor-pointer"
        >
          Login
        </button>
      </div>
    );
  }

  const userReservationsCount = reservations.filter((r) => r.userId === currentUser.id).length;

  const startEdit = () => {
    setEditName(currentUser.fullName);
    setEditMobile(currentUser.mobile);
    setEditEmail(currentUser.email);
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editMobile.trim() || !editEmail.trim()) {
      showToast('Please fill in all profile fields.', 'error');
      return;
    }
    updateProfile({
      fullName: editName.trim(),
      mobile: editMobile.trim(),
      email: editEmail.trim(),
    });
    setIsEditing(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPass !== confirmPass) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    changePassword(newPass);
    setShowPasswordModal(false);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25">
          <UserIcon className="w-3.5 h-3.5 text-caramel" />
          <span>Customer Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70">
          Manage your personal details, table history, and login credentials.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-warm-white rounded-3xl p-6 sm:p-8 border border-taupe/20 shadow-xs space-y-6">
        {/* Profile Avatar & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-taupe/15">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-espresso to-deep-coffee text-warm-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-espresso">{currentUser.fullName}</h2>
              <p className="text-xs text-charcoal/70 flex items-center gap-2 mt-0.5">
                <span>Customer ID: {currentUser.id}</span>
                <span>•</span>
                <span className="text-caramel font-semibold">
                  Referral: {currentUser.referralCode}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={startEdit}
                className="px-4 py-2 bg-cream-beige/50 hover:bg-cream-beige text-espresso border border-taupe/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-cream-beige/50 hover:bg-cream-beige text-espresso border border-taupe/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Profile Edit Form or Details View */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={editMobile}
                onChange={(e) => setEditMobile(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-taupe/30 rounded-xl text-xs font-bold text-espresso hover:bg-cream-beige cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-caramel hover:bg-deep-coffee text-warm-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* Profile Details (Prompt Requirements: Name, Email, Mobile, Total Reservations, Total Visits, Loyalty Points) */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
              <div className="flex items-center gap-2 text-caramel mb-1">
                <UserIcon className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold text-taupe">Full Name</span>
              </div>
              <p className="text-sm font-bold text-espresso">{currentUser.fullName}</p>
            </div>

            <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
              <div className="flex items-center gap-2 text-caramel mb-1">
                <Mail className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold text-taupe">Email</span>
              </div>
              <p className="text-sm font-bold text-espresso truncate">{currentUser.email}</p>
            </div>

            <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
              <div className="flex items-center gap-2 text-caramel mb-1">
                <Phone className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold text-taupe">Mobile</span>
              </div>
              <p className="text-sm font-bold text-espresso">{currentUser.mobile}</p>
            </div>

            <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
              <div className="flex items-center gap-2 text-caramel mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold text-taupe">
                  Total Reservations
                </span>
              </div>
              <p className="text-xl font-bold font-serif text-espresso">
                {userReservationsCount} Bookings
              </p>
            </div>

            <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
              <div className="flex items-center gap-2 text-caramel mb-1">
                <Coffee className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold text-taupe">Total Visits</span>
              </div>
              <p className="text-xl font-bold font-serif text-espresso">
                {currentUser.totalVisits} Visits
              </p>
            </div>

            <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
              <div className="flex items-center gap-2 text-caramel mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[11px] uppercase font-bold text-taupe">
                  Loyalty Points
                </span>
              </div>
              <p className="text-xl font-bold font-serif text-caramel">
                {currentUser.loyaltyPoints} Points
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons: Logout & Viva Reset */}
        <div className="pt-6 border-t border-taupe/15 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={resetDemoData}
            className="px-4 py-2.5 bg-cream-beige/50 hover:bg-cream-beige text-espresso text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer border border-taupe/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Account (Fathima)</span>
          </button>

          <button
            id="profile-logout-btn"
            onClick={logout}
            className="px-5 py-2.5 bg-terracotta/10 hover:bg-terracotta/20 text-terracotta text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer border border-terracotta/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout from Account</span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-xs p-4">
          <div className="bg-warm-white rounded-3xl max-w-sm w-full p-6 sm:p-8 space-y-4 border border-taupe/20 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-taupe/15">
              <h3 className="font-serif font-bold text-lg text-espresso">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-taupe hover:text-charcoal font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-charcoal mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full p-2.5 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full p-2.5 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="w-1/2 py-2.5 border border-taupe/30 rounded-xl font-bold text-espresso hover:bg-cream-beige cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl cursor-pointer transition shadow-xs"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
