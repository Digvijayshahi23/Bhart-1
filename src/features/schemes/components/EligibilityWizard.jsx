import { useState } from "react";
import { Input } from "../../../components/common/Input.jsx";
import { Dropdown } from "../../../components/common/Dropdown.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { SCHEMES, STATES } from "../data/sampleData.js";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function EligibilityWizard() {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [state, setState] = useState("Delhi");
  const [isFarmer, setIsFarmer] = useState("no");
  const [isStudent, setIsStudent] = useState("no");
  const [income, setIncome] = useState("200000");
  const [results, setResults] = useState([]);

  const stateOptions = STATES.map((s) => ({ value: s, label: s }));

  const handleNext = () => {
    if (step === 1 && (!age || isNaN(age))) {
      toast.error("कृपया वैध आयु दर्ज करें (Please enter valid age)");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const calculateEligibility = () => {
    const ageNum = parseInt(age, 10);
    const incNum = parseInt(income, 10);

    const matches = SCHEMES.filter((scheme) => {
      const rules = scheme.eligibilityRules;
      const ageMatch = ageNum >= rules.minAge && ageNum <= rules.maxAge;
      const incomeMatch = incNum <= rules.incomeMax;
      const farmerMatch = rules.farmerOnly ? isFarmer === "yes" : true;
      const studentMatch = rules.studentOnly ? isStudent === "yes" : true;
      const stateMatch = scheme.state === "Central" || scheme.state === state;

      return (
        ageMatch && incomeMatch && farmerMatch && studentMatch && stateMatch
      );
    });

    setResults(matches.slice(0, 5));
    setStep(4);
  };

  return (
    <Card
      className="text-left max-w-xl mx-auto p-6"
      title="योग्यता कैलकुलेटर (Eligibility Calculator)"
    >
      {step < 4 && (
        <div className="flex items-center gap-2 mb-4 select-none">
          <Badge variant={step === 1 ? "accent" : "secondary"}>चरण 1</Badge>
          <Badge variant={step === 2 ? "accent" : "secondary"}>चरण 2</Badge>
          <Badge variant={step === 3 ? "accent" : "secondary"}>चरण 3</Badge>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Input
            label="आपकी आयु (Your Age) *"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Dropdown
            label="आपका राज्य (Residential State)"
            options={stateOptions}
            value={state}
            onChange={setState}
          />
          <Button
            onClick={handleNext}
            className="w-full mt-2 flex gap-1.5 justify-center"
          >
            <span>आगे बढ़ें (Next)</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <Dropdown
            label="क्या आप किसान हैं? (Are you a Farmer?)"
            options={[
              { value: "yes", label: "हाँ (Yes)" },
              { value: "no", label: "नहीं (No)" },
            ]}
            value={isFarmer}
            onChange={setIsFarmer}
          />
          <Dropdown
            label="क्या आप छात्र हैं? (Are you a Student?)"
            options={[
              { value: "yes", label: "हाँ (Yes)" },
              { value: "no", label: "नहीं (No)" },
            ]}
            value={isStudent}
            onChange={setIsStudent}
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleBack}
              className="flex-1 flex gap-1.5 justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>पीछे (Back)</span>
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 flex gap-1.5 justify-center"
            >
              <span>आगे (Next)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <Input
            label="वार्षिक पारिवारिक आय (Annual Income - ₹) *"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleBack}
              className="flex-1 flex gap-1.5 justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>पीछे (Back)</span>
            </Button>
            <Button
              variant="green"
              onClick={calculateEligibility}
              className="flex-1 flex gap-1.5 justify-center"
            >
              <Check className="h-4 w-4" />
              <span>जांचें (Check Eligibility)</span>
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-base font-serif text-primary">
            अनुशंसित योजनाएं (Recommended Schemes):
          </h3>
          {results.length === 0 ? (
            <span className="text-xs text-text-secondary">
              आपकी पात्रता के अनुकूल कोई योजना नहीं मिली।
            </span>
          ) : (
            <div className="flex flex-col gap-2">
              {results.map((sch) => (
                <div
                  key={sch.id}
                  className="border border-border-subtle p-3 rounded-lg flex items-center justify-between text-xs hover:border-accent"
                >
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="font-bold text-text-primary">
                      {sch.title}
                    </span>
                    <span className="text-text-muted">
                      {sch.category} | {sch.state}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast.success(`Details of ${sch.title}`)}
                  >
                    विवरण देखें →
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="secondary"
            onClick={() => setStep(1)}
            className="w-full mt-2"
          >
            दोबारा जांचें (Reset Calculator)
          </Button>
        </div>
      )}
    </Card>
  );
}
