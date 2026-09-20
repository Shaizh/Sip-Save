import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  UtensilsCrossed,
  Sparkles,
  Calendar,
  Gift,
  Tag,
  CheckCircle2,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    bookingDraft,
    setActiveTab,
    getCartTotals,
    appliedReward,
    removeReward,
    currentUser,
    rewards,
    applyReward,
  } = useApp();

  const { subtotal, tax, discount, total } = getCartTotals();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-warm-white rounded-3xl border border-taupe/20 shadow-xs space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-cream-beige text-caramel flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-serif font-bold text-espresso">
          Your Pre-Order Cart is Empty
        </h2>
        <p className="text-xs text-charcoal/70 leading-relaxed">
          Pre-order fresh coffee, snacks, main course & desserts to accompany your table booking.
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="w-full py-3 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Browse Café Menu</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25 mb-1">
            <ShoppingBag className="w-3.5 h-3.5 text-caramel" />
            <span>Customer Pre-Order</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Your Food & Drink Cart
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-terracotta hover:text-terracotta/80 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All Items
        </button>
      </div>

      {/* Table Link status */}
      {bookingDraft.tableId ? (
        <div className="bg-cream-beige border border-taupe/25 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-espresso text-warm-white flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-soft-gold" />
            </div>
            <div>
              <p className="text-xs font-bold text-espresso">
                Pre-Ordered for Table {bookingDraft.tableId}
              </p>
              <p className="text-[11px] text-charcoal/70">
                {bookingDraft.date} at {bookingDraft.time} • {bookingDraft.guests}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('booking')}
            className="text-xs font-bold text-caramel hover:underline cursor-pointer"
          >
            Change Table
          </button>
        </div>
      ) : (
        <div className="bg-cream-beige/50 border border-taupe/20 rounded-2xl p-4 flex items-center justify-between">
          <p className="text-xs text-charcoal/75 font-medium">
            You have not selected a table yet. You can attach this food order when picking a table.
          </p>
          <button
            onClick={() => setActiveTab('booking')}
            className="text-xs font-bold text-caramel hover:underline whitespace-nowrap ml-2 cursor-pointer"
          >
            Pick a Table →
          </button>
        </div>
      )}

      {/* Items List (Prompt Layout Example: Item x Qty = Subtotal) */}
      <div className="bg-warm-white rounded-3xl border border-taupe/20 shadow-xs divide-y divide-taupe/15 overflow-hidden">
        {cart.map((cartItem) => {
          const itemSubtotal = cartItem.menuItem.price * cartItem.quantity;
          return (
            <div
              key={cartItem.menuItem.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={cartItem.menuItem.image}
                  alt={cartItem.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover border border-taupe/20 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-base text-espresso">
                    {cartItem.menuItem.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 mt-0.5">
                    ₹{cartItem.menuItem.price} each • {cartItem.menuItem.category}
                  </p>
                  <p className="text-xs font-mono font-semibold text-caramel mt-1 sm:hidden">
                    {cartItem.menuItem.name} × {cartItem.quantity} = ₹{itemSubtotal}
                  </p>
                </div>
              </div>

              {/* Desktop equation & Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="hidden sm:block text-right">
                  <span className="text-xs text-taupe block font-mono">
                    ₹{cartItem.menuItem.price} × {cartItem.quantity}
                  </span>
                  <span className="text-base font-bold text-espresso block">
                    = ₹{itemSubtotal}
                  </span>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center bg-cream-beige/60 rounded-xl p-1 border border-taupe/20">
                  <button
                    onClick={() => updateCartQty(cartItem.menuItem.id, -1)}
                    className="w-7 h-7 rounded-lg bg-warm-white text-espresso flex items-center justify-center font-bold shadow-xs hover:bg-cream-beige transition cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-espresso px-3">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQty(cartItem.menuItem.id, 1)}
                    className="w-7 h-7 rounded-lg bg-espresso text-warm-white flex items-center justify-center font-bold shadow-xs hover:bg-deep-coffee transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(cartItem.menuItem.id)}
                  className="p-2 text-taupe hover:text-terracotta transition cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rewards / Discounts Redemption in Cart */}
      <div className="bg-warm-white rounded-3xl p-6 border border-taupe/20 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-espresso">
            <Gift className="w-5 h-5 text-caramel" />
            <h3 className="font-bold text-sm text-espresso font-serif">Apply Loyalty Reward</h3>
          </div>
          {currentUser && (
            <span className="text-xs text-charcoal/70">
              Available Points: <strong className="text-espresso">{currentUser.loyaltyPoints}</strong>
            </span>
          )}
        </div>

        {appliedReward ? (
          <div className="p-3.5 bg-sage/10 border border-sage/25 rounded-xl flex items-center justify-between text-xs text-sage">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sage" />
              <span>
                Applied: <strong className="text-espresso">{appliedReward.title}</strong> (-₹{discount})
              </span>
            </div>
            <button
              onClick={removeReward}
              className="text-terracotta hover:underline font-semibold cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rewards.map((rew) => {
              const canAfford = currentUser ? currentUser.loyaltyPoints >= rew.pointsCost : false;
              return (
                <button
                  key={rew.id}
                  disabled={!canAfford}
                  onClick={() => applyReward(rew)}
                  className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                    canAfford
                      ? 'border-taupe/25 bg-cream-beige/50 hover:border-caramel cursor-pointer'
                      : 'border-taupe/15 bg-cream-beige/20 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <span className="font-bold text-espresso block">{rew.title}</span>
                    <span className="text-[11px] text-charcoal/70">{rew.description}</span>
                  </div>
                  <span className="font-bold text-caramel ml-2 shrink-0">
                    {rew.pointsCost} Pts
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cart Totals Summary */}
      <div className="bg-cream-beige/60 rounded-3xl p-6 sm:p-8 border border-taupe/20 space-y-3 font-mono text-sm">
        <div className="flex justify-between items-center py-1">
          <span className="text-taupe">Subtotal:</span>
          <span className="font-bold text-espresso">₹{subtotal}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-taupe">Taxes (5% GST):</span>
          <span className="font-bold text-espresso">₹{tax}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center py-1 text-sage font-bold">
            <span>Loyalty Reward Discount:</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="pt-3 border-t border-taupe/20 flex justify-between items-baseline">
          <span className="text-base font-serif font-bold text-espresso">Final Total:</span>
          <span className="text-2xl font-bold font-serif text-espresso">₹{total}</span>
        </div>
      </div>

      {/* Confirm Pre-Order Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setActiveTab('menu')}
          className="w-full sm:w-1/2 py-3.5 border border-taupe/30 text-espresso hover:bg-cream-beige font-bold rounded-xl text-sm transition cursor-pointer"
        >
          Add More Items from Menu
        </button>

        <button
          id="confirm-preorder-btn"
          onClick={() => setActiveTab('confirmation')}
          className="w-full sm:w-1/2 py-3.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Confirm Pre-Order & Proceed</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
