import React from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, MapPin, Clock, Phone, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-espresso text-warm-white/80 pt-12 pb-8 border-t border-deep-coffee mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-deep-coffee text-soft-gold flex items-center justify-center shadow-xs">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-warm-white">
                Sip & Save
              </span>
            </div>
            <p className="text-xs text-taupe leading-relaxed">
              A premium customer-only café reservation portal designed for seamless table bookings, gourmet pre-ordering, and rewarding café experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-soft-gold">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-warm-white/70">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-caramel transition cursor-pointer"
                >
                  Café Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="hover:text-caramel transition cursor-pointer"
                >
                  Advance Table Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="hover:text-caramel transition cursor-pointer"
                >
                  Food & Beverage Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('loyalty')}
                  className="hover:text-caramel transition cursor-pointer"
                >
                  Loyalty Points & Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Location */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-soft-gold">
              Café Hours & Location
            </h4>
            <div className="space-y-2 text-xs text-warm-white/70">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
                <span>Mon – Sun: 10:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
                <span>Connaught Place, Inner Circle, New Delhi 110001</span>
              </div>
            </div>
          </div>

          {/* Café Philosophy Note */}
          <div className="space-y-2 bg-deep-coffee/40 p-4 rounded-2xl border border-deep-coffee">
            <h4 className="text-xs font-bold uppercase tracking-wider text-soft-gold">
              Sip & Save Experience
            </h4>
            <p className="text-[11px] text-taupe leading-relaxed">
              Crafted for coffee enthusiasts and food lovers. Reserve your favorite table in advance, pre-order handcrafted delicacies, and enjoy warm café hospitality.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-deep-coffee flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-taupe">
          <p>© {new Date().getFullYear()} Sip & Save Café. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for customer convenience & cozy café vibes ☕
          </p>
        </div>
      </div>
    </footer>
  );
};
