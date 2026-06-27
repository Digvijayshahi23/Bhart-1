import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../../components/common/Input.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { GlassCard } from "../../../components/common/GlassCard.jsx";
import { Mail, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("कृपया ईमेल दर्ज करें (Please enter email)");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("पासवर्ड रीसेट लिंक भेजा गया (Password reset link sent)");
    setLoading(false);
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
            पासवर्ड भूल गए (Forgot Password)
          </h2>
          <p className="text-xs text-text-secondary">
            पंजीकृत ईमेल दर्ज कर रीसेट लिंक प्राप्त करें
          </p>
        </div>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <Input
            label="पंजीकृत ईमेल (Registered Email)"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full flex gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>रीसेट लिंक भेजें (Send Reset Link)</span>
          </Button>
        </form>

        <p className="text-xs text-text-secondary text-center">
          वापस लॉगिन करें (Back to login?){" "}
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
