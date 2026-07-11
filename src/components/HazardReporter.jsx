import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import { collection, addDoc, getFirestore } from '../services/firebaseService';
import { TRANSLATIONS } from '../services/translationService';

import { sanitizeInput } from '../utils/utils';

export default function HazardReporter({ currentLanguage, lightMode }) {
  const [formData, setFormData] = useState({
    type: 'Waterlogging',
    location: '',
    description: '',
    reportedBy: '',
    severity: 'medium'
  });

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.English;

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
      newErrors.location = t.validationLocation;
    }
    if (!formData.description.trim()) {
      newErrors.description = t.validationDescription;
    }
    if (!formData.reportedBy.trim()) {
      newErrors.reportedBy = t.validationReporter;
    }

    // Additional length checking to prevent payload overflow
    if (formData.location.length > 150) {
      newErrors.location = t.validationLocationTooLong;
    }
    if (formData.description.length > 500) {
      newErrors.description = t.validationDescTooLong;
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
        <AlertCircle className="h-5 w-5 text-amber-550" />
        {t.reportHazardTitle}
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
            {t.statusSuccess}
          </span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div 
          role="alert"
          className={`p-3 rounded-xl border flex items-center gap-2.5 mb-4 text-sm ${
            lightMode 
              ? 'bg-red-55 border-red-200 text-red-800 font-medium' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
          <span>
            {t.statusError}
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
              {t.labelHazardType}
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
              <option value="Waterlogging">{t.hazardTypes.Waterlogging}</option>
              <option value="Fallen Tree">{t.hazardTypes["Fallen Tree"]}</option>
              <option value="Damaged Road">{t.hazardTypes["Damaged Road"]}</option>
              <option value="Snapped Wire">{t.hazardTypes["Snapped Wire"]}</option>
              <option value="Other">{t.hazardTypes.Other}</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="severity-select" 
              className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              {t.labelSeverityLevel}
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
              <option value="low">{t.severities.low}</option>
              <option value="medium">{t.severities.medium}</option>
              <option value="high">{t.severities.high}</option>
              <option value="critical">{t.severities.critical}</option>
            </select>
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label 
            htmlFor="location-input" 
            className={`block text-xs font-semibold mb-1.5 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}
          >
            {t.labelExactLocation}
          </label>
          <input
            type="text"
            id="location-input"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={t.placeholderLocation}
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
            {t.labelHazardDescription}
          </label>
          <textarea
            id="description-textarea"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder={t.placeholderDescription}
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
            {t.labelYourName}
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
            ? t.btnSubmitting 
            : t.btnSubmitReport}
        </button>
      </form>
    </section>
  );
}
