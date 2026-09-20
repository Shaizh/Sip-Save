import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  Info,
  ChevronRight,
  ShieldCheck,
  Sliders,
} from 'lucide-react';
import { BOOKING_TIMES, GUEST_OPTIONS } from '../data/initialData';
import {
  timeTo24H,
  time24To12,
  validateCafeHours,
} from '../utils/timeUtils';

export const TableBookingPage: React.FC = () => {
  const {
    currentUser,
    tables,
    bookingDraft,
    setBookingDraft,
    isTableBooked,
    setActiveTab,
    showToast,
  } = useApp();

  const [bookingStep, setBookingStep] = useState<'details' | 'summary'>('details');
  const [showPreOrderPrompt, setShowPreOrderPrompt] = useState(false);
  const [selectedError, setSelectedError] = useState<string | null>(null);

  // Time slot mode: 'presets' | 'custom'
  const isPresetSlot = BOOKING_TIMES.includes(bookingDraft.time);
  const [timeMode, setTimeMode] = useState<'presets' | 'custom'>(isPresetSlot ? 'presets' : 'custom');
  const [customTimeInput, setCustomTimeInput] = useState<string>(() => timeTo24H(bookingDraft.time));
  const [timeError, setTimeError] = useState<string | null>(null);

  // Quick helper to format date for display
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

  // Custom time handlers
  const handleCustomTimeChange = (new24h: string) => {
    setCustomTimeInput(new24h);
    const formatted12h = time24To12(new24h);
    const validation = validateCafeHours(formatted12h);
    if (!validation.valid) {
      setTimeError(validation.message || 'Selected time is outside café hours.');
    } else {
      setTimeError(null);
    }
    setBookingDraft((prev) => ({ ...prev, time: formatted12h }));
    setSelectedError(null);
  };

  // Table selection handler
  const handleSelectTable = (tableId: string) => {
    setSelectedError(null);

    const validation = validateCafeHours(bookingDraft.time);
    if (!validation.valid) {
      setSelectedError(validation.message || 'Please select a valid time within café operating hours.');
      showToast(validation.message || 'Time outside café hours', 'error');
      return;
    }

    // Collision check
    const booked = isTableBooked(bookingDraft.date, bookingDraft.time, tableId);
    if (booked) {
      setSelectedError('Sorry, this table is already booked for the selected time. Please select another available table or time.');
      showToast('Sorry, this table is already booked for the selected time.', 'error');
      return;
    }

    setBookingDraft((prev) => ({ ...prev, tableId }));
    showToast(`Selected Table ${tableId}!`, 'success');
  };

  // Proceed from details to summary
  const handleProceedToSummary = () => {
    const timeValidation = validateCafeHours(bookingDraft.time);
    if (!timeValidation.valid) {
      showToast(timeValidation.message || 'Please select a valid time within café operating hours.', 'error');
      return;
    }

    if (!bookingDraft.tableId) {
      showToast('Please choose an available table to continue.', 'error');
      return;
    }

    if (isTableBooked(bookingDraft.date, bookingDraft.time, bookingDraft.tableId)) {
      showToast('Sorry, this table is already booked for the selected time.', 'error');
      return;
    }

    setBookingStep('summary');
  };

  // When summary is accepted, ask whether to pre-order food
  const handleSummaryConfirmed = () => {
    setShowPreOrderPrompt(true);
  };

  const selectedTableObj = tables.find((t) => t.id === bookingDraft.tableId);

  // Quick preset dates for testing/advance booking
  const presetDates = [
    { label: 'Today', value: new Date().toISOString().split('T')[0] },
    {
      label: 'Tomorrow',
      value: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
    { label: '10 Sep 2026 (Demo)', value: '2026-09-10' },
    { label: '15 Sep 2026', value: '2026-09-15' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25">
          <CalendarIcon className="w-3.5 h-3.5 text-caramel" />
          <span>Table Reservation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso">
          Reserve Your Café Table
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70">
          Book in advance, pick your preferred seating, and optionally pre-order delicious refreshments.
        </p>
      </div>

      {bookingStep === 'details' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Date, Time, Guests */}
          <div className="lg:col-span-5 space-y-6 bg-warm-white p-6 sm:p-8 rounded-3xl border border-taupe/20 shadow-xs">
            <h2 className="text-lg font-serif font-bold text-espresso pb-3 border-b border-taupe/15 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-espresso text-warm-white text-xs flex items-center justify-center font-sans">
                1
              </span>
              Booking Parameters
            </h2>

            {/* 1. Date Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider">
                Booking Date
              </label>

              {/* Date Input */}
              <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <input
                  id="booking-date-picker"
                  type="date"
                  value={bookingDraft.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setBookingDraft((prev) => ({ ...prev, date: e.target.value }));
                    setSelectedError(null);
                  }}
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-charcoal bg-transparent focus:outline-hidden font-medium cursor-pointer"
                />
              </div>

              {/* Advance Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {presetDates.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      setBookingDraft((prev) => ({ ...prev, date: p.value }));
                      setSelectedError(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                      bookingDraft.date === p.value
                        ? 'bg-espresso text-warm-white'
                        : 'bg-cream-beige/70 text-espresso hover:bg-cream-beige'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Time Selection with Custom Timing Support */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-espresso uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-caramel" />
                  <span>Booking Time Slot</span>
                </label>
                <div className="flex items-center gap-1 text-[11px] bg-cream-beige/70 p-0.5 rounded-lg border border-taupe/20">
                  <button
                    type="button"
                    onClick={() => setTimeMode('presets')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                      timeMode === 'presets'
                        ? 'bg-espresso text-warm-white shadow-xs'
                        : 'text-charcoal/70 hover:text-espresso'
                    }`}
                  >
                    Quick Slots
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTimeMode('custom');
                      setCustomTimeInput(timeTo24H(bookingDraft.time));
                    }}
                    className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                      timeMode === 'custom'
                        ? 'bg-caramel text-warm-white shadow-xs'
                        : 'text-charcoal/70 hover:text-espresso'
                    }`}
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Custom Timing</span>
                  </button>
                </div>
              </div>

              {/* Active Selection Badge */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-warm-white border border-taupe/25 shadow-2xs">
                <span className="text-xs text-charcoal/75">Selected Time:</span>
                <span className="text-xs font-bold text-espresso flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-caramel animate-pulse" />
                  {bookingDraft.time}
                  {!isPresetSlot && (
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-caramel/15 text-caramel font-bold">
                      Custom
                    </span>
                  )}
                </span>
              </div>

              {/* Mode 1: Quick Presets */}
              {timeMode === 'presets' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {BOOKING_TIMES.map((timeSlot) => {
                      const isSelected = bookingDraft.time === timeSlot;
                      return (
                        <button
                          key={timeSlot}
                          type="button"
                          onClick={() => {
                            setBookingDraft((prev) => ({ ...prev, time: timeSlot }));
                            setCustomTimeInput(timeTo24H(timeSlot));
                            setTimeError(null);
                            setSelectedError(null);
                          }}
                          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition cursor-pointer border ${
                            isSelected
                              ? 'bg-caramel text-warm-white border-caramel shadow-xs font-bold'
                              : 'bg-warm-white text-charcoal border-taupe/25 hover:bg-cream-beige/50'
                          }`}
                        >
                          {timeSlot}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTimeMode('custom');
                      setCustomTimeInput(timeTo24H(bookingDraft.time));
                    }}
                    className="w-full py-2 text-center text-xs font-bold text-caramel hover:text-espresso transition flex items-center justify-center gap-1.5 bg-cream-beige/40 rounded-xl border border-dashed border-caramel/40 hover:border-caramel cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Need an exact minute? Pick Custom Timing →</span>
                  </button>
                </div>
              )}

              {/* Mode 2: Custom Timing Builder */}
              {timeMode === 'custom' && (
                <div className="space-y-3 p-3.5 bg-cream-beige/35 rounded-2xl border border-taupe/25">
                  {/* Primary Clock Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-espresso uppercase mb-1">
                      Exact Time (Clock Picker)
                    </label>
                    <div className="relative rounded-xl border border-taupe/30 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/15 bg-warm-white">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-taupe">
                        <Clock className="w-4 h-4 text-caramel" />
                      </div>
                      <input
                        id="custom-time-input"
                        type="time"
                        step="300"
                        min="10:00"
                        max="21:30"
                        value={customTimeInput}
                        onChange={(e) => handleCustomTimeChange(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2 text-sm text-charcoal bg-transparent focus:outline-hidden font-medium cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Error if time is outside cafe hours */}
                  {timeError && (
                    <div className="text-[11px] text-terracotta bg-terracotta/10 p-2 rounded-lg border border-terracotta/25 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{timeError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Number of Guests Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider">
                Number of Guests
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GUEST_OPTIONS.map((opt) => {
                  const isSelected = bookingDraft.guests === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBookingDraft((prev) => ({ ...prev, guests: opt }))}
                      className={`p-2.5 text-center text-xs font-semibold rounded-xl transition cursor-pointer border flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-caramel text-warm-white border-caramel shadow-xs'
                          : 'bg-warm-white text-charcoal border-taupe/25 hover:bg-cream-beige/50'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-espresso uppercase tracking-wider">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                value={bookingDraft.specialRequests || ''}
                onChange={(e) =>
                  setBookingDraft((prev) => ({ ...prev, specialRequests: e.target.value }))
                }
                placeholder="e.g. Birthday celebration, window preference"
                className="w-full px-3.5 py-2 text-xs border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:outline-hidden focus:border-caramel"
              />
            </div>
          </div>

          {/* Right Column: Table Floor & Availability */}
          <div className="lg:col-span-7 space-y-6 bg-warm-white p-6 sm:p-8 rounded-3xl border border-taupe/20 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-taupe/15">
              <div>
                <h2 className="text-lg font-serif font-bold text-espresso flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-espresso text-warm-white text-xs flex items-center justify-center font-sans">
                    2
                  </span>
                  Select Café Table
                </h2>
                <p className="text-xs text-charcoal/70 mt-0.5">
                  Availability for {formatDateDisplay(bookingDraft.date)} at {bookingDraft.time}
                </p>
              </div>

              {/* Status Color Legend (Prompt Mandate: Available, Booked, Selected) */}
              <div className="flex items-center gap-3 text-xs bg-cream-beige/60 px-3 py-1.5 rounded-xl border border-taupe/20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sage ring-2 ring-sage/30" />
                  <span className="text-charcoal font-medium">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-terracotta ring-2 ring-terracotta/30" />
                  <span className="text-charcoal font-medium">Booked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-caramel ring-2 ring-caramel/30" />
                  <span className="text-charcoal font-medium">Selected</span>
                </div>
              </div>
            </div>

            {/* Error banner if booked table clicked */}
            {selectedError && (
              <div className="p-3.5 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{selectedError}</span>
              </div>
            )}

            {/* Tables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tables.map((tbl) => {
                const isBooked = isTableBooked(bookingDraft.date, bookingDraft.time, tbl.id);
                const isSelected = bookingDraft.tableId === tbl.id && !isBooked;

                let borderStyle = 'border-taupe/20 bg-warm-white hover:border-caramel hover:shadow-xs';
                let badge = (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sage bg-sage/10 px-2.5 py-0.5 rounded-full border border-sage/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    Available
                  </span>
                );

                if (isBooked) {
                  borderStyle = 'border-terracotta/20 bg-terracotta/5 opacity-80 cursor-not-allowed';
                  badge = (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full border border-terracotta/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                      Booked
                    </span>
                  );
                } else if (isSelected) {
                  borderStyle = 'border-caramel bg-cream-beige/40 ring-2 ring-caramel/30';
                  badge = (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warm-white bg-caramel px-2.5 py-0.5 rounded-full shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-warm-white" />
                      Selected
                    </span>
                  );
                }

                return (
                  <div
                    key={tbl.id}
                    id={`table-card-${tbl.id}`}
                    onClick={() => handleSelectTable(tbl.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${borderStyle}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-taupe">
                          {tbl.id}
                        </span>
                        <h3 className="font-bold text-base text-espresso mt-0.5">
                          {tbl.name}
                        </h3>
                        <p className="text-xs text-charcoal/70">{tbl.seats} Seats • {tbl.section}</p>
                      </div>
                      {badge}
                    </div>

                    <p className="text-[11px] text-charcoal/65 mt-2 italic">
                      {tbl.features}
                    </p>

                    {/* Interactive state indicator */}
                    <div className="mt-3 pt-2 border-t border-taupe/15 flex items-center justify-between text-[11px]">
                      <span className="text-taupe">
                        Capacity: <strong className="text-espresso">{tbl.seats} Guests</strong>
                      </span>
                      {isBooked ? (
                        <span className="text-terracotta font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Unavailable
                        </span>
                      ) : isSelected ? (
                        <span className="text-espresso font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-caramel" /> Ready to Book
                        </span>
                      ) : (
                        <span className="text-caramel font-semibold">Click to Select</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="pt-4 border-t border-taupe/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-charcoal/70">
                {selectedTableObj ? (
                  <span>
                    Selected: <strong className="text-espresso">{selectedTableObj.name}</strong> ({selectedTableObj.seats} Seats)
                  </span>
                ) : (
                  <span className="text-caramel font-medium">Please pick an available table above.</span>
                )}
              </div>

              <button
                id="booking-proceed-summary-btn"
                type="button"
                onClick={handleProceedToSummary}
                disabled={!bookingDraft.tableId}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-warm-white transition flex items-center justify-center gap-2 cursor-pointer text-sm shadow-xs ${
                  bookingDraft.tableId
                    ? 'bg-caramel hover:bg-deep-coffee'
                    : 'bg-taupe/30 cursor-not-allowed text-taupe'
                }`}
              >
                <span>Continue to Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Booking Summary View before confirmation (Prompt Requirement) */
        <div className="max-w-xl mx-auto bg-warm-white p-8 sm:p-10 rounded-3xl border border-taupe/20 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-caramel">
              Review Table Selection
            </span>
            <h2 className="text-2xl font-serif font-bold text-espresso">
              BOOKING SUMMARY
            </h2>
            <p className="text-xs text-charcoal/70">
              Please review your reservation parameters before proceeding.
            </p>
          </div>

          <div className="bg-cream-beige/50 rounded-2xl p-6 border border-taupe/20 space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center py-1 border-b border-taupe/15">
              <span className="text-taupe">Date:</span>
              <span className="font-bold text-espresso font-sans">
                {formatDateDisplay(bookingDraft.date)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-taupe/15">
              <span className="text-taupe">Time:</span>
              <span className="font-bold text-espresso font-sans flex items-center gap-1.5">
                {bookingDraft.time}
                {!BOOKING_TIMES.includes(bookingDraft.time) && (
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-caramel/15 text-caramel font-bold">
                    Custom Slot
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-taupe/15">
              <span className="text-taupe">Guests:</span>
              <span className="font-bold text-espresso font-sans">{bookingDraft.guests}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-taupe/15">
              <span className="text-taupe">Table:</span>
              <span className="font-bold text-espresso font-sans">
                {bookingDraft.tableId} {selectedTableObj ? `(${selectedTableObj.name} — ${selectedTableObj.seats} Seats)` : ''}
              </span>
            </div>
            {bookingDraft.specialRequests && (
              <div className="flex justify-between items-start py-1">
                <span className="text-taupe">Requests:</span>
                <span className="font-bold text-espresso font-sans text-right max-w-xs">
                  {bookingDraft.specialRequests}
                </span>
              </div>
            )}
          </div>

          {/* Action buttons on summary: Confirm Booking / Edit Booking */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setBookingStep('details')}
              className="w-full sm:w-1/2 py-3 border border-taupe/30 text-espresso hover:bg-cream-beige font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Edit Booking
            </button>
            <button
              onClick={handleSummaryConfirmed}
              className="w-full sm:w-1/2 py-3 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Pre-Order Food Prompt Modal (Prompt Requirement: Section 6) */}
      {showPreOrderPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-xs p-4">
          <div className="bg-warm-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-taupe/20 shadow-xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-cream-beige text-caramel flex items-center justify-center mx-auto shadow-xs">
              <UtensilsCrossed className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-caramel">
                Save Kitchen Wait Time
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-espresso">
                “Would you like to pre-order your food?”
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                Pre-order signature coffees, sandwiches & cakes so they are ready the moment you take your seat at{' '}
                <strong className="text-espresso">{bookingDraft.tableId}</strong>!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                id="preorder-yes-btn"
                onClick={() => {
                  setShowPreOrderPrompt(false);
                  setActiveTab('menu');
                  showToast('Browse the menu to pre-order food for your table reservation!', 'info');
                }}
                className="w-full py-3.5 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-warm-white" />
                <span>Yes, Pre-Order Food</span>
              </button>

              <button
                id="preorder-skip-btn"
                onClick={() => {
                  setShowPreOrderPrompt(false);
                  setActiveTab('confirmation');
                }}
                className="w-full py-3 bg-cream-beige hover:bg-cream-beige/80 text-espresso font-semibold rounded-xl text-sm transition cursor-pointer"
              >
                Skip for Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
