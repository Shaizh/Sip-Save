import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { TableBookingPage } from './components/TableBookingPage';
import { MenuPage } from './components/MenuPage';
import { CartPage } from './components/CartPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { ReservationsPage } from './components/ReservationsPage';
import { LoyaltyPage } from './components/LoyaltyPage';
import { ProfilePage } from './components/ProfilePage';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  // Scroll to top whenever page tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-cream-beige text-charcoal">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'login' && <LoginPage />}
        {activeTab === 'register' && <RegisterPage />}
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'booking' && <TableBookingPage />}
        {activeTab === 'menu' && <MenuPage />}
        {activeTab === 'cart' && <CartPage />}
        {activeTab === 'confirmation' && <ConfirmationPage />}
        {activeTab === 'reservations' && <ReservationsPage />}
        {activeTab === 'loyalty' && <LoyaltyPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Notification Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
