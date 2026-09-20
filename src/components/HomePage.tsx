import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  Calendar,
  UtensilsCrossed,
  Award,
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/initialData';

export const HomePage: React.FC = () => {
  const { setActiveTab, currentUser, reviews } = useApp();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Table Booking',
      desc: 'Reserve your desired table in advance with real-time seat availability & instant confirmation.',
      action: () => setActiveTab('booking'),
    },
    {
      icon: UtensilsCrossed,
      title: 'Food Pre-Ordering',
      desc: 'Browse our gourmet menu and pre-order your coffee and snacks so they are served right as you arrive.',
      action: () => setActiveTab('menu'),
    },
    {
      icon: Award,
      title: 'Loyalty Rewards',
      desc: 'Earn points on every visit, referral & feedback. Redeem for free handcrafted coffees & bill discounts.',
      action: () => setActiveTab('loyalty'),
    },
    {
      icon: Star,
      title: 'Customer Reviews',
      desc: 'Verified customer ratings on food, service & ambience. Share your feedback and earn +5 points.',
      action: () => setActiveTab('reservations'),
    },
  ];

  const popularItems = MENU_ITEMS.filter((item) => item.popular).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream-beige pt-12 pb-20 border-b border-taupe/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-white text-espresso text-xs font-semibold tracking-wide border border-taupe/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-caramel" />
                <span>Modern Customer Café Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-espresso tracking-tight leading-[1.15]">
                Your Perfect Café Experience Starts Here.
              </h1>

              <p className="text-lg sm:text-xl text-charcoal/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Reserve your table, pre-order your favorite food, and enjoy rewards with{' '}
                <strong className="text-espresso font-semibold">Sip & Save</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-book-table-btn"
                  onClick={() => setActiveTab('booking')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-espresso hover:bg-deep-coffee text-warm-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <Calendar className="w-5 h-5 text-soft-gold" />
                  <span>Book a Table</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  id="hero-explore-menu-btn"
                  onClick={() => setActiveTab('menu')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-warm-white hover:bg-cream-beige/60 text-espresso border border-taupe/30 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <UtensilsCrossed className="w-5 h-5 text-deep-coffee" />
                  <span>Explore Menu</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal/75">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sage" />
                  <span>Real-time Table Availability</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-caramel" />
                  <span>Zero Waiting Time</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-deep-coffee" />
                  <span>Instant Loyalty Points</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-warm-white">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                    alt="Sip & Save Café Interior"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-warm-white">
                    <p className="text-xs uppercase tracking-widest text-soft-gold font-bold">
                      Warm Roasts & Fresh Bakes
                    </p>
                    <h3 className="text-xl font-serif font-bold text-warm-white">Handcrafted with Passion</h3>
                    <p className="text-xs text-warm-white/90 mt-1">
                      Open daily from 10:00 AM to 9:00 PM • Window & Garden Seating
                    </p>
                  </div>
                </div>

                {/* Floating Highlight Badge */}
                <div className="absolute -top-4 -left-4 bg-warm-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md border border-taupe/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cream-beige flex items-center justify-center text-espresso">
                    <Coffee className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-espresso">Fresh Arabica Roast</p>
                    <p className="text-[11px] text-taupe">Cappuccino, Latte & Brews</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-warm-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md border border-taupe/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cream-beige flex items-center justify-center text-caramel">
                    <Star className="w-5 h-5 fill-soft-gold text-soft-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-espresso">4.9 / 5.0 Rating</p>
                    <p className="text-[11px] text-taupe">Over 850+ Happy Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Simple Core Features (Prompt Mandate) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Designed for Effortless Café Dining
          </h2>
          <p className="text-sm text-charcoal/75 mt-2">
            Everything you need for a relaxed coffee date, business chat, or weekend hangout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={feat.action}
                className="bg-warm-white rounded-2xl p-6 border border-taupe/20 shadow-xs hover:shadow-md hover:border-taupe/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cream-beige group-hover:bg-caramel/15 text-deep-coffee group-hover:text-espresso flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-deep-coffee" />
                  </div>
                  <h3 className="text-lg font-bold text-espresso group-hover:text-deep-coffee transition-colors font-serif">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-taupe/15 flex items-center text-xs font-semibold text-caramel group-hover:translate-x-1 transition-transform">
                  <span>Explore feature</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured / Popular Menu Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-beige/60 rounded-3xl p-6 sm:p-10 border border-taupe/20 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-caramel">
                Artisan Kitchen
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso mt-1">
                Customer Favorites & Fresh Specials
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 mt-1">
                Pre-order these signature treats when reserving your table.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('menu')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-deep-coffee hover:text-espresso transition cursor-pointer"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 text-caramel" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="bg-warm-white rounded-2xl overflow-hidden border border-taupe/20 shadow-xs hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-cream-beige">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-warm-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold text-espresso shadow-xs">
                    ₹{item.price}
                  </div>
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-block w-3.5 h-3.5 rounded-xs border p-0.5 ${
                        item.isVeg ? 'border-sage' : 'border-terracotta'
                      }`}
                    >
                      <span
                        className={`block w-full h-full rounded-full ${
                          item.isVeg ? 'bg-sage' : 'bg-terracotta'
                        }`}
                      />
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-espresso text-base">{item.name}</h3>
                    <p className="text-xs text-charcoal/70 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-taupe/15 flex items-center justify-between">
                    <span className="text-xs font-semibold text-taupe">{item.category}</span>
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="text-xs font-bold text-caramel hover:text-deep-coffee flex items-center gap-1 cursor-pointer"
                    >
                      Pre-Order <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Loved by Coffee Enthusiasts
          </h2>
          <p className="text-sm text-charcoal/75 mt-2">
            Read verified reviews from guests who booked tables and enjoyed Sip & Save rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-warm-white rounded-2xl p-6 border border-taupe/20 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-soft-gold mb-3">
                  {[...Array(rev.overallRating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-soft-gold text-soft-gold" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/80 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-taupe/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cream-beige text-espresso font-bold text-xs flex items-center justify-center border border-taupe/20">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-espresso">{rev.userName}</p>
                    <p className="text-[10px] text-taupe">Verified Café Guest</p>
                  </div>
                </div>
                <span className="text-[11px] text-sage bg-sage/10 px-2 py-0.5 rounded-md font-semibold">
                  5.0 ★
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-espresso rounded-3xl p-8 sm:p-12 text-warm-white text-center sm:text-left relative overflow-hidden shadow-xl border border-deep-coffee">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-warm-white leading-tight">
              Ready for your cozy table?
            </h2>
            <p className="text-cream-beige/90 text-sm sm:text-base mt-3 leading-relaxed">
              Book a table in less than 60 seconds. Choose your preferred time, seating section, and
              optionally pre-order food to skip any kitchen wait time!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-6 py-3 bg-caramel hover:bg-soft-gold text-espresso font-bold rounded-xl shadow-xs transition text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Reserve a Table Now
              </button>
              {!currentUser && (
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-6 py-3 bg-deep-coffee hover:bg-deep-coffee/80 border border-soft-gold/30 text-warm-white font-semibold rounded-xl transition text-sm cursor-pointer"
                >
                  Create Customer Account (+10 Pts)
                </button>
              )}
            </div>
          </div>
          <Coffee className="absolute -bottom-6 -right-6 w-48 h-48 text-warm-white/5 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};
