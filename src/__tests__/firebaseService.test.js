import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('firebaseService Error Boundaries', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it('SimulatedFirestore should handle JSON parse errors in localStorage', async () => {
    localStorage.setItem('monsoonguard_hazards', 'invalid-json-{');
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { getFirestore } = await import('../services/firebaseService');
    const db = getFirestore();
    
    expect(db.hazards).toBeDefined();
    expect(db.hazards.length).toBeGreaterThan(0); // Resets to INITIAL_HAZARDS
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    consoleErrorSpy.mockRestore();
  });

  it('addDoc should throw error when collection reference is invalid', async () => {
    const { addDoc } = await import('../services/firebaseService');
    
    await expect(addDoc(null, {})).rejects.toThrow('Invalid collection reference passed to addDoc');
    await expect(addDoc({ db: null }, {})).rejects.toThrow('Invalid collection reference passed to addDoc');
  });

  it('onSnapshot should catch errors and return a dummy unsubscribe function on invalid reference', async () => {
    const { onSnapshot } = await import('../services/firebaseService');
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const unsubscribe = onSnapshot(null, () => {});
    expect(unsubscribe).toBeTypeOf('function');
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    consoleErrorSpy.mockRestore();
  });
});
