import { describe, it, expect, vi } from 'vitest';
import { sanitizeInput } from '../components/HazardReporter';
import { initializeApp, getFirestore, collection, addDoc, onSnapshot } from '../services/firebaseService';

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
    const newDoc = db.add({
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
