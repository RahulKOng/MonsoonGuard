import React, { useEffect, useState } from 'react';
import { ShieldAlert, MapPin, Clock, User, Filter } from 'lucide-react';
import { collection, onSnapshot, getFirestore } from '../services/firebaseService';

export default function LiveHazardsList({ currentLanguage, lightMode, onHazardsUpdate }) {
  const [hazards, setHazards] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const db = getFirestore();
    const collectionRef = collection(db, 'hazards');
    
    // Standard Firebase SDK subscription
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const activeHazards = [];
      snapshot.forEach(doc => {
        activeHazards.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setHazards(activeHazards);
      if (onHazardsUpdate) {
        onHazardsUpdate(activeHazards);
      }
    });

    return () => unsubscribe();
  }, [onHazardsUpdate]);

  const getSeverityBadgeClass = (severity) => {
    if (lightMode) {
      if (severity === 'critical') return 'bg-red-100 text-red-750 border border-red-200 font-bold';
      if (severity === 'high') return 'bg-orange-100 text-orange-750 border border-orange-200 font-bold';
      if (severity === 'medium') return 'bg-amber-100 text-amber-750 border border-amber-250 font-bold';
      return 'bg-blue-100 text-blue-750 border border-blue-200';
    }

    if (severity === 'critical') return 'bg-red-500/10 text-red-400 border border-red-500/30';
    if (severity === 'high') return 'bg-orange-500/10 text-orange-400 border border-orange-500/30';
    if (severity === 'medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
    return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
  };

  // Filter logic
  const filteredHazards = hazards.filter(h => {
    const matchesSeverity = filterSeverity === 'all' || h.severity === filterSeverity;
    const matchesType = filterType === 'all' || h.type === filterType;
    return matchesSeverity && matchesType;
  });

  return (
    <section 
      className={`p-5 transition-all duration-300 h-full flex flex-col ${
        lightMode 
          ? 'bg-white/70 border border-slate-200 text-slate-850 shadow' 
          : 'glass-card text-slate-100'
      }`}
      aria-labelledby="hazards-list-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 
          id="hazards-list-title" 
          className={`text-lg font-bold flex items-center gap-2 ${
            lightMode ? 'text-slate-800' : 'text-slate-100'
          }`}
        >
          <ShieldAlert className="h-5 w-5 text-red-550" />
          {currentLanguage === 'Kannada' ? 'ಲೈವ್ ನಾಗರಿಕ ವರದಿಗಳು' : currentLanguage === 'Hindi' ? 'लाइव नागरिक रिपोर्ट' : 'Live Community Hazard Feed'}
        </h2>
        
        {/* Count Indicator */}
        <span className={`text-xs px-2 py-0.5 rounded self-start sm:self-center font-bold ${
          lightMode ? 'bg-red-50 text-red-750 border border-red-200' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {filteredHazards.length} {currentLanguage === 'Kannada' ? 'ವರದಿಗಳು' : currentLanguage === 'Hindi' ? 'रिपोर्ट' : 'Active Reports'}
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className={`p-3 rounded-xl border mb-4 grid grid-cols-2 gap-3 ${
        lightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-slate-850'
      }`}>
        <div>
          <label 
            htmlFor="severity-filter" 
            className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5"
          >
            <Filter className="h-3 w-3" />
            <span>Severity</span>
          </label>
          <select
            id="severity-filter"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className={`w-full text-xs rounded-md p-1.5 focus:outline-none transition-all duration-300 ${
              lightMode 
                ? 'bg-white border border-slate-300 text-slate-800' 
                : 'bg-slate-800 border border-slate-700 text-slate-200'
            }`}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High & Above</option>
            <option value="medium">Medium & Above</option>
            <option value="low">Low Only</option>
          </select>
        </div>

        <div>
          <label 
            htmlFor="type-filter" 
            className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5"
          >
            <Filter className="h-3 w-3" />
            <span>Hazard Type</span>
          </label>
          <select
            id="type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`w-full text-xs rounded-md p-1.5 focus:outline-none transition-all duration-300 ${
              lightMode 
                ? 'bg-white border border-slate-300 text-slate-800' 
                : 'bg-slate-800 border border-slate-700 text-slate-200'
            }`}
          >
            <option value="all">All Types</option>
            <option value="Waterlogging">Waterlogging</option>
            <option value="Fallen Tree">Fallen Tree</option>
            <option value="Damaged Road">Damaged Road</option>
            <option value="Snapped Wire">Snapped Wire</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Feed List Container */}
      <div 
        className="flex-1 overflow-y-auto max-h-[380px] space-y-3.5 pr-1.5"
        role="region" 
        aria-label="Community hazard announcements list"
      >
        {filteredHazards.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            {currentLanguage === 'Kannada' 
              ? 'ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.' 
              : currentLanguage === 'Hindi' 
              ? 'कोई रिपोर्ट नहीं मिली।' 
              : 'No reports match selected filters.'}
          </div>
        ) : (
          filteredHazards.map((hazard) => (
            <div 
              key={hazard.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                lightMode 
                  ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-sm' 
                  : 'bg-slate-850/60 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Type & Severity Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold ${lightMode ? 'text-slate-800' : 'text-slate-100'}`}>
                  {hazard.type}
                </span>
                <span className={`text-xxs px-2 py-0.5 rounded font-bold uppercase tracking-wider ${getSeverityBadgeClass(hazard.severity)}`}>
                  {hazard.severity}
                </span>
              </div>

              {/* Description */}
              <p className={`text-xs leading-relaxed mb-3 ${lightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                {hazard.description}
              </p>

              {/* Telemetry/Meta Row */}
              <div className={`flex flex-wrap items-center justify-between gap-2 text-xxs border-t pt-2 ${
                lightMode ? 'border-slate-100 text-slate-450' : 'border-slate-800/80 text-slate-400'
              }`}>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-blue-500" />
                  <span className={`font-semibold truncate max-w-[150px] ${lightMode ? 'text-slate-700' : 'text-slate-300'}`}>{hazard.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <User className="h-3 w-3" />
                    <span>{hazard.reportedBy}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(hazard.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
