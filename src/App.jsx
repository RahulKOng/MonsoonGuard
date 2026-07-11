import React, { useState } from 'react';
import Header from './components/Header';
import BroadcastTicker from './components/BroadcastTicker';
import WeatherFloodMeter from './components/WeatherFloodMeter';
import HazardReporter from './components/HazardReporter';
import LiveHazardsList from './components/LiveHazardsList';
import SurvivalChecklist from './components/SurvivalChecklist';
import TravelAdvisory from './components/TravelAdvisory';
import RescueCentersMap from './components/RescueCentersMap';
import { ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from './services/translationService';

export default function App() {
  const [lightMode, setLightMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [activeHazards, setActiveHazards] = useState([]);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;

  const toggleTheme = () => {
    setLightMode(prev => !prev);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
      lightMode 
        ? 'bg-slate-50 text-slate-900 light' 
        : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* 1. SEMANTIC HEADER */}
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange}
        lightMode={lightMode}
        onThemeToggle={toggleTheme}
      />

      {/* 2. EMERGENCY BROADCAST TICKER */}
      <BroadcastTicker 
        currentLanguage={currentLanguage} 
        lightMode={lightMode} 
      />

      {/* 3. SEMANTIC MAIN CONTENT VIEW */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Area: GIS Map, Checklist & Travel Advisory */}
          <div className="lg:col-span-8 space-y-6">
            <RescueCentersMap 
              currentLanguage={currentLanguage} 
              lightMode={lightMode} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SurvivalChecklist 
                currentLanguage={currentLanguage} 
                lightMode={lightMode} 
              />
              <TravelAdvisory 
                currentLanguage={currentLanguage} 
                lightMode={lightMode}
                activeHazards={activeHazards} 
              />
            </div>
          </div>

          {/* Sidebar Area: Weather, Hazard Reporter & Feed */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            <WeatherFloodMeter 
              currentLanguage={currentLanguage} 
              lightMode={lightMode} 
            />
            <HazardReporter 
              currentLanguage={currentLanguage} 
              lightMode={lightMode} 
            />
            <div className="flex-1">
              <LiveHazardsList 
                currentLanguage={currentLanguage} 
                lightMode={lightMode}
                onHazardsUpdate={setActiveHazards} 
              />
            </div>
          </div>

        </div>

      </main>

      {/* 4. SEMANTIC FOOTER */}
      <footer className={`py-6 border-t mt-12 transition-colors duration-300 ${
        lightMode 
          ? 'bg-slate-100 border-slate-200 text-slate-500 font-medium' 
          : 'bg-slate-900/40 border-slate-900 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span className="text-xs">
              {t.allRightsReserved}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <a href="#about" className="hover:underline">{t.about}</a>
            <a href="#guidelines" className="hover:underline">{t.safetyGuidelines}</a>
            <a href="#disclaimer" className="hover:underline">{t.emergencyDisclaimer}</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
