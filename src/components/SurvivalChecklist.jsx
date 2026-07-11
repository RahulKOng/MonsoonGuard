import React, { useState, useEffect, useCallback } from 'react';
import { ListChecks, Sparkles, Loader, CheckSquare, Square } from 'lucide-react';
import { generateSurvivalChecklist } from '../services/geminiService';
import { TRANSLATIONS } from '../services/translationService';

export default function SurvivalChecklist({ currentLanguage, lightMode }) {
  const [familySize, setFamilySize] = useState(2);
  const [hasPets, setHasPets] = useState(false);
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;



  const handleGenerate = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await generateSurvivalChecklist({
        familySize,
        hasPets,
        hasSpecialNeeds,
        language: currentLanguage
      });
      setChecklist(data);
    } catch (e) {
      console.error("Failed to generate checklist:", e);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [familySize, hasPets, hasSpecialNeeds, currentLanguage]);

  // Generate initial checklist on component mount
  useEffect(() => {
    handleGenerate(true); // silent fetch on mount
  }, [currentLanguage, handleGenerate]);

  const handleToggleItem = (categoryIndex, itemIndex) => {
    setChecklist(prevChecklist => {
      const updated = [...prevChecklist];
      const category = { ...updated[categoryIndex] };
      const items = [...category.items];
      
      items[itemIndex] = {
        ...items[itemIndex],
        checked: !items[itemIndex].checked
      };
      
      category.items = items;
      updated[categoryIndex] = category;
      return updated;
    });
  };

  // Calculate completed stats
  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = checklist.reduce((sum, cat) => sum + cat.items.filter(i => i.checked).length, 0);
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const getPriorityBadgeClass = (priority) => {
    if (lightMode) {
      if (priority === 'critical') return 'bg-red-100 text-red-750 border border-red-200';
      if (priority === 'high') return 'bg-orange-100 text-orange-750 border border-orange-200';
      return 'bg-blue-100 text-blue-750 border border-blue-200';
    }
    
    if (priority === 'critical') return 'bg-red-500/20 text-red-400 border border-red-500/30';
    if (priority === 'high') return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
  };

  const getPersonLabel = (count) => {
    if (currentLanguage === 'Kannada') {
      return count === 1 ? 'ವ್ಯಕ್ತಿ' : 'ಜನರು';
    }
    if (currentLanguage === 'Hindi') {
      return count === 1 ? 'व्यक्ति' : 'लोग';
    }
    return count === 1 ? 'Person' : 'People';
  };

  return (
    <section 
      className={`p-5 transition-all duration-300 ${
        lightMode 
          ? 'bg-white/70 border border-slate-200 text-slate-850 shadow' 
          : 'glass-card text-slate-100'
      }`}
      aria-labelledby="checklist-title"
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 
          id="checklist-title" 
          className={`text-lg font-bold flex items-center gap-2 ${
            lightMode ? 'text-slate-800' : 'text-slate-100'
          }`}
        >
          <ListChecks className="h-5 w-5 text-blue-555" />
          {t.checklistTitle}
        </h2>
        <span className={`text-xs flex items-center gap-1 font-bold ${
          lightMode ? 'text-blue-600' : 'text-blue-400'
        }`}>
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Gemini 2.5</span>
        </span>
      </div>

      {/* Parameter Controls */}
      <div className={`p-4 rounded-xl border mb-5 space-y-4 ${
        lightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-slate-850'
      }`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          
          {/* Family Size */}
          <div>
            <label 
              htmlFor="family-size" 
              className={`block text-xs font-semibold mb-1 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              {t.familySizeLabel}
            </label>
            <select
              id="family-size"
              value={familySize}
              onChange={(e) => setFamilySize(parseInt(e.target.value))}
              className={`w-full text-xs rounded-md p-1.5 focus:outline-none transition-all duration-300 ${
                lightMode 
                  ? 'bg-white border border-slate-350 text-slate-800' 
                  : 'bg-slate-850 border border-slate-700 text-slate-200'
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n} {getPersonLabel(n)}</option>
              ))}
            </select>
          </div>

          {/* Has Pets Toggle */}
          <div className="flex items-center space-x-2 mt-3 sm:mt-0">
            <input
              type="checkbox"
              id="pets-checkbox"
              checked={hasPets}
              onChange={(e) => setHasPets(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label 
              htmlFor="pets-checkbox" 
              className={`text-xs font-semibold select-none cursor-pointer ${lightMode ? 'text-slate-650' : 'text-slate-350'}`}
            >
              {t.includePetsLabel}
            </label>
          </div>

          {/* Has Special Needs Toggle */}
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <input
              type="checkbox"
              id="special-needs-checkbox"
              checked={hasSpecialNeeds}
              onChange={(e) => setHasSpecialNeeds(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label 
              htmlFor="special-needs-checkbox" 
              className={`text-xs font-semibold select-none cursor-pointer ${lightMode ? 'text-slate-650' : 'text-slate-350'}`}
            >
              {t.specialNeedsLabel}
            </label>
          </div>

        </div>

        {/* Generate Button */}
        <button
          onClick={() => handleGenerate(false)}
          disabled={loading}
          className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-300 ${
            lightMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-900/30'
          }`}
        >
          {loading ? (
            <>
              <Loader className="h-3.5 w-3.5 animate-spin" />
              <span>{t.checklistGenerating}</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.btnUpdateChecklist}</span>
            </>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {totalItems > 0 && (
        <div className="mb-4 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span>{t.checklistPreparednessProgress}</span>
            <span>{completedItems}/{totalItems} ({completionPercentage}%)</span>
          </div>
          <div 
            className={`w-full h-2.5 rounded-full overflow-hidden ${
              lightMode ? 'bg-slate-200' : 'bg-slate-800'
            }`}
            role="progressbar"
            aria-valuenow={completionPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Survival preparation items completion gauge"
          >
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                lightMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Checklist items list */}
      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {loading && checklist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <Loader className="h-8 w-8 animate-spin text-blue-500 mb-2" />
            <p className="text-xs">{t.checklistLoadingMessage}</p>
          </div>
        ) : (
          checklist.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-2">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                lightMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {cat.category}
              </h3>
              
              <ul className="space-y-2">
                {cat.items.map((item, itemIdx) => (
                  <li 
                    key={item.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs transition-all duration-300 cursor-pointer select-none ${
                      item.checked
                        ? lightMode
                          ? 'bg-emerald-50 border-emerald-250 text-slate-800'
                          : 'bg-emerald-950/20 border-emerald-900/40 text-slate-350'
                        : lightMode
                        ? 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                        : 'bg-slate-850/40 border-slate-800/80 text-slate-200 hover:border-slate-700'
                    }`}
                    onClick={() => handleToggleItem(catIdx, itemIdx)}
                  >
                    <button
                      type="button"
                      aria-label={`Toggle item: ${item.text}`}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {item.checked ? (
                        <CheckSquare className={`h-4.5 w-4.5 ${lightMode ? 'text-emerald-600' : 'text-emerald-450'}`} />
                      ) : (
                        <Square className={`h-4.5 w-4.5 ${lightMode ? 'text-slate-400' : 'text-slate-550'}`} />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <span className={item.checked ? 'line-through text-slate-400' : ''}>
                        {item.text}
                      </span>
                      <span className={`ml-2 text-xxs px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${getPriorityBadgeClass(item.priority)}`}>
                        {t.severities[item.priority] || item.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
