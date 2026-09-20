import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reservation } from '../types';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UtensilsCrossed,
  Star,
  Edit3,
  Trash2,
  Sparkles,
  Award,
  ArrowRight,
  Eye,
  Info,
} from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';
import { BOOKING_TIMES, GUEST_OPTIONS } from '../data/initialData';
import { timeTo24H, time24To12, validateCafeHours } from '../utils/timeUtils';

export const ReservationsPage: React.FC = () => {
  const {
    currentUser,
    reservations,
    cancelReservation,
    modifyReservation,
    completeVisitSimulation,
    setActiveTab,
    tables,
    showToast,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'previous'>('upcoming');
  const [selectedForDetails, setSelectedForDetails] = useState<Reservation | null>(null);
  const [selectedForModify, setSelectedForModify] = useState<Reservation | null>(null);
  const [selectedForFeedback, setSelectedForFeedback] = useState<Reservation | null>(null);

  // Modify form state
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editTimeCustom, setEditTimeCustom] = useState(false);
  const [editGuests, setEditGuests] = useState('');
  const [editTable, setEditTable] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-warm-white rounded-3xl border border-taupe/20 shadow-xs space-y-4">
        <Calendar className="w-12 h-12 text-caramel mx-auto" />
        <h2 className="text-xl font-serif font-bold text-espresso">Please Log In</h2>
        <p className="text-xs text-charcoal/70">
          Log in to view your upcoming and previous table reservations.
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

  // Filter reservations for current user
  const userReservations = reservations.filter((r) => r.userId === currentUser.id);
  const upcomingList = userReservations.filter(
    (r) => r.status === 'Confirmed' || r.status === 'Pending'
  );
  const previousList = userReservations.filter(
    (r) => r.status === 'Completed' || r.status === 'Cancelled'
  );

  const startModify = (res: Reservation) => {
    setSelectedForModify(res);
    setEditDate(res.date);
    setEditTime(res.time);
    setEditTimeCustom(!BOOKING_TIMES.includes(res.time));
    setEditGuests(typeof res.guests === 'number' ? `${res.guests} Guests` : res.guests);
    setEditTable(res.tableId);
  };

  const handleSaveModify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForModify) return;

    const validation = validateCafeHours(editTime);
    if (!validation.valid) {
      showToast(validation.message || 'Please select a time within café operating hours.', 'error');
      return;
    }

    const success = modifyReservation(selectedForModify.id, {
      date: editDate,
      time: editTime,
      guests: editGuests,
      tableId: editTable,
    });

    if (success) {
      setSelectedForModify(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25 mb-1">
            <Calendar className="w-3.5 h-3.5 text-caramel" />
            <span>Customer Bookings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            My Reservations
          </h1>
        </div>

        <button
          onClick={() => setActiveTab('booking')}
          className="px-4 py-2.5 bg-caramel hover:bg-deep-coffee text-warm-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Another Table</span>
        </button>
      </div>

      {/* Tabs: Upcoming Reservations vs Previous Reservations */}
      <div className="flex items-center gap-2 bg-cream-beige/60 p-1.5 rounded-2xl w-full sm:w-fit border border-taupe/20">
        <button
          onClick={() => setActiveSubTab('upcoming')}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'upcoming'
              ? 'bg-warm-white text-espresso shadow-xs'
              : 'text-charcoal/70 hover:text-espresso'
          }`}
        >
          <span>Upcoming Reservations</span>
          <span className="w-5 h-5 rounded-full bg-espresso text-warm-white text-[11px] flex items-center justify-center font-mono">
            {upcomingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('previous')}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'previous'
              ? 'bg-warm-white text-espresso shadow-xs'
              : 'text-charcoal/70 hover:text-espresso'
          }`}
        >
          <span>Previous Reservations</span>
          <span className="w-5 h-5 rounded-full bg-taupe/30 text-espresso text-[11px] flex items-center justify-center font-mono">
            {previousList.length}
          </span>
        </button>
      </div>

      {/* Upcoming Tab Content */}
      {activeSubTab === 'upcoming' && (
        <div className="space-y-6">
          {upcomingList.length === 0 ? (
            <div className="text-center py-16 bg-warm-white rounded-3xl border border-taupe/20 p-8 space-y-4">
              <Calendar className="w-12 h-12 text-taupe mx-auto opacity-50" />
              <h3 className="font-serif font-bold text-lg text-espresso">
                No upcoming reservations
              </h3>
              <p className="text-xs text-charcoal/70">
                Reserve a cozy table for your next café visit.
              </p>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-5 py-2.5 bg-caramel hover:bg-deep-coffee text-warm-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Book a Table Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingList.map((res) => (
                <div
                  key={res.id}
                  id={`reservation-card-${res.id}`}
                  className="bg-warm-white rounded-3xl p-6 sm:p-7 border border-taupe/20 shadow-xs hover:shadow-sm transition-all space-y-4"
                >
                  {/* Top Bar: ID, Date, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-taupe/15">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-espresso text-warm-white flex items-center justify-center font-bold text-xs shrink-0">
                        {res.tableId}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-caramel">
                            Booking ID: {res.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              res.status === 'Confirmed'
                                ? 'bg-sage/15 text-sage'
                                : 'bg-caramel/15 text-caramel'
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-espresso mt-0.5">
                          Table {res.tableId} • {res.tableSeats} Seats
                        </h3>
                      </div>
                    </div>

                    {/* Simulation button for presentations */}
                    <button
                      onClick={() => completeVisitSimulation(res.id)}
                      title="Viva Tool: Mark this visit as completed to test points & review submission"
                      className="px-3 py-1.5 rounded-xl bg-soft-gold/15 hover:bg-soft-gold/25 text-espresso border border-soft-gold/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-caramel" />
                      <span>Simulate Visit (+10 Pts)</span>
                    </button>
                  </div>

                  {/* Details Grid (Prompt Requirement: Date, Time, Table, Guests, Status) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 font-mono text-xs">
                    <div>
                      <span className="text-taupe block font-sans font-bold uppercase text-[10px]">
                        Date
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-espresso font-sans mt-0.5 block">
                        {res.formattedDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-taupe block font-sans font-bold uppercase text-[10px]">
                        Time
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-espresso font-sans mt-0.5 block">
                        {res.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-taupe block font-sans font-bold uppercase text-[10px]">
                        Table
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-espresso font-sans mt-0.5 block">
                        {res.tableId} ({res.tableSeats} Seats)
                      </span>
                    </div>
                    <div>
                      <span className="text-taupe block font-sans font-bold uppercase text-[10px]">
                        Guests
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-espresso font-sans mt-0.5 block">
                        {res.guests}
                      </span>
                    </div>
                  </div>

                  {/* Pre-ordered Food Summary Preview */}
                  {res.foodItems && res.foodItems.length > 0 && (
                    <div className="bg-cream-beige/60 rounded-2xl p-4 border border-taupe/20">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-caramel block mb-2">
                        Pre-Ordered Menu ({res.foodItems.length} items • ₹{res.totalAmount})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {res.foodItems.map((fi, idx) => (
                          <span
                            key={idx}
                            className="bg-warm-white px-2.5 py-1 rounded-lg text-xs border border-taupe/20 text-charcoal font-medium"
                          >
                            {fi.item.name} <strong className="text-caramel">× {fi.quantity}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons (Prompt Requirement: View Details, Modify Booking, Cancel Booking) */}
                  <div className="pt-3 border-t border-taupe/15 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedForDetails(res)}
                        className="px-3.5 py-2 bg-cream-beige/50 hover:bg-cream-beige text-espresso text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => startModify(res)}
                        className="px-3.5 py-2 bg-cream-beige/50 hover:bg-cream-beige text-espresso text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modify Booking</span>
                      </button>
                    </div>

                    <button
                      onClick={() => cancelReservation(res.id)}
                      className="px-3.5 py-2 text-terracotta hover:bg-terracotta/10 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Previous Tab Content */}
      {activeSubTab === 'previous' && (
        <div className="space-y-6">
          {previousList.length === 0 ? (
            <div className="text-center py-16 bg-warm-white rounded-3xl border border-taupe/20 p-8 space-y-2">
              <Calendar className="w-12 h-12 text-taupe mx-auto opacity-50" />
              <h3 className="font-serif font-bold text-lg text-espresso">
                No previous visits yet
              </h3>
              <p className="text-xs text-charcoal/70">
                Once you complete your café reservation, it will appear here for review and reward logging.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {previousList.map((res) => (
                <div
                  key={res.id}
                  className="bg-warm-white rounded-3xl p-6 border border-taupe/20 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-taupe/15">
                    <div>
                      <span className="font-mono font-bold text-xs text-caramel">
                        Booking ID: {res.id}
                      </span>
                      <h3 className="font-bold text-base text-espresso mt-0.5">
                        Table {res.tableId} • {res.formattedDate}
                      </h3>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase self-start sm:self-auto ${
                        res.status === 'Completed'
                          ? 'bg-sage/15 text-sage'
                          : 'bg-taupe/20 text-charcoal/70'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  {/* Info Row: Date, Time, Table, Guests, Food */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1 text-xs">
                    <div>
                      <span className="text-taupe block font-bold uppercase text-[10px]">
                        Time
                      </span>
                      <span className="font-semibold text-espresso mt-0.5 block">{res.time}</span>
                    </div>
                    <div>
                      <span className="text-taupe block font-bold uppercase text-[10px]">
                        Table
                      </span>
                      <span className="font-semibold text-espresso mt-0.5 block">
                        {res.tableId} ({res.tableSeats} Seats)
                      </span>
                    </div>
                    <div>
                      <span className="text-taupe block font-bold uppercase text-[10px]">
                        Guests
                      </span>
                      <span className="font-semibold text-espresso mt-0.5 block">{res.guests}</span>
                    </div>
                    <div>
                      <span className="text-taupe block font-bold uppercase text-[10px]">
                        Total Bill
                      </span>
                      <span className="font-semibold text-espresso mt-0.5 block">
                        ₹{res.totalAmount || res.foodSubtotal || 0}
                      </span>
                    </div>
                  </div>

                  {/* Food order details if present */}
                  {res.foodItems && res.foodItems.length > 0 && (
                    <div className="bg-cream-beige/60 rounded-xl p-3 text-xs text-charcoal">
                      <span className="font-bold text-espresso block mb-1">Pre-Ordered Items:</span>
                      <span>
                        {res.foodItems.map((fi) => `${fi.item.name} (×${fi.quantity})`).join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Feedback Button (Prompt Requirement: Only allow reviews for completed reservations) */}
                  {res.status === 'Completed' && (
                    <div className="pt-3 border-t border-taupe/15 flex items-center justify-between">
                      {res.reviewSubmitted ? (
                        <div className="flex items-center gap-1.5 text-xs text-sage font-bold bg-sage/10 px-3 py-1.5 rounded-xl border border-sage/25">
                          <CheckCircle2 className="w-4 h-4 text-sage" />
                          <span>Feedback Submitted ⭐ (+5 Points Earned)</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedForFeedback(res)}
                          className="px-4 py-2 bg-caramel hover:bg-deep-coffee text-warm-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 text-soft-gold fill-soft-gold" />
                          <span>Submit Customer Review (+5 Points)</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View Details Modal */}
      {selectedForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-xs p-4">
          <div className="bg-warm-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-taupe/20 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-taupe/15">
              <div>
                <span className="text-xs font-mono font-bold text-caramel">
                  Booking ID: {selectedForDetails.id}
                </span>
                <h3 className="text-xl font-serif font-bold text-espresso mt-0.5">
                  Table Reservation Pass
                </h3>
              </div>
              <button
                onClick={() => setSelectedForDetails(null)}
                className="text-taupe hover:text-charcoal font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 bg-cream-beige/60 p-4 rounded-2xl border border-taupe/20">
                <div>
                  <span className="text-taupe block font-sans font-bold uppercase">Guest</span>
                  <span className="font-bold text-sm text-espresso font-sans">
                    {selectedForDetails.userName}
                  </span>
                </div>
                <div>
                  <span className="text-taupe block font-sans font-bold uppercase">Contact</span>
                  <span className="font-bold text-sm text-espresso font-sans">
                    {selectedForDetails.userMobile}
                  </span>
                </div>
                <div>
                  <span className="text-taupe block font-sans font-bold uppercase">Date & Time</span>
                  <span className="font-bold text-sm text-espresso font-sans">
                    {selectedForDetails.formattedDate} at {selectedForDetails.time}
                  </span>
                </div>
                <div>
                  <span className="text-taupe block font-sans font-bold uppercase">Seating</span>
                  <span className="font-bold text-sm text-espresso font-sans">
                    {selectedForDetails.tableId} ({selectedForDetails.guests})
                  </span>
                </div>
              </div>

              {selectedForDetails.foodItems && selectedForDetails.foodItems.length > 0 && (
                <div className="space-y-2">
                  <span className="font-sans font-bold text-xs uppercase text-caramel block">
                    Pre-Ordered Items:
                  </span>
                  <div className="bg-cream-beige/60 p-3 rounded-2xl space-y-1.5 border border-taupe/20">
                    {selectedForDetails.foodItems.map((fi, idx) => (
                      <div key={idx} className="flex justify-between text-charcoal">
                        <span>
                          {fi.item.name} × {fi.quantity}
                        </span>
                        <span className="font-bold text-caramel">₹{fi.subtotal}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-taupe/20 flex justify-between font-bold text-sm text-espresso">
                      <span>Total:</span>
                      <span>₹{selectedForDetails.totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedForDetails(null)}
              className="w-full py-2.5 bg-espresso hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-xs cursor-pointer transition"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

      {/* Modify Booking Modal */}
      {selectedForModify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-xs p-4">
          <div className="bg-warm-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-taupe/20 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-taupe/15">
              <h3 className="font-serif font-bold text-lg text-espresso">Modify Reservation</h3>
              <button
                onClick={() => setSelectedForModify(null)}
                className="text-taupe hover:text-charcoal font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModify} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-charcoal mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full p-2 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold uppercase text-charcoal">Time Slot</label>
                  <button
                    type="button"
                    onClick={() => setEditTimeCustom(!editTimeCustom)}
                    className="text-[11px] text-caramel hover:underline font-bold cursor-pointer"
                  >
                    {editTimeCustom ? '← Quick Presets' : '+ Custom Time'}
                  </button>
                </div>

                {editTimeCustom ? (
                  <div className="space-y-1.5">
                    <input
                      type="time"
                      min="10:00"
                      max="21:30"
                      value={timeTo24H(editTime)}
                      onChange={(e) => setEditTime(time24To12(e.target.value))}
                      className="w-full p-2 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel text-xs cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[11px] text-charcoal/70 px-1">
                      <span>Selected: <strong className="text-espresso">{editTime}</strong></span>
                      <span className="text-caramel font-semibold">Custom Slot</span>
                    </div>
                  </div>
                ) : (
                  <select
                    value={BOOKING_TIMES.includes(editTime) ? editTime : ''}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setEditTimeCustom(true);
                      } else {
                        setEditTime(e.target.value);
                      }
                    }}
                    className="w-full p-2 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel text-xs cursor-pointer"
                  >
                    {!BOOKING_TIMES.includes(editTime) && (
                      <option value="">{editTime} (Custom)</option>
                    )}
                    {BOOKING_TIMES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                    <option value="__custom__">+ Enter Custom Timing...</option>
                  </select>
                )}
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal mb-1">Guests</label>
                <select
                  value={editGuests}
                  onChange={(e) => setEditGuests(e.target.value)}
                  className="w-full p-2 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
                >
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal mb-1">Table</label>
                <select
                  value={editTable}
                  onChange={(e) => setEditTable(e.target.value)}
                  className="w-full p-2 border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:border-caramel"
                >
                  {tables.map((tbl) => (
                    <option key={tbl.id} value={tbl.id}>
                      {tbl.id} — {tbl.seats} Seats ({tbl.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedForModify(null)}
                  className="w-1/2 py-2.5 border border-taupe/30 rounded-xl font-bold text-espresso hover:bg-cream-beige cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl cursor-pointer transition shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Feedback Modal */}
      {selectedForFeedback && (
        <FeedbackModal
          reservation={selectedForFeedback}
          onClose={() => setSelectedForFeedback(null)}
        />
      )}
    </div>
  );
};
