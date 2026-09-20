import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  Calendar,
  UtensilsCrossed,
  BookOpenCheck,
  Award,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Gift,
  CheckCircle2,
  Share2,
  Copy,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    reservations,
    setActiveTab,
    setBookingDraft,
    rewards,
    showToast,
  } = useApp();

  // If user is not logged in, prompt them
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-warm-white rounded-3xl border border-taupe/20 shadow-xs space-y-4">
        <Coffee className="w-12 h-12 text-caramel mx-auto" />
        <h2 className="text-xl font-serif font-bold text-espresso">Please Log In First</h2>
        <p className="text-xs text-charcoal/70">
          Log in or create a customer account to access your café dashboard and bookings.
        </p>
        <button
          onClick={() => setActiveTab('login')}
          className="w-full py-2.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm transition cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Find nearest upcoming reservation
  const upcomingReservations = reservations.filter(
    (r) => r.userId === currentUser.id && (r.status === 'Confirmed' || r.status === 'Pending')
  );
  const nextReservation = upcomingReservations[0];

  // Loyalty progress math (towards 500 pts)
  const maxPointsGoal = 500;
  const progressPercent = Math.min(100, Math.round((currentUser.loyaltyPoints / maxPointsGoal) * 100));

  const copyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    showToast(`Referral code ${currentUser.referralCode} copied to clipboard!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Welcome Section */}
      <div className="bg-gradient-to-r from-cream-beige via-warm-white to-cream-beige/60 rounded-3xl p-6 sm:p-8 border border-taupe/25 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>Customer Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-espresso tracking-tight">
            Welcome back, {currentUser.fullName.split(' ')[0]}! ☕
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70">
            Ready for another delightful brew? Here is your reservation overview & loyalty perks.
          </p>
        </div>

        {/* Quick Referral Tag */}
        <div className="bg-warm-white/95 backdrop-blur-xs p-4 rounded-2xl border border-taupe/20 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-soft-gold/15 flex items-center justify-center text-caramel shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-taupe tracking-wider block">
              Your Referral Code
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono font-bold text-sm text-espresso tracking-wider">
                {currentUser.referralCode}
              </span>
              <button
                onClick={copyReferral}
                className="p-1 text-caramel hover:text-deep-coffee transition cursor-pointer"
                title="Copy referral code"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid (Prompt Requirement: Upcoming Reservation, Total Visits, Loyalty Points, Available Rewards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Upcoming Reservation */}
        <div
          onClick={() => setActiveTab('reservations')}
          className="bg-warm-white p-5 rounded-2xl border border-taupe/20 shadow-xs hover:border-caramel/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-taupe uppercase tracking-wider">
              Upcoming Booking
            </span>
            <div className="w-9 h-9 rounded-xl bg-soft-gold/15 text-caramel flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            {nextReservation ? (
              <div>
                <p className="text-lg font-bold text-espresso leading-snug">
                  {nextReservation.formattedDate}
                </p>
                <p className="text-xs text-charcoal/70 mt-0.5">
                  {nextReservation.time} • {nextReservation.tableId} ({nextReservation.guests})
                </p>
              </div>
            ) : (
              <div>
                <p className="text-base font-bold text-espresso">No Active Booking</p>
                <p className="text-xs text-caramel font-semibold mt-0.5">Book a table now →</p>
              </div>
            )}
          </div>
        </div>

        {/* Metric 2: Total Visits */}
        <div className="bg-warm-white p-5 rounded-2xl border border-taupe/20 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-taupe uppercase tracking-wider">
              Total Visits
            </span>
            <div className="w-9 h-9 rounded-xl bg-soft-gold/15 text-caramel flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-espresso">
              {currentUser.totalVisits}
            </span>
            <span className="text-xs text-charcoal/70 font-medium">Completed Café Visits</span>
          </div>
        </div>

        {/* Metric 3: Loyalty Points */}
        <div
          onClick={() => setActiveTab('loyalty')}
          className="bg-warm-white p-5 rounded-2xl border border-taupe/20 shadow-xs hover:border-caramel/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-taupe uppercase tracking-wider">
              Loyalty Points
            </span>
            <div className="w-9 h-9 rounded-xl bg-soft-gold/15 text-caramel flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold font-serif text-espresso">
                {currentUser.loyaltyPoints}
              </span>
              <span className="text-[11px] font-semibold text-caramel">Goal: 500 Pts</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-cream-beige h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-soft-gold to-caramel h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 4: Available Rewards */}
        <div
          onClick={() => setActiveTab('loyalty')}
          className="bg-warm-white p-5 rounded-2xl border border-taupe/20 shadow-xs hover:border-caramel/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-taupe uppercase tracking-wider">
              Available Rewards
            </span>
            <div className="w-9 h-9 rounded-xl bg-soft-gold/15 text-caramel flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            {currentUser.loyaltyPoints >= 100 ? (
              <div>
                <p className="text-base font-bold text-sage flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Free Coffee Unlocked!</span>
                </p>
                <p className="text-xs text-charcoal/70 mt-0.5">
                  Redeem on your next booking or visit
                </p>
              </div>
            ) : (
              <div>
                <p className="text-base font-bold text-espresso">
                  {100 - currentUser.loyaltyPoints} Pts to Free Coffee
                </p>
                <p className="text-xs text-charcoal/70 mt-0.5">Complete a visit or refer a friend</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Action Buttons (Prompt Mandate: Book a Table, Pre-Order Food, My Reservations, View Menu) */}
      <div className="space-y-3">
        <h2 className="text-lg font-serif font-bold text-espresso">Quick Café Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            id="dash-book-table-btn"
            onClick={() => setActiveTab('booking')}
            className="p-5 rounded-2xl bg-warm-white border border-taupe/20 hover:border-caramel hover:shadow-xs transition-all text-left flex items-start justify-between cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cream-beige text-caramel flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-espresso group-hover:text-caramel transition-colors">
                Book a Table
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Select date, time slot & floor seating table
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-caramel opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            id="dash-preorder-btn"
            onClick={() => setActiveTab('menu')}
            className="p-5 rounded-2xl bg-warm-white border border-taupe/20 hover:border-caramel hover:shadow-xs transition-all text-left flex items-start justify-between cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cream-beige text-caramel flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-espresso group-hover:text-caramel transition-colors">
                Pre-Order Food
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Choose food & drinks to be served on arrival
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-caramel opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            id="dash-reservations-btn"
            onClick={() => setActiveTab('reservations')}
            className="p-5 rounded-2xl bg-warm-white border border-taupe/20 hover:border-caramel hover:shadow-xs transition-all text-left flex items-start justify-between cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cream-beige text-caramel flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-espresso group-hover:text-caramel transition-colors">
                My Reservations
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                View upcoming, modify, cancel & leave reviews
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-caramel opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            id="dash-menu-btn"
            onClick={() => setActiveTab('menu')}
            className="p-5 rounded-2xl bg-warm-white border border-taupe/20 hover:border-caramel hover:shadow-xs transition-all text-left flex items-start justify-between cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cream-beige text-caramel flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-espresso group-hover:text-caramel transition-colors">
                View Menu
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Explore coffee, snacks, main course & desserts
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-caramel opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* 4. Active Reservation Spotlight */}
      {nextReservation && (
        <div className="bg-warm-white rounded-3xl p-6 sm:p-8 border border-taupe/20 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-taupe/15">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-caramel text-warm-white flex items-center justify-center shadow-xs">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sage bg-sage/15 px-2.5 py-0.5 rounded-full border border-sage/30">
                    Confirmed
                  </span>
                  <span className="text-xs font-mono text-charcoal/70">
                    Booking ID: <strong className="text-espresso">{nextReservation.id}</strong>
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-espresso mt-1">
                  Upcoming Table Reservation
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('reservations')}
                className="px-4 py-2 bg-cream-beige/50 hover:bg-cream-beige text-espresso text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Manage Booking
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-taupe/15">
            <div>
              <span className="text-[11px] uppercase font-bold text-taupe tracking-wider block">
                Date
              </span>
              <p className="text-sm font-bold text-espresso mt-1">{nextReservation.formattedDate}</p>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-taupe tracking-wider block">
                Time
              </span>
              <p className="text-sm font-bold text-espresso mt-1">{nextReservation.time}</p>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-taupe tracking-wider block">
                Table
              </span>
              <p className="text-sm font-bold text-espresso mt-1">
                {nextReservation.tableId} ({nextReservation.tableSeats} Seats)
              </p>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-taupe tracking-wider block">
                Party Size
              </span>
              <p className="text-sm font-bold text-espresso mt-1">{nextReservation.guests}</p>
            </div>
          </div>

          {/* Pre-ordered Food Preview */}
          {nextReservation.foodItems && nextReservation.foodItems.length > 0 ? (
            <div className="pt-6">
              <span className="text-xs font-bold text-caramel uppercase tracking-wider block mb-3">
                Pre-Ordered Refreshments ({nextReservation.foodItems.length} items)
              </span>
              <div className="flex flex-wrap gap-2">
                {nextReservation.foodItems.map((fi, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-cream-beige/50 border border-taupe/20 rounded-xl text-xs"
                  >
                    <span className="font-semibold text-espresso">{fi.item.name}</span>
                    <span className="text-charcoal/70">× {fi.quantity}</span>
                    <span className="font-bold text-caramel">₹{fi.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-6 flex items-center justify-between">
              <span className="text-xs text-charcoal/70">No food pre-ordered for this visit.</span>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs font-bold text-caramel hover:underline cursor-pointer"
              >
                + Add Pre-Order Food Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
