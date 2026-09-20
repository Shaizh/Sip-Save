import { MenuItem, Table, User, Reservation, Reward } from '../types';
import frenchFriesImg from '../assets/images/french_fries_1788585855492.jpg';
import creamyPastaImg from '../assets/images/creamy_pasta_1788585872224.jpg';

export const CAFE_TABLES: Table[] = [
  { id: 'T01', name: 'TABLE T01', seats: 2, section: 'Window View', features: 'Sunlit window, cozy corner' },
  { id: 'T02', name: 'TABLE T02', seats: 2, section: 'Espresso Bar', features: 'Warm wooden booth, quiet' },
  { id: 'T03', name: 'TABLE T03', seats: 4, section: 'Main Lounge', features: 'Central seating, plush chairs' },
  { id: 'T04', name: 'TABLE T04', seats: 4, section: 'Main Lounge', features: 'Spacious table, power outlet' },
  { id: 'T05', name: 'TABLE T05', seats: 6, section: 'Family Corner', features: 'Semi-private banquet seating' },
  { id: 'T06', name: 'TABLE T06', seats: 6, section: 'Garden Patio', features: 'Open-air pergola with greenery' },
  { id: 'T07', name: 'TABLE T07', seats: 8, section: 'Group Dining', features: 'Large rustic oak table for parties' },
  { id: 'T08', name: 'TABLE T08', seats: 4, section: 'Balcony Terrace', features: 'Evening breeze, garden view' },
];

export const BOOKING_TIMES: string[] = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
];

export const GUEST_OPTIONS = [
  '1 Guest',
  '2 Guests',
  '3 Guests',
  '4 Guests',
  '5 Guests',
  '6 Guests',
  'More than 6',
];

export const MENU_ITEMS: MenuItem[] = [
  // ☕ Coffee
  {
    id: 'c1',
    name: 'Cappuccino',
    category: 'Coffee',
    price: 120,
    description: 'Fresh espresso topped with thick velvety steamed milk foam & cocoa powder.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'c2',
    name: 'Espresso',
    category: 'Coffee',
    price: 100,
    description: 'Double shot of intensely aromatic, crema-rich single-origin Arabica roast.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'c3',
    name: 'Latte',
    category: 'Coffee',
    price: 130,
    description: 'Smooth espresso balanced with rich, creamy steamed milk and artisan latte art.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'c4',
    name: 'Cold Coffee',
    category: 'Coffee',
    price: 140,
    description: 'Classic creamy blended chilled brew served over ice with vanilla bean extract.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },

  // 🥪 Snacks
  {
    id: 's1',
    name: 'French Fries',
    category: 'Snacks',
    price: 120,
    description: 'Crispy golden potato fries lightly tossed in artisanal rosemary sea salt & paprika.',
    isVeg: true,
    image: frenchFriesImg,
    popular: true,
  },
  {
    id: 's2',
    name: 'Veg Sandwich',
    category: 'Snacks',
    price: 150,
    description: 'Toasted multigrain bread filled with garden veggies, melted cheddar & mint mayo.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's3',
    name: 'Chicken Sandwich',
    category: 'Snacks',
    price: 180,
    description: 'Tender seasoned chicken breast slices layered with crisp lettuce & garlic dip.',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },

  // 🍝 Main Course
  {
    id: 'm1',
    name: 'Pasta',
    category: 'Main Course',
    price: 220,
    description: 'Al dente penne pasta tossed in creamy garlic Alfredo sauce with Italian herbs.',
    isVeg: true,
    image: creamyPastaImg,
    popular: true,
  },
  {
    id: 'm2',
    name: 'Pizza',
    category: 'Main Course',
    price: 250,
    description: 'Wood-fired hand-stretched Margherita pizza with San Marzano tomatoes & mozzarella.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'm3',
    name: 'Burger',
    category: 'Main Course',
    price: 200,
    description: 'Juicy handcrafted patty with melted cheese, caramelized onions & secret café sauce.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },

  // 🍰 Desserts
  {
    id: 'd1',
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 160,
    description: 'Decadent moist double-layered Belgian dark chocolate sponge with warm ganache.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'd2',
    name: 'Ice Cream',
    category: 'Desserts',
    price: 100,
    description: 'Two generous artisanal scoops of Madagascar vanilla bean or Swiss chocolate.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd3',
    name: 'Brownie',
    category: 'Desserts',
    price: 140,
    description: 'Warm, gooey walnut fudge brownie drizzled with rich chocolate sauce.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
];

export const INITIAL_USER: User = {
  id: 'user_fathima',
  fullName: 'Fathima',
  email: 'fathima@gmail.com',
  mobile: '9876543210',
  password: 'password123',
  referralCode: 'FATHIMA123',
  loyaltyPoints: 340,
  totalVisits: 5,
  createdAt: '2026-06-15T10:00:00Z',
};

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SS10245',
    userId: 'user_fathima',
    userName: 'Fathima',
    userEmail: 'fathima@gmail.com',
    userMobile: '9876543210',
    date: '2026-09-10',
    formattedDate: '10 September 2026',
    time: '7:00 PM',
    guests: 4,
    tableId: 'T04',
    tableSeats: 4,
    foodItems: [
      {
        item: MENU_ITEMS[0], // Cappuccino
        quantity: 2,
        subtotal: 240,
      },
      {
        item: MENU_ITEMS[6], // Chicken Sandwich
        quantity: 1,
        subtotal: 180,
      },
      {
        item: MENU_ITEMS[10], // Chocolate Cake
        quantity: 1,
        subtotal: 160,
      },
    ],
    foodSubtotal: 580,
    tax: 29, // 5% GST
    discount: 0,
    totalAmount: 609,
    status: 'Confirmed',
    createdAt: '2026-09-02T14:30:00Z',
    reviewSubmitted: false,
    specialRequests: 'Window side preferred if available, celebration dessert.',
  },
  {
    id: 'SS10198',
    userId: 'user_fathima',
    userName: 'Fathima',
    userEmail: 'fathima@gmail.com',
    userMobile: '9876543210',
    date: '2026-08-28',
    formattedDate: '28 August 2026',
    time: '6:00 PM',
    guests: 2,
    tableId: 'T01',
    tableSeats: 2,
    foodItems: [
      {
        item: MENU_ITEMS[2], // Latte
        quantity: 2,
        subtotal: 260,
      },
      {
        item: MENU_ITEMS[7], // Pasta
        quantity: 1,
        subtotal: 220,
      },
    ],
    foodSubtotal: 480,
    tax: 24,
    discount: 0,
    totalAmount: 504,
    status: 'Completed',
    createdAt: '2026-08-25T11:20:00Z',
    reviewSubmitted: true,
  },
  {
    id: 'SS10150',
    userId: 'user_fathima',
    userName: 'Fathima',
    userEmail: 'fathima@gmail.com',
    userMobile: '9876543210',
    date: '2026-08-14',
    formattedDate: '14 August 2026',
    time: '1:00 PM',
    guests: 3,
    tableId: 'T03',
    tableSeats: 4,
    foodItems: [
      {
        item: MENU_ITEMS[3], // Cold Coffee
        quantity: 3,
        subtotal: 420,
      },
      {
        item: MENU_ITEMS[8], // Pizza
        quantity: 1,
        subtotal: 250,
      },
      {
        item: MENU_ITEMS[4], // French Fries
        quantity: 1,
        subtotal: 120,
      },
    ],
    foodSubtotal: 790,
    tax: 39.5,
    discount: 0,
    totalAmount: 829.5,
    status: 'Completed',
    createdAt: '2026-08-12T09:15:00Z',
    reviewSubmitted: false, // Ready for demo review submission!
  },
  // Extra seed collision reservations to test booking availability logic:
  {
    id: 'SS10240',
    userId: 'other_user_1',
    userName: 'Priya Verma',
    userEmail: 'priya@example.com',
    userMobile: '9811223344',
    date: '2026-09-10',
    formattedDate: '10 September 2026',
    time: '7:00 PM',
    guests: 2,
    tableId: 'T02', // T02 is booked at this time!
    tableSeats: 2,
    foodItems: [],
    foodSubtotal: 0,
    tax: 0,
    discount: 0,
    totalAmount: 0,
    status: 'Confirmed',
    createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'SS10242',
    userId: 'other_user_2',
    userName: 'Vikram Singh',
    userEmail: 'vikram@example.com',
    userMobile: '9822334455',
    date: '2026-09-10',
    formattedDate: '10 September 2026',
    time: '7:00 PM',
    guests: 6,
    tableId: 'T05', // T05 is booked at this time!
    tableSeats: 6,
    foodItems: [],
    foodSubtotal: 0,
    tax: 0,
    discount: 0,
    totalAmount: 0,
    status: 'Confirmed',
    createdAt: '2026-09-01T12:00:00Z',
  },
];

export const REWARDS: Reward[] = [
  {
    id: 'rew_coffee',
    title: 'Free Coffee',
    pointsCost: 100,
    description: 'Enjoy any signature handcrafted coffee on the house during your visit.',
    code: 'FREECOFFEE100',
    type: 'coffee',
    icon: 'Coffee',
  },
  {
    id: 'rew_discount',
    title: '20% Bill Discount',
    pointsCost: 500,
    description: 'Get a flat 20% discount on your entire dining and food pre-order total.',
    code: 'SAVE20VIP',
    type: 'discount',
    icon: 'Percent',
  },
];
