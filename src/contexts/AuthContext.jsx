import React, { createContext, useState, useEffect, useContext } from 'react';
    import { supabase } from '@/lib/supabaseClient';

    const AuthContext = createContext({ session: null, user: null, loading: true, isAdmin: false });

    export const AuthProvider = ({ children }) => {
        const [session, setSession] = useState(null);
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [isAdmin, setIsAdmin] = useState(false);

        useEffect(() => {
            const fetchSession = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
                setUser(session?.user ?? null);
                
                // Example admin check: you'd typically use custom claims or a roles table
                if (session?.user?.email === 'admin@example.com') {
                    setIsAdmin(true);
                    localStorage.setItem('isAdmin', 'true'); // Keep for AdminPage guard for now
                } else {
                    setIsAdmin(false);
                    localStorage.removeItem('isAdmin');
                }
                setLoading(false);
            };

            fetchSession();

            const { data: authListener } = supabase.auth.onAuthStateChange(
                async (_event, session) => {
                    setSession(session);
                    setUser(session?.user ?? null);
                    if (session?.user?.email === 'admin@example.com') {
                        setIsAdmin(true);
                        localStorage.setItem('isAdmin', 'true');
                    } else {
                        setIsAdmin(false);
                        localStorage.removeItem('isAdmin');
                    }
                    setLoading(false);
                }
            );

            return () => {
                if (authListener && authListener.subscription) {
                  authListener.subscription.unsubscribe();
                }
            };
        }, []);

        const value = {
            session,
            user,
            isAdmin,
            loading,
            signOut: () => supabase.auth.signOut(),
        };

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
        const context = useContext(AuthContext);
        if (context === undefined) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
        return context;
    };
