import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import { collection, addDoc, getFirestore } from '../services/firebaseService';

/**
 * Strict regex-based input validation and sanitization to prevent XSS attacks.
 * Filters HTML tags, javascript: schemes, and inline event handlers (onxxx=).
 */
export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')                  // Remove HTML tags
    .replace(/javascript:/gi, '')            // Block javascript URL schemes
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '') // Strip inline event handlers like onclick="js"
    .replace(/eval\((.*)\)/gi, '')           // Block eval calls
    .trim();
}

export default function HazardReporter({ currentLanguage, lightMode }) {
  const [formData, setFormData] = useState({
    type: 'Waterlogging',
    location: '',
    description: '',
    reportedBy: '',
    severity: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check for empty fields
    if (!formData.location.trim()) {
      newErrors.location = currentLanguage === 'Kannada' ? 'ಸ್ಥಳ ಅಗತ್ಯವಿದೆ' : currentLanguage === 'Hindi' ? 'स्थान आवश्यक है' : 'Location is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = currentLanguage === 'Kannada' ? 'ವಿವರಣೆ ಅಗತ್ಯವಿದೆ' : currentLanguage === 'Hindi' ? 'विवरण आवश्यक है' : 'Description is required';
    }
    if (!formData.reportedBy.trim()) {
      newErrors.reportedBy = currentLanguage === 'Kannada' ? 'ವರದಿಗಾರರ ಹೆಸರು ಅಗತ್ಯವಿದೆ' : currentLanguage === 'Hindi' ? 'रिपोर्टर का नाम आवश्यक है' : 'Reporter name is required';
    }

    // Additional length checking to prevent payload overflow
    if (formData.location.length > 150) {
      newErrors.location = 'Location detail is too long (max 150 chars)';
    }
    if (formData.description.length > 500) {
      newErrors.description = 'Description detail is too long (max 500 chars)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // 1. Sanitize all user-input values client-side
      const sanitizedLocation = sanitizeInput(formData.location);
      const sanitizedDescription = sanitizeInput(formData.description);
      const sanitizedReportedBy = sanitizeInput(formData.reportedBy);

      const payload = {
        type: formData.type,
        location: sanitizedLocation,
        description: sanitizedDescription,
        reportedBy: sanitizedReportedBy,
        severity: formData.severity
      };

      // 2. Initialize and write to simulated Firebase Firestore
      const db = getFirestore();
      const collectionRef = collection(db, 'hazards');
      await addDoc(collectionRef, payload);

      setSubmitStatus('success');
      // Reset form fields
      setFormData({
        type: 'Waterlogging',
        location: '',
        description: '',
        reportedBy: '',
        severity: 'medium'
      });
    } catch (error) {
      console.error('Firebase Hazard Reporter failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className={`p-5 transition-all duration-300 ${
        lightMode 
          ? 'bg-white/70 border border-slate-200 text-slate-850 shadow' 
          : 'glass-card text-slate-100'
      }`}
      aria-labelledby="hazard-reporter-title"
    >
      <h2 
        id="hazard-reporter-title" 
        className={`text-lg font-bold flex items-center gap-2 mb-4 ${
          lightMode ? 'text-slate-800' : 'text-slate-100'
        }`}
      >
        <AlertCircle className="h-5 w-5 text-amber-500" />
        {currentLanguage === 'Kannada' ? 'ಅಪಾಯ ವರದಿ ಮಾಡಿ' : currentLanguage === 'Hindi' ? 'खतरे की रिपोर्ट करें' : 'Report Active Hazard'}
      </h2>

      {submitStatus === 'success' && (
        <div 
          role="alert"
          className={`p-3 rounded-xl border flex items-center gap-2.5 mb-4 text-sm ${
            lightMode 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}
        >
          <CheckCircle className="h-4.5 w-4.5 flex-shrink-0" />
          <span>
            {currentLanguage === 'Kannada' 
              ? 'ಅಪಾಯವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವರದಿ ಮಾಡಲಾಗಿದೆ. ಧನ್ಯವಾದಗಳು!' 
              : currentLanguage === 'Hindi' 
              ? 'खतरे की सफलतापूर्वक रिपोर्ट की गई है। धन्यवाद!' 
              : 'Hazard report submitted successfully. Thank you for keeping communities safe!'}
          </span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div 
          role="alert"
          className={`p-3 rounded-xl border flex items-center gap-2.5 mb-4 text-sm ${
            lightMode 
              ? 'bg-red-50 border-red-200 text-red-800 font-medium' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
          <span>
            {currentLanguage === 'Kannada' 
              ? 'ಸಲ್ಲಿಕೆ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.' 
              : currentLanguage === 'Hindi' 
              ? 'सबमिशन विफल रहा। कृपया बाद में पुनः प्रयास करें।' 
              : 'Failed to submit report. Please review your internet connection and try again.'}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hazard Type and Severity row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="type-select" 
              className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              {currentLanguage === 'Kannada' ? 'ಅಪಾಯದ ಪ್ರಕಾರ:' : currentLanguage === 'Hindi' ? 'खतरे का प्रकार:' : 'Hazard Type:'}
            </label>
            <select
              id="type-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full text-sm rounded-lg p-2.5 focus:outline-none transition-all duration-300 ${
                lightMode 
                  ? 'bg-white border border-slate-350 text-slate-800 focus:ring-2 focus:ring-blue-600' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-blue-500'
              }`}
            >
              <option value="Waterlogging">{currentLanguage === 'Kannada' ? 'ಜಲಾವೃತ (ನೀರು ತುಂಬಿರುವುದು)' : currentLanguage === 'Hindi' ? 'जलभराव' : 'Waterlogging'}</option>
              <option value="Fallen Tree">{currentLanguage === 'Kannada' ? 'ಬಿದ್ದ ಮರ' : currentLanguage === 'Hindi' ? 'गिरा हुआ पेड़' : 'Fallen Tree'}</option>
              <option value="Damaged Road">{currentLanguage === 'Kannada' ? 'ಹಾನಿಗೊಳಗಾದ ರಸ್ತೆ' : currentLanguage === 'Hindi' ? 'क्षतिग्रस्त सड़क' : 'Damaged Road'}</option>
              <option value="Snapped Wire">{currentLanguage === 'Kannada' ? 'ತುಂಡಾದ ವಿದ್ಯುತ್ ತಂತಿ' : currentLanguage === 'Hindi' ? 'टूटा हुआ बिजली का तार' : 'Snapped Wire'}</option>
              <option value="Other">{currentLanguage === 'Kannada' ? 'ಇತರೆ' : currentLanguage === 'Hindi' ? 'अन्य' : 'Other'}</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="severity-select" 
              className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              {currentLanguage === 'Kannada' ? 'ತೀವ್ರತೆ:' : currentLanguage === 'Hindi' ? 'तीव्रता:' : 'Severity Level:'}
            </label>
            <select
              id="severity-select"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className={`w-full text-sm rounded-lg p-2.5 focus:outline-none transition-all duration-300 ${
                lightMode 
                  ? 'bg-white border border-slate-350 text-slate-800 focus:ring-2 focus:ring-blue-600' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-blue-500'
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label 
            htmlFor="location-input" 
            className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
          >
            {currentLanguage === 'Kannada' ? 'ನಿಖರವಾದ ಸ್ಥಳ:' : currentLanguage === 'Hindi' ? 'सटीक स्थान:' : 'Exact Location (Landmarks/Road Name):'}
          </label>
          <input
            type="text"
            id="location-input"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={currentLanguage === 'Kannada' ? 'ಉದಾ: ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಜಂಕ್ಷನ್ ಬಳಿ' : currentLanguage === 'Hindi' ? 'जैसे: सिल्क बोर्ड जंक्शन के पास' : 'e.g. Near Silk Board junction outbound'}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "location-error" : undefined}
            className={`w-full text-sm rounded-lg p-2.5 focus:outline-none transition-all duration-300 ${
              lightMode 
                ? 'bg-white border border-slate-355 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600' 
                : 'bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {errors.location && (
            <p id="location-error" className="text-xs text-red-500 mt-1 font-semibold" role="alert">
              {errors.location}
            </p>
          )}
        </div>

        {/* Description Textarea */}
        <div>
          <label 
            htmlFor="description-textarea" 
            className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
          >
            {currentLanguage === 'Kannada' ? 'ಅಪಾಯದ ವಿವರಣೆ:' : currentLanguage === 'Hindi' ? 'खतरे का विवरण:' : 'Hazard Description / Current Situation:'}
          </label>
          <textarea
            id="description-textarea"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder={currentLanguage === 'Kannada' ? 'ಉದಾ: ರಸ್ತೆಯ ಮೇಲೆ ನೀರು 2 ಅಡಿ ನಿಂತಿದ್ದು ಸಣ್ಣ ವಾಹನಗಳಿಗೆ ಸಂಚಾರ ಕಷ್ಟವಾಗಿದೆ.' : currentLanguage === 'Hindi' ? 'जैसे: सड़क पर 2 फीट पानी भरा हुआ है जिससे छोटे वाहनों का निकलना मुश्किल है।' : 'e.g. Water is 2 feet deep on the road, small cars cannot pass.'}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            className={`w-full text-sm rounded-lg p-2.5 focus:outline-none transition-all duration-300 ${
              lightMode 
                ? 'bg-white border border-slate-355 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600' 
                : 'bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {errors.description && (
            <p id="description-error" className="text-xs text-red-500 mt-1 font-semibold" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        {/* Reporter Name */}
        <div>
          <label 
            htmlFor="reportedBy-input" 
            className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
          >
            {currentLanguage === 'Kannada' ? 'ನಿಮ್ಮ ಹೆಸರು:' : currentLanguage === 'Hindi' ? 'आपका नाम:' : 'Your Name / Identifier:'}
          </label>
          <input
            type="text"
            id="reportedBy-input"
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            placeholder="e.g. Ramesh K."
            aria-invalid={!!errors.reportedBy}
            aria-describedby={errors.reportedBy ? "reportedBy-error" : undefined}
            className={`w-full text-sm rounded-lg p-2.5 focus:outline-none transition-all duration-300 ${
              lightMode 
                ? 'bg-white border border-slate-355 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600' 
                : 'bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {errors.reportedBy && (
            <p id="reportedBy-error" className="text-xs text-red-500 mt-1 font-semibold" role="alert">
              {errors.reportedBy}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 ${
            lightMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow disabled:bg-slate-300'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 disabled:bg-slate-750 disabled:text-slate-500'
          }`}
        >
          <Send className="h-4 w-4" />
          {isSubmitting 
            ? (currentLanguage === 'Kannada' ? 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...' : currentLanguage === 'Hindi' ? 'सबमिट किया जा रहा है...' : 'Submitting Report...') 
            : (currentLanguage === 'Kannada' ? 'ವರದಿ ಸಲ್ಲಿಸಿ' : currentLanguage === 'Hindi' ? 'रिपोर्ट सबमिट करें' : 'Submit Safety Report')}
        </button>
      </form>
    </section>
  );
}
