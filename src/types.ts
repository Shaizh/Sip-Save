export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  referralCode: string;
  loyaltyPoints: number;
  totalVisits: number;
  createdAt: string;
}

export interface Table {
  id: string;
  name: string;
  seats: number;
  section: string;
  features: string;
}

export type MenuCategory = 'All' | 'Coffee' | 'Snacks' | 'Main Course' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Snacks' | 'Main Course' | 'Desserts';
  price: number;
  description: string;
  isVeg: boolean;
  image: string;
  popular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Reservation {
  id: string; // e.g. SS10245
  userId: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  date: string; // YYYY-MM-DD format
  formattedDate: string; // e.g. 10 September 2026
  time: string; // e.g. 7:00 PM
  guests: number | string;
  tableId: string;
  tableSeats: number;
  foodItems: {
    item: MenuItem;
    quantity: number;
    subtotal: number;
  }[];
  foodSubtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: ReservationStatus;
  createdAt: string;
  reviewSubmitted?: boolean;
  specialRequests?: string;
}

export interface Review {
  id: string;
  reservationId: string;
  userId: string;
  userName: string;
  overallRating: number;
  foodRating: number;
  serviceRating: number;
  ambienceRating: number;
  comment: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  code: string;
  type: 'coffee' | 'discount';
  icon: string;
}

export type PageView =
  | 'home'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'booking'
  | 'menu'
  | 'cart'
  | 'confirmation'
  | 'reservations'
  | 'loyalty'
  | 'profile';
