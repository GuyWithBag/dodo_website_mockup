import React, { useState } from "react";
import {
  Home,
  Heart,
  MessageCircle,
  LayoutDashboard,
  Search,
  MapPin,
  Star,
  ChevronRight,
  Zap,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  BookOpen,
  Users,
  Banknote,
  Map as MapIcon,
  Filter,
  Bell,
  UserCircle,
  X,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Check,
  ShieldCheck,
  ThumbsUp,
  GraduationCap,
  Share2,
  AtSign,
  Camera,
  Mail,
} from "lucide-react";

// --- Types & Mock Data ---
type Tab = "explore" | "saved" | "messages" | "dashboard";

const MOCK_DORMS = [
  {
    id: "1",
    name: "Obrero Student Suites",
    location: "Near USEP",
    price: 4500,
    rating: 4.8,
    reviews: 124,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600",
    tags: ["Solo", "WiFi", "Aircon"],
    featured: true,
  },
  {
    id: "2",
    name: "Roxas Co-Living",
    location: "Near AdDU Main",
    price: 3200,
    rating: 4.5,
    reviews: 89,
    imageUrl:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600",
    tags: ["Shared", "Fan"],
    featured: false,
  },
  {
    id: "3",
    name: "Matina Enclaves Dorm",
    location: "Near UM Matina",
    price: 5500,
    rating: 4.9,
    reviews: 201,
    imageUrl:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600",
    tags: ["Studio", "Gym"],
    featured: true,
  },
  {
    id: "4",
    name: "Claveria Ladies Hall",
    location: "Near AdDU Main",
    price: 2800,
    rating: 4.2,
    reviews: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=600",
    tags: ["Female Only", "Shared"],
    featured: false,
  },
];

const SCHOOL_CHIPS = [
  "AdDU Main",
  "USEP Obrero",
  "UM Bolton",
  "UM Matina",
  "San Pedro College",
  "UIC",
  "PWC",
];
const PREFERENCE_CHIPS = [
  { name: "< ₱4k", icon: Banknote },
  { name: "Solo Room", icon: UserCircle },
  { name: "Female Only", icon: Users },
  { name: "Aircon", icon: Zap },
  { name: "Free WiFi", icon: Zap },
  { name: "No Curfew", icon: ShieldCheck },
  { name: "Private Bath", icon: CheckCircle2 },
  { name: "Pet Friendly", icon: Heart },
];

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("explore");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden">
      {/* Desktop Header */}
      <header className="hidden md:block bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1
              className="text-3xl font-extrabold text-blue-600 tracking-tighter flex items-center gap-1 cursor-pointer"
              onClick={() => setActiveTab("explore")}
            >
              DoDo{" "}
              <span className="w-2 h-2 rounded-full bg-orange-500 mb-2"></span>
            </h1>
            <nav className="flex gap-6 text-sm font-bold text-gray-600">
              <a href="#" className="hover:text-orange-500 transition-colors">
                Find a Dorm
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Saved
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Messages
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                List Your Property
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <Bell size={22} />
            </button>
            <button
              onClick={() =>
                setActiveTab(
                  activeTab === "dashboard" ? "explore" : "dashboard",
                )
              }
              className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
            >
              <LayoutDashboard size={18} />
              {activeTab === "dashboard" ? "Student View" : "Landlord Portal"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:pb-0 relative">
        {activeTab === "explore" && <StudentExploreView />}
        {activeTab === "dashboard" && <LandlordDashboardView />}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around px-2 py-3 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavItem
          icon={<Home />}
          label="Explore"
          isActive={activeTab === "explore"}
          onClick={() => setActiveTab("explore")}
        />
        <NavItem
          icon={<Heart />}
          label="Saved"
          isActive={activeTab === "saved"}
          onClick={() => setActiveTab("saved")}
        />
        <NavItem
          icon={<MessageCircle />}
          label="Messages"
          isActive={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
        />
        <NavItem
          icon={<LayoutDashboard />}
          label="Portal"
          isActive={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
      </nav>
    </div>
  );
}

// --- View: Student Explore (Landing Page) ---
function StudentExploreView() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col relative pb-20 md:pb-0">
      {/* 1. Hero & Search Area */}
      <div className="bg-white pt-8 md:pt-16 pb-10 px-4 md:px-8 border-b border-gray-100 relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Search, explore and
            <br />
            book your{" "}
            <span className="text-orange-500 underline decoration-4 underline-offset-8">
              room!
            </span>
          </h2>

          <div className="relative flex items-center w-full md:max-w-2xl mt-8 shadow-2xl shadow-blue-900/5 rounded-full bg-white border border-gray-200">
            <Search className="absolute left-6 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search AdDU, USEP, UM..."
              className="w-full bg-transparent py-5 pl-16 pr-32 text-lg font-medium focus:outline-none rounded-full"
            />
            <button
              onClick={() => setIsFilterOpen(true)}
              className="absolute right-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full transition-colors shadow-md font-bold text-sm flex items-center gap-2"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* CHIP SECTION 1: Popular Schools */}
          <div className="mt-10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <GraduationCap size={16} /> Popular Campuses
            </h3>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
              {SCHOOL_CHIPS.map((school) => (
                <button
                  key={school}
                  className="snap-start px-5 py-2.5 bg-gray-50 border border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-full transition-all flex-shrink-0 font-bold text-sm text-gray-700"
                >
                  {school}
                </button>
              ))}
            </div>
          </div>

          {/* CHIP SECTION 2: Preferences & Traits */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Star size={16} /> Top Preferences
            </h3>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
              {PREFERENCE_CHIPS.map((pref) => {
                const Icon = pref.icon;
                return (
                  <button
                    key={pref.name}
                    className="snap-start flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-orange-500 rounded-full transition-all group flex-shrink-0"
                  >
                    <Icon className="w-4 h-4 text-orange-400 group-hover:text-orange-500" />
                    <span className="font-bold text-xs text-gray-600 group-hover:text-gray-900">
                      {pref.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Listings Grid (Expanded) */}
      <div className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold text-gray-900">
              Find Your Perfect College Home
            </h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-white">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-white">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_DORMS.map((dorm) => (
              <DormCard key={dorm.id} dorm={dorm} />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Booking Process (Yellow Section) */}
      <div className="bg-[#fcf5c7] py-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-10 text-center md:text-left">
            Booking <span className="text-blue-600">Process</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <ProcessStep
              step="1"
              title="Explore your city"
              desc="Compare student accommodations to find the best place for your college years."
            />
            <ProcessStep
              step="2"
              title="Submit an application"
              desc="Found your place? Submit your application instantly. Our local experts will guide you."
            />
            <ProcessStep
              step="3"
              title="Confirm your booking"
              desc="Sign your contract and pay your deposit. You're ready to move in!"
            />
          </div>
          <div className="mt-12 text-center">
            <button className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors">
              Start Search
            </button>
          </div>
        </div>
      </div>

      {/* 4. Value Proposition Cards */}
      <div className="bg-white py-16 px-4 md:px-8 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
              We Will Help You Find
              <br />
              Your <span className="text-blue-600">Perfect Room!</span>
            </h3>
            <div className="bg-orange-400 rounded-3xl p-8 text-white relative shadow-xl transform -rotate-1 hover:rotate-0 transition-transform">
              <ShieldCheck className="w-10 h-10 mb-4 opacity-80" />
              <h4 className="text-xl font-bold mb-2">Price Match Promise</h4>
              <p className="font-medium text-orange-50">
                Find a lower price on another website and we'll match it. We
                guarantee the best student rates.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-blue-100 rounded-3xl p-8 text-blue-900 relative shadow-lg transform rotate-1 hover:rotate-0 transition-transform">
              <ThumbsUp className="w-10 h-10 mb-4 opacity-80" />
              <h4 className="text-xl font-bold mb-2">Verified Properties</h4>
              <p className="font-medium text-blue-800">
                Every landlord on DoDo is vetted. No scams, no fake photos. Just
                real homes.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800"
              alt="Student studying"
              className="w-full h-64 object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* 5. Testimonials */}
      <div className="bg-gray-50 py-16 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
              What <span className="text-blue-600">Students</span> Say About Us
            </h3>
            <div className="bg-green-600 text-white rounded-2xl p-6 shadow-xl w-48 rotate-[-5deg]">
              <p className="text-3xl font-black">+2M</p>
              <p className="text-sm font-bold">Happy Students</p>
            </div>
          </div>
          <div className="md:w-2/3 bg-[#fcf5c7] rounded-3xl p-8 md:p-12 relative shadow-sm">
            <div className="absolute top-8 right-8 text-green-600 font-black text-6xl opacity-20">
              "
            </div>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-green-600 text-green-600"
                />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              "The process was very fast and easy. DoDo helped me find a safe
              solo room near AdDU within a day. No hassle directly chatting with
              the landlord!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-gray-900">Sarah M.</p>
                <p className="text-sm text-gray-500">
                  Ateneo de Davao University
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Footer */}
      <footer className="bg-indigo-600 pt-16 pb-24 md:pb-12 px-6 text-white text-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-1">
              DoDo <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            </h2>
            <p className="text-indigo-200 font-medium mb-6">
              Davao's premier student housing marketplace. Safe, verified, and
              hassle-free.
            </p>
            <div className="flex gap-4">
              <Share2 className="text-indigo-200 hover:text-white cursor-pointer" />
              <AtSign className="text-indigo-200 hover:text-white cursor-pointer" />
              <Camera className="text-indigo-200 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Landlord Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto border-t border-indigo-500 pt-6 text-center text-indigo-300">
          <p>© 2026 Davao Dorms (DoDo). All rights reserved.</p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON: Map (Positioned Bottom Right) */}
      <button
        onClick={() => setIsMapOpen(true)}
        className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-40 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-blue-600 transition-all flex items-center justify-center group"
        aria-label="Show Map"
      >
        <MapIcon size={24} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold">
          Map View
        </span>
      </button>

      {/* Modals */}
      {isMapOpen && <MapModal onClose={() => setIsMapOpen(false)} />}
      {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
    </div>
  );
}

// --- Component: Filter Modal ---
function FilterModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 transition-opacity">
      <div className="bg-white w-full md:w-[500px] h-[85vh] md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 md:zoom-in-95">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-extrabold text-xl text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Price Range */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">
              Price Range (Monthly)
            </h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Min Price
                </p>
                <p className="font-bold text-gray-900">₱ 1,500</p>
              </div>
              <div className="text-gray-400">-</div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Max Price
                </p>
                <p className="font-bold text-gray-900">₱ 10,000+</p>
              </div>
            </div>
            {/* Mock Slider Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full relative mt-2">
              <div className="absolute left-1/4 right-1/4 h-full bg-blue-600 rounded-full"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow cursor-grab"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow cursor-grab"></div>
            </div>
          </div>

          {/* Room Type */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Room Type</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Solo Room",
                "Shared (2 Pax)",
                "Shared (4 Pax)",
                "Studio Unit",
              ].map((type, i) => (
                <label
                  key={type}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="roomType"
                    className="w-4 h-4 text-blue-600"
                    defaultChecked={i === 0}
                  />
                  <span className="text-sm font-bold text-gray-700">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities (Checkboxes) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Amenities</h4>
            <div className="space-y-3">
              {[
                "Air Conditioning",
                "Free High-Speed WiFi",
                "Private Bathroom",
                "Cooking Allowed",
                "No Curfew",
                "Pet Friendly",
              ].map((amenity, i) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${i < 2 ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-400"}`}
                  >
                    {i < 2 && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Footer */}
        <div className="p-5 border-t border-gray-100 flex gap-4 bg-white">
          <button className="px-6 py-3 font-bold text-gray-600 hover:text-gray-900">
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-colors"
          >
            Show 42 Results
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Component: Map Modal ---
function MapModal({ onClose }: { onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center transition-all ${isExpanded ? "p-0" : "p-4 sm:p-6"}`}
    >
      <div
        className={`bg-white shadow-2xl relative flex flex-col w-full transition-all duration-300 ease-in-out ${isExpanded ? "h-full max-w-full rounded-none" : "h-[80vh] max-w-5xl rounded-3xl overflow-hidden border border-gray-100"}`}
      >
        <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-white z-10">
          <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
            <MapIcon className="text-blue-600" size={20} /> Map View
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2.5 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-gray-50 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-blue-50 relative flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm text-center font-bold text-gray-500 z-10">
            <MapIcon size={48} className="mx-auto mb-2 text-blue-300" />
            Interactive Map Area
          </div>
          <div className="absolute top-1/3 left-1/2 bg-orange-500 text-white font-bold text-xs py-1.5 px-3 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform">
            ₱4.5k
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Component: Dorm Listing Card ---
function DormCard({ dorm }: { dorm: (typeof MOCK_DORMS)[0] }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative h-56 w-full flex-shrink-0 p-3 pb-0">
        <img
          src={dorm.imageUrl}
          alt={dorm.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
        {dorm.featured && (
          <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-current" /> Promoted
          </div>
        )}
        <button className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-orange-500 hover:scale-110 transition-all shadow-sm">
          <Heart size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-extrabold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
            {dorm.name}
          </h3>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md text-orange-600 flex-shrink-0">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{dorm.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm font-medium mb-4">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {dorm.location}
        </div>
        <div className="flex gap-2 mb-5 flex-wrap">
          {dorm.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <span className="text-2xl font-black text-gray-900">
              ₱{dorm.price.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-gray-400">/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Process Step Helper ---
function ProcessStep({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col relative z-10 p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 font-black text-xl rounded-full flex items-center justify-center mb-4">
        {step}
      </div>
      <h4 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 font-medium">{desc}</p>
    </div>
  );
}

// --- View: Landlord Dashboard (Condensed for mockup layout) ---
function LandlordDashboardView() {
  return (
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto w-full">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Property Hub Dashboard
      </h2>
      <div className="bg-white p-10 rounded-3xl border border-gray-200 text-center text-gray-500">
        Landlord management tools go here (Refer to previous mockup for full
        layout).
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-20 gap-1.5 transition-colors ${isActive ? "text-blue-600" : "text-gray-400 hover:text-orange-500"}`}
    >
      <div
        className={`transition-transform ${isActive ? "scale-110" : "scale-100"}`}
      >
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-6 h-6",
          strokeWidth: isActive ? 2.5 : 2,
        })}
      </div>
      <span
        className={`text-[11px] tracking-wide ${isActive ? "font-extrabold" : "font-bold"}`}
      >
        {label}
      </span>
    </button>
  );
}
