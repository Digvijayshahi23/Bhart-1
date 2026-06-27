import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("bharatone_user");
    return cached ? JSON.parse(cached) : null;
  });
  const [profile, setProfile] = useState(() => {
    const cached = localStorage.getItem("bharatone_profile");
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(false);

  // Checks if credentials exist
  const isSandbox = !import.meta.env.VITE_FIREBASE_API_KEY;

  const loginWithEmail = async (email) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = {
      uid: "sandbox-uid-" + Math.random().toString(36).substring(2, 9),
      email,
      emailVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem("bharatone_user", JSON.stringify(mockUser));

    const cachedProfile = localStorage.getItem(`profile_${mockUser.uid}`);
    if (cachedProfile) {
      const p = JSON.parse(cachedProfile);
      setProfile(p);
      localStorage.setItem("bharatone_profile", JSON.stringify(p));
    } else {
      setProfile(null);
      localStorage.removeItem("bharatone_profile");
    }
    setLoading(false);
    return mockUser;
  };

  const registerWithEmail = async (name, email) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = {
      uid: "sandbox-uid-" + Math.random().toString(36).substring(2, 9),
      email,
      emailVerified: false,
    };
    setUser(mockUser);
    localStorage.setItem("bharatone_user", JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser = {
      uid: "google-uid-" + Math.random().toString(36).substring(2, 9),
      email: "citizen@gmail.com",
      emailVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem("bharatone_user", JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const saveProfile = async (profileData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const completeProfile = {
      ...profileData,
      uid: user.uid,
      created_at: new Date().toISOString(),
    };
    setProfile(completeProfile);
    localStorage.setItem("bharatone_profile", JSON.stringify(completeProfile));
    localStorage.setItem(
      `profile_${user.uid}`,
      JSON.stringify(completeProfile),
    );
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("bharatone_user");
    localStorage.removeItem("bharatone_profile");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isSandbox,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        saveProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
