import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../components/common/Button.jsx";
import { GlassCard } from "../../../components/common/GlassCard.jsx";
import { ShieldCheck, MailCheck, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("ईमेल दोबारा भेजा गया (Verification email resent)");
    setLoading(false);
  };

  const handleVerifySimulation = () => {
    toast.success("सत्यापन सफल (Verification Confirmed - Demo)");
    navigate("/complete-profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <GlassCard className="max-w-md w-full p-8 flex flex-col gap-6 text-center relative overflow-hidden">
        {/* Flag Accent */}
        <div className="absolute top-0 inset-x-0 h-1 flex">
          <div className="flex-1 bg-saffron" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-green" />
        </div>

        <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center text-green mx-auto mt-4">
          <MailCheck className="h-8 w-8" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold font-serif text-primary">
            ईमेल सत्यापन (Verify Your Email)
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed px-4">
            हमने आपके ईमेल पते पर एक सत्यापन लिंक भेजा है। कृपया अपना इनबॉक्स
            जांचें और खाते को सक्रिय करने के लिए उस लिंक पर क्लिक करें।
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Button
            variant="green"
            onClick={handleVerifySimulation}
            className="w-full flex gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>सत्यापन की पुष्टि करें (Confirm Verification)</span>
          </Button>

          <Button
            variant="secondary"
            onClick={handleResend}
            isLoading={loading}
            className="w-full flex gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>ईमेल दोबारा भेजें (Resend Verification Email)</span>
          </Button>
        </div>

        <p className="text-xs text-text-secondary">
          गलत ईमेल दर्ज हो गया था?{" "}
          <Link
            to="/register"
            className="text-accent font-semibold hover:underline"
          >
            पंजीकरण बदलें (Change registration)
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
