import React, { useState } from 'react';
import { Map, Phone, Users, ShieldCheck, Compass } from 'lucide-react';

const SHELTERS = [
  {
    id: 'sh-1',
    name: 'Koramangala Indoor Stadium Relief Camp',
    coords: '12.9562° N, 77.6238° E',
    capacity: 150,
    occupied: 85,
    phone: '+91 80 2297 5501',
    status: 'Open',
    gridX: 120,
    gridY: 150
  },
  {
    id: 'sh-2',
    name: 'HAL Sports Club Community Center',
    coords: '12.9554° N, 77.6984° E',
    capacity: 100,
    occupied: 30,
    phone: '+91 80 2297 5502',
    status: 'Open',
    gridX: 280,
    gridY: 130
  },
  {
    id: 'sh-3',
    name: 'HSR Layout Sector 3 Ward Welfare Office',
    coords: '12.9112° N, 77.6434° E',
    capacity: 80,
    occupied: 76,
    phone: '+91 80 2297 5503',
    status: 'Near Capacity',
    gridX: 160,
    gridY: 260
  },
  {
    id: 'sh-4',
    name: 'Whitefield Government High School Camps',
    coords: '12.9698° N, 77.7498° E',
    capacity: 120,
    occupied: 12,
    phone: '+91 80 2297 5504',
    status: 'Open',
    gridX: 340,
    gridY: 90
  }
];

export default function RescueCentersMap({ currentLanguage, lightMode }) {
  const [selectedShelterId, setSelectedShelterId] = useState(SHELTERS[0].id);

  const selectedShelter = SHELTERS.find(s => s.id === selectedShelterId) || SHELTERS[0];

  return (
    <section 
      className={`p-5 transition-all duration-300 ${
        lightMode 
          ? 'bg-white/70 border border-slate-200 text-slate-850 shadow' 
          : 'glass-card text-slate-100'
      }`}
      aria-labelledby="rescue-map-title"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 
          id="rescue-map-title" 
          className={`text-lg font-bold flex items-center gap-2 ${
            lightMode ? 'text-slate-800' : 'text-slate-100'
          }`}
        >
          <Map className="h-5 w-5 text-indigo-550" />
          {currentLanguage === 'Kannada' ? 'ರಕ್ಷಣಾ ಕೇಂದ್ರಗಳು ಮತ್ತು ಆಶ್ರಯ ತಾಣಗಳು' : currentLanguage === 'Hindi' ? 'बचाव केंद्र और आश्रय स्थल' : 'Emergency Rescue Shelter Map'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: interactive SVG Map Grid */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div 
            className={`w-full aspect-[4/3] rounded-xl border relative overflow-hidden select-none ${
              lightMode ? 'border-slate-250 bg-slate-100' : 'bg-slate-950/80 border-slate-850 shadow-inner'
            }`}
            aria-label="Interactive city shelter coordinates matrix grid map"
          >
            {/* SVG Grid Matrix styling */}
            <svg className="w-full h-full opacity-35 absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={lightMode ? "#cbd5e1" : "#334155"} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulating City Routes */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,100 L 400,100 M 150,0 L 150,300 M 0,220 L 400,220 M 300,0 L 300,300" stroke={lightMode ? "#64748b" : "#475569"} strokeWidth="4" fill="none" />
              {/* Water logging simulated area */}
              <circle cx="150" cy="100" r="30" fill="rgba(239, 68, 68, 0.3)" stroke="red" strokeWidth="1" strokeDasharray="4" />
              <text x="110" y="60" fill="red" fontSize="9" fontWeight="bold">Flood Zone A</text>
            </svg>

            {/* Shelter Markers */}
            {SHELTERS.map((s) => {
              const isSelected = s.id === selectedShelterId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedShelterId(s.id)}
                  className="absolute group focus:outline-none"
                  style={{ left: `${s.gridX}px`, top: `${s.gridY}px` }}
                  aria-label={`Shelter marker: ${s.name}`}
                >
                  {/* Blinking outer ring */}
                  <span className={`absolute -inset-2.5 rounded-full opacity-75 animate-ping pointer-events-none ${
                    isSelected
                      ? lightMode ? 'bg-blue-400' : 'bg-indigo-500'
                      : 'hidden group-hover:block bg-slate-400'
                  }`}></span>
                  
                  {/* Pin Dot */}
                  <div className={`relative h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                    isSelected
                      ? lightMode 
                        ? 'bg-blue-600 text-white border-blue-400 scale-125' 
                        : 'bg-indigo-600 text-white border-indigo-400 scale-125 shadow-lg shadow-indigo-500/50'
                      : lightMode
                      ? 'bg-white text-slate-600 border-slate-350'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    <Compass className="h-3 w-3" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-[10px] py-0.5 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-white">
                    {s.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
          <span className={`text-[10px] mt-2 italic ${lightMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Click on the beacons on the map to inspect shelters dynamically.
          </span>
        </div>

        {/* Right Side: details panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className={`text-sm font-bold border-b pb-2 ${
              lightMode ? 'text-slate-800 border-slate-200' : 'text-slate-200 border-slate-800'
            }`}>
              Shelter Details
            </h3>

            {/* List selector */}
            <div className="space-y-2">
              {SHELTERS.map((s) => {
                const isSelected = s.id === selectedShelterId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShelterId(s.id)}
                    className={`w-full text-left text-xs p-2.5 rounded-lg border transition-all duration-300 ${
                      isSelected
                        ? lightMode
                          ? 'bg-blue-50 border-blue-400 text-blue-800 font-bold'
                          : 'bg-slate-800 border-indigo-500/50 text-slate-100 shadow'
                        : lightMode
                        ? 'bg-white border-slate-200 text-slate-650'
                        : 'bg-slate-850/40 border-slate-800/80 text-slate-350 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold truncate max-w-[170px]">{s.name.split(' Relief')[0].split(' Sports')[0]}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        s.status === 'Near Capacity' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-250' 
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-250'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected shelter detail block */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              lightMode ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-800/30 border-slate-800'
            }`}>
              <h4 className={`text-sm font-bold ${lightMode ? 'text-slate-800' : 'text-slate-100'}`}>
                {selectedShelter.name}
              </h4>
              <p className="text-xxs text-slate-400 italic">GPS: {selectedShelter.coords}</p>

              {/* Occupancy Rate indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xxs font-semibold">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Occupancy</span>
                  </span>
                  <span>{selectedShelter.occupied} / {selectedShelter.capacity} ({Math.round(selectedShelter.occupied/selectedShelter.capacity * 100)}%)</span>
                </div>
                <div 
                  className={`w-full h-2 rounded-full overflow-hidden ${
                    lightMode ? 'bg-slate-200' : 'bg-slate-800'
                  }`}
                  role="progressbar"
                  aria-valuenow={Math.round(selectedShelter.occupied/selectedShelter.capacity * 100)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${selectedShelter.name} shelter capacity`}
                >
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      lightMode ? 'bg-blue-600' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${selectedShelter.occupied / selectedShelter.capacity * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Call to action phone contact */}
              <div className="pt-2">
                <a 
                  href={`tel:${selectedShelter.phone}`}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all duration-300 ${
                    lightMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                      : 'bg-indigo-650 hover:bg-indigo-600 text-white shadow shadow-indigo-900/30'
                  }`}
                  aria-label={`Call shelter contact number at ${selectedShelter.phone}`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Contact: {selectedShelter.phone}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
