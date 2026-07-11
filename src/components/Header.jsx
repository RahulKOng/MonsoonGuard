import React from 'react';
import { Shield, Languages, Sun, Moon } from 'lucide-react';
import { TRANSLATIONS } from '../services/translationService';

export default function Header({ 
  currentLanguage, 
  onLanguageChange, 
  lightMode, 
  onThemeToggle 
}) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;

  return (
    <header className={`w-full border-b transition-all duration-300 ${
      lightMode 
        ? 'bg-white/70 backdrop-blur-md text-slate-850 border-slate-200' 
        : 'bg-slate-900/80 backdrop-blur-md text-slate-100 border-slate-900'
    } sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              lightMode 
                ? 'bg-blue-55 text-blue-650 ring-2 ring-blue-500/10' 
                : 'bg-blue-600/20 text-blue-400 ring-2 ring-blue-500/20'
            }`}>
              <Shield className="h-6 sm:h-8 w-6 sm:w-8" aria-hidden="true" />
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                lightMode 
                  ? 'bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent font-extrabold' 
                  : 'bg-gradient-to-r from-blue-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent'
              }`}>
                MonsoonGuard
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                lightMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t.appSubTitle}
              </p>
            </div>
          </div>

          {/* Controls: Language and Theme Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Language Selector */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Languages className={`h-4 w-4 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <select
                id="language-selector"
                aria-label="Select Language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ / भाषा चुनें"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className={`text-xs sm:text-sm rounded-lg py-1.5 px-2 sm:px-3 focus:outline-none transition-all duration-300 ${
                  lightMode 
                    ? 'bg-white border border-slate-350 text-slate-800 focus:ring-2 focus:ring-blue-600' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-blue-500'
                }`}
              >
                <option value="English">English</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </select>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              id="theme-toggle"
              onClick={onThemeToggle}
              aria-label={
                lightMode 
                  ? "Switch to dark theme" 
                  : "Switch to light theme"
              }
              title={t.toggleTheme}
              className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                lightMode 
                  ? 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-300' 
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {lightMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">{t.toggleTheme}</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
