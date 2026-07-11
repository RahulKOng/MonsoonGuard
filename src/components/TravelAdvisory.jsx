import React, { useState } from 'react';
import { Compass, Navigation, AlertTriangle, CheckCircle, Search, Loader, MapPin } from 'lucide-react';
import { generateTravelAdvisory } from '../services/geminiService';
import { TRANSLATIONS } from '../services/translationService';

export default function TravelAdvisory({ currentLanguage, lightMode, activeHazards = [] }) {
  const [origin, setOrigin] = useState('Outer Ring Road');
  const [destination, setDestination] = useState('MG Road');
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;

    setLoading(true);
    try {
      const result = await generateTravelAdvisory({
        origin,
        destination,
        hazardAlerts: activeHazards,
        language: currentLanguage
      });
      setAdvisory(result);
    } catch (err) {
      console.error("Error generating travel advisory:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAdvisoryColorClass = (status) => {
    if (lightMode) {
      return status === 'warning'
        ? 'bg-red-55 border border-red-200 text-red-800'
        : 'bg-emerald-55 border border-emerald-200 text-emerald-800';
    }
    return status === 'warning'
      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
      : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400';
  };

  return (
    <section 
      className={`p-5 transition-all duration-300 ${
        lightMode 
          ? 'bg-white/70 border border-slate-200 text-slate-850 shadow' 
          : 'glass-card text-slate-100'
      }`}
      aria-labelledby="advisory-title"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 
          id="advisory-title" 
          className={`text-lg font-bold flex items-center gap-2 ${
            lightMode ? 'text-slate-800' : 'text-slate-100'
          }`}
        >
          <Compass className="h-5 w-5 text-teal-555" />
          {t.travelAdvisoryTitle}
        </h2>
      </div>

      {/* Advisory Inputs Form */}
      <form onSubmit={handleQuery} className="space-y-3.5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Origin */}
          <div>
            <label 
              htmlFor="origin-input" 
              className={`block text-xs font-semibold mb-1 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              {t.startLocationLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Navigation className="h-3.5 w-3.5 rotate-45" />
              </span>
              <input
                type="text"
                id="origin-input"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Koramangala"
                className={`w-full text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none transition-all duration-300 ${
                  lightMode 
                    ? 'bg-white border border-slate-355 text-slate-800 focus:ring-2 focus:ring-blue-600' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label 
              htmlFor="destination-input" 
              className={`block text-xs font-semibold mb-1 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              {t.destLocationLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                id="destination-input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. MG Road"
                className={`w-full text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none transition-all duration-300 ${
                  lightMode 
                    ? 'bg-white border border-slate-355 text-slate-800 focus:ring-2 focus:ring-blue-600' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-300 ${
            lightMode
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow'
              : 'bg-teal-650 hover:bg-teal-600 text-white shadow shadow-teal-900/30'
          }`}
        >
          {loading ? (
            <>
              <Loader className="h-3.5 w-3.5 animate-spin" />
              <span>{t.advisoryAnalyzing}</span>
            </>
          ) : (
            <>
              <Search className="h-3.5 w-3.5" />
              <span>{t.btnCheckSafety}</span>
            </>
          )}
        </button>
      </form>

      {/* Advisory Result Details Card */}
      {advisory ? (
        <div className={`p-4 rounded-xl transition-all duration-300 ${getAdvisoryColorClass(advisory.status)}`}>
          <div className="flex items-start gap-2.5">
            {advisory.status === 'warning' ? (
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            
            <div className="space-y-1.5 flex-1">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight font-sans">
                  {advisory.title}
                </h3>
                <span className="text-xxs opacity-70">
                  {advisory.timestamp}
                </span>
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                {t.recommendationLabel} {advisory.recommendation}
              </p>
              <p className="text-xxs leading-relaxed opacity-85">
                {advisory.details}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-center py-6 border border-dashed rounded-xl text-xs ${
          lightMode 
            ? 'text-slate-400 border-slate-200 bg-slate-50' 
            : 'text-slate-500 border-slate-800'
        }`}>
          {t.placeholderAdvisoryHint}
        </div>
      )}
    </section>
  );
}
