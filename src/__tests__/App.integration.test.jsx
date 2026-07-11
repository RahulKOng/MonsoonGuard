import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import * as firebaseService from '../services/firebaseService';
import * as geminiService from '../services/geminiService';

// Mock Services
vi.mock('../services/firebaseService', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  onSnapshot: vi.fn(),
}));

vi.mock('../services/geminiService', () => ({
  generateTravelAdvisory: vi.fn(),
  generateSurvivalChecklist: vi.fn(),
}));

describe('App Integration & UI Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock behaviors
    firebaseService.onSnapshot.mockImplementation((collectionRef, callback) => {
      const mockDocs = [
        { id: '1', data: () => ({ type: 'Waterlogging', location: 'Mg Road', description: 'Deep water', reportedBy: 'User', severity: 'critical', timestamp: { toDate: () => new Date() } }) },
        { id: '2', data: () => ({ type: 'Fallen Tree', location: 'Indiranagar', description: 'Blocking road', reportedBy: 'Citizen', severity: 'high', timestamp: { toDate: () => new Date() } }) }
      ];
      callback({
        docs: mockDocs,
        forEach: (fn) => mockDocs.forEach(fn)
      });
      return vi.fn(); // unsubscribe function
    });

    firebaseService.addDoc.mockResolvedValue({ id: 'new-doc-123' });

    geminiService.generateSurvivalChecklist.mockResolvedValue([
      { category: 'Food', items: [{ id: 'water-1', text: 'Water', checked: false }] }
    ]);

    geminiService.generateTravelAdvisory.mockResolvedValue('Mocked safe route advisory.');
  });

  it('renders all main components without crashing and handles user interaction', async () => {
    const { container } = render(<App />);
    
    // Wait for the initial checklist generation from the mount to avoid act() warnings
    await waitFor(() => {
      expect(geminiService.generateSurvivalChecklist).toHaveBeenCalledWith(
        expect.objectContaining({ language: 'English' })
      );
    });

    // Check Header renders main title
    expect(screen.getAllByText(/MonsoonGuard/i)[0]).toBeInTheDocument();
    
    // 1. Toggle Light Mode (using ID selector)
    const themeBtn = container.querySelector('#theme-toggle');
    expect(themeBtn).toBeInTheDocument();
    fireEvent.click(themeBtn);
    
    // 2. Interact with HazardReporter (using IDs)
    const typeSelect = container.querySelector('#type-select');
    expect(typeSelect).toBeInTheDocument();
    fireEvent.change(typeSelect, { target: { value: 'Power Outage' } });
    
    const locationInput = container.querySelector('#location-input');
    expect(locationInput).toBeInTheDocument();
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    
    const descTextarea = container.querySelector('#description-textarea');
    expect(descTextarea).toBeInTheDocument();
    fireEvent.change(descTextarea, { target: { value: '<script>alert("test")</script> Test description' } });
    
    const reporterInput = container.querySelector('#reportedBy-input');
    expect(reporterInput).toBeInTheDocument();
    fireEvent.change(reporterInput, { target: { value: 'Ramesh K' } });

    // Submit report form
    const hazardForm = container.querySelector('section[aria-labelledby="hazard-reporter-title"] form');
    expect(hazardForm).toBeInTheDocument();
    fireEvent.submit(hazardForm);
    
    await waitFor(() => {
      expect(firebaseService.addDoc).toHaveBeenCalled();
    });

    // 3. Interact with TravelAdvisory (using IDs)
    const originInput = container.querySelector('#origin-input');
    const destinationInput = container.querySelector('#destination-input');
    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    
    fireEvent.change(originInput, { target: { value: 'A' } });
    fireEvent.change(destinationInput, { target: { value: 'B' } });
    
    // Submit travel advisory form (which has the teal button)
    const travelForm = container.querySelector('section[aria-labelledby="advisory-title"] form') || container.querySelectorAll('form')[1];
    if (travelForm) {
      fireEvent.submit(travelForm);
    }
    
    await waitFor(() => {
      expect(geminiService.generateTravelAdvisory).toHaveBeenCalled();
    });

    // 4. Checklist Interactions
    const genChecklistBtn = container.querySelector('section[aria-labelledby="checklist-title"] button');
    if (genChecklistBtn) {
      fireEvent.click(genChecklistBtn);
    }

    await waitFor(() => {
      expect(geminiService.generateSurvivalChecklist).toHaveBeenCalled();
    });

    // 5. Filter Hazards List (using IDs)
    const filterSelect = container.querySelector('#severity-filter');
    if (filterSelect) {
      fireEvent.change(filterSelect, { target: { value: 'critical' } });
    }
    
    // 6. Switch language to Kannada
    const langSelect = container.querySelector('#language-selector');
    expect(langSelect).toBeInTheDocument();
    fireEvent.change(langSelect, { target: { value: 'Kannada' } });

    // Verify it translates some title on UI
    await waitFor(() => {
      expect(screen.getByText(/ತುರ್ತು ರಕ್ಷಣಾ ಆಶ್ರಯ ನಕ್ಷೆ/i)).toBeInTheDocument();
    });
  });
});
