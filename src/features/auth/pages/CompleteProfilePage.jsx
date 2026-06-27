import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Dropdown } from "../../../components/common/Dropdown.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { GlassCard } from "../../../components/common/GlassCard.jsx";
import { UserCheck, MapPin, Phone, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function CompleteProfilePage() {
  const { user, saveProfile } = useAuth();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("Delhi");
  const [district, setDistrict] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const states = [
    { value: "Delhi", label: "Delhi" },
    { value: "Bihar", label: "Bihar" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "West Bengal", label: "West Bengal" },
  ];

  const languages = [
    { value: "hi", label: "हिंदी (Hindi)" },
    { value: "en", label: "English" },
    { value: "mr", label: "मराठी (Marathi)" },
    { value: "ta", label: "தமிழ் (Tamil)" },
    { value: "te", label: "తెలుగు (Telugu)" },
  ];

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    if (!name || !district) {
      toast.error("कृपया अनिवार्य फ़ील्ड भरें (Please fill required fields)");
      return;
    }
    setLoading(true);
    try {
      await saveProfile({
        name,
        email: user?.email || "",
        mobile,
        state,
        district,
        language,
      });
      toast.success("प्रोफ़ाइल पूर्ण हुई (Profile Onboarding Completed!)");
      navigate("/");
    } catch {
      toast.error("सहेजने में असमर्थ (Failed to save profile)");
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
            प्रोफ़ाइल पूर्ण करें (Complete Profile)
          </h2>
          <p className="text-xs text-text-secondary">
            कल्याणकारी सेवाओं के अनुकूलन हेतु विवरण साझा करें
          </p>
        </div>

        <form onSubmit={handleOnboardSubmit} className="flex flex-col gap-4">
          <Input
            label="पूरा नाम (Full Name) *"
            placeholder="नाम लिखें (Write full name)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<UserCheck className="h-4 w-4" />}
          />
          <Input
            label="ईमेल (Email)"
            type="email"
            value={user?.email || ""}
            disabled
            className="opacity-60 cursor-not-allowed"
          />
          <Input
            label="मोबाइल नंबर (Mobile Number - Optional)"
            placeholder="9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              label="राज्य (State)"
              options={states}
              value={state}
              onChange={setState}
            />
            <Input
              label="जिला (District) *"
              placeholder="पटना / Pune"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              leftIcon={<MapPin className="h-4 w-4" />}
            />
          </div>

          <Dropdown
            label="पसंदीदा भाषा (Preferred Language)"
            options={languages}
            value={language}
            onChange={setLanguage}
          />

          <Button
            type="submit"
            variant="green"
            isLoading={loading}
            className="w-full flex gap-2 mt-2"
          >
            <Check className="h-4 w-4" />
            <span>प्रोफ़ाइल सहेजें (Save Profile)</span>
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
