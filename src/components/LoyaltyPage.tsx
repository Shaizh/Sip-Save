import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Coffee,
  Gift,
  CheckCircle2,
  Copy,
  Share2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Users,
  Check,
} from 'lucide-react';

export const LoyaltyPage: React.FC = () => {
  const {
    currentUser,
    rewards,
    redeemReward,
    simulateReferralSignup,
    showToast,
    setActiveTab,
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);
  const [friendName, setFriendName] = useState('Sneha Patel');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-warm-white rounded-3xl border border-taupe/20 shadow-xs space-y-4">
        <Award className="w-12 h-12 text-caramel mx-auto" />
        <h2 className="text-xl font-serif font-bold text-espresso">Please Log In</h2>
        <p className="text-xs text-charcoal/70">
          Log in to view your loyalty points balance, progress, and unlock café rewards.
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

  const maxPoints = 500;
  const progressPercent = Math.min(100, Math.round((currentUser.loyaltyPoints / maxPoints) * 100));
  const pointsToDiscount = Math.max(0, 500 - currentUser.loyaltyPoints);
  const pointsToCoffee = Math.max(0, 100 - currentUser.loyaltyPoints);

  const copyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    showToast(`Referral code ${currentUser.referralCode} copied!`, 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sip & Save Café Referral',
        text: `Join me at Sip & Save café! Register using my code ${currentUser.referralCode} to get welcome points & reserve great tables.`,
      });
    } else {
      copyReferral();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-beige text-espresso text-xs font-bold border border-taupe/25">
          <Award className="w-3.5 h-3.5 text-caramel" />
          <span>Sip & Save Rewards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso">
          Loyalty & Rewards
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70">
          Earn points on every cup, table reservation, feedback, and referral.
        </p>
      </div>

      {/* Points Card & Progress Bar (Prompt Requirement: Section 12) */}
      <div className="bg-gradient-to-br from-cream-beige/50 via-warm-white to-cream-beige/40 rounded-3xl p-6 sm:p-10 border border-taupe/20 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-caramel">
              Active Balance
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-espresso mt-1">
              Your Points: {currentUser.loyaltyPoints} Points
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
              {pointsToDiscount > 0
                ? `${pointsToDiscount} more points needed to unlock the 20% Grand Bill Discount!`
                : '🎉 You have unlocked all VIP reward tiers!'}
            </p>
          </div>

          <div className="bg-warm-white/90 backdrop-blur-xs p-4 rounded-2xl border border-taupe/20 text-center shrink-0">
            <span className="text-[11px] font-bold text-taupe uppercase block">
              Tier Status
            </span>
            <span className="text-lg font-serif font-bold text-espresso">
              {currentUser.loyaltyPoints >= 500
                ? 'Gold Member'
                : currentUser.loyaltyPoints >= 100
                ? 'Silver Enthusiast'
                : 'Welcome Member'}
            </span>
          </div>
        </div>

        {/* Progress Bar (Prompt Requirement: 340 / 500 Points) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold font-mono">
            <span className="text-caramel">
              {currentUser.loyaltyPoints} / {maxPoints} Points
            </span>
            <span className="text-taupe">{progressPercent}% Achieved</span>
          </div>
          <div className="w-full bg-cream-beige/80 h-3.5 rounded-full overflow-hidden p-0.5 border border-taupe/25">
            <div
              className="bg-gradient-to-r from-caramel via-deep-coffee to-espresso h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rewards Catalog (Prompt Requirement: 100 Points -> Free Coffee, 500 Points -> 20% Discount) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-espresso">Available Rewards</h2>
          <span className="text-xs text-charcoal/70">Redeem directly on your pre-order cart</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward) => {
            const isUnlocked = currentUser.loyaltyPoints >= reward.pointsCost;
            return (
              <div
                key={reward.id}
                className={`bg-warm-white rounded-3xl p-6 sm:p-8 border shadow-xs transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'border-taupe/30 ring-2 ring-caramel/15'
                    : 'border-taupe/15 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cream-beige/60 text-espresso flex items-center justify-center text-2xl shadow-xs">
                      {reward.type === 'coffee' ? '☕' : '🎁'}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        isUnlocked
                          ? 'bg-sage/15 text-sage'
                          : 'bg-taupe/15 text-charcoal/70'
                      }`}
                    >
                      {isUnlocked ? 'Unlocked' : `${reward.pointsCost - currentUser.loyaltyPoints} Pts away`}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-espresso mt-4">
                    {reward.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 mt-1.5 leading-relaxed">
                    {reward.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-taupe/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-taupe block">
                      Cost
                    </span>
                    <span className="font-bold text-base text-caramel">
                      {reward.pointsCost} Points
                    </span>
                  </div>

                  <button
                    disabled={!isUnlocked}
                    onClick={() => redeemReward(reward)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                      isUnlocked
                        ? 'bg-caramel hover:bg-deep-coffee text-warm-white shadow-xs'
                        : 'bg-taupe/20 text-charcoal/40 cursor-not-allowed'
                    }`}
                  >
                    <span>{isUnlocked ? 'Redeem & Apply' : 'Locked'}</span>
                    {isUnlocked && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points Earning Guide (Prompt Requirement: Registration +10, Visit +10, Referral +30, Feedback +5) */}
      <div className="bg-warm-white rounded-3xl p-6 sm:p-8 border border-taupe/20 shadow-xs space-y-4">
        <h2 className="text-xl font-serif font-bold text-espresso">
          How Points Can Be Earned
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
            <div className="text-xl mb-1">🎉</div>
            <h4 className="font-bold text-sm text-espresso">Registration</h4>
            <p className="text-xs text-charcoal/70 mt-0.5">Welcome bonus upon creating account</p>
            <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-sage/15 text-sage text-xs font-bold">
              +10 Points
            </span>
          </div>

          <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
            <div className="text-xl mb-1">☕</div>
            <h4 className="font-bold text-sm text-espresso">Completed Café Visit</h4>
            <p className="text-xs text-charcoal/70 mt-0.5">Earned when dining at your reserved table</p>
            <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-sage/15 text-sage text-xs font-bold">
              +10 Points
            </span>
          </div>

          <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
            <div className="text-xl mb-1">👥</div>
            <h4 className="font-bold text-sm text-espresso">Friend Referral</h4>
            <p className="text-xs text-charcoal/70 mt-0.5">When your friend registers with your code</p>
            <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-sage/15 text-sage text-xs font-bold">
              +30 Points
            </span>
          </div>

          <div className="p-4 bg-cream-beige/40 rounded-2xl border border-taupe/20">
            <div className="text-xl mb-1">⭐</div>
            <h4 className="font-bold text-sm text-espresso">Customer Feedback</h4>
            <p className="text-xs text-charcoal/70 mt-0.5">Review a completed café reservation</p>
            <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-sage/15 text-sage text-xs font-bold">
              +5 Points
            </span>
          </div>
        </div>
      </div>

      {/* Referral Section (Prompt Requirement: Section 13) */}
      <div className="bg-cream-beige/60 rounded-3xl p-6 sm:p-8 border border-taupe/25 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase font-bold tracking-wider text-caramel">
              Refer & Earn Program
            </span>
            <h3 className="text-2xl font-serif font-bold text-espresso">
              Your Referral Code: {currentUser.referralCode}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              “Invite your friends and earn 30 points when they successfully register and verify their account.”
            </p>
          </div>

          {/* Copy and Share Buttons (Prompt Requirement) */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copyReferral}
              className="px-5 py-3 bg-warm-white hover:bg-cream-beige text-espresso border border-taupe/30 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {copiedCode ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Referral Code'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-5 py-3 bg-caramel hover:bg-deep-coffee text-warm-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Referral</span>
            </button>
          </div>
        </div>

        {/* Presentation Demo Simulator for Viva */}
        <div className="pt-4 border-t border-taupe/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-warm-white/70 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-espresso">
            <Sparkles className="w-4 h-4 text-caramel shrink-0" />
            <span className="font-semibold">
              Live Viva Simulator: Test referral awarding (+30 Points immediately)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Friend's Name"
              className="px-3 py-1.5 border border-taupe/30 rounded-lg text-xs bg-warm-white text-charcoal focus:border-caramel focus:outline-hidden"
            />
            <button
              onClick={() => simulateReferralSignup(friendName)}
              className="px-3 py-1.5 bg-espresso text-warm-white font-bold rounded-lg hover:bg-deep-coffee whitespace-nowrap cursor-pointer transition"
            >
              Simulate Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
