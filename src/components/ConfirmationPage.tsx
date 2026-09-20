import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Users,
  UtensilsCrossed,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Printer,
  ChevronLeft,
  Coffee,
  ShieldCheck,
} from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const {
    currentUser,
    bookingDraft,
    cart,
    getCartTotals,
    confirmBookingAndPreOrder,
    lastConfirmedReservation,
    setActiveTab,
    tables,
  } = useApp();

  const { subtotal, tax, discount, total } = getCartTotals();
  const selectedTableObj = tables.find((t) => t.id === bookingDraft.tableId);

  // Helper date formatter
  const formatDateDisplay = (dateString: string): string => {
    try {
      const [y, m, d] = dateString.split('-');
      const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // If a reservation was just confirmed, display the Post-Confirmation Success View!
  if (lastConfirmedReservation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        {/* Success Card */}
        <div className="bg-warm-white rounded-3xl p-8 sm:p-10 border border-taupe/20 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-sage/15 text-sage flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sage bg-sage/10 px-3 py-1 rounded-full border border-sage/30">
              Status: {lastConfirmedReservation.status}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso">
              Reservation Confirmed! ☕🎉
            </h1>
            <p className="text-sm text-charcoal/70">
              We have reserved your table and prepared your kitchen pre-order ticket.
            </p>
          </div>

          {/* Booking ID Highlight */}
          <div className="bg-cream-beige p-4 rounded-2xl border border-taupe/25 inline-block">
            <span className="text-xs text-taupe uppercase font-bold block">
              Unique Booking Reference
            </span>
            <span className="text-2xl font-mono font-bold text-espresso tracking-wider">
              Booking ID: {lastConfirmedReservation.id}
            </span>
          </div>

          {/* Details Grid */}
          <div className="bg-cream-beige/50 rounded-2xl p-6 border border-taupe/20 text-left space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-taupe/15">
              <div>
                <span className="text-[11px] font-bold text-taupe uppercase block">Date</span>
                <span className="text-xs sm:text-sm font-bold text-espresso mt-0.5 block">
                  {lastConfirmedReservation.formattedDate}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-taupe uppercase block">Time</span>
                <span className="text-xs sm:text-sm font-bold text-espresso mt-0.5 block">
                  {lastConfirmedReservation.time}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-taupe uppercase block">Table</span>
                <span className="text-xs sm:text-sm font-bold text-espresso mt-0.5 block">
                  {lastConfirmedReservation.tableId} ({lastConfirmedReservation.tableSeats} Seats)
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-taupe uppercase block">Guests</span>
                <span className="text-xs sm:text-sm font-bold text-espresso mt-0.5 block">
                  {lastConfirmedReservation.guests}
                </span>
              </div>
            </div>

            {/* Pre-ordered Food Summary */}
            {lastConfirmedReservation.foodItems && lastConfirmedReservation.foodItems.length > 0 ? (
              <div className="space-y-2">
                <span className="text-xs font-bold text-caramel uppercase tracking-wider block">
                  Pre-Ordered Food & Drinks
                </span>
                <div className="space-y-1.5">
                  {lastConfirmedReservation.foodItems.map((fi, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs font-mono py-1 border-b border-taupe/15 last:border-0"
                    >
                      <span className="text-espresso font-sans font-semibold">
                        {fi.item.name} × {fi.quantity}
                      </span>
                      <span className="font-bold text-caramel">₹{fi.subtotal}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center font-bold text-sm text-espresso">
                  <span>Total Amount:</span>
                  <span className="text-base text-caramel font-serif">
                    ₹{lastConfirmedReservation.totalAmount}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-charcoal/70 italic">
                No food pre-ordered. You can order fresh from the barista upon arrival!
              </p>
            )}
          </div>

          {/* Post-confirmation actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('reservations')}
              className="w-full sm:w-1/2 py-3.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View in My Reservations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-1/2 py-3.5 bg-cream-beige/60 hover:bg-cream-beige text-espresso font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pre-confirmation Review Screen (Section 9: Reservation Details, Food Pre-Order, Total, Confirm Button)
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25">
          <ShieldCheck className="w-3.5 h-3.5 text-caramel" />
          <span>Final Review</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
          Confirm Reservation & Pre-Order
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70">
          Review your reservation slot and selected refreshments before confirming your seat.
        </p>
      </div>

      <div className="bg-warm-white rounded-3xl p-6 sm:p-8 border border-taupe/20 shadow-xs space-y-6">
        {/* Section 1: Reservation Details */}
        <div className="space-y-3 pb-6 border-b border-taupe/15">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-espresso flex items-center gap-2">
              <Calendar className="w-4 h-4 text-caramel" />
              Reservation Details
            </h3>
            <button
              onClick={() => setActiveTab('booking')}
              className="text-xs font-bold text-caramel hover:underline cursor-pointer"
            >
              Edit Table
            </button>
          </div>

          <div className="bg-cream-beige/60 rounded-2xl p-5 border border-taupe/20 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <span className="text-taupe block uppercase font-sans font-bold">Date:</span>
              <span className="font-bold text-sm text-espresso font-sans mt-0.5 block">
                {formatDateDisplay(bookingDraft.date)}
              </span>
            </div>
            <div>
              <span className="text-taupe block uppercase font-sans font-bold">Time:</span>
              <span className="font-bold text-sm text-espresso font-sans mt-0.5 block">
                {bookingDraft.time}
              </span>
            </div>
            <div>
              <span className="text-taupe block uppercase font-sans font-bold">Guests:</span>
              <span className="font-bold text-sm text-espresso font-sans mt-0.5 block">
                {bookingDraft.guests}
              </span>
            </div>
            <div>
              <span className="text-taupe block uppercase font-sans font-bold">Table:</span>
              <span className="font-bold text-sm text-espresso font-sans mt-0.5 block">
                {bookingDraft.tableId || 'T04'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Food Pre-Order */}
        <div className="space-y-3 pb-6 border-b border-taupe/15">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-espresso flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-caramel" />
              Food Pre-Order ({cart.length} items)
            </h3>
            <button
              onClick={() => setActiveTab('menu')}
              className="text-xs font-bold text-caramel hover:underline cursor-pointer"
            >
              {cart.length > 0 ? '+ Add More Food' : '+ Add Food from Menu'}
            </button>
          </div>

          {cart.length > 0 ? (
            <div className="bg-cream-beige/60 rounded-2xl p-5 border border-taupe/20 space-y-2">
              {cart.map((ci) => (
                <div
                  key={ci.menuItem.id}
                  className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-taupe/15 last:border-0"
                >
                  <span className="text-espresso font-semibold">
                    {ci.menuItem.name} × {ci.quantity}
                  </span>
                  <span className="font-mono font-bold text-caramel">
                    ₹{ci.menuItem.price * ci.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-cream-beige/60 rounded-2xl p-4 border border-taupe/20 flex items-center justify-between text-xs text-charcoal/70">
              <span>No pre-ordered food added. You can skip or add treats from our menu.</span>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs font-bold text-caramel hover:underline whitespace-nowrap ml-2 cursor-pointer"
              >
                Browse Menu →
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Total Summary */}
        <div className="space-y-2 bg-cream-beige/60 rounded-2xl p-5 border border-taupe/20 font-mono text-xs sm:text-sm">
          <div className="flex justify-between text-taupe">
            <span>Food Total:</span>
            <span className="font-bold text-espresso">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-taupe">
            <span>Taxes (5% GST):</span>
            <span className="font-bold text-espresso">₹{tax}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sage font-bold">
              <span>Discount Applied:</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="pt-2 border-t border-taupe/20 flex justify-between items-baseline text-base font-serif font-bold text-espresso">
            <span>Payable Amount:</span>
            <span className="text-xl text-espresso font-serif">₹{total}</span>
          </div>
          <p className="text-[10px] text-charcoal/60 pt-1">
            * Pay directly at the café desk or via QR code during your visit.
          </p>
        </div>

        {/* Action Buttons (Prompt Requirement: Confirm Reservation & Pre-Order, Go Back) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => setActiveTab('booking')}
            className="w-full sm:w-1/3 py-3.5 border border-taupe/30 text-espresso hover:bg-cream-beige font-bold rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <button
            id="final-confirm-booking-btn"
            onClick={confirmBookingAndPreOrder}
            className="w-full sm:w-2/3 py-3.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-soft-gold" />
            <span>Confirm Reservation & Pre-Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
