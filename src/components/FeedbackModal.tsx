import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reservation } from '../types';
import { Star, X, CheckCircle2, MessageSquare, Award } from 'lucide-react';

interface FeedbackModalProps {
  reservation: Reservation;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ reservation, onClose }) => {
  const { submitFeedback } = useApp();

  const [overall, setOverall] = useState(5);
  const [food, setFood] = useState(5);
  const [service, setService] = useState(5);
  const [ambience, setAmbience] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(
      reservation.id,
      { overall, food, service, ambience },
      comment.trim() || 'Had a fantastic time at Sip & Save!'
    );
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const StarRatingSelector: React.FC<{
    label: string;
    value: number;
    onChange: (val: number) => void;
  }> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs font-semibold text-espresso">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 text-taupe/40 hover:text-soft-gold transition cursor-pointer"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value ? 'text-caramel fill-soft-gold' : 'text-taupe/40'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-xs p-4">
      <div className="bg-warm-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-taupe/20 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-taupe hover:text-charcoal cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-sage/15 text-sage flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-espresso">
              Thank you for your feedback!
            </h3>
            <p className="text-sm text-sage font-bold flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" />
              You earned +5 loyalty points.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-espresso bg-soft-gold/15 px-2.5 py-0.5 rounded-full border border-soft-gold/30">
                <Award className="w-3.5 h-3.5 text-caramel" />
                <span>Earn +5 Loyalty Points</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso mt-1">
                Café Visit Feedback
              </h3>
              <p className="text-xs text-charcoal/70">
                Booking: <strong className="text-espresso">{reservation.id}</strong> • Table {reservation.tableId} on{' '}
                {reservation.formattedDate}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-cream-beige/50 rounded-2xl p-4 border border-taupe/20 divide-y divide-taupe/15">
                <StarRatingSelector
                  label="Overall Rating ⭐"
                  value={overall}
                  onChange={setOverall}
                />
                <StarRatingSelector
                  label="Food & Drinks"
                  value={food}
                  onChange={setFood}
                />
                <StarRatingSelector
                  label="Service Quality"
                  value={service}
                  onChange={setService}
                />
                <StarRatingSelector
                  label="Café Ambience"
                  value={ambience}
                  onChange={setAmbience}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Comments & Suggestions
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the coffee aroma, table comfort, or staff friendliness..."
                  className="w-full px-3.5 py-2 text-xs border border-taupe/30 rounded-xl bg-warm-white text-charcoal focus:outline-hidden focus:border-caramel"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-caramel hover:bg-deep-coffee text-warm-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Star className="w-4 h-4 text-soft-gold fill-soft-gold" />
                <span>Submit Review (+5 Points)</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
