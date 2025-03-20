import { createContext, useContext, useEffect, useState } from "react";
import { supabase, getCurrentUser } from "./supabase";

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for current user on mount
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser || null);

        // Check if user is admin
        if (currentUser) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", currentUser.id)
              .single();

            setIsAdmin(data?.is_admin || false);
          } catch (err) {
            console.error("Error fetching admin status:", err);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);

        // Check if user is admin when auth state changes
        if (session?.user) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", session.user.id)
              .single();

            setIsAdmin(data?.is_admin || false);
          } catch (err) {
            console.error("Error fetching admin status:", err);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
