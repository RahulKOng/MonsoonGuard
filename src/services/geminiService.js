import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client using the environment variable if available
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
let genAI = null;

try {
  if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
    genAI = new GoogleGenerativeAI(apiKey);
  }
} catch (error) {
  console.warn('Failed to initialize GoogleGenerativeAI client. Running in high-fidelity mock mode.', error);
}

/**
 * Local fallback translations for simulated responses
 */
const LANGUAGE_TRANSLATIONS = {
  English: {
    categories: {
      essentials: "Water & Food Essentials",
      health: "Medical & Sanitation",
      safety: "Safety & Emergency Tools",
      pets: "Pet Survival Supplies",
      special: "Special Needs Support"
    },
    items: {
      water: (qty) => `Drinking water: minimum ${qty} liters (3 liters per person/day for 3 days)`,
      food: (qty) => `Non-perishable food items: sufficient for ${qty} people for 3 days (canned goods, energy bars)`,
      firstaid: "First-aid kit containing bandages, antiseptic wipes, scissors, and medical tape",
      meds: "Critical prescription medications (minimum 7-day supply)",
      flashlight: "Waterproof LED flashlight with extra alkaline batteries",
      powerbank: "Fully charged high-capacity power bank and emergency radio (AM/FM)",
      documents: "Important personal documents sealed in a waterproof zip folder (IDs, insurance papers)",
      whistle: "Emergency whistle to signal rescue workers in low visibility",
      petfood: "Dry pet food and clean water in sealed containers",
      petcare: "Pet leash, collar with identification tags, and vaccination records",
      specialmeds: "Personalized medical equipment, specialized prescriptions, and backup battery packs",
      mobility: "Mobility aids (crutches, braces, or wheelchair accessories) stored securely",
      advisorySafe: "Route appears safe based on current reports. Exercise standard caution.",
      advisoryAlert: "WARNING: Route intersects active hazard alerts. Avoid travel or take detours.",
    }
  },
  Kannada: {
    categories: {
      essentials: "ನೀರು ಮತ್ತು ಆಹಾರ ಅಗತ್ಯಗಳು",
      health: "ವೈದ್ಯಕೀಯ ಮತ್ತು ನೈರ್ಮಲ್ಯ",
      safety: "ಸುರಕ್ಷತೆ ಮತ್ತು ತುರ್ತು ಉಪಕರಣಗಳು",
      pets: "ಸಾಕುಪ್ರಾಣಿಗಳ ಬದುಕುಳಿಯುವ ಸಾಮಗ್ರಿಗಳು",
      special: "ವಿಶೇಷ ಅಗತ್ಯತೆಗಳ ಬೆಂಬಲ"
    },
    items: {
      water: (qty) => `ಕುಡಿಯುವ ನೀರು: ಕನಿಷ್ಠ ${qty} ಲೀಟರ್ (3 ದಿನಗಳವರೆಗೆ ದಿನಕ್ಕೆ ಒಬ್ಬರಿಗೆ 3 ಲೀಟರ್)`,
      food: (qty) => `ಬೇಗ ಹಾಳಾಗದ ಆಹಾರ ಪದಾರ್ಥಗಳು: 3 ದಿನಗಳವರೆಗೆ ಕನಿಷ್ಠ ${qty} ಜನರಿಗೆ ಸಾಕಾಗುವಷ್ಟು`,
      firstaid: "ಬ್ಯಾಂಡೇಜ್‌ಗಳು, ನಂಜುನಿರೋಧಕ ವೈಪ್‌ಗಳು, ಕತ್ತರಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ಟೇಪ್ ಒಳಗೊಂಡಿರುವ ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಪೆಟ್ಟಿಗೆ",
      meds: "ಪ್ರಮುಖ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಔಷಧಿಗಳು (ಕನಿಷ್ಠ 7 ದಿನಗಳ ಪೂರೈಕೆ)",
      flashlight: "ಹೆಚ್ಚುವರಿ ಆಲ್ಕಲೈನ್ ಬ್ಯಾಟರಿಗಳೊಂದಿಗೆ ಜಲನಿರೋಧಕ ಎಲ್ಇಡಿ ಟಾರ್ಚ್",
      powerbank: "ಸಂಪೂರ್ಣವಾಗಿ ಚಾರ್ಜ್ ಮಾಡಲಾದ ಪವರ್ ಬ್ಯಾಂಕ್ ಮತ್ತು ತುರ್ತು ರೇಡಿಯೋ",
      documents: "ಜಲನಿರೋಧಕ ಜಿಪ್ ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿಡಲಾದ ಪ್ರಮುಖ ದಾಖಲೆಗಳು (ಗುರುತಿನ ಚೀಟಿಗಳು, ವಿಮೆ ಪತ್ರಗಳು)",
      whistle: "ಕಡಿಮೆ ಗೋಚರತೆಯಲ್ಲಿ ರಕ್ಷಣಾ ಸಿಬ್ಬಂದಿಗೆ ಸಂಕೇತ ನೀಡಲು ತುರ್ತು ಸೀಟಿ",
      petfood: "ಮುಚ್ಚಿದ ಪಾತ್ರೆಗಳಲ್ಲಿ ಒಣ ಸಾಕುಪ್ರಾಣಿ ಆಹಾರ ಮತ್ತು ಶುದ್ಧ ನೀರು",
      petcare: "ಸಾಕುಪ್ರಾಣಿ ಸರಪಳಿ, ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ವ್ಯಾಕ್ಸಿನೇಷನ್ ದಾಖಲೆಗಳು",
      specialmeds: "ವೈಯಕ್ತೀಕರಿಸಿದ ವೈದ್ಯಕೀಯ ಉಪಕರಣಗಳು ಮತ್ತು ಬ್ಯಾಕಪ್ ಬ್ಯಾಟರಿ ಪ್ಯಾಕ್‌ಗಳು",
      mobility: "ಚಲನಶೀಲತೆ ಸಾಧನಗಳು (ಬೆತ್ತಗಳು ಅಥವಾ ಗಾಲಿಕುರ್ಚಿ ಪರಿಕರಗಳು) ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
      advisorySafe: "ಪ್ರಸ್ತುತ ವರದಿಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗವು ಸುರಕ್ಷಿತವಾಗಿದೆ. ಪ್ರಮಾಣಿತ ಎಚ್ಚರಿಕೆ ವಹಿಸಿ.",
      advisoryAlert: "ಎಚ್ಚರಿಕೆ: ಮಾರ್ಗವು ಸಕ್ರಿಯ ಅಪಾಯದ ವಲಯಗಳನ್ನು ದಾಟುತ್ತದೆ. ಪ್ರಯಾಣವನ್ನು ತಪ್ಪಿಸಿ ಅಥವಾ ಪರ್ಯಾಯ ಮಾರ್ಗ ಬಳಸಿ.",
    }
  },
  Hindi: {
    categories: {
      essentials: "पानी और खाद्य सामग्री",
      health: "चिकित्सा और स्वच्छता",
      safety: "सुरक्षा और आपातकालीन उपकरण",
      pets: "पालतू जानवरों की जीवन रक्षा सामग्री",
      special: "विशेष आवश्यकता सहायता"
    },
    items: {
      water: (qty) => `पीने का पानी: न्यूनतम ${qty} लीटर (3 दिनों के लिए प्रति व्यक्ति 3 लीटर प्रतिदिन)`,
      food: (qty) => `गैर-नाशवान खाद्य सामग्री: 3 दिनों के लिए ${qty} लोगों के लिए पर्याप्त (डिब्बाबंद सामान, ऊर्जा बार)`,
      firstaid: "प्राथमिक चिकित्सा किट (बैंडेज, एंटीसेप्टिक वाइप्स, कैंची और टेप)",
      meds: "महत्वपूर्ण नुस्खे वाली दवाएं (न्यूनतम 7 दिनों की आपूर्ति)",
      flashlight: "अतिरिक्त एल्कलाइन बैटरी के साथ वॉटरप्रूफ एलईडी टॉर्च",
      powerbank: "पूरी तरह चार्ज किया गया पावर बैंक और आपातकालीन रेडियो",
      documents: "वॉटरप्रूफ जिप फोल्डर में सील किए गए महत्वपूर्ण दस्तावेज (आईडी, बीमा पत्र)",
      whistle: "कम दृश्यता में बचाव कर्मियों को संकेत देने के लिए आपातकालीन सीटी",
      petfood: "बंद डिब्बों में सूखा पालतू पशु आहार और साफ पानी",
      petcare: "पालतू जानवर की पट्टा, पहचान पत्र और टीकाकरण रिकॉर्ड",
      specialmeds: "व्यक्तिगत चिकित्सा उपकरण और बैकअप बैटरी पैक",
      mobility: "गतिशीलता सहायता उपकरण (बैसाखी या व्हीलचेयर सहायक उपकरण) सुरक्षित रूप से संग्रहीत",
      advisorySafe: "वर्तमान रिपोर्टों के आधार पर मार्ग सुरक्षित प्रतीत होता है। मानक सावधानी बरतें।",
      advisoryAlert: "चेतावनी: मार्ग सक्रिय खतरे वाले क्षेत्रों को पार करता है। यात्रा से बचें या वैकल्पिक मार्ग लें।",
    }
  }
};

/**
 * Helper to produce dynamic high-fidelity mock data if Gemini API is not configured or fails
 */
function getMockSurvivalChecklist(familySize, hasPets, hasSpecialNeeds, language) {
  const lang = LANGUAGE_TRANSLATIONS[language] ? language : 'English';
  const trans = LANGUAGE_TRANSLATIONS[lang];
  
  const checklist = [
    {
      category: trans.categories.essentials,
      items: [
        { id: 'ess-1', text: trans.items.water(familySize * 9), checked: false, priority: 'critical' },
        { id: 'ess-2', text: trans.items.food(familySize), checked: false, priority: 'critical' }
      ]
    },
    {
      category: trans.categories.health,
      items: [
        { id: 'hlth-1', text: trans.items.firstaid, checked: false, priority: 'high' },
        { id: 'hlth-2', text: trans.items.meds, checked: false, priority: 'critical' }
      ]
    },
    {
      category: trans.categories.safety,
      items: [
        { id: 'safe-1', text: trans.items.flashlight, checked: false, priority: 'high' },
        { id: 'safe-2', text: trans.items.powerbank, checked: false, priority: 'high' },
        { id: 'safe-3', text: trans.items.documents, checked: false, priority: 'critical' },
        { id: 'safe-4', text: trans.items.whistle, checked: false, priority: 'medium' }
      ]
    }
  ];

  if (hasPets) {
    checklist.push({
      category: trans.categories.pets,
      items: [
        { id: 'pet-1', text: trans.items.petfood, checked: false, priority: 'medium' },
        { id: 'pet-2', text: trans.items.petcare, checked: false, priority: 'medium' }
      ]
    });
  }

  if (hasSpecialNeeds) {
    checklist.push({
      category: trans.categories.special,
      items: [
        { id: 'spec-1', text: trans.items.specialmeds, checked: false, priority: 'critical' },
        { id: 'spec-2', text: trans.items.mobility, checked: false, priority: 'high' }
      ]
    });
  }

  return checklist;
}

/**
 * Helper to produce dynamic high-fidelity mock advisory if Gemini API is not configured or fails
 */
function getMockTravelAdvisory(origin, destination, hazardAlerts = [], language) {
  const lang = LANGUAGE_TRANSLATIONS[language] ? language : 'English';
  const trans = LANGUAGE_TRANSLATIONS[lang];
  const normalizedOrigin = origin.trim().toLowerCase();
  const normalizedDest = destination.trim().toLowerCase();
  
  // Look for any hazard matching the route
  const intersectingHazards = hazardAlerts.filter(h => {
    const loc = h.location.toLowerCase();
    return normalizedOrigin.includes(loc) || normalizedDest.includes(loc) || loc.includes(normalizedOrigin) || loc.includes(normalizedDest);
  });

  const hasHazards = intersectingHazards.length > 0;
  
  let routeStatus = hasHazards ? 'warning' : 'safe';
  let title = hasHazards 
    ? (lang === 'Kannada' ? 'ಪ್ರಯಾಣದ ಎಚ್ಚರಿಕೆ: ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ' : lang === 'Hindi' ? 'यात्रा चेतावनी: खतरा पाया गया' : 'Travel Advisory: Hazards Detected')
    : (lang === 'Kannada' ? 'ಪ್ರಯಾಣದ ಸಲಹೆ: ಮಾರ್ಗವು ಸುರಕ್ಷಿತವಾಗಿದೆ' : lang === 'Hindi' ? 'यात्रा सलाह: मार्ग सुरक्षित है' : 'Travel Advisory: Path Clear');

  let recommendation = hasHazards 
    ? trans.items.advisoryAlert 
    : trans.items.advisorySafe;

  let details = '';
  if (hasHazards) {
    details = lang === 'Kannada' 
      ? `ಸಕ್ರಿಯ ಅಡೆತಡೆಗಳು: ${intersectingHazards.map(h => `${h.type} (${h.location})`).join(', ')}`
      : lang === 'Hindi'
      ? `सक्रिय खतरे: ${intersectingHazards.map(h => `${h.type} (${h.location})`).join(', ')}`
      : `Active Hazards: ${intersectingHazards.map(h => `${h.type} at ${h.location}`).join(', ')}`;
  } else {
    details = lang === 'Kannada'
      ? `ಯಾವುದೇ ಜಲಾವೃತ ಅಥವಾ ಅಡೆತಡೆಗಳು ವರದಿಯಾಗಿಲ್ಲ. ಸುರಕ್ಷಿತವಾಗಿ ಚಾಲನೆ ಮಾಡಿ.`
      : lang === 'Hindi'
      ? `कोई जलभराव या गिरे हुए पेड़ की सूचना नहीं है। सुरक्षित रूप से ड्राइव करें।`
      : `No severe waterlogging or fallen trees reported along the standard route. Maintain normal safety checks.`;
  }

  return {
    status: routeStatus,
    title: title,
    recommendation: recommendation,
    details: details,
    timestamp: new Date().toLocaleTimeString()
  };
}

/**
 * Helper to simulate translation if Gemini API is not configured or fails
 */
function getMockTranslation(text, targetLanguage) {
  const dictionary = {
    'MonsoonGuard': {
      'Kannada': 'ಮನ್ಸೂನ್ ಗಾರ್ಡ್',
      'Hindi': 'मानसून गार्ड'
    },
    'Emergency Broadcast Ticker': {
      'Kannada': 'ತುರ್ತು ಪ್ರಸಾರ ಸೂಚಕ',
      'Hindi': 'आपातकालीन प्रसारण टिकर'
    },
    'Live Waterlogging Alerts': {
      'Kannada': 'ಲೈವ್ ಜಲಾವೃತ ಎಚ್ಚರಿಕೆಗಳು',
      'Hindi': 'लाइव जलभराव चेतावनी'
    },
    'Fallen Trees': {
      'Kannada': 'ಬಿದ್ದ ಮರಗಳು',
      'Hindi': 'गिरे हुए पेड़'
    },
    'Rainfall Intensity': {
      'Kannada': 'ಮಳೆಯ ತೀವ್ರತೆ',
      'Hindi': 'बारिश की तीव्रता'
    },
    'Active Flood Alert Levels': {
      'Kannada': 'ಸಕ್ರಿಯ ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆಯ ಮಟ್ಟಗಳು',
      'Hindi': 'सक्रिय बाढ़ चेतावनी स्तर'
    }
  };

  if (targetLanguage === 'English') return text;
  
  // Search dictionary
  if (dictionary[text] && dictionary[text][targetLanguage]) {
    return dictionary[text][targetLanguage];
  }

  // Generic fallback indicator so they know it translated mock-style
  return `${text} (${targetLanguage})`;
}

/**
 * 1. Generate Personalized Monsoon Survival Checklist
 * @param {Object} params
 * @param {number} params.familySize
 * @param {boolean} params.hasPets
 * @param {boolean} params.hasSpecialNeeds
 * @param {string} params.language - 'English' | 'Kannada' | 'Hindi'
 */
export async function generateSurvivalChecklist({ familySize, hasPets, hasSpecialNeeds, language = 'English' }) {
  if (!genAI) {
    // Return high-fidelity mock data directly
    return getMockSurvivalChecklist(familySize, hasPets, hasSpecialNeeds, language);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
      You are a disaster preparedness expert. 
      Generate a customized monsoon survival checklist in JSON format for:
      - Family size: ${familySize}
      - Has pets: ${hasPets ? 'Yes' : 'No'}
      - Has special medical needs: ${hasSpecialNeeds ? 'Yes' : 'No'}
      - Language for all text: ${language}
      
      Respond ONLY with a valid JSON array matching the following schema. No markdown blocks, no formatting wrappers, just JSON.
      JSON Schema:
      [
        {
          "category": "Category Title (e.g. Water & Food Essentials)",
          "items": [
            {
              "id": "unique-string-id",
              "text": "Checklist item text (e.g., Drinking water: 36 liters total)",
              "priority": "critical" | "high" | "medium" | "low"
            }
          ]
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Clean markdown wrapper if model accidentally outputs it
    const cleanText = text.replace(/^```json/, '').replace(/```$/, '').trim();
    const parsedData = JSON.parse(cleanText);
    
    // Add default checked state to items
    return parsedData.map(category => ({
      ...category,
      items: category.items.map(item => ({ ...item, checked: false }))
    }));
  } catch (error) {
    console.error('Gemini Service Checklist error, falling back to mock:', error);
    return getMockSurvivalChecklist(familySize, hasPets, hasSpecialNeeds, language);
  }
}

/**
 * 2. Generate Real-time Travel Advisory
 * @param {Object} params
 * @param {string} params.origin
 * @param {string} params.destination
 * @param {Array} params.hazardAlerts - Array of active hazard objects from Firestore state
 * @param {string} params.language - 'English' | 'Kannada' | 'Hindi'
 */
export async function generateTravelAdvisory({ origin, destination, hazardAlerts = [], language = 'English' }) {
  if (!genAI) {
    return getMockTravelAdvisory(origin, destination, hazardAlerts, language);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const activeHazardsText = hazardAlerts.map(h => `- Type: ${h.type}, Location: ${h.location}, Severity: ${h.severity}`).join('\n');
    const prompt = `
      Analyze travel safety between ${origin} and ${destination} in the context of these active monsoon hazards:
      ${activeHazardsText || 'None reported'}

      Provide a safety travel advisory in JSON format. All descriptions and recommendations must be in ${language}.
      Respond ONLY with a valid JSON object matching the following schema. No markdown blocks, no formatting wrappers, just JSON.
      JSON Schema:
      {
        "status": "safe" | "warning",
        "title": "Advisory Title",
        "recommendation": "Main advice (e.g. Travel warning: take detour or avoid)",
        "details": "Explanation of risks or safe conditions based on the hazards listed."
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleanText = text.replace(/^```json/, '').replace(/```$/, '').trim();
    const responseObj = JSON.parse(cleanText);
    
    return {
      ...responseObj,
      timestamp: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error('Gemini Service Advisory error, falling back to mock:', error);
    return getMockTravelAdvisory(origin, destination, hazardAlerts, language);
  }
}

/**
 * 3. Handle Dynamic Multilingual Translation
 * @param {string} text - text to translate
 * @param {string} targetLanguage - 'English' | 'Kannada' | 'Hindi'
 */
export async function translateText(text, targetLanguage) {
  if (!text || targetLanguage === 'English') return text;
  if (!genAI) {
    return getMockTranslation(text, targetLanguage);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
      Translate the following English text to ${targetLanguage}.
      Do not add extra explanation, just return the translated text directly.
      Text to translate: "${text}"
    `;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Gemini Service Translation error, falling back to mock:', error);
    return getMockTranslation(text, targetLanguage);
  }
}
