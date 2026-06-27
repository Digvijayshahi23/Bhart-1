import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { Progress } from "../../../components/common/Progress.jsx";
import { Avatar } from "../../../components/common/Avatar.jsx";
import { SearchBar } from "../../../components/common/SearchBar.jsx";

import { analyzeProfile } from "../../../services/personalization/profileAnalyzer.js";
import { getRecommendations } from "../../../services/personalization/recommendationEngine.js";
import { getActivityLog } from "../../../services/personalization/activityTracker.js";
import {
  getSearchHistory,
  getChatHistory,
  deleteSearch,
  clearSearchHistory,
  deleteChatEntry,
} from "../../../services/personalization/historyManager.js";
import {
  getNotifications,
  markAllRead,
  markRead,
  deleteNotification,
  getUnreadCount,
} from "../../../services/personalization/notificationEngine.js";
import {
  getAllBookmarks,
  removeBookmark,
} from "../../../services/personalization/bookmarkManager.js";

import {
  User,
  Bookmark,
  Bell,
  Search,
  MessageSquare,
  CheckCircle,
  Trash2,
  Pin,
  ExternalLink,
  Shield,
  Globe,
  Accessibility,
  Download,
  AlertTriangle,
  ChevronRight,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

// ─── Notification category badge colours ───────────────────────────────────
const CAT_VARIANT = {
  Government: "primary",
  Career: "accent",
  Healthcare: "green",
  Finance: "saffron",
  Legal: "secondary",
  Security: "red",
  AI: "primary",
  Account: "secondary",
};

// ─── Activity type icons ────────────────────────────────────────────────────
const ACTIVITY_ICONS = {
  login: "🔐",
  bookmark: "🔖",
  upload: "📄",
  chat: "💬",
  search: "🔍",
  settings: "⚙️",
};

// ─── Language list ──────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
  { code: "as", label: "অসমীয়া (Assamese)" },
];

// ─── Settings categories ────────────────────────────────────────────────────
const SETTINGS_SECTIONS = [
  { id: "account", label: "अकाउंट (Account)", icon: User },
  { id: "privacy", label: "गोपनीयता (Privacy)", icon: Shield },
  { id: "language", label: "भाषा (Language)", icon: Globe },
  {
    id: "accessibility",
    label: "अभिगम्यता (Accessibility)",
    icon: Accessibility,
  },
  { id: "notifications", label: "सूचनाएं (Notifications)", icon: Bell },
  { id: "data", label: "डेटा निर्यात (Export Data)", icon: Download },
];

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // ── Tab state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("profile");

  // ── Profile edit state ─────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(profile?.name || "");
  const [editPhone, setEditPhone] = useState(profile?.phone || "");
  const [editState, setEditState] = useState(profile?.state || "");
  const [editDistrict, setEditDistrict] = useState(profile?.district || "");
  const [editOccupation, setEditOccupation] = useState(
    profile?.occupation || "",
  );
  const [editLanguage, setEditLanguage] = useState(profile?.language || "hi");

  // ── Notification state ─────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState(() => getNotifications());
  const [notifFilter, setNotifFilter] = useState("all");
  const unreadCount = getUnreadCount(notifications);

  // ── Search/Chat history state ──────────────────────────────────────────────
  const [searchHistory, setSearchHistory] = useState(() => getSearchHistory());
  const [chatHistory, setChatHistory] = useState(() => getChatHistory());
  const [historySearchQ, setHistorySearchQ] = useState("");

  // ── Bookmarks ──────────────────────────────────────────────────────────────
  const [bookmarks, setBookmarks] = useState(() => getAllBookmarks());
  const [bookmarkFilter, setBookmarkFilter] = useState("all");
  const [bookmarkSearch, setBookmarkSearch] = useState("");

  // ── Activity log ───────────────────────────────────────────────────────────
  const [activityLog] = useState(() => getActivityLog());

  // ── Settings state ─────────────────────────────────────────────────────────
  const [activeSettingsSection, setActiveSettingsSection] = useState("account");
  const [selectedLang, setSelectedLang] = useState(profile?.language || "hi");
  // darkMode reserved for Phase 14 global theme toggle
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // ── Derived values ─────────────────────────────────────────────────────────
  const profileAnalysis = useMemo(
    () => analyzeProfile(profile || {}),
    [profile],
  );
  const recommendations = useMemo(
    () => getRecommendations(profile || {}),
    [profile],
  );

  const filteredNotifications = useMemo(() => {
    if (notifFilter === "unread") return notifications.filter((n) => !n.read);
    if (notifFilter === "read") return notifications.filter((n) => n.read);
    return notifications;
  }, [notifications, notifFilter]);

  const filteredBookmarks = useMemo(() => {
    let result = bookmarks;
    if (bookmarkFilter !== "all")
      result = result.filter((b) => b.module === bookmarkFilter);
    if (bookmarkSearch)
      result = result.filter((b) =>
        b.id.toLowerCase().includes(bookmarkSearch.toLowerCase()),
      );
    return result;
  }, [bookmarks, bookmarkFilter, bookmarkSearch]);

  const filteredSearchHistory = useMemo(() => {
    if (!historySearchQ) return searchHistory;
    return searchHistory.filter((s) =>
      s.query.toLowerCase().includes(historySearchQ.toLowerCase()),
    );
  }, [searchHistory, historySearchQ]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success("प्रोफ़ाइल अपडेट किया गया (Profile saved)!");
    setEditMode(false);
  };

  const handleMarkAllRead = () => {
    setNotifications(markAllRead());
    toast.success("सभी सूचनाएं पढ़ी गई (All notifications marked read)");
  };

  const handleMarkRead = (id) => setNotifications(markRead(id));

  const handleDeleteNotif = (id) => {
    setNotifications(deleteNotification(id));
    toast.success("सूचना हटाई गई (Notification deleted)");
  };

  const handleDeleteSearch = (id) => {
    setSearchHistory(deleteSearch(id));
    toast.success("खोज इतिहास हटाया गया");
  };

  const handleClearSearchHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
    toast.success("खोज इतिहास साफ़ किया गया (History cleared)");
  };

  const handleDeleteChat = (id) => {
    setChatHistory(deleteChatEntry(id));
    toast.success("चैट हटाई गई (Chat deleted)");
  };

  const handleRemoveBookmark = (id, storageKey) => {
    removeBookmark(id, storageKey);
    setBookmarks(getAllBookmarks());
    toast.success("बुकमार्क हटाया गया");
  };

  // ── Tab configuration ──────────────────────────────────────────────────────
  const tabsConfig = [
    { value: "profile", label: "प्रोफ़ाइल (Profile)" },
    { value: "bookmarks", label: `बुकमार्क (${bookmarks.length})` },
    {
      value: "notifications",
      label: `सूचनाएं (${unreadCount > 0 ? unreadCount + " नई" : "0"})`,
    },
    { value: "activity", label: "गतिविधि (Activity)" },
    { value: "history", label: "इतिहास (History)" },
    { value: "settings", label: "सेटिंग्स (Settings)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        <Navbar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header title="मेरी प्रोफ़ाइल एवं व्यक्तिगत डैशबोर्ड (My Profile)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            <Tabs
              tabs={tabsConfig}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* ══════════════════════════════════════════════════════════════
                TAB: PROFILE
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left: Profile card */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <Card className="p-6 flex flex-col items-center gap-4 border-t-4 border-t-saffron text-center">
                    <div className="relative">
                      <Avatar
                        name={profile?.name || user?.email || "U"}
                        src={profile?.photoURL}
                        size="xl"
                      />
                      <span className="absolute bottom-0 right-0 w-5 h-5 bg-green rounded-full border-2 border-white" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-bold text-base font-serif text-text-primary">
                        {profile?.name || "नागरिक"}
                      </h3>
                      <span className="text-xs text-text-muted">
                        {user?.email}
                      </span>
                      {profile?.state && (
                        <span className="text-[10px] text-text-muted mt-0.5">
                          📍 {profile.state}
                          {profile.district ? `, ${profile.district}` : ""}
                        </span>
                      )}
                    </div>

                    {/* Profile completion progress */}
                    <div className="w-full flex flex-col gap-1.5 mt-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-secondary">
                        <span>प्रोफ़ाइल पूर्णता (Completion)</span>
                        <span>{profileAnalysis.percentage}%</span>
                      </div>
                      <Progress
                        value={profileAnalysis.percentage}
                        max={100}
                        variant={
                          profileAnalysis.percentage >= 80 ? "green" : "saffron"
                        }
                      />
                    </div>

                    {profileAnalysis.missing.length > 0 && (
                      <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-3 text-left">
                        <span className="text-[10px] font-bold text-amber-700 block mb-1.5">
                          लंबित फ़ील्ड (Missing Fields):
                        </span>
                        <div className="flex flex-col gap-1">
                          {profileAnalysis.missing.map((f, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-amber-800 flex items-center gap-1.5"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              {f.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => setEditMode((v) => !v)}
                      variant={editMode ? "secondary" : "primary"}
                      className="w-full"
                      size="sm"
                    >
                      {editMode
                        ? "रद्द करें (Cancel)"
                        : "प्रोफ़ाइल संपादित करें (Edit Profile)"}
                    </Button>
                  </Card>

                  {/* AI Recommendations panel */}
                  <Card title="AI व्यक्तिगत सुझाव (For You)">
                    <div className="flex flex-col gap-3">
                      {recommendations.slice(0, 3).map((rec) => (
                        <button
                          key={rec.id}
                          onClick={() => navigate(rec.to)}
                          className="border border-border-subtle p-3 rounded-xl text-left hover:border-saffron/50 hover:bg-amber-50/30 transition-colors flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <Badge variant="saffron" className="text-[9px]">
                              {rec.tag}
                            </Badge>
                            <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
                          </div>
                          <span className="text-xs font-bold text-text-primary font-serif leading-tight">
                            {rec.title}
                          </span>
                          <span className="text-[10px] text-text-secondary leading-relaxed">
                            {rec.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Right: Profile edit form or view */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {editMode ? (
                    <Card title="प्रोफ़ाइल संपादित करें (Edit Profile)">
                      <form
                        onSubmit={handleSaveProfile}
                        className="flex flex-col gap-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="पूरा नाम (Full Name) *"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Digvijay Shahi"
                          />
                          <Input
                            label="मोबाइल नंबर (Phone)"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                          />
                          <Input
                            label="राज्य (State)"
                            value={editState}
                            onChange={(e) => setEditState(e.target.value)}
                            placeholder="Uttar Pradesh"
                          />
                          <Input
                            label="जिला (District)"
                            value={editDistrict}
                            onChange={(e) => setEditDistrict(e.target.value)}
                            placeholder="Varanasi"
                          />
                          <Input
                            label="व्यवसाय (Occupation)"
                            value={editOccupation}
                            onChange={(e) => setEditOccupation(e.target.value)}
                            placeholder="student / farmer / business"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-bold text-text-secondary">
                            भाषा चुनें (Preferred Language)
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {LANGUAGES.map((lang) => (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() => setEditLanguage(lang.code)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                                  editLanguage === lang.code
                                    ? "bg-saffron text-white border-saffron"
                                    : "bg-surface border-border-subtle text-text-secondary hover:bg-surface-hover"
                                }`}
                              >
                                {lang.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 mt-2">
                          <Button type="submit" className="flex-1">
                            परिवर्तन सहेजें (Save Changes)
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setEditMode(false)}
                          >
                            रद्द करें
                          </Button>
                        </div>
                      </form>
                    </Card>
                  ) : (
                    <Card title="प्रोफ़ाइल जानकारी (Profile Details)">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left">
                        {[
                          { label: "पूरा नाम (Name)", val: profile?.name },
                          { label: "ईमेल (Email)", val: user?.email },
                          {
                            label: "मोबाइल (Phone)",
                            val: profile?.phone || "—",
                          },
                          {
                            label: "राज्य (State)",
                            val: profile?.state || "—",
                          },
                          {
                            label: "जिला (District)",
                            val: profile?.district || "—",
                          },
                          {
                            label: "व्यवसाय (Occupation)",
                            val: profile?.occupation || "—",
                          },
                          {
                            label: "प्राथमिक भाषा (Language)",
                            val:
                              LANGUAGES.find(
                                (l) => l.code === profile?.language,
                              )?.label || "हिन्दी (Hindi)",
                          },
                          {
                            label: "खाता बनाया (Account Created)",
                            val: user?.metadata?.creationTime
                              ? new Date(
                                  user.metadata.creationTime,
                                ).toLocaleDateString("hi-IN")
                              : "—",
                          },
                        ].map((row, i) => (
                          <div
                            key={i}
                            className="flex flex-col gap-0.5 border-b border-border-subtle pb-2.5 last:border-0"
                          >
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                              {row.label}
                            </span>
                            <span className="font-semibold text-text-primary">
                              {row.val || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* All AI Recommendations */}
                  <Card title="आपके लिए AI सुझाव (All Recommendations)">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recommendations.map((rec) => (
                        <button
                          key={rec.id}
                          onClick={() => navigate(rec.to)}
                          className="border border-border-subtle p-4 rounded-xl text-left hover:border-primary/30 hover:bg-blue-50/20 transition-colors flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between">
                            <Badge variant="primary" className="text-[9px]">
                              {rec.tag}
                            </Badge>
                            <Star className="h-3.5 w-3.5 text-saffron" />
                          </div>
                          <span className="text-xs font-bold text-text-primary font-serif leading-tight">
                            {rec.title}
                          </span>
                          <span className="text-[10px] text-text-secondary leading-relaxed">
                            {rec.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB: BOOKMARKS
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === "bookmarks" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div className="max-w-sm w-full">
                    <SearchBar
                      value={bookmarkSearch}
                      onChange={setBookmarkSearch}
                      placeholder="बुकमार्क खोजें..."
                    />
                  </div>
                  {/* Module filter chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {["all", "Career", "Legal", "Finance"].map((mod) => (
                      <button
                        key={mod}
                        onClick={() => setBookmarkFilter(mod)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          bookmarkFilter === mod
                            ? "bg-saffron text-white border-saffron"
                            : "bg-surface border-border-subtle text-text-secondary hover:bg-surface-hover"
                        }`}
                      >
                        {mod === "all" ? "सभी (All)" : mod}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredBookmarks.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center gap-3 border-2 border-dashed border-border-subtle rounded-2xl">
                    <Bookmark className="h-10 w-10 text-text-muted" />
                    <p className="text-sm font-bold text-text-secondary">
                      कोई बुकमार्क नहीं मिला (No bookmarks found)
                    </p>
                    <p className="text-xs text-text-muted max-w-xs">
                      योजनाओं, करियर, कानूनी या वित्त मॉड्यूल में बुकमार्क आइकन
                      क्लिक करें।
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredBookmarks.map((bm) => (
                      <div
                        key={bm.id}
                        className="border border-border-subtle p-4 rounded-2xl flex flex-col gap-3 hover:border-saffron/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={CAT_VARIANT[bm.module] || "secondary"}
                          >
                            {bm.module}
                          </Badge>
                          <button
                            onClick={() =>
                              handleRemoveBookmark(bm.id, bm.storageKey)
                            }
                            className="p-1 text-text-muted hover:text-danger rounded hover:bg-slate-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-text-primary font-serif">
                          ID: {bm.id}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            navigate(`/${bm.module.toLowerCase()}`)
                          }
                          className="text-xs text-accent self-start"
                        >
                          मॉड्यूल खोलें (Open) →
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB: NOTIFICATIONS
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === "notifications" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-text-primary">
                      सूचना केंद्र (Notification Center)
                    </h3>
                    {unreadCount > 0 && (
                      <Badge variant="red">{unreadCount} नई</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["all", "unread", "read"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setNotifFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          notifFilter === f
                            ? "bg-primary text-white border-primary"
                            : "bg-surface border-border-subtle text-text-secondary hover:bg-surface-hover"
                        }`}
                      >
                        {f === "all"
                          ? "सभी"
                          : f === "unread"
                            ? "अपठित"
                            : "पढ़ी गई"}
                      </button>
                    ))}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleMarkAllRead}
                      className="text-xs"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      सभी पढ़ी गई (Mark All Read)
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {filteredNotifications.length === 0 ? (
                    <div className="py-16 text-center border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center gap-3">
                      <Bell className="h-10 w-10 text-text-muted" />
                      <p className="text-sm text-text-secondary">
                        कोई सूचना नहीं (No notifications)
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`border p-4 rounded-2xl flex items-start justify-between gap-4 transition-colors ${
                          !notif.read
                            ? "border-primary/30 bg-blue-50/20"
                            : "border-border-subtle bg-surface"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 text-left">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              !notif.read ? "bg-primary" : "bg-border-subtle"
                            }`}
                          />
                          <div className="flex flex-col gap-0.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant={
                                  CAT_VARIANT[notif.category] || "secondary"
                                }
                                className="text-[9px]"
                              >
                                {notif.category}
                              </Badge>
                              <span className="text-[10px] text-text-muted">
                                {new Date(notif.timestamp).toLocaleString(
                                  "hi-IN",
                                )}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-text-primary mt-0.5">
                              {notif.title}
                            </span>
                            <p className="text-[11px] text-text-secondary leading-relaxed">
                              {notif.body}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => handleMarkRead(notif.id)}
                              className="p-1.5 rounded text-text-muted hover:text-primary hover:bg-slate-100"
                              title="पढ़ी गई (Mark Read)"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteNotif(notif.id)}
                            className="p-1.5 rounded text-text-muted hover:text-danger hover:bg-slate-100"
                            title="हटाएं (Delete)"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB: ACTIVITY TIMELINE
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === "activity" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-text-primary">
                    गतिविधि समयरेखा (Activity Timeline)
                  </h3>
                  <Badge variant="secondary">
                    {activityLog.length} गतिविधियां
                  </Badge>
                </div>

                <div className="flex flex-col gap-0">
                  {activityLog.map((entry, idx) => (
                    <div key={entry.id} className="flex gap-4 relative">
                      {/* Timeline connector line */}
                      {idx < activityLog.length - 1 && (
                        <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-border-subtle" />
                      )}

                      {/* Icon bubble */}
                      <div className="w-10 h-10 rounded-full bg-surface border border-border-subtle flex items-center justify-center text-base shrink-0 z-10">
                        {ACTIVITY_ICONS[entry.type] || "📌"}
                      </div>

                      {/* Entry content */}
                      <div className="flex-1 pb-6 flex flex-col gap-0.5 text-xs text-left">
                        <span className="font-bold text-text-primary">
                          {entry.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[9px]">
                            {entry.module}
                          </Badge>
                          <span className="text-[10px] text-text-muted">
                            {new Date(entry.timestamp).toLocaleString("hi-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB: SEARCH & CHAT HISTORY
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === "history" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                {/* Search History */}
                <Card title="खोज इतिहास (Search History)">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <SearchBar
                        value={historySearchQ}
                        onChange={setHistorySearchQ}
                        placeholder="इतिहास में खोजें..."
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleClearSearchHistory}
                        className="text-danger text-xs shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Clear All
                      </Button>
                    </div>

                    {filteredSearchHistory.length === 0 ? (
                      <div className="py-10 text-center text-xs text-text-muted">
                        <Search className="h-8 w-8 mx-auto mb-2 text-text-muted opacity-50" />
                        कोई खोज इतिहास नहीं
                      </div>
                    ) : (
                      filteredSearchHistory.map((s) => (
                        <div
                          key={s.id}
                          className="border border-border-subtle p-3 rounded-xl flex items-center justify-between gap-3 hover:border-primary/20 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {s.pinned ? (
                              <Pin className="h-3.5 w-3.5 text-saffron shrink-0" />
                            ) : (
                              <Search className="h-3.5 w-3.5 text-text-muted shrink-0" />
                            )}
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="text-xs font-semibold text-text-primary truncate">
                                {s.query}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <Badge
                                  variant="secondary"
                                  className="text-[9px]"
                                >
                                  {s.module}
                                </Badge>
                                <span className="text-[10px] text-text-muted">
                                  {new Date(s.timestamp).toLocaleDateString(
                                    "hi-IN",
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteSearch(s.id)}
                            className="p-1 text-text-muted hover:text-danger rounded hover:bg-slate-100 shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </Card>

                {/* Chat History */}
                <Card title="चैट इतिहास (Chat History)">
                  <div className="flex flex-col gap-3">
                    {chatHistory.length === 0 ? (
                      <div className="py-10 text-center text-xs text-text-muted">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        कोई चैट इतिहास नहीं
                      </div>
                    ) : (
                      chatHistory.map((chat) => (
                        <div
                          key={chat.id}
                          className="border border-border-subtle p-3 rounded-xl flex items-center justify-between gap-3 hover:border-primary/20 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {chat.pinned ? (
                              <Pin className="h-3.5 w-3.5 text-saffron shrink-0" />
                            ) : (
                              <MessageSquare className="h-3.5 w-3.5 text-text-muted shrink-0" />
                            )}
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="text-xs font-semibold text-text-primary truncate">
                                {chat.title}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <Badge
                                  variant="secondary"
                                  className="text-[9px]"
                                >
                                  {chat.module}
                                </Badge>
                                <span className="text-[10px] text-text-muted">
                                  {chat.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => navigate("/chat")}
                              className="p-1 text-text-muted hover:text-primary rounded hover:bg-slate-100"
                              title="जारी रखें (Continue)"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteChat(chat.id)}
                              className="p-1 text-text-muted hover:text-danger rounded hover:bg-slate-100"
                              title="हटाएं (Delete)"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB: SETTINGS
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === "settings" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left: Settings nav */}
                <div className="lg:col-span-3 flex flex-col gap-1.5">
                  {SETTINGS_SECTIONS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveSettingsSection(s.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all text-left ${
                          activeSettingsSection === s.id
                            ? "bg-primary text-white shadow-xs"
                            : "bg-surface text-text-secondary hover:bg-surface-hover border border-border-subtle"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* Right: Settings content pane */}
                <div className="lg:col-span-9 flex flex-col gap-4">
                  {activeSettingsSection === "account" && (
                    <Card title="अकाउंट सेटिंग्स (Account Settings)">
                      <div className="flex flex-col gap-4 text-xs">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-text-primary">
                              ईमेल पता (Email Address)
                            </span>
                            <span className="text-text-muted">
                              {user?.email}
                            </span>
                          </div>
                          <Badge variant="green">Verified</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-text-primary">
                              पासवर्ड बदलें (Change Password)
                            </span>
                            <span className="text-text-muted">
                              रीसेट लिंक ईमेल पर भेजा जाएगा।
                            </span>
                          </div>
                          <Button size="sm" variant="secondary">
                            Reset
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-danger">
                              अकाउंट हटाएं (Delete Account)
                            </span>
                            <span className="text-text-muted">
                              यह क्रिया अपरिवर्तनीय है।
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-danger border border-red-200 hover:bg-red-50"
                            onClick={() =>
                              toast.error(
                                "खाता हटाने की सुविधा जल्द आएगी (Coming soon)",
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeSettingsSection === "language" && (
                    <Card title="भाषा चयन (Language Selector)">
                      <div className="flex flex-col gap-3 text-xs">
                        <p className="text-text-secondary leading-relaxed">
                          अपनी पसंदीदा भाषा चुनें जिसमें आप BharatOne AI का
                          उपयोग करना चाहते हैं।
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setSelectedLang(lang.code);
                                toast.success(
                                  `भाषा: ${lang.label} (Coming soon)`,
                                );
                              }}
                              className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                                selectedLang === lang.code
                                  ? "bg-saffron text-white border-saffron"
                                  : "bg-surface border-border-subtle text-text-secondary hover:bg-surface-hover"
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-text-muted">
                          * पूर्ण बहुभाषी समर्थन अगले संस्करण में आएगा।
                        </p>
                      </div>
                    </Card>
                  )}

                  {activeSettingsSection === "accessibility" && (
                    <Card title="अभिगम्यता सेटिंग्स (Accessibility Settings)">
                      <div className="flex flex-col gap-3 text-xs">
                        {[
                          {
                            label: "बड़ा टेक्स्ट (Large Text)",
                            val: largeText,
                            set: setLargeText,
                          },
                          {
                            label: "उच्च कंट्रास्ट (High Contrast)",
                            val: highContrast,
                            set: setHighContrast,
                          },
                          {
                            label: "कम गति (Reduced Motion)",
                            val: reducedMotion,
                            set: setReducedMotion,
                          },
                        ].map((opt) => (
                          <div
                            key={opt.label}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                          >
                            <span className="font-semibold text-text-primary">
                              {opt.label}
                            </span>
                            <button
                              onClick={() => {
                                opt.set((v) => !v);
                                toast.success(
                                  `${opt.label} ${!opt.val ? "चालू" : "बंद"}`,
                                );
                              }}
                              className={`w-10 h-5 rounded-full transition-all relative ${
                                opt.val ? "bg-primary" : "bg-border-subtle"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${
                                  opt.val ? "left-5" : "left-0.5"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                        <p className="text-[10px] text-text-muted">
                          * स्क्रीन रीडर एवं वॉइस कमांड सुविधा अगले अपडेट में।
                        </p>
                      </div>
                    </Card>
                  )}

                  {activeSettingsSection === "privacy" && (
                    <Card title="गोपनीयता और सुरक्षा (Privacy & Security)">
                      <div className="flex flex-col gap-3 text-xs text-text-secondary">
                        <p className="leading-relaxed">
                          BharatOne AI आपका कोई भी व्यक्तिगत डेटा तृतीय पक्षों
                          के साथ साझा नहीं करता। सभी डेटा एन्क्रिप्टेड Firebase
                          और Supabase पर सुरक्षित रखा जाता है।
                        </p>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-xl font-semibold text-green-800">
                          ✅ आपका डेटा DPDP Act 2023 के अनुसार सुरक्षित है।
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeSettingsSection === "notifications" && (
                    <Card title="सूचना प्राथमिकताएं (Notification Preferences)">
                      <div className="flex flex-col gap-2 text-xs">
                        {[
                          "Government Schemes",
                          "Healthcare",
                          "Career & Jobs",
                          "Finance",
                          "Legal",
                          "Security Alerts",
                        ].map((cat) => (
                          <div
                            key={cat}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                          >
                            <span className="font-semibold text-text-primary">
                              {cat}
                            </span>
                            <Badge variant="green">चालू (On)</Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {activeSettingsSection === "data" && (
                    <Card title="डेटा निर्यात (Export Your Data)">
                      <div className="flex flex-col gap-4 text-xs text-text-secondary">
                        <p className="leading-relaxed">
                          आप अपना सभी डेटा JSON या PDF फॉर्मेट में डाउनलोड कर
                          सकते हैं।
                        </p>
                        <div className="flex gap-3 flex-wrap">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              toast.success(
                                "JSON निर्यात जल्द आएगा (Coming soon)",
                              )
                            }
                          >
                            <Download className="h-4 w-4 mr-1.5" />
                            JSON निर्यात
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              toast.success(
                                "PDF निर्यात जल्द आएगा (Coming soon)",
                              )
                            }
                          >
                            <Download className="h-4 w-4 mr-1.5" />
                            PDF निर्यात
                          </Button>
                        </div>
                        <p className="text-[10px] text-text-muted">
                          * डेटा निर्यात सुविधा Phase 14 में उपलब्ध होगी।
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* About BharatOne AI */}
                  <Card className="p-4 text-left text-xs text-text-secondary border-t-2 border-t-saffron">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-text-primary text-sm font-serif">
                        BharatOne AI v1.0.0
                      </span>
                      <span>भारत का AI-संचालित नागरिक सेवा पोर्टल।</span>
                      <span className="text-[10px]">
                        Built with ❤️ — Powered by Google Gemini + Firebase +
                        Supabase
                      </span>
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
