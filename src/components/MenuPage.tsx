import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  Plus,
  Minus,
  Search,
  Check,
  ArrowRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/initialData';
import { MenuCategory, MenuItem } from '../types';

export const MenuPage: React.FC = () => {
  const {
    cart,
    addToCart,
    updateCartQty,
    bookingDraft,
    setActiveTab,
    getCartTotals,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const categories: MenuCategory[] = ['All', 'Coffee', 'Snacks', 'Main Course', 'Desserts'];

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = vegOnly ? item.isVeg : true;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const cartItemCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const { total } = getCartTotals();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Active Table Reservation Banner (if customer is booking) */}
      {bookingDraft.tableId && (
        <div className="bg-cream-beige border border-taupe/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-espresso text-warm-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-soft-gold" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-caramel">
                Pre-Ordering for Table Reservation
              </p>
              <p className="text-sm font-bold text-espresso">
                Table {bookingDraft.tableId} • {bookingDraft.date} at {bookingDraft.time} ({bookingDraft.guests})
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('confirmation')}
            className="w-full sm:w-auto px-4 py-2 bg-caramel hover:bg-deep-coffee text-warm-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <span>Review Booking & Food ({cartItemCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25">
          <UtensilsCrossed className="w-3.5 h-3.5 text-caramel" />
          <span>Café Menu & Pre-Ordering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso">
          Artisan Drinks & Gourmet Treats
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70">
          Crafted fresh with single-origin beans, organic dairy, and oven-baked ingredients.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Filter Tabs (Prompt Requirement: All | Coffee | Snacks | Main Course | Desserts) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-espresso text-warm-white shadow-xs'
                    : 'bg-warm-white text-charcoal border border-taupe/25 hover:bg-cream-beige/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar & Veg filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-taupe" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food or coffee..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-warm-white border border-taupe/30 text-charcoal rounded-xl focus:outline-hidden focus:border-caramel placeholder-taupe"
              />
            </div>

            <label className="flex items-center gap-2 bg-warm-white px-3 py-2 rounded-xl border border-taupe/30 text-xs font-semibold text-charcoal cursor-pointer shrink-0 select-none">
              <input
                type="checkbox"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="rounded border-taupe/40 text-sage focus:ring-sage accent-sage"
              />
              <span>Veg Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const cartItem = cart.find((ci) => ci.menuItem.id === item.id);
          const inCartCount = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={item.id}
              id={`menu-item-${item.id}`}
              className="bg-warm-white rounded-2xl overflow-hidden border border-taupe/20 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Food Image */}
                <div className="relative h-44 overflow-hidden bg-cream-beige">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-3 left-3 bg-warm-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs">
                    <span
                      className={`block w-3 h-3 rounded-xs border p-0.5 ${
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

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 bg-espresso/85 backdrop-blur-xs text-soft-gold px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
                    ₹{item.price}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-caramel">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-bold text-espresso bg-soft-gold/25 px-2 py-0.5 rounded-full border border-soft-gold/30">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-espresso">{item.name}</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action / Quantity Controls */}
              <div className="p-4 pt-0">
                {inCartCount > 0 ? (
                  <div className="flex items-center justify-between bg-cream-beige/60 rounded-xl p-1 border border-taupe/20">
                    <button
                      onClick={() => updateCartQty(item.id, -1)}
                      className="w-8 h-8 rounded-lg bg-warm-white text-espresso flex items-center justify-center font-bold shadow-xs hover:bg-cream-beige transition cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-espresso px-2">
                      {inCartCount} in Cart
                    </span>
                    <button
                      onClick={() => updateCartQty(item.id, 1)}
                      className="w-8 h-8 rounded-lg bg-espresso text-warm-white flex items-center justify-center font-bold shadow-xs hover:bg-deep-coffee transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-2.5 bg-cream-beige/50 hover:bg-caramel text-espresso hover:text-warm-white border border-taupe/30 hover:border-caramel rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-warm-white rounded-3xl border border-taupe/20 p-8">
          <UtensilsCrossed className="w-10 h-10 text-taupe mx-auto mb-2 opacity-50" />
          <p className="font-bold text-espresso">No menu items found</p>
          <p className="text-xs text-charcoal/70 mt-1">
            Try adjusting your search keywords or switching category filters.
          </p>
        </div>
      )}

      {/* Floating Bottom Cart Bar if items are added */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-40 animate-slide-up">
          <div className="bg-espresso text-warm-white p-4 rounded-2xl shadow-xl flex items-center justify-between border border-deep-coffee">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-caramel text-warm-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-soft-gold">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in pre-order cart
                </p>
                <p className="text-sm font-bold text-warm-white">Estimated Total: ₹{total}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('cart')}
                className="px-4 py-2 bg-warm-white/10 hover:bg-warm-white/20 text-warm-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                View Cart
              </button>
              <button
                onClick={() => setActiveTab('confirmation')}
                className="px-4 py-2 bg-caramel hover:bg-soft-gold text-espresso text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
