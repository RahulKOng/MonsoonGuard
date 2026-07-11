import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../utils/utils';
import { getFirestore, collection, addDoc, onSnapshot } from '../services/firebaseService';
import { TRANSLATIONS } from '../services/translationService';
import { generateTravelAdvisory, generateSurvivalChecklist } from '../services/geminiService';

describe('MonsoonGuard Defensive Practices & Input Sanitization', () => {
  it('should remove raw script tags from input to prevent basic script injection', () => {
    const rawInput = '<script>alert("XSS")</script>';
    const sanitized = sanitizeInput(rawInput);
    expect(sanitized).toBe('alert("XSS")'); // Script tag completely removed
  });

  it('should strip inline javascript events such as onerror or onload', () => {
    const rawInput = '<img src="invalid_path.jpg" onerror="doMaliciousStuff()" />';
    const sanitized = sanitizeInput(rawInput);
    // Should strip the tag and event handler
    expect(sanitized).not.toContain('onerror');
    expect(sanitized).not.toContain('doMaliciousStuff');
  });

  it('should strip javascript: pseudo protocol links', () => {
    const rawInput = 'javascript:executeMaliciousCode()';
    const sanitized = sanitizeInput(rawInput);
    expect(sanitized).toBe('executeMaliciousCode()');
  });

  it('should filter multiple mixed nested tags and retain clean text content', () => {
    const rawInput = '<div>Safe Text <a href="#" onclick="hack()">Click</a> <script>danger</script></div>';
    const sanitized = sanitizeInput(rawInput);
    expect(sanitized).toContain('Safe Text');
    expect(sanitized).toContain('Click');
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('onclick');
  });
});

describe('MonsoonGuard Firebase Live Synchronization State', () => {
  it('should allow adding new items to mock collection and fetch them', async () => {
    const db = getFirestore();
    const colRef = collection(db, 'hazards');
    
    const initialCount = db.hazards.length;

    const payload = {
      type: 'Waterlogging',
      location: 'Testing Lane 5',
      description: 'Sanitized test hazard',
      reportedBy: 'Vitest Runner',
      severity: 'low'
    };

    const docRef = await addDoc(colRef, payload);
    expect(docRef.id).toBeDefined();
    expect(db.hazards.length).toBe(initialCount + 1);
    expect(db.hazards[0].location).toBe('Testing Lane 5');
  });

  it('should trigger real-time updates via onSnapshot subscription', () => {
    const db = getFirestore();
    const colRef = collection(db, 'hazards');
    
    let updatedData = null;
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      updatedData = list;
    });

    // Add dummy document to trigger
    db.add({
      type: 'Fallen Tree',
      location: 'Test Road',
      description: 'Test tree fall',
      reportedBy: 'Listener Test',
      severity: 'medium'
    });

    expect(updatedData).toBeDefined();
    expect(updatedData[0].location).toBe('Test Road');

    unsubscribe();
  });
});

describe('MonsoonGuard Survival Checklist Calculation logic', () => {
  it('should maintain state consistency when updating checking checklist items', () => {
    // Simulated checklist state representation
    const initialChecklist = [
      {
        category: 'Essentials',
        items: [
          { id: 'ess-1', text: 'Water', checked: false },
          { id: 'ess-2', text: 'Food', checked: false }
        ]
      }
    ];

    // Toggle logic assertion
    const toggleChecked = (list, catIdx, itemIdx) => {
      const copy = JSON.parse(JSON.stringify(list));
      copy[catIdx].items[itemIdx].checked = !copy[catIdx].items[itemIdx].checked;
      return copy;
    };

    let activeList = toggleChecked(initialChecklist, 0, 0);
    expect(activeList[0].items[0].checked).toBe(true);
    expect(activeList[0].items[1].checked).toBe(false);

    // Toggle again
    activeList = toggleChecked(activeList, 0, 0);
    expect(activeList[0].items[0].checked).toBe(false);
  });
});

describe('MonsoonGuard Translation Service Dictionary Integrity', () => {
  it('should contain matching keys for all three languages', () => {
    const languages = ['English', 'Kannada', 'Hindi'];
    languages.forEach(lang => {
      const dict = TRANSLATIONS[lang];
      expect(dict).toBeDefined();
      expect(dict.weatherFloodTitle).toBeDefined();
      expect(dict.shelterMapTitle).toBeDefined();
      expect(dict.reportHazardTitle).toBeDefined();
      expect(dict.liveCitizenReports).toBeDefined();
      expect(dict.checklistTitle).toBeDefined();
      expect(dict.travelAdvisoryTitle).toBeDefined();
    });
  });

  it('should return valid shelter names in all three languages', () => {
    const ids = ['sh-1', 'sh-2', 'sh-3', 'sh-4'];
    const languages = ['English', 'Kannada', 'Hindi'];
    
    languages.forEach(lang => {
      ids.forEach(id => {
        const shelterInfo = TRANSLATIONS[lang].shelters[id];
        expect(shelterInfo).toBeDefined();
        expect(shelterInfo.name).toBeDefined();
        expect(shelterInfo.shortName).toBeDefined();
      });
    });
  });

  it('should return valid translated pre-seeded hazards', () => {
    const ids = ['haz-101', 'haz-102', 'haz-103', 'haz-104'];
    const languages = ['English', 'Kannada', 'Hindi'];
    
    languages.forEach(lang => {
      ids.forEach(id => {
        const seedInfo = TRANSLATIONS[lang].seededHazards[id];
        expect(seedInfo).toBeDefined();
        expect(seedInfo.location).toBeDefined();
        expect(seedInfo.description).toBeDefined();
      });
    });
  });
});

describe('MonsoonGuard GenAI Travel Advisory Logic', () => {
  it('should flag routes matching active hazard locations as warning status', async () => {
    const activeHazards = [
      { id: 'haz-101', type: 'Waterlogging', location: 'Outer Ring Road', severity: 'critical' }
    ];
    
    const result = await generateTravelAdvisory({
      origin: 'Outer Ring Road',
      destination: 'MG Road',
      hazardAlerts: activeHazards,
      language: 'English'
    });

    expect(result.status).toBe('warning');
    expect(result.title).toContain('Hazards Detected');
  });

  it('should declare routes safe when no active hazard matches path locations', async () => {
    const activeHazards = [
      { id: 'haz-101', type: 'Waterlogging', location: 'Koramangala', severity: 'low' }
    ];
    
    const result = await generateTravelAdvisory({
      origin: 'Indiranagar',
      destination: 'MG Road',
      hazardAlerts: activeHazards,
      language: 'English'
    });

    expect(result.status).toBe('safe');
    expect(result.title).toContain('Path Clear');
  });
});

describe('MonsoonGuard GenAI Checklist Customizer Logic', () => {
  it('should include pet items when hasPets is true', async () => {
    const checklist = await generateSurvivalChecklist({
      familySize: 3,
      hasPets: true,
      hasSpecialNeeds: false,
      language: 'English'
    });

    // Check if at least one item relates to pet care/food
    const hasPetItem = checklist.some(cat => 
      cat.items.some(item => item.text.toLowerCase().includes('pet') || item.text.toLowerCase().includes('animal'))
    );
    expect(hasPetItem).toBe(true);
  });

  it('should include special medical needs when hasSpecialNeeds is true', async () => {
    const checklist = await generateSurvivalChecklist({
      familySize: 3,
      hasPets: false,
      hasSpecialNeeds: true,
      language: 'English'
    });

    // Check if at least one item relates to medical/prescription needs
    const hasMedItem = checklist.some(cat => 
      cat.items.some(item => item.text.toLowerCase().includes('presc') || item.text.toLowerCase().includes('medic'))
    );
    expect(hasMedItem).toBe(true);
  });
});
