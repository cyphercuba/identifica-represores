import React from 'react';
    import { AdminProvider } from './contexts/AdminContext';
import PayPage from "./pages/PayPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import Layout from '@/components/Layout';
    import HomePage from '@/pages/HomePage';
    import ProvincesPage from '@/pages/ProvincesPage';
    import RepressorProfilePage from '@/pages/RepressorProfilePage';
    import UploadPage from '@/pages/UploadPage';
    import AdvancedSearchPage from '@/pages/AdvancedSearchPage';
    import SubscribersPage from '@/pages/SubscribersPage';
    import LoginPage from '@/pages/LoginPage';
    import RegisterPage from '@/pages/RegisterPage';
    import AdminPage from '@/pages/AdminPage';
    import PrivacyPage from '@/pages/PrivacyPage';
    import TermsPage from '@/pages/TermsPage';
    import ContactPage from '@/pages/ContactPage';
    import ReportErrorPage from '@/pages/ReportErrorPage';
    import DonationsPage from '@/pages/DonationsPage';
    import CommunityPage from '@/pages/CommunityPage';
    import ReportContentPage from '@/pages/ReportContentPage';
    import { AdminProvider } from './contexts/AdminContext';
import PayPage from "./pages/PayPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { supabase } from '@/lib/supabaseClient';
    import { AdminProvider } from './contexts/AdminContext';
import PayPage from "./pages/PayPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';

    function AppContent() {
      const { session, loading } = useAuth();
      
      React.useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            // This will be handled by AuthContext now
          }
        );

        return () => {
          if (authListener && authListener.subscription) {
            authListener.subscription.unsubscribe();
          }
        };
      }, []);

      if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl text-royal-purple dark:text-glacial-blue">Cargando sesión...</div>;
      }

      return (
        <Layout>
          <AdminProvider>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/provinces" element={<ProvincesPage />} />
            <Route path="/repressor/:id" element={<RepressorProfilePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/search" element={<AdvancedSearchPage />} />
            <Route path="/subscribers" element={<SubscribersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/report-error" element={<ReportErrorPage />} />
            <Route path="/report-content" element={<ReportContentPage />} />
            <Route path="/donations" element={<DonationsPage />} />
            <Route path="/community" element={<CommunityPage />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/pago" element={<PayPage />} />
                <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        </Routes>
    </AdminProvider>
        </Layout>
      );
    }
    
    function App() {
      return (
        <Router>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </Router>
      );
    }

    export default App;