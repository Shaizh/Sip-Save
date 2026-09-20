import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Reservation,
  CartItem,
  Review,
  PageView,
  Reward,
  MenuItem,
  Table,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_RESERVATIONS,
  CAFE_TABLES,
  REWARDS,
} from '../data/initialData';
import { timesOverlap } from '../utils/timeUtils';

interface BookingDraft {
  date: string;
  time: string;
  guests: string;
  tableId: string;
  specialRequests?: string;
}

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  reservations: Reservation[];
  cart: CartItem[];
  reviews: Review[];
  activeTab: PageView;
  bookingDraft: BookingDraft;
  lastConfirmedReservation: Reservation | null;
  appliedReward: Reward | null;
  toast: ToastNotification | null;
  tables: Table[];
  rewards: Reward[];
  
  // Navigation
  setActiveTab: (tab: PageView) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Auth
  login: (identifier: string, pass: string) => boolean;
  loginAsDemo: () => void;
  logout: () => void;
  registerUser: (data: {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
    referralCode?: string;
  }) => { success: boolean; message: string };
  updateProfile: (data: { fullName: string; mobile: string; email: string }) => void;
  changePassword: (newPass: string) => void;

  // Booking & Table checking
  setBookingDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  isTableBooked: (date: string, time: string, tableId: string, excludeReservationId?: string) => boolean;
  confirmBookingAndPreOrder: () => Reservation | null;
  cancelReservation: (id: string) => void;
  modifyReservation: (id: string, updates: Partial<Reservation>) => boolean;
  completeVisitSimulation: (reservationId: string) => void;

  // Cart & Food Pre-Order
  addToCart: (item: MenuItem, qty?: number) => void;
  updateCartQty: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyReward: (reward: Reward) => void;
  removeReward: () => void;
  getCartTotals: () => { subtotal: number; tax: number; discount: number; total: number };

  // Loyalty & Feedback
  submitFeedback: (
    reservationId: string,
    ratings: { overall: number; food: number; service: number; ambience: number },
    comment: string
  ) => void;
  simulateReferralSignup: (friendName?: string) => void;
  redeemReward: (reward: Reward) => boolean;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'sip_save_current_user_v2';
const STORAGE_KEY_USERS_LIST = 'sip_save_users_v2';
const STORAGE_KEY_RESERVATIONS = 'sip_save_reservations_v2';
const STORAGE_KEY_REVIEWS = 'sip_save_reviews_v2';
const STORAGE_KEY_CART = 'sip_save_cart_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize current user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_USER;
  });

  // Users list
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USERS_LIST);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [INITIAL_USER];
  });

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_RESERVATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_RESERVATIONS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      {
        id: 'rev_1',
        reservationId: 'SS10198',
        userId: 'user_fathima',
        userName: 'Fathima',
        overallRating: 5,
        foodRating: 5,
        serviceRating: 5,
        ambienceRating: 4,
        comment: 'Amazing artisan cappuccino and warm cozy ambience. Loved the pre-order feature—table and pasta were ready right on time!',
        createdAt: '2026-08-29T18:00:00Z',
      },
    ];
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [];
  });

  // Navigation view
  const [activeTab, setActiveTab] = useState<PageView>('home');

  // Booking Draft
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    date: '2026-09-10',
    time: '7:00 PM',
    guests: '4 Guests',
    tableId: 'T04',
    specialRequests: '',
  });

  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<Reservation | null>(null);
  const [appliedReward, setAppliedReward] = useState<Reward | null>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS_LIST, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  // Auth methods
  const login = (identifier: string, pass: string): boolean => {
    const cleanId = identifier.trim().toLowerCase();
    const found = users.find(
      (u) =>
        (u.email.toLowerCase() === cleanId || u.mobile === identifier.trim()) &&
        (u.password ? u.password === pass : true)
    );

    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.fullName.split(' ')[0]}! ☕`, 'success');
      setActiveTab('dashboard');
      return true;
    }
    showToast('Invalid email/mobile or password. Try demo login or register.', 'error');
    return false;
  };

  const loginAsDemo = () => {
    setCurrentUser(INITIAL_USER);
    showToast('Logged in as Fathima (Demo Account) ☕', 'success');
    setActiveTab('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully. See you soon at Sip & Save!', 'info');
    setActiveTab('login');
  };

  const registerUser = (data: {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
    referralCode?: string;
  }) => {
    // Validation
    if (!data.fullName || !data.mobile || !data.email || !data.password) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(data.mobile.replace(/\D/g, ''))) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase() || u.mobile === data.mobile
    );
    if (existingUser) {
      return { success: false, message: 'An account with this email or mobile already exists.' };
    }

    // Process referral code
    let referrerAwarded = false;
    let referrerName = '';
    const cleanRef = data.referralCode?.trim().toUpperCase();

    if (cleanRef) {
      const referrer = users.find((u) => u.referralCode === cleanRef);
      if (referrer) {
        referrerAwarded = true;
        referrerName = referrer.fullName;
        // Award 30 points to referrer
        setUsers((prev) =>
          prev.map((u) =>
            u.id === referrer.id ? { ...u, loyaltyPoints: u.loyaltyPoints + 30 } : u
          )
        );
        if (currentUser && currentUser.id === referrer.id) {
          setCurrentUser((prev) => (prev ? { ...prev, loyaltyPoints: prev.loyaltyPoints + 30 } : null));
        }
      }
    }

    // Generate unique referral code for the new user
    const firstPart = data.fullName.split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase() || 'SIP';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newReferralCode = `${firstPart}${randomNum}`;

    const newUser: User = {
      id: `user_${Date.now()}`,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      mobile: data.mobile.trim(),
      password: data.password,
      referralCode: newReferralCode,
      loyaltyPoints: 10, // Registration bonus +10 points
      totalVisits: 0,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    
    let msg = 'Account created successfully! +10 welcome loyalty points awarded.';
    if (referrerAwarded) {
      msg += ` Referral code applied (+30 points granted to ${referrerName})!`;
    }

    showToast(msg, 'success');
    return { success: true, message: msg };
  };

  const updateProfile = (data: { fullName: string; mobile: string; email: string }) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('Profile updated successfully!', 'success');
  };

  const changePassword = (newPass: string) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      password: newPass,
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('Password changed successfully!', 'success');
  };

  // Check if a table is booked
  const isTableBooked = (
    date: string,
    time: string,
    tableId: string,
    excludeReservationId?: string
  ): boolean => {
    return reservations.some(
      (r) =>
        r.date === date &&
        timesOverlap(r.time, time, 30) &&
        r.tableId === tableId &&
        r.status !== 'Cancelled' &&
        r.id !== excludeReservationId
    );
  };

  // Format date helper
  const formatDateString = (dateStr: string): string => {
    try {
      const [year, month, day] = dateStr.split('-');
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return dateObj.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Cart operations
  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + qty }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity: qty }];
    });
    showToast(`Added ${item.name} to cart 🥪`, 'success');
  };

  const updateCartQty = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.menuItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyReward = (reward: Reward) => {
    if (!currentUser || currentUser.loyaltyPoints < reward.pointsCost) {
      showToast(`You need at least ${reward.pointsCost} points to redeem this reward.`, 'error');
      return;
    }
    setAppliedReward(reward);
    showToast(`Applied reward: ${reward.title}! 🎉`, 'success');
  };

  const removeReward = () => {
    setAppliedReward(null);
    showToast('Reward removed from cart.', 'info');
  };

  const getCartTotals = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05 * 10) / 10; // 5% GST
    let discount = 0;

    if (appliedReward) {
      if (appliedReward.type === 'coffee') {
        // Free coffee: find highest priced coffee item in cart and deduct
        const coffeeItem = cart.find((ci) => ci.menuItem.category === 'Coffee');
        if (coffeeItem) {
          discount = coffeeItem.menuItem.price;
        } else {
          // Flat ₹120 standard coffee discount if no coffee in cart
          discount = Math.min(120, subtotal);
        }
      } else if (appliedReward.type === 'discount') {
        // 20% discount
        discount = Math.round(subtotal * 0.2);
      }
    }

    const total = Math.max(0, subtotal + tax - discount);
    return { subtotal, tax, discount, total };
  };

  // Confirm booking & food pre-order
  const confirmBookingAndPreOrder = (): Reservation | null => {
    if (!currentUser) {
      showToast('Please login or register to confirm your table reservation.', 'error');
      setActiveTab('login');
      return null;
    }

    const { date, time, guests, tableId, specialRequests } = bookingDraft;

    if (!tableId) {
      showToast('Please select an available table.', 'error');
      return null;
    }

    if (isTableBooked(date, time, tableId)) {
      showToast('Sorry, this table is already booked for the selected time. Please pick another table or time.', 'error');
      return null;
    }

    const tableObj = CAFE_TABLES.find((t) => t.id === tableId);
    const tableSeats = tableObj ? tableObj.seats : 4;
    const { subtotal, tax, discount, total } = getCartTotals();

    // Generate unique Booking ID: SS + 5 digits
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `SS${randomNum}`;

    const newReservation: Reservation = {
      id: bookingId,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      userMobile: currentUser.mobile,
      date,
      formattedDate: formatDateString(date),
      time,
      guests,
      tableId,
      tableSeats,
      foodItems: cart.map((ci) => ({
        item: ci.menuItem,
        quantity: ci.quantity,
        subtotal: ci.menuItem.price * ci.quantity,
      })),
      foodSubtotal: subtotal,
      tax,
      discount,
      totalAmount: total,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      reviewSubmitted: false,
      specialRequests,
    };

    // Deduct reward points if applied
    if (appliedReward) {
      const updatedPoints = Math.max(0, currentUser.loyaltyPoints - appliedReward.pointsCost);
      const updatedUser = { ...currentUser, loyaltyPoints: updatedPoints };
      setCurrentUser(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      setAppliedReward(null);
    }

    setReservations((prev) => [newReservation, ...prev]);
    setLastConfirmedReservation(newReservation);
    clearCart();
    showToast(`Your table has been successfully reserved! 🎉 (ID: ${bookingId})`, 'success');
    setActiveTab('confirmation');
    return newReservation;
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Cancelled' as const } : r))
    );
    showToast(`Reservation ${id} has been cancelled.`, 'info');
  };

  const modifyReservation = (id: string, updates: Partial<Reservation>): boolean => {
    const existing = reservations.find((r) => r.id === id);
    if (!existing) return false;

    const checkDate = updates.date || existing.date;
    const checkTime = updates.time || existing.time;
    const checkTable = updates.tableId || existing.tableId;

    if (isTableBooked(checkDate, checkTime, checkTable, id)) {
      showToast('Sorry, this table is already booked for the selected time.', 'error');
      return false;
    }

    setReservations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, ...updates };
          if (updates.date) {
            updated.formattedDate = formatDateString(updates.date);
          }
          return updated;
        }
        return r;
      })
    );
    showToast('Reservation updated successfully!', 'success');
    return true;
  };

  // Viva demo tool: simulate completed café visit
  const completeVisitSimulation = (reservationId: string) => {
    const target = reservations.find((r) => r.id === reservationId);
    if (!target) return;

    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'Completed' as const } : r))
    );

    // Award +10 loyalty points and increment total visits
    if (currentUser && target.userId === currentUser.id) {
      const updated: User = {
        ...currentUser,
        loyaltyPoints: currentUser.loyaltyPoints + 10,
        totalVisits: currentUser.totalVisits + 1,
      };
      setCurrentUser(updated);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    }

    showToast(`Café visit completed! 🎉 +10 loyalty points awarded for your visit.`, 'success');
  };

  // Submit feedback review
  const submitFeedback = (
    reservationId: string,
    ratings: { overall: number; food: number; service: number; ambience: number },
    comment: string
  ) => {
    if (!currentUser) return;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      reservationId,
      userId: currentUser.id,
      userName: currentUser.fullName,
      overallRating: ratings.overall,
      foodRating: ratings.food,
      serviceRating: ratings.service,
      ambienceRating: ratings.ambience,
      comment,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);

    // Mark reservation as reviewSubmitted
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, reviewSubmitted: true } : r))
    );

    // Award +5 loyalty points
    const updated: User = {
      ...currentUser,
      loyaltyPoints: currentUser.loyaltyPoints + 5,
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));

    showToast('Thank you for your feedback! You earned +5 loyalty points.', 'success');
  };

  // Simulate friend referral signup
  const simulateReferralSignup = (friendName: string = 'Sneha Patel') => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      loyaltyPoints: currentUser.loyaltyPoints + 30,
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));

    showToast(`🎉 ${friendName} just registered with code ${currentUser.referralCode}! +30 Loyalty Points added!`, 'success');
  };

  const redeemReward = (reward: Reward): boolean => {
    if (!currentUser) {
      showToast('Please login to redeem rewards.', 'error');
      return false;
    }
    if (currentUser.loyaltyPoints < reward.pointsCost) {
      showToast(`You need ${reward.pointsCost - currentUser.loyaltyPoints} more points to redeem this reward.`, 'error');
      return false;
    }

    setAppliedReward(reward);
    showToast(`Reward unlocked: ${reward.title}! Use code ${reward.code} or it will be auto-applied at checkout.`, 'success');
    return true;
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_USERS_LIST);
    localStorage.removeItem(STORAGE_KEY_RESERVATIONS);
    localStorage.removeItem(STORAGE_KEY_REVIEWS);
    localStorage.removeItem(STORAGE_KEY_CART);

    setCurrentUser(INITIAL_USER);
    setUsers([INITIAL_USER]);
    setReservations(INITIAL_RESERVATIONS);
    setCart([]);
    setAppliedReward(null);
    setBookingDraft({
      date: '2026-09-10',
      time: '7:00 PM',
      guests: '4 Guests',
      tableId: 'T04',
      specialRequests: '',
    });
    showToast('Demo data reset to default (Fathima, SS10245 reservation).', 'info');
    setActiveTab('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        reservations,
        cart,
        reviews,
        activeTab,
        bookingDraft,
        lastConfirmedReservation,
        appliedReward,
        toast,
        tables: CAFE_TABLES,
        rewards: REWARDS,
        setActiveTab,
        showToast,
        login,
        loginAsDemo,
        logout,
        registerUser,
        updateProfile,
        changePassword,
        setBookingDraft,
        isTableBooked,
        confirmBookingAndPreOrder,
        cancelReservation,
        modifyReservation,
        completeVisitSimulation,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyReward,
        removeReward,
        getCartTotals,
        submitFeedback,
        simulateReferralSignup,
        redeemReward,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
