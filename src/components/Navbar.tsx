import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  Calendar,
  UtensilsCrossed,
  BookOpenCheck,
  Award,
  User as UserIcon,
  ShoppingBag,
  LogOut,
  Menu as MenuIcon,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Gift,
} from 'lucide-react';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    cart,
    reservations,
    logout,
    resetDemoData,
    loginAsDemo,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks: {
    id: PageView;
    label: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Home', description: 'Café overview & ambience', icon: Coffee },
    {
      id: 'booking',
      label: 'Book a Table',
      description: 'Reserve dates & floor seating',
      icon: Calendar,
      badge: 'Popular',
    },
    { id: 'menu', label: 'Menu & Pre-Order', description: 'Roasts, bakes & dishes', icon: UtensilsCrossed },
    {
      id: 'reservations',
      label: 'My Reservations',
      description: 'Active bookings & history',
      icon: BookOpenCheck,
      badge: currentUser ? `${reservations.length}` : undefined,
    },
    {
      id: 'loyalty',
      label: 'Loyalty & Rewards',
      description: 'Points, tier status & perks',
      icon: Award,
      badge: currentUser ? `${currentUser.loyaltyPoints} pts` : undefined,
    },
    { id: 'profile', label: 'Customer Profile', description: 'Account, visits & security', icon: UserIcon },
  ];

  const handleNavClick = (tabId: PageView) => {
    setActiveTab(tabId);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-warm-white/95 backdrop-blur-md border-b border-taupe/20 shadow-xs">
        {/* Main Navbar: Clean, Uncluttered, with 3-line Menu Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Café Brand Logo */}
            <button
              id="navbar-brand-logo"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group cursor-pointer text-left focus:outline-hidden py-1"
            >
              <div className="w-11 h-11 rounded-2xl bg-espresso flex items-center justify-center text-soft-gold shadow-xs group-hover:bg-deep-coffee transition-colors duration-200 shrink-0">
                <Coffee className="w-6 h-6 text-soft-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-bold text-espresso tracking-tight group-hover:text-deep-coffee transition-colors leading-tight">
                  Sip & Save
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-widest text-taupe leading-tight">
                  Artisan Café & Dining
                </span>
              </div>
            </button>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick "Book a Table" Pill Button */}
              <button
                id="navbar-quick-book-btn"
                onClick={() => handleNavClick('booking')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-caramel hover:bg-deep-coffee text-warm-white text-xs font-bold transition shadow-xs whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Table</span>
              </button>

              {/* Pre-Order Cart Button */}
              <button
                id="navbar-cart-btn"
                onClick={() => handleNavClick('cart')}
                className="relative p-2.5 rounded-xl text-deep-coffee hover:bg-cream-beige/60 transition-colors cursor-pointer"
                title="View Pre-Order Cart"
                aria-label="View Pre-Order Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-caramel text-warm-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Profile Pill */}
              {currentUser ? (
                <button
                  id="navbar-profile-pill"
                  onClick={() => handleNavClick('profile')}
                  className="hidden md:flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-cream-beige/40 hover:bg-cream-beige border border-taupe/20 transition cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-espresso text-soft-gold font-bold text-xs flex items-center justify-center">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="text-left leading-none">
                    <p className="text-xs font-semibold text-espresso">
                      {currentUser.fullName.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-caramel font-semibold mt-0.5">
                      {currentUser.loyaltyPoints} pts
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  id="navbar-login-btn"
                  onClick={() => handleNavClick('login')}
                  className="hidden md:inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold text-espresso bg-cream-beige/60 hover:bg-cream-beige border border-taupe/20 transition cursor-pointer"
                >
                  Login
                </button>
              )}

              {/* 3-Line Menu Button (Hamburger Menu Icon) */}
              <button
                id="navbar-3line-menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cream-beige/70 hover:bg-cream-beige text-espresso border border-taupe/30 transition cursor-pointer shadow-xs group"
                aria-label="Toggle navigation menu (3 lines)"
                title="Open navigation menu (3 lines)"
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-espresso group-hover:scale-110 transition-transform" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-espresso group-hover:scale-110 transition-transform" />
                )}
                <span className="text-xs font-bold text-espresso tracking-wide">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3-Line Slide-Out Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <aside
            id="navbar-drawer-panel"
            className="relative w-full max-w-sm sm:max-w-md bg-warm-white h-full shadow-2xl border-l border-taupe/20 flex flex-col z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-taupe/15 flex items-center justify-between bg-cream-beige/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-espresso flex items-center justify-center text-soft-gold shadow-xs">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso leading-none">
                    Sip & Save
                  </h3>
                  <p className="text-[11px] text-taupe font-semibold tracking-wider uppercase mt-0.5">
                    Artisan Café Experience
                  </p>
                </div>
              </div>

              {/* Close (X) button */}
              <button
                id="drawer-close-btn"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl text-taupe hover:text-espresso hover:bg-cream-beige transition cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Card inside Drawer */}
            <div className="p-5 border-b border-taupe/15 bg-warm-white">
              {currentUser ? (
                <div className="p-4 rounded-2xl bg-cream-beige/40 border border-taupe/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-espresso text-soft-gold font-serif font-bold text-base flex items-center justify-center shadow-xs">
                        {currentUser.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-espresso leading-tight">
                          {currentUser.fullName}
                        </h4>
                        <p className="text-xs text-charcoal/70 mt-0.5">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-taupe/15 text-xs">
                    <div className="p-2 rounded-lg bg-warm-white border border-taupe/15">
                      <span className="text-[10px] uppercase font-bold text-taupe block">
                        Loyalty Points
                      </span>
                      <span className="font-bold text-caramel text-sm">
                        {currentUser.loyaltyPoints} Pts
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-warm-white border border-taupe/15">
                      <span className="text-[10px] uppercase font-bold text-taupe block">
                        Café Visits
                      </span>
                      <span className="font-bold text-espresso text-sm">
                        {currentUser.totalVisits} Visits
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-taupe font-medium">
                      Referral: <strong className="text-espresso font-mono">{currentUser.referralCode}</strong>
                    </span>
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="text-xs font-bold text-caramel hover:underline cursor-pointer"
                    >
                      View Profile →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-cream-beige/40 border border-taupe/20 space-y-3 text-center">
                  <p className="text-xs text-charcoal/70">
                    Sign in to book tables, earn loyalty rewards, and pre-order dishes.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleNavClick('login')}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-espresso bg-warm-white border border-taupe/25 hover:bg-cream-beige transition cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavClick('register')}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-warm-white bg-espresso hover:bg-deep-coffee transition cursor-pointer shadow-xs"
                    >
                      Register
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      loginAsDemo();
                      setMenuOpen(false);
                    }}
                    className="w-full py-1.5 text-xs text-caramel hover:underline font-semibold cursor-pointer"
                  >
                    ⚡ Fast Demo Login as Fathima
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Links List */}
            <div className="p-5 flex-1 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-taupe px-3 block mb-2">
                Navigation
              </span>

              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`drawer-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer group text-left ${
                      isActive
                        ? 'bg-cream-beige text-espresso font-semibold shadow-xs border border-taupe/25'
                        : 'text-charcoal/80 hover:bg-cream-beige/50 hover:text-espresso'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-caramel text-warm-white'
                            : 'bg-cream-beige/60 text-espresso group-hover:bg-cream-beige'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight">{item.label}</p>
                        <p className="text-[11px] text-charcoal/60 leading-tight mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-warm-white text-espresso border border-taupe/20'
                              : 'bg-soft-gold/20 text-caramel'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-taupe group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}

              {/* Cart item in menu */}
              <button
                id="drawer-nav-cart"
                onClick={() => handleNavClick('cart')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer group text-left ${
                  activeTab === 'cart'
                    ? 'bg-cream-beige text-espresso font-semibold shadow-xs border border-taupe/25'
                    : 'text-charcoal/80 hover:bg-cream-beige/50 hover:text-espresso'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      activeTab === 'cart'
                        ? 'bg-caramel text-warm-white'
                        : 'bg-cream-beige/60 text-espresso group-hover:bg-cream-beige'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight">Pre-Order Cart</p>
                    <p className="text-[11px] text-charcoal/60 leading-tight mt-0.5">
                      Review selected food & drinks
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-caramel text-warm-white shadow-2xs">
                    {cartItemCount} items
                  </span>
                  <ChevronRight className="w-4 h-4 text-taupe group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-taupe/15 bg-cream-beige/20 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('booking')}
                  className="py-2.5 px-3 bg-caramel hover:bg-deep-coffee text-warm-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Table</span>
                </button>
                <button
                  onClick={() => handleNavClick('menu')}
                  className="py-2.5 px-3 bg-warm-white hover:bg-cream-beige text-espresso border border-taupe/25 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>View Menu</span>
                </button>
              </div>

              <button
                onClick={() => {
                  resetDemoData();
                  setMenuOpen(false);
                }}
                className="w-full py-2 bg-cream-beige/50 hover:bg-cream-beige text-espresso/80 hover:text-espresso border border-taupe/25 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data (Fathima)</span>
              </button>

              {currentUser && (
                <button
                  id="drawer-logout-btn"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-terracotta/10 hover:bg-terracotta/20 text-terracotta border border-terracotta/25 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout from Account</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
