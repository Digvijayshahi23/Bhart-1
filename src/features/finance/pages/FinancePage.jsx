import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { Progress } from "../../../components/common/Progress.jsx";
import { FINANCE_DISCLAIMER } from "../../../services/finance/financePromptBuilder.js";
import { getWelfareSchemes } from "../../../services/finance/welfareEngine.js";
import { calculateEMI } from "../../../services/finance/loanCalculator.js";
import { calculateBudgetSummary } from "../../../services/finance/budgetPlanner.js";
import { getTaxTopics, TAX_SLABS } from "../../../services/finance/taxGuide.js";
import { getLiteracyTopics } from "../../../services/finance/financialLiteracy.js";
import { PiggyBank, Plus, Trash2, AlertCircle, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Budget Planner State
  const [income, setIncome] = useState("50000");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState(() => {
    const cached = localStorage.getItem("budget_expenses");
    return cached
      ? JSON.parse(cached)
      : [
          { id: 1, title: "मकान किराया (Rent)", amount: "12000" },
          { id: 2, title: "राशन भोजन (Groceries)", amount: "6000" },
          { id: 3, title: "बिजली बिल (Utility)", amount: "2500" },
        ];
  });

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [duration, setDuration] = useState("5");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("budget_expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Compute Budget Summary
  const budgetSummary = calculateBudgetSummary(income, expenses);

  // Compute EMI calculations
  const emiResult = calculateEMI(loanAmount, interestRate, duration);

  const addExpense = (e) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount || isNaN(expenseAmount)) {
      toast.error("कृपया वैध शीर्षक और राशि दर्ज करें (Enter valid details)");
      return;
    }
    const newExpense = {
      id: Date.now(),
      title: expenseTitle,
      amount: expenseAmount,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setExpenseTitle("");
    setExpenseAmount("");
    toast.success("खर्च जोड़ा गया (Expense added!)");
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    toast.success("खर्च हटाया गया (Expense removed)");
  };

  const tabsConfig = [
    { value: "dashboard", label: "डैशबोर्ड (Dashboard)" },
    { value: "budget", label: "बजट नियोजक (Budget Planner)" },
    { value: "emi", label: "EMI कैलकुलेटर (EMI Calc)" },
    { value: "welfare", label: "कल्याणकारी योजनाएं (Welfare)" },
    { value: "tax", label: "टैक्स और साक्षरता (Tax & Literacy)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="वित्तीय और कल्याणकारी सहायक (Finance & Welfare Advisor)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* 1. Mandatory Financial Disclaimer Alert Banner */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-left">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 text-xs text-amber-800 font-semibold leading-relaxed">
                <span>{FINANCE_DISCLAIMER}</span>
              </div>
            </div>

            {/* Layout tabs switcher */}
            <Tabs
              tabs={tabsConfig}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* --- DASHBOARD TAB --- */}
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-6 text-left">
                {/* AI Advisor Banner */}
                <div className="bg-primary text-white p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border-subtle shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
                  <div className="flex flex-col gap-1.5 max-w-xl">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest">
                      वित्तीय साक्षरता डेस्क
                    </span>
                    <h3 className="font-bold text-base font-serif leading-tight">
                      आपके राज्य और जिला प्रोफाइल के अनुसार
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      💡 **AI सुझाव**: यदि आपकी कृषि भूमि है, तो आप "फसल बीमा
                      योजना" (PMFBY) के पात्र हो सकते हैं। प्रीमियम दरों और
                      लाभों का विश्लेषण करने के लिए सीधे AI सहायक से बात करें।
                    </p>
                  </div>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => navigate("/chat")}
                    className="text-white hover:bg-white/10 shrink-0 self-start sm:self-center"
                  >
                    सलाहकार खोलें (Open AI Chat)
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Popular schemes & Savings summary */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Savings overview progress card */}
                    <Card title="बजट सारांश (Budget Overview)">
                      <div className="flex flex-col gap-4 text-xs text-left">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[10px] text-text-muted">
                              कुल आय (Income)
                            </span>
                            <span className="font-bold text-sm text-text-primary">
                              ₹{budgetSummary.income}
                            </span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[10px] text-text-muted">
                              कुल खर्च (Expenses)
                            </span>
                            <span className="font-bold text-sm text-red-600">
                              - ₹{budgetSummary.expensesTotal}
                            </span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[10px] text-text-muted">
                              बचत (Savings)
                            </span>
                            <span className="font-bold text-sm text-emerald-600">
                              ₹{budgetSummary.remainingSavings}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-2">
                          <div className="flex justify-between items-center text-[10px] text-text-secondary font-bold">
                            <span>
                              मासिक बचत प्रतिशत (Monthly Savings Rate)
                            </span>
                            <span>{budgetSummary.savingsPercentage}%</span>
                          </div>
                          <Progress
                            value={budgetSummary.savingsPercentage}
                            max={100}
                            variant="green"
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Popular Welfare Schemes */}
                    <Card title="लोकप्रिय कल्याणकारी योजनाएं (Popular Welfare Schemes)">
                      <div className="flex flex-col gap-3">
                        {getWelfareSchemes()
                          .slice(0, 3)
                          .map((wf) => (
                            <div
                              key={wf.id}
                              className="border border-border-subtle p-3.5 rounded-xl flex items-start justify-between gap-4 text-xs"
                            >
                              <div className="flex flex-col gap-1 text-left">
                                <span className="font-bold text-sm text-text-primary font-serif">
                                  {wf.name}
                                </span>
                                <p className="text-text-secondary leading-relaxed mt-0.5">
                                  {wf.desc}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  toast.success(
                                    `Eligibility details for ${wf.name}`,
                                  );
                                }}
                                className="text-amber-600 hover:bg-amber-50 shrink-0"
                              >
                                विवरण
                              </Button>
                            </div>
                          ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Financial Literacy Tips */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card title="वित्तीय साक्षरता टिप्स (Money Tips)">
                      <div className="flex flex-col gap-4 text-xs text-left">
                        {getLiteracyTopics().map((t, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col gap-1 border-b border-border-subtle pb-3 last:border-0 last:pb-0"
                          >
                            <span className="font-bold text-text-primary font-serif text-sm flex items-center gap-1.5">
                              <TrendingUp className="h-4 w-4 text-emerald-600" />
                              {t.title}
                            </span>
                            <p className="text-text-secondary leading-relaxed mt-0.5">
                              {t.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* --- BUDGET PLANNER TAB --- */}
            {activeTab === "budget" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Inputs & Add Expense Form */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card title="बजट सेटिंग्स (Budget Config)">
                    <div className="flex flex-col gap-4">
                      <Input
                        label="मासिक पारिवारिक आय (Monthly Income - ₹) *"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                      <hr className="border-border-subtle my-1" />
                      <span className="text-xs font-bold text-text-secondary">
                        नया खर्च जोड़ें (Add Monthly Expense)
                      </span>
                      <form
                        onSubmit={addExpense}
                        className="flex flex-col gap-3"
                      >
                        <Input
                          label="खर्च का नाम (Expense Title) *"
                          placeholder="e.g. राशन, दवाइयां"
                          value={expenseTitle}
                          onChange={(e) => setExpenseTitle(e.target.value)}
                        />
                        <Input
                          label="राशि (Amount - ₹) *"
                          type="number"
                          placeholder="3000"
                          value={expenseAmount}
                          onChange={(e) => setExpenseAmount(e.target.value)}
                        />
                        <Button
                          type="submit"
                          className="w-full flex gap-1.5 justify-center"
                        >
                          <Plus className="h-4 w-4" />
                          <span>खर्च जोड़ें (Add Expense)</span>
                        </Button>
                      </form>
                    </div>
                  </Card>
                </div>

                {/* Expenses breakdown sheet */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Summary progress parameters */}
                  <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs text-xs">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-muted">मासिक आय</span>
                        <span className="font-bold text-sm">
                          ₹{budgetSummary.income}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-muted">कुल खर्च</span>
                        <span className="font-bold text-sm text-red-600">
                          ₹{budgetSummary.expensesTotal}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-muted">शेष बचत</span>
                        <span className="font-bold text-sm text-emerald-600">
                          ₹{budgetSummary.remainingSavings}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-text-secondary font-bold mb-1">
                      <span>बचत दर (Savings Rate)</span>
                      <span>{budgetSummary.savingsPercentage}%</span>
                    </div>
                    <Progress
                      value={budgetSummary.savingsPercentage}
                      max={100}
                      variant="green"
                    />
                  </div>

                  {/* Expenses List */}
                  <Card title="मासिक खर्च सूची (Expenses List)">
                    <div className="flex flex-col gap-2.5">
                      {expenses.length === 0 ? (
                        <span className="text-xs text-text-muted py-6">
                          कोई खर्च रिकॉर्ड नहीं किया गया है।
                        </span>
                      ) : (
                        expenses.map((exp) => (
                          <div
                            key={exp.id}
                            className="border border-border-subtle p-3 rounded-lg flex items-center justify-between text-xs hover:border-red-500/30 transition-colors"
                          >
                            <span className="font-bold text-text-primary">
                              {exp.title}
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-red-600">
                                - ₹{exp.amount}
                              </span>
                              <button
                                onClick={() => removeExpense(exp.id)}
                                className="p-1 text-text-muted hover:text-danger rounded hover:bg-slate-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* --- EMI CALCULATOR TAB --- */}
            {activeTab === "emi" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Calculator settings */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card title="ऋण विवरण दर्ज करें (EMI Inputs)">
                    <div className="flex flex-col gap-4">
                      <Input
                        label="ऋण राशि (Loan Amount - ₹) *"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                      <Input
                        label="ब्याज दर (Interest Rate - % Annual) *"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                      <Input
                        label="अवधि (Duration - Years) *"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </Card>
                </div>

                {/* Outputs breakdown */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-xs leading-relaxed text-text-secondary">
                  <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-xs flex flex-col gap-4">
                    <span className="text-[10px] text-accent font-bold tracking-wider uppercase">
                      गणना परिणाम (Calculation Results)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-border-subtle pb-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-muted">
                          मासिक ईएमआई (Monthly EMI)
                        </span>
                        <span className="font-extrabold text-lg text-primary">
                          ₹{emiResult.emi}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-muted">
                          कुल ब्याज (Interest Payable)
                        </span>
                        <span className="font-extrabold text-lg text-text-primary">
                          ₹{emiResult.interestPayable}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-muted">
                          कुल भुगतान (Total Payable)
                        </span>
                        <span className="font-extrabold text-lg text-emerald-600">
                          ₹{emiResult.totalPayment}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-text-muted mt-1 leading-relaxed">
                      💡 **गणना सूचना**: यह गणना सामान्य ब्याज चक्रवृद्धि नियमों
                      के आधार पर की गई है। वास्तविक ब्याज दरें आपके ऋणदाता
                      (Bank/FI) के नियमों के अनुसार भिन्न हो सकती हैं।
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- WELFARE SCHEMES TAB --- */}
            {activeTab === "welfare" && (
              <div className="flex flex-col gap-4 text-left">
                <Card title="सरकारी वित्तीय कल्याण योजनाएं (Government Welfare Schemes)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {getWelfareSchemes().map((wf) => (
                      <div
                        key={wf.id}
                        className="border border-border-subtle p-5 rounded-2xl flex flex-col gap-2 hover:border-amber-500/40 transition-colors"
                      >
                        <Badge variant="saffron" className="self-start">
                          Welfare Scheme
                        </Badge>
                        <h4 className="font-bold text-sm font-serif text-text-primary mt-1 leading-tight">
                          {wf.name}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {wf.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* --- TAX & LITERACY TAB --- */}
            {activeTab === "tax" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left Column: Tax Slabs table */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <Card title="नवीनतम आयकर स्लैब (Income Tax Slabs)">
                    <div className="overflow-x-auto text-xs text-left">
                      <table className="w-full border-collapse border border-border-subtle">
                        <thead>
                          <tr className="bg-slate-50 border-b border-border-subtle">
                            <th className="p-3 text-left font-bold text-text-primary border-r border-border-subtle">
                              कुल आय (Income Bracket)
                            </th>
                            <th className="p-3 text-left font-bold text-text-primary">
                              कर दर (Tax Rate)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {TAX_SLABS.map((sl, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-border-subtle hover:bg-slate-50/50"
                            >
                              <td className="p-3 font-semibold text-text-primary border-r border-border-subtle">
                                {sl.income}
                              </td>
                              <td className="p-3 font-bold text-emerald-600">
                                {sl.rate}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  {/* Tax basics definitions */}
                  <Card title="टैक्स बेसिक्स (Tax Basics)">
                    <div className="flex flex-col gap-3.5 text-xs text-left">
                      {getTaxTopics().map((t, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 border-b border-border-subtle pb-2.5 last:border-0 last:pb-0"
                        >
                          <span className="font-bold text-text-primary text-sm font-serif">
                            {t.title}
                          </span>
                          <p className="text-text-secondary leading-relaxed mt-0.5">
                            {t.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Right Column: Financial literacy topics list */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card title="वित्तीय साक्षरता निर्देशिका (Money Literacy)">
                    <div className="flex flex-col gap-4 text-xs text-left">
                      {getLiteracyTopics().map((t, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 border-b border-border-subtle pb-3 last:border-0 last:pb-0"
                        >
                          <span className="font-bold text-text-primary font-serif text-sm flex items-center gap-1.5">
                            <PiggyBank className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                            {t.title}
                          </span>
                          <p className="text-text-secondary leading-relaxed mt-0.5">
                            {t.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
