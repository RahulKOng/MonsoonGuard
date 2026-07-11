import React, { useState } from 'react';
import { CloudRain, Thermometer, Droplets, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../services/translationService';

const FLOOD_STATIONS = {
  English: [
    { id: 'stn-1', name: 'Bellandur Lake Outflow Canal', level: 94, maxLevel: 5.0, currentVal: 4.7, status: 'critical', area: 'Bellandur / Outer Ring Road' },
    { id: 'stn-2', name: 'ORR EcoSpace Underpass Gauging Station', level: 78, maxLevel: 3.5, currentVal: 2.7, status: 'warning', area: 'Devarabeesanahalli' },
    { id: 'stn-3', name: 'Silk Board Flyover Loop Underpass', level: 45, maxLevel: 4.0, currentVal: 1.8, status: 'stable', area: 'HSR Layout / Silk Board' },
    { id: 'stn-4', name: 'Koramangala 80ft Road Drainage Canal', level: 85, maxLevel: 6.0, currentVal: 5.1, status: 'warning', area: 'Koramangala 4th Block' }
  ],
  Kannada: [
    { id: 'stn-1', name: 'ಬೆಳ್ಳಂದೂರು ಕೆರೆ ಹೊರಹರಿವು ಕಾಲುವೆ', level: 94, maxLevel: 5.0, currentVal: 4.7, status: 'critical', area: 'ಬೆಳ್ಳಂದೂರು / ಹೊರ ವರ್ತುಲ ರಸ್ತೆ' },
    { id: 'stn-2', name: 'ಓಆರ್‌ಆರ್ ಎಕೋಸ್ಪೇಸ್ ಅಂಡರ್‌ಪಾಸ್ ಕೇಂದ್ರ', level: 78, maxLevel: 3.5, currentVal: 2.7, status: 'warning', area: 'ದೇವರಬೀಸನಹಳ್ಳಿ' },
    { id: 'stn-3', name: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಫ್ಲೈಓವರ್ ಅಂಡರ್‌ಪಾಸ್', level: 45, maxLevel: 4.0, currentVal: 1.8, status: 'stable', area: 'ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್ / ಸಿಲ್ಕ್ ಬೋರ್ಡ್' },
    { id: 'stn-4', name: 'ಕೋರಮಂಗಲ 80 ಅಡಿ ರಸ್ತೆ ಒಳಚರಂಡಿ ಕಾಲುವೆ', level: 85, maxLevel: 6.0, currentVal: 5.1, status: 'warning', area: 'ಕೋರಮಂಗಲ 4ನೇ ಬ್ಲಾಕ್' }
  ],
  Hindi: [
    { id: 'stn-1', name: 'बेलंदूर झील जल निकासी नहर', level: 94, maxLevel: 5.0, currentVal: 4.7, status: 'critical', area: 'बेलंदूर / आउटर रिंग रोड' },
    { id: 'stn-2', name: 'ओआरआर इकोस्पेस अंडरपास गेजिंग स्टेशन', level: 78, maxLevel: 3.5, currentVal: 2.7, status: 'warning', area: 'देवराबीसनहल्ली' },
    { id: 'stn-3', name: 'सिल्क बोर्ड फ्लाईओवर लूप अंडरपास', level: 45, maxLevel: 4.0, currentVal: 1.8, status: 'stable', area: 'एचएसआर लेआउट / सिल्क बोर्ड' },
    { id: 'stn-4', name: 'कोरामंगला 80 फीट रोड ड्रेनेज कैनाल', level: 85, maxLevel: 6.0, currentVal: 5.1, status: 'warning', area: 'कोरामंगला 4 ब्लॉक' }
  ]
};

export default function WeatherFloodMeter({ currentLanguage, lightMode }) {
  const stations = FLOOD_STATIONS[currentLanguage] || FLOOD_STATIONS.English;
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id);

  const selectedStation = stations.find(s => s.id === selectedStationId) || stations[0];
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;

  const getStatusColor = (status) => {
    if (lightMode) {
      return status === 'critical'
        ? 'bg-red-150 text-red-750 border border-red-300 font-bold'
        : status === 'warning'
        ? 'bg-amber-100 text-amber-750 border border-amber-300 font-bold'
        : 'bg-emerald-100 text-emerald-750 border border-emerald-300 font-bold';
    }
    
    return status === 'critical'
      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
      : status === 'warning'
      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
  };

  const getGaugeColorClass = (level) => {
    if (level >= 90) return 'bg-red-500';
    if (level >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <section 
      className={`p-5 transition-all duration-300 ${
        lightMode 
          ? 'bg-white/70 border border-slate-200 text-slate-850 shadow' 
          : 'glass-card text-slate-100'
      }`}
      aria-labelledby="weather-flood-title"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 
          id="weather-flood-title" 
          className={`text-lg font-bold flex items-center gap-2 ${
            lightMode ? 'text-slate-800' : 'text-slate-100'
          }`}
        >
          <CloudRain className="h-5 w-5 text-blue-550" />
          {t.weatherFloodTitle}
        </h2>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
          lightMode ? 'bg-blue-50 text-blue-650 border border-blue-100' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
        }`}>
          {t.statusLive}
        </span>
      </div>

      {/* Grid of Weather Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-3 rounded-xl border ${
          lightMode ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-850 border-slate-800/80'
        }`}>
          <div className="flex items-center gap-2 text-slate-455 text-xs mb-1">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>{t.rainfallToday}</span>
          </div>
          <div className="text-xl font-bold">
            78.4 <span className="text-xs text-slate-400">mm</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border ${
          lightMode ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-850 border-slate-800/80'
        }`}>
          <div className="flex items-center gap-2 text-slate-455 text-xs mb-1">
            <Thermometer className="h-4 w-4 text-amber-500" />
            <span>{t.temperature}</span>
          </div>
          <div className="text-xl font-bold">
            23.5 <span className="text-xs text-slate-400">°C</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Gauging Station selector */}
      <div className="mb-4">
        <label 
          htmlFor="station-selector" 
          className={`block text-xs font-semibold mb-2 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
        >
          {t.selectStation}
        </label>
        <select
          id="station-selector"
          value={selectedStationId}
          onChange={(e) => setSelectedStationId(e.target.value)}
          className={`w-full text-sm rounded-lg p-2.5 focus:outline-none transition-all duration-300 ${
            lightMode 
              ? 'bg-white border border-slate-350 text-slate-800 focus:ring-2 focus:ring-blue-600' 
              : 'bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {stations.map(stn => (
            <option key={stn.id} value={stn.id}>
              {stn.name}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Station Details Card */}
      <div className={`p-4 rounded-xl border ${
        lightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-800/40 border-slate-800'
      }`}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className={`font-bold text-sm leading-tight ${lightMode ? 'text-slate-800' : 'text-slate-100'}`}>
              {selectedStation.name}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Area: {selectedStation.area}
            </p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${getStatusColor(selectedStation.status)}`}>
            {t.statusValues[selectedStation.status] || selectedStation.status}
          </span>
        </div>

        {/* Gauge Visualizer */}
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-xs font-medium">
            <span>{t.waterLevel}</span>
            <span>{selectedStation.currentVal}m / {selectedStation.maxLevel}m ({selectedStation.level}%)</span>
          </div>
          <div 
            className={`w-full h-3 rounded-full overflow-hidden ${
              lightMode ? 'bg-slate-100 border border-slate-200' : 'bg-slate-800'
            }`}
            role="progressbar"
            aria-valuenow={selectedStation.level}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Flood water level at ${selectedStation.name}`}
          >
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getGaugeColorClass(selectedStation.level)}`}
              style={{ width: `${selectedStation.level}%` }}
            ></div>
          </div>
        </div>

        {selectedStation.status === 'critical' && (
          <div className={`mt-4 p-2.5 rounded-lg flex items-center gap-2 border text-xs ${
            lightMode 
              ? 'bg-red-50 border-red-200 text-red-750 font-medium' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-bounce" />
            <span>
              {t.floodExceededWarning}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
