import { useState } from "react";
import {
  Compass,
  Calendar as CalendarIcon,
  User,
  Crown,
  BookOpen,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import Home from "./components/Home";
import Home1 from "./components/Home1";
import Schedule from "./components/Schedule";
import Schedule1 from "./components/Schedule1";
import Profile from "./components/Profile";
import Profile1 from "./components/Profile1";
import Favorites from "./components/Favorites";
import Targeted from "./components/Targeted";
import Study from "./components/Study";
import JobList from "./components/JobList";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "home1"
    | "study"
    | "schedule"
    | "schedule1"
    | "profile"
    | "profile1"
    | "favorites"
    | "targeted"
    | "jobListing"
  >("home");
  const [listingTitle, setListingTitle] = useState("职位列表");

  const handleNavigateToList = (title: string) => {
    setListingTitle(title);
    setActiveTab("jobListing");
  };

  const navItems = [
    { id: "home", icon: Compass, label: "岗位" },
    { id: "home1", icon: Compass, label: "岗位1" },
    { id: "schedule", icon: CalendarIcon, label: "提醒" },
    { id: "schedule1", icon: CalendarIcon, label: "提醒1" },
    { id: "study", icon: BookOpen, label: "学习" },
    { id: "profile", icon: User, label: "我的" },
    { id: "profile1", icon: User, label: "我的1" },
  ] as const;

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center font-sans sm:p-4">
      <div className="w-full sm:w-[390px] h-screen sm:h-[844px] bg-slate-50 sm:rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col sm:border-[8px] sm:border-slate-800">
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === "home" && (
            <Home
              onNavigate={setActiveTab as any}
              onShowList={handleNavigateToList}
            />
          )}
          {activeTab === "home1" && (
            <Home1
              onNavigate={setActiveTab as any}
              onShowList={handleNavigateToList}
            />
          )}
          {activeTab === "study" && <Study />}
          {activeTab === "schedule" && <Schedule />}
          {activeTab === "schedule1" && <Schedule1 />}
          {activeTab === "profile" && (
            <Profile onNavigate={setActiveTab as any} />
          )}
          {activeTab === "profile1" && (
            <Profile1 onNavigate={setActiveTab as any} />
          )}
          <AnimatePresence>
            {activeTab === "favorites" && (
              <Favorites onBack={() => setActiveTab("home")} />
            )}
            {activeTab === "targeted" && (
              <Targeted onBack={() => setActiveTab("home")} />
            )}
            {activeTab === "jobListing" && (
              <JobList
                title={listingTitle}
                onBack={() => setActiveTab("home")}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {[
          "home",
          "home1",
          "study",
          "schedule",
          "schedule1",
          "profile",
          "profile1",
        ].includes(activeTab) && (
          <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-1 py-4 pb-safe flex justify-around items-center z-50 rounded-b-[24px]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex flex-col items-center gap-1.5 transition-all ${isActive ? "text-primary-600 scale-105" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <div
                    className={`relative flex items-center justify-center w-10 h-8 rounded-lg transition-colors ${isActive ? "bg-primary-50 border border-primary-100" : ""}`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span
                    className={`text-[10px] uppercase font-black tracking-widest`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
