import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { GlassCard } from "../../../components/common/GlassCard.jsx";
import { Mail, Lock, LogIn, Globe, Smartphone, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("कृपया सभी फ़ील्ड भरें (Please fill all fields)");
      return;
    }
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success("लॉगिन सफल (Login Successful)");
      navigate(from, { replace: true });
    } catch {
      toast.error("लॉगिन विफल (Login Failed)");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("गूगल लॉगिन सफल (Google Login Successful)");
      navigate(from, { replace: true });
    } catch {
      toast.error("गूगल लॉगिन विफल (Google Login Failed)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <GlassCard className="max-w-md w-full p-8 flex flex-col gap-6 text-left relative overflow-hidden">
        {/* Flag Accent */}
        <div className="absolute top-0 inset-x-0 h-1 flex">
          <div className="flex-1 bg-saffron" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-green" />
        </div>

        <div className="flex flex-col items-center text-center gap-1.5 mt-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-extrabold text-white text-lg">
            B
          </div>
          <h2 className="text-xl font-bold font-serif text-primary mt-2">
            मंच लॉगिन (Portal Login)
          </h2>
          <p className="text-xs text-text-secondary">
            भारत वन डिजिटल सेवा पोर्टल में आपका स्वागत है
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <Input
            label="ईमेल पता (Email Address)"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <div className="flex flex-col gap-1">
            <Input
              label="पासवर्ड (Password)"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
            />
            <Link
              to="/forgot-password"
              className="text-xs text-accent hover:underline self-end mt-1 font-medium"
            >
              पासवर्ड भूल गए? (Forgot Password?)
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full flex gap-2"
          >
            <LogIn className="h-4 w-4" />
            <span>लॉगिन करें (Sign In)</span>
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-border-subtle w-full" />
          <span className="absolute bg-surface px-3 text-[10px] text-text-muted font-bold uppercase tracking-wider">
            अथवा (Or)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex gap-2"
          >
            <Globe className="h-4 w-4 text-accent" />
            <span>गूगल से लॉगिन (Sign In with Google)</span>
          </Button>

          {/* Placeholders for future methods */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="glass"
              onClick={() =>
                toast.success(
                  "वैकल्पिक लॉगिन प्रक्रिया (Alternate Login Flow - Mock)",
                )
              }
              className="w-full flex gap-1.5 text-xs py-1.5"
            >
              <Smartphone className="h-3.5 w-3.5 text-saffron" />
              <span>मोबाइल OTP</span>
            </Button>
            <Button
              variant="glass"
              onClick={() =>
                toast.success(
                  "डिजीलॉकर लॉगिन प्रक्रिया (DigiLocker Login - Mock)",
                )
              }
              className="w-full flex gap-1.5 text-xs py-1.5"
            >
              <Bookmark className="h-3.5 w-3.5 text-green" />
              <span>DigiLocker</span>
            </Button>
          </div>
        </div>

        <p className="text-xs text-text-secondary text-center mt-2">
          नया खाता बनाना है? (Need an account?){" "}
          <Link
            to="/register"
            className="text-accent font-semibold hover:underline"
          >
            पंजीकरण करें (Register here)
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
