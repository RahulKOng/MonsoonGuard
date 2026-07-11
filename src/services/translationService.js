/**
 * Central Translation Service for MonsoonGuard
 * Contains translations for all UI text, badges, shelter names, options, 
 * and community-reported seed hazard data in English, Kannada, and Hindi.
 */

export const TRANSLATIONS = {
  English: {
    // General / Layout
    statusLive: "Status: Live Sync",
    about: "About",
    safetyGuidelines: "Safety Guidelines",
    emergencyDisclaimer: "Emergency Disclaimer",
    allRightsReserved: "MonsoonGuard Dashboard © 2026. All rights reserved.",
    
    // Header
    appSubTitle: "Live Disaster Preparedness & Citizen Assistance",
    toggleTheme: "Toggle Theme",

    // Broadcast Ticker
    emergencyLabel: "EMERGENCY",
    callHotline: "Call Hotline 1912",

    // Weather/Flood Meter
    weatherFloodTitle: "Live Weather & Flood Telemetry",
    rainfallToday: "Rainfall Today",
    temperature: "Temperature",
    selectStation: "Select Telemetry Station:",
    waterLevel: "Water Level",
    floodExceededWarning: "Water levels exceed safety buffer. Evacuation warnings active for nearby low-lying areas.",
    updatedLive: "Updated: Live",
    statusValues: {
      critical: "Critical",
      warning: "Warning",
      stable: "Stable"
    },

    // Rescue Shelter Map
    shelterMapTitle: "Emergency Rescue Shelter Map",
    shelterDetailsHeader: "Shelter Details",
    clickBeaconsHint: "Click on the beacons on the map to inspect shelters dynamically.",
    occupancyLabel: "Occupancy",
    contactLabel: "Contact",
    openStatus: "Open",
    nearCapacityStatus: "Near Capacity",
    shelters: {
      "sh-1": {
        name: "Koramangala Indoor Stadium Relief Camp",
        shortName: "Koramangala",
        coords: "12.9562° N, 77.6238° E"
      },
      "sh-2": {
        name: "HAL Sports Club Community Center",
        shortName: "HAL",
        coords: "12.9554° N, 77.6984° E"
      },
      "sh-3": {
        name: "HSR Layout Sector 3 Ward Welfare Office",
        shortName: "HSR Layout Sec 3",
        coords: "12.9112° N, 77.6434° E"
      },
      "sh-4": {
        name: "Whitefield Government High School Camps",
        shortName: "Whitefield",
        coords: "12.9698° N, 77.7498° E"
      }
    },

    // Hazard Reporter
    reportHazardTitle: "Report Active Hazard",
    labelHazardType: "Hazard Type:",
    labelSeverityLevel: "Severity Level:",
    labelExactLocation: "Exact Location (Landmarks/Road Name):",
    placeholderLocation: "e.g. Near Silk Board junction outbound",
    labelHazardDescription: "Hazard Description / Current Situation:",
    placeholderDescription: "e.g. Water is 2 feet deep on the road, small cars cannot pass.",
    labelYourName: "Your Name / Identifier:",
    btnSubmitReport: "Submit Safety Report",
    btnSubmitting: "Submitting Report...",
    statusSuccess: "Hazard report submitted successfully. Thank you for keeping communities safe!",
    statusError: "Failed to submit report. Please review your internet connection and try again.",
    validationLocation: "Location is required",
    validationDescription: "Description is required",
    validationReporter: "Reporter name is required",
    validationLocationTooLong: "Location detail is too long (max 150 chars)",
    validationDescTooLong: "Description detail is too long (max 500 chars)",

    // Hazard Feed
    liveCitizenReports: "Live Community Hazard Feed",
    activeReportsCount: "Active Reports",
    noReportsFound: "No reports match selected filters.",
    allSeverities: "All Severities",
    criticalOnly: "Critical Only",
    highAndAbove: "High & Above",
    mediumAndAbove: "Medium & Above",
    lowOnly: "Low Only",
    allTypes: "All Types",
    severityFilterLabel: "Severity",
    typeFilterLabel: "Hazard Type",
    reportedBy: "Reported by:",

    // Hazard Types
    hazardTypes: {
      "Waterlogging": "Waterlogging",
      "Fallen Tree": "Fallen Tree",
      "Damaged Road": "Damaged Road",
      "Snapped Wire": "Snapped Wire",
      "Other": "Other"
    },

    // Severities
    severities: {
      "low": "Low",
      "medium": "Medium",
      "high": "High",
      "critical": "Critical"
    },

    // Pre-seeded / Simulated feed reports
    seededHazards: {
      "haz-101": {
        location: "Outer Ring Road, Near EcoSpace, Bangalore",
        description: "Water level is approximately 2.5 feet deep. Slow-moving traffic; small vehicles are advised to take detours."
      },
      "haz-102": {
        location: "MG Road, Opposite Metro Station, Bangalore",
        description: "Large Gulmohar branch has blocked two lanes of the main road. Traffic police and clearance team are on site."
      },
      "haz-103": {
        location: "ST Bed Area, 4th Block Koramangala, Bangalore",
        description: "Water has entered ground floor garages in low-lying streets. Local rescue boats on stand-by. Evacuation warning active."
      },
      "haz-104": {
        location: "Double Road, Indiranagar, Bangalore",
        description: "High tension wire snapped and lying near the waterlogged pavement. BESCOM notified. DO NOT cross this zone."
      }
    },

    // Survival Checklist
    checklistTitle: "GenAI Survival Checklist",
    familySizeLabel: "Family Size:",
    includePetsLabel: "Include Pets",
    specialNeedsLabel: "Special Medical Needs",
    btnUpdateChecklist: "Update Checklist",
    checklistGenerating: "Generating...",
    checklistPreparednessProgress: "Preparedness Progress",
    checklistLoadingMessage: "Generating your personalized disaster preparedness items...",
    checklistProgressText: "completed",

    // Travel Advisory
    travelAdvisoryTitle: "GenAI Travel Advisory",
    startLocationLabel: "Start Location:",
    destLocationLabel: "Destination Location:",
    btnCheckSafety: "Check Route Safety",
    advisoryAnalyzing: "Analyzing Safety...",
    recommendationLabel: "Recommendation:",
    placeholderAdvisoryHint: "Enter route details above to generate AI-powered travel advisories."
  },

  Kannada: {
    // General / Layout
    statusLive: "ಸ್ಥಿತಿ: ಲೈವ್ ಸಿಂಕ್",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    safetyGuidelines: "ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳು",
    emergencyDisclaimer: "ತುರ್ತು ಹಕ್ಕುತ್ಯಾಗ",
    allRightsReserved: "ಮನ್ಸೂನ್ ಗಾರ್ಡ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ © 2026. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

    // Header
    appSubTitle: "ಲೈವ್ ವಿಪತ್ತು ಸನ್ನದ್ಧತೆ ಮತ್ತು ನಾಗರಿಕ ಸಹಾಯ",
    toggleTheme: "ಥೀಮ್ ಬದಲಾಯಿಸಿ",

    // Broadcast Ticker
    emergencyLabel: "ತುರ್ತು",
    callHotline: "ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ 1912",

    // Weather/Flood Meter
    weatherFloodTitle: "ಲೈವ್ ಹವಾಮಾನ ಮತ್ತು ಪ್ರವಾಹ ಮಾಪಕ",
    rainfallToday: "ಇಂದಿನ ಮಳೆ",
    temperature: "ತಾಪಮಾನ",
    selectStation: "ವೀಕ್ಷಣಾ ಕೇಂದ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    waterLevel: "ನೀರಿನ ಮಟ್ಟ",
    floodExceededWarning: "ಪ್ರವಾಹ ಮಟ್ಟವು ಅಪಾಯಕಾರಿ ಮಿತಿಯನ್ನು ಮೀರಿದೆ. ಸುತ್ತಮುತ್ತಲಿನ ನಿವಾಸಿಗಳು ತಕ್ಷಣ ಸ್ಥಳಾಂತರಗೊಳ್ಳಲು ಸೂಚಿಸಲಾಗಿದೆ.",
    updatedLive: "ಅಪ್‌ಡೇಟ್ ಮಾಡಲಾಗಿದೆ: ಲೈವ್",
    statusValues: {
      critical: "ಅಪಾಯಕಾರಿ",
      warning: "ಎಚ್ಚರಿಕೆ",
      stable: "ಸ್ಥಿರ"
    },

    // Rescue Shelter Map
    shelterMapTitle: "ತುರ್ತು ರಕ್ಷಣಾ ಆಶ್ರಯ ನಕ್ಷೆ",
    shelterDetailsHeader: "ಆಶ್ರಯ ಕೇಂದ್ರದ ವಿವರಗಳು",
    clickBeaconsHint: "ಆಶ್ರಯ ಕೇಂದ್ರಗಳ ಮಾಹಿತಿ ವೀಕ್ಷಿಸಲು ನಕ್ಷೆಯಲ್ಲಿನ ಬೀಕನ್‌ಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    occupancyLabel: "ಆಕ್ಯುಪೆನ್ಸಿ (ನಿವಾಸಿಗಳು)",
    contactLabel: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    openStatus: "ತೆರೆದಿದೆ",
    nearCapacityStatus: "ಭರ್ತಿಯಾಗುತ್ತಿದೆ",
    shelters: {
      "sh-1": {
        name: "ಕೋರಮಂಗಲ ಒಳಾಂಗಣ ಕ್ರೀಡಾಂಗಣ ಪರಿಹಾರ ಶಿಬಿರ",
        shortName: "ಕೋರಮಂಗಲ",
        coords: "12.9562° N, 77.6238° E"
      },
      "sh-2": {
        name: "ಎಚ್‌ಎಎಲ್ ಸ್ಪೋರ್ಟ್ಸ್ ಕ್ಲಬ್ ಸಮುದಾಯ ಕೇಂದ್ರ",
        shortName: "ಎಚ್‌ಎಎಲ್",
        coords: "12.9554° N, 77.6984° E"
      },
      "sh-3": {
        name: "ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್ ಸೆಕ್ಟರ್ 3 ವಾರ್ಡ್ ಕಲ್ಯಾಣ ಕಚೇರಿ",
        shortName: "ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್ ಸೆಕ್ಟರ್ 3",
        coords: "12.9112° N, 77.6434° E"
      },
      "sh-4": {
        name: "ವೈಟ್‌ಫೀಲ್ಡ್ ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲಾ ಪರಿಹಾರ ಕೇಂದ್ರ",
        shortName: "ವೈಟ್‌ಫೀಲ್ಡ್",
        coords: "12.9698° N, 77.7498° E"
      }
    },

    // Hazard Reporter
    reportHazardTitle: "ಅಪಾಯ ವರದಿ ಮಾಡಿ",
    labelHazardType: "ಅಪಾಯದ ಪ್ರಕಾರ:",
    labelSeverityLevel: "ತೀವ್ರತೆ ಮಟ್ಟ:",
    labelExactLocation: "ನಿಖರವಾದ ಸ್ಥಳ (ರಸ್ತೆ ಹೆಸರು/ಗುರುತು):",
    placeholderLocation: "ಉದಾ: ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಜಂಕ್ಷನ್ ಬಳಿ",
    labelHazardDescription: "ಅಪಾಯದ ವಿವರಣೆ / ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿ:",
    placeholderDescription: "ಉದಾ: ರಸ್ತೆಯ ಮೇಲೆ 2 ಅಡಿ ನೀರು ನಿಂತಿದ್ದು ಸಣ್ಣ ಕಾರುಗಳು ಚಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    labelYourName: "ನಿಮ್ಮ ಹೆಸರು / ಗುರುತು:",
    btnSubmitReport: "ವರದಿ ಸಲ್ಲಿಸಿ",
    btnSubmitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
    statusSuccess: "ಅಪಾಯವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವರದಿ ಮಾಡಲಾಗಿದೆ. ನಾಗರಿಕರ ಸುರಕ್ಷತೆಗೆ ಸಹಕರಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!",
    statusError: "ವರದಿ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಮರುಪ್ರಯತ್ನಿಸಿ.",
    validationLocation: "ಸ್ಥಳ ಅಗತ್ಯವಿದೆ",
    validationDescription: "ವಿವರಣೆ ಅಗತ್ಯವಿದೆ",
    validationReporter: "ವರದಿಗಾರರ ಹೆಸರು ಅಗತ್ಯವಿದೆ",
    validationLocationTooLong: "ಸ್ಥಳದ ವಿವರಣೆ ತುಂಬಾ ಉದ್ದವಾಗಿದೆ (ಗರಿಷ್ಠ 150 ಅಕ್ಷರಗಳು)",
    validationDescTooLong: "ವಿವರಣೆ ತುಂಬಾ ಉದ್ದವಾಗಿದೆ (ಗರಿಷ್ಠ 500 ಅಕ್ಷರಗಳು)",

    // Hazard Feed
    liveCitizenReports: "ಲೈವ್ ನಾಗರಿಕ ವರದಿಗಳು",
    activeReportsCount: "ಸಕ್ರಿಯ ವರದಿಗಳು",
    noReportsFound: "ಆಯ್ಕೆಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ವರದಿಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
    allSeverities: "ಎಲ್ಲಾ ತೀವ್ರತೆಗಳು",
    criticalOnly: "ಅಪಾಯಕಾರಿ ಮಾತ್ರ",
    highAndAbove: "ಹೆಚ್ಚು ಮತ್ತು ಮೇಲ್ಪಟ್ಟ",
    mediumAndAbove: "ಮಧ್ಯಮ ಮತ್ತು ಮೇಲ್ಪಟ್ಟ",
    lowOnly: "ಕಡಿಮೆ ಮಾತ್ರ",
    allTypes: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    severityFilterLabel: "ತೀವ್ರತೆ",
    typeFilterLabel: "ಅಪಾಯದ ಪ್ರಕಾರ",
    reportedBy: "ವರದಿಗಾರರು:",

    // Hazard Types
    hazardTypes: {
      "Waterlogging": "ಜಲಾವೃತ (ನೀರು ತುಂಬಿರುವುದು)",
      "Fallen Tree": "ಬಿದ್ದ ಮರ",
      "Damaged Road": "ಹಾನಿಗೊಳಗಾದ ರಸ್ತೆ",
      "Snapped Wire": "ತುಂಡಾದ ವಿದ್ಯುತ್ ತಂತಿ",
      "Other": "ಇತರೆ"
    },

    // Severities
    severities: {
      "low": "ಕಡಿಮೆ",
      "medium": "ಮಧ್ಯಮ",
      "high": "ಹೆಚ್ಚು",
      "critical": "ಅಪಾಯಕಾರಿ"
    },

    // Pre-seeded / Simulated feed reports (Translated)
    seededHazards: {
      "haz-101": {
        location: "ಹೊರ ವರ್ತುಲ ರಸ್ತೆ, ಇಕೋಸ್ಪೇಸ್ ಹತ್ತಿರ, ಬೆಂಗಳೂರು",
        description: "ನೀರು ಸುಮಾರು 2.5 ಅಡಿ ಆಳದಲ್ಲಿದೆ. ಸಂಚಾರ ನಿಧಾನವಾಗಿದೆ; ಸಣ್ಣ ವಾಹನಗಳು ಪರ್ಯಾಯ ಮಾರ್ಗ ಬಳಸಲು ಸೂಚಿಸಲಾಗಿದೆ."
      },
      "haz-102": {
        location: "ಎಂ.ಜಿ ರಸ್ತೆ, ಮೆಟ್ರೋ ನಿಲ್ದಾಣದ ಎದುರು, ಬೆಂಗಳೂರು",
        description: "ದೊಡ್ಡ ಗುಲ್ಮೊಹರ್ ಮರದ ಕೊಂಬೆ ರಸ್ತೆಗೆ ಬಿದ್ದು ಎರಡು ಲೇನ್‌ಗಳನ್ನು ನಿರ್ಬಂಧಿಸಿದೆ. ಸಂಚಾರ ಪೊಲೀಸರು ಮತ್ತು ತೆರವು ಸಿಬ್ಬಂದಿ ಸ್ಥಳದಲ್ಲಿದ್ದಾರೆ."
      },
      "haz-103": {
        location: "ಎಸ್‌ಟಿ ಬೆಡ್ ಬಡಾವಣೆ, 4ನೇ ಬ್ಲಾಕ್ ಕೋರಮಂಗಲ, ಬೆಂಗಳೂರು",
        description: "ತಗ್ಗು ಪ್ರದೇಶದ ಮನೆಗಳ ನೆಲಮಹಡಿಗೆ ನೀರು ನುಗ್ಗಿದೆ. ಸ್ಥಳೀಯ ರಕ್ಷಣಾ ದೋಣಿಗಳು ಸನ್ನದ್ಧ ಸ್ಥಿತಿಯಲ್ಲಿವೆ. ಸ್ಥಳಾಂತರದ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗಿದೆ."
      },
      "haz-104": {
        location: "ಡಬಲ್ ರಸ್ತೆ, ಇಂದಿರಾನಗರ, ಬೆಂಗಳೂರು",
        description: "ಹೈ ಟೆನ್ಷನ್ ವಿದ್ಯುತ್ ತಂತಿ ಕತ್ತರಿಸಿ ನೀರು ತುಂಬಿದ ಪಾದಚಾರಿ ಮಾರ್ಗದ ಬಳಿ ಬಿದ್ದಿದೆ. ಬೆಸ್ಕಾಂಗೆ ತಿಳಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಮಾರ್ಗ ಬಳಸಬೇಡಿ."
      }
    },

    // Survival Checklist
    checklistTitle: "ಜಿಎನ್‌ಎಐ ಬದುಕುಳಿಯುವ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    familySizeLabel: "ಕುಟುಂಬದ ಸದಸ್ಯರು:",
    includePetsLabel: "ಸಾಕುಪ್ರಾಣಿಗಳನ್ನು ಸೇರಿಸಿ",
    specialNeedsLabel: "ವಿಶೇಷ ವೈದ್ಯಕೀಯ ಅಗತ್ಯತೆಗಳು",
    btnUpdateChecklist: "ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ನವೀಕರಿಸಿ",
    checklistGenerating: "ರಚಿಸಲಾಗುತ್ತಿದೆ...",
    checklistPreparednessProgress: "ತಯಾರಿಯ ಪ್ರಗತಿ",
    checklistLoadingMessage: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ವಿಪತ್ತು ಸನ್ನದ್ಧತೆ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...",
    checklistProgressText: "ಪೂರ್ಣಗೊಂಡಿದೆ",

    // Travel Advisory
    travelAdvisoryTitle: "ಜಿಎನ್‌ಎಐ ಪ್ರಯಾಣ ಸಲಹೆ",
    startLocationLabel: "ಪ್ರಾರಂಭದ ಸ್ಥಳ:",
    destLocationLabel: "ತಲುಪುವ ಸ್ಥಳ:",
    btnCheckSafety: "ಮಾರ್ಗದ ಸುರಕ್ಷತೆ ಪರಿಶೀಲಿಸಿ",
    advisoryAnalyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    recommendationLabel: "ಶಿಫಾರಸು:",
    placeholderAdvisoryHint: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ಪ್ರಯಾಣದ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ನಮೂದಿಸಿ."
  },

  Hindi: {
    // General / Layout
    statusLive: "स्थिति: लाइव सिंक",
    about: "हमारे बारे में",
    safetyGuidelines: "सुरक्षा दिशानिर्देश",
    emergencyDisclaimer: "आपातकालीन अस्वीकरण",
    allRightsReserved: "मानसूनगार्ड डैशबोर्ड © 2026. सर्वाधिकार सुरक्षित।",

    // Header
    appSubTitle: "लाइव आपदा तैयारी और नागरिक सहायता",
    toggleTheme: "थीम बदलें",

    // Broadcast Ticker
    emergencyLabel: "आपातकाल",
    callHotline: "हेल्पलाइन पर कॉल करें 1912",

    // Weather/Flood Meter
    weatherFloodTitle: "लाइव मौसम और बाढ़ मीटर",
    rainfallToday: "आज की बारिश",
    temperature: "तापमान",
    selectStation: "निगरानी स्टेशन चुनें:",
    waterLevel: "जल स्तर",
    floodExceededWarning: "बाढ़ का स्तर खतरनाक सीमा को पार कर गया है। निचले इलाकों के निवासियों को तुरंत सुरक्षित स्थानों पर जाने की सलाह दी जाती है।",
    updatedLive: "अपडेट किया गया: लाइव",
    statusValues: {
      critical: "गंभीर",
      warning: "चेतावनी",
      stable: "स्थिर"
    },

    // Rescue Shelter Map
    shelterMapTitle: "आपातकालीन राहत शिविर मानचित्र",
    shelterDetailsHeader: "राहत शिविर विवरण",
    clickBeaconsHint: "नक्शे पर राहत शिविरों के विवरण देखने के लिए बीकन पर क्लिक करें।",
    occupancyLabel: "आवास दर",
    contactLabel: "संपर्क नंबर",
    openStatus: "खुला है",
    nearCapacityStatus: "भरने के करीब",
    shelters: {
      "sh-1": {
        name: "कोरामंगला इंडोर स्टेडियम राहत शिविर",
        shortName: "कोरामंगला",
        coords: "12.9562° N, 77.6238° E"
      },
      "sh-2": {
        name: "एचएएल स्पोर्ट्स क्लब सामुदायिक केंद्र",
        shortName: "एचएएल",
        coords: "12.9554° N, 77.6984° E"
      },
      "sh-3": {
        name: "एचएसआर लेआउट सेक्टर 3 वार्ड कल्याण कार्यालय",
        shortName: "एचएसआर लेआउट",
        coords: "12.9112° N, 77.6434° E"
      },
      "sh-4": {
        name: "व्हाइटफील्ड सरकारी हाई स्कूल राहत शिविर",
        shortName: "व्हाइटफील्ड",
        coords: "12.9698° N, 77.7498° E"
      }
    },

    // Hazard Reporter
    reportHazardTitle: "खतरे की रिपोर्ट करें",
    labelHazardType: "खतरे का प्रकार:",
    labelSeverityLevel: "तीव्रता स्तर:",
    labelExactLocation: "सटीक स्थान (लैंडमार्क/सड़क का नाम):",
    placeholderLocation: "जैसे: सिल्क बोर्ड जंक्शन के पास",
    labelHazardDescription: "खतरे का विवरण / वर्तमान स्थिति:",
    placeholderDescription: "जैसे: सड़क पर 2 फीट गहरा पानी भरा है, छोटी कारें नहीं गुजर सकतीं।",
    labelYourName: "आपका नाम / पहचान:",
    btnSubmitReport: "रिपोर्ट सबमिट करें",
    btnSubmitting: "सबमिट किया जा रहा है...",
    statusSuccess: "खतरे की रिपोर्ट सफलतापूर्वक दर्ज कर ली गई है। जनता की सुरक्षा में सहयोग के लिए धन्यवाद!",
    statusError: "रिपोर्ट सबमिट करने में विफल। कृपया इंटरनेट कनेक्शन की जांच करें और पुनः प्रयास करें।",
    validationLocation: "स्थान आवश्यक है",
    validationDescription: "विवरण आवश्यक है",
    validationReporter: "रिपोर्टर का नाम आवश्यक है",
    validationLocationTooLong: "स्थान का विवरण बहुत लंबा है (अधिकतम 150 अक्षर)",
    validationDescTooLong: "विवरण बहुत लंबा है (अधिकतम 500 अक्षर)",

    // Hazard Feed
    liveCitizenReports: "लाइव नागरिक रिपोर्ट",
    activeReportsCount: "सक्रिय रिपोर्ट",
    noReportsFound: "चयनित फिल्टर से मेल खाती कोई रिपोर्ट नहीं मिली।",
    allSeverities: "सभी तीव्रताएं",
    criticalOnly: "केवल गंभीर",
    highAndAbove: "उच्च और उससे ऊपर",
    mediumAndAbove: "मध्यम और उससे ऊपर",
    lowOnly: "केवल कम",
    allTypes: "सभी प्रकार",
    severityFilterLabel: "तीव्रता",
    typeFilterLabel: "खतरे का प्रकार",
    reportedBy: "रिपोर्टर:",

    // Hazard Types
    hazardTypes: {
      "Waterlogging": "जलभराव (पानी जमा होना)",
      "Fallen Tree": "गिरा हुआ पेड़",
      "Damaged Road": "क्षतिग्रस्त सड़क",
      "Snapped Wire": "टूटा हुआ बिजली का तार",
      "Other": "अन्य"
    },

    // Severities
    severities: {
      "low": "कम",
      "medium": "मध्यम",
      "high": "उच्च",
      "critical": "गंभीर"
    },

    // Pre-seeded / Simulated feed reports (Translated)
    seededHazards: {
      "haz-101": {
        location: "आउटर रिंग रोड, इकोस्पेस के पास, बेंगलुरु",
        description: "पानी का स्तर लगभग 2.5 फीट गहरा है। यातायात धीमा है; छोटे वाहनों को वैकल्पिक मार्ग लेने की सलाह दी जाती है।"
      },
      "haz-102": {
        location: "एमजी रोड, मेट्रो स्टेशन के सामने, बेंगलुरु",
        description: "गुलमोहर पेड़ की एक बड़ी शाखा गिरने से मुख्य सड़क के दो लेन अवरुद्ध हो गए हैं। यातायात पुलिस और सफाई दल मौके पर हैं।"
      },
      "haz-103": {
        location: "एसटी बेड एरिया, चौथा ब्लॉक कोरामंगला, बेंगलुरु",
        description: "निचले इलाकों की सड़कों में घरों के भूतल में पानी भर गया है। स्थानीय बचाव नौकाएं तैयार हैं। खाली करने की चेतावनी जारी।"
      },
      "haz-104": {
        location: "डबल रोड, इंदिरानगर, बेंगलुरु",
        description: "हाई टेंशन बिजली का तार टूटकर पानी से भरे फुटपाथ पर गिरा है। बेस्कॉम को सूचित किया गया। इस क्षेत्र से न गुजरें।"
      }
    },

    // Survival Checklist
    checklistTitle: "जीएनएआई जीवन रक्षा चेकलिस्ट",
    familySizeLabel: "परिवार के सदस्य:",
    includePetsLabel: "पालतू जानवरों को शामिल करें",
    specialNeedsLabel: "विशेष चिकित्सा आवश्यकताएं",
    btnUpdateChecklist: "चेकलिस्ट अपडेट करें",
    checklistGenerating: "तैयार किया जा रहा है...",
    checklistPreparednessProgress: "तैयारी की प्रगति",
    checklistLoadingMessage: "आपकी व्यक्तिगत आपदा तैयारी चेकलिस्ट तैयार की जा रही है...",
    checklistProgressText: "पूर्ण",

    // Travel Advisory
    travelAdvisoryTitle: "जीएनएआई यात्रा सलाह",
    startLocationLabel: "प्रस्थान स्थान:",
    destLocationLabel: "गंतव्य स्थान:",
    btnCheckSafety: "मार्ग सुरक्षा की जांच करें",
    advisoryAnalyzing: "विश्लेषण किया जा रहा है...",
    recommendationLabel: "सलाह:",
    placeholderAdvisoryHint: "आर्टिफिशियल इंटेलिजेंस आधारित यात्रा सलाह प्राप्त करने के लिए अपना मार्ग दर्ज करें।"
  }
};
