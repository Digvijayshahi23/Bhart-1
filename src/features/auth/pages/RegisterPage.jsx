import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { GlassCard } from "../../../components/common/GlassCard.jsx";
import { Mail, Lock, UserPlus, User } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { registerWithEmail } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("कृपया सभी फ़ील्ड भरें (Please fill all fields)");
      return;
    }
    if (password.length < 6) {
      toast.error(
        "पासवर्ड ६ अक्षरों का होना चाहिए (Password must be 6+ chars)",
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("पासवर्ड मेल नहीं खाते (Passwords do not match)");
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(name, email, password);
      toast.success("पंजीकरण सफल (Registration Successful)");
      navigate("/verify-email");
    } catch {
      toast.error("पंजीकरण विफल (Registration Failed)");
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
            नया पंजीकरण (New Registration)
          </h2>
          <p className="text-xs text-text-secondary">
            भारत वन नागरिक सेवाओं से जुड़ें
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            label="पूरा नाम (Full Name)"
            placeholder="नाम दर्ज करें (Enter your name)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input
            label="ईमेल पता (Email Address)"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            label="पासवर्ड (Password)"
            type="password"
            placeholder="•••••••• (न्यूनतम 6 अक्षर)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
          />
          <Input
            label="पासवर्ड पुष्टि (Confirm Password)"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <Button
            type="submit"
            variant="saffron"
            isLoading={loading}
            className="w-full flex gap-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>पंजीकरण करें (Sign Up)</span>
          </Button>
        </form>

        <p className="text-xs text-text-secondary text-center">
          पहले से पंजीकृत हैं? (Already registered?){" "}
          <Link
            to="/login"
            className="text-accent font-semibold hover:underline"
          >
            लॉगिन करें (Sign in here)
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
