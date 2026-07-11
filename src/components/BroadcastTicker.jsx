import React, { useEffect, useState } from 'react';
import { AlertOctagon, Phone } from 'lucide-react';
import { TRANSLATIONS } from '../services/translationService';

const EMERGENCY_BROADCASTS = {
  English: [
    "RED ALERT: IMD forecasts heavy to extremely heavy rainfall (115-204 mm) for next 24 hours. Evacuate low-lying areas.",
    "EMERGENCY HOTLINES: Municipal Disaster Management cell: 1077 | Citizen Support Helpdesk: 1912 (Active 24/7).",
    "INFRASTRUCTURE WARNING: Metro construction zones near Bannerghatta road experiencing high waterlogging. Take detours.",
    "SHELTER UPDATE: 12 rescue shelter camps are active with emergency dry rations and medical aid."
  ],
  Kannada: [
    "ಕೆಂಪು ಎಚ್ಚರಿಕೆ: ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ಭಾರಿ ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ. ತಗ್ಗು ಪ್ರದೇಶಗಳಲ್ಲಿರುವವರು ಸುರಕ್ಷಿತ ಸ್ಥಳಗಳಿಗೆ ತೆರಳಿ.",
    "ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು: ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಕೋಶ: 1077 | ನಾಗರಿಕ ಸಹಾಯವಾಣಿ: 1912 (24/7 ಸಕ್ರಿಯ).",
    "ಮೂಲಸೌಕರ್ಯ ಎಚ್ಚರಿಕೆ: ಬನ್ನೇರುಘಟ್ಟ ರಸ್ತೆಯ ಮೆಟ್ರೋ ಕಾಮಗಾರಿ ವಲಯಗಳಲ್ಲಿ ಭಾರಿ ಜಲಾವೃತವಾಗಿದೆ. ಪರ್ಯಾಯ ಮಾರ್ಗ ಬಳಸಿ.",
    "ಆಶ್ರಯ ಕೇಂದ್ರಗಳ ಮಾಹಿತಿ: ತುರ್ತು ಪಡಿತರ ಮತ್ತು ವೈದ್ಯಕೀಯ ಸಹಾಯ ಹೊಂದಿರುವ 12 ರಕ್ಷಣಾ ಶಿಬಿರಗಳು ಸಕ್ರಿಯವಾಗಿವೆ."
  ],
  Hindi: [
    "रेड अलर्ट: मौसम विभाग ने अगले 24 घंटों में भारी से अत्यधिक भारी बारिश का अनुमान लगाया है। निचले इलाकों को खाली करें।",
    "आपातकालीन हेल्पलाइन: नगर निगम आपदा प्रबंधन सेल: 1077 | नागरिक सहायता डेस्क: 1912 (24/7 सक्रिय)।",
    "बुनियादी ढांचा चेतावनी: बन्नेरघट्टा रोड के पास मेट्रो निर्माण क्षेत्रों में भारी जलभराव है। वैकल्पिक मार्ग लें।",
    "आश्रय गृह अपडेट: आपातकालीन सूखे राशन और चिकित्सा सहायता के साथ 12 राहत शिविर सक्रिय हैं।"
  ]
};

export default function BroadcastTicker({ currentLanguage, lightMode }) {
  const broadcasts = EMERGENCY_BROADCASTS[currentLanguage] || EMERGENCY_BROADCASTS.English;
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % broadcasts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [broadcasts]);

  return (
    <div 
      className={`w-full py-2 px-4 transition-colors duration-300 flex items-center overflow-hidden border-b ${
        lightMode 
          ? 'bg-red-55 border-red-200 text-red-800' 
          : 'bg-red-950/85 border-red-900/50 text-red-100 backdrop-blur-sm'
      }`}
      role="region"
      aria-label="Emergency Alerts Ticker"
    >
      <div className="flex items-center space-x-2 flex-shrink-0 mr-3">
        <div className={`p-1 rounded-md animate-pulse ${
          lightMode ? 'bg-red-200 text-red-800' : 'bg-red-600/30 text-red-400 border border-red-500/20'
        }`}>
          <AlertOctagon className="h-4 w-4" />
        </div>
        <span className={`text-xs font-bold uppercase tracking-wider ${
          lightMode ? 'text-red-750' : 'text-red-400'
        }`}>
          {t.emergencyLabel}
        </span>
      </div>

      {/* Screen Reader Announcements */}
      <div 
        id="emergency-broadcast-live" 
        className="sr-only" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        {broadcasts[currentIndex]}
      </div>

      {/* Scrolling Text Container */}
      <div className="flex-1 overflow-hidden relative h-5">
        <div 
          className="absolute inset-0 flex items-center transition-all duration-500 ease-in-out text-xs sm:text-sm font-semibold truncate"
          key={currentIndex}
        >
          {broadcasts[currentIndex]}
        </div>
      </div>

      {/* Contact Quick Action */}
      <div className="flex-shrink-0 ml-3">
        <a 
          href="tel:1912"
          className={`flex items-center space-x-1 py-1 px-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
            lightMode
              ? 'bg-red-650 hover:bg-red-700 text-white shadow'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30'
          }`}
          aria-label={t.callHotline}
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden md:inline">1912</span>
        </a>
      </div>
    </div>
  );
}
