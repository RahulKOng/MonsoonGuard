import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn().mockReturnValue({
  generateContent: mockGenerateContent
});

class MockGoogleGenerativeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  getGenerativeModel = mockGetGenerativeModel;
}

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI
  };
});

describe('geminiService API Paths', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_GEMINI_API_KEY', 'TEST_KEY');
    
    // Reset modules to force genAI client initialization with VITE_GEMINI_API_KEY
    vi.resetModules();
  });

  it('generateSurvivalChecklist should use Gemini API and return clean checklist', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => '```json\n[{"category": "Test Category", "items": [{"id": "item-1", "text": "Test Item", "priority": "critical"}]}]\n```'
      }
    });

    const { generateSurvivalChecklist } = await import('../services/geminiService');
    const result = await generateSurvivalChecklist({ familySize: 2, hasPets: false, hasSpecialNeeds: false, language: 'English' });
    
    expect(result).toBeDefined();
    expect(result[0].category).toBe('Test Category');
    expect(result[0].items[0].checked).toBe(false);
  });

  it('generateSurvivalChecklist should fallback to mock on JSON parse error', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => 'invalid-json'
      }
    });

    const { generateSurvivalChecklist } = await import('../services/geminiService');
    const result = await generateSurvivalChecklist({ familySize: 2, hasPets: false, hasSpecialNeeds: false, language: 'English' });
    
    expect(result).toBeDefined();
    expect(result[0].category).toContain('Water & Food'); // falls back to mock
  });

  it('generateTravelAdvisory should use Gemini API and return advisory', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => '{"status": "warning", "title": "Advisory Title", "recommendation": "Recommendation", "details": "Details"}'
      }
    });

    const { generateTravelAdvisory } = await import('../services/geminiService');
    const result = await generateTravelAdvisory({ origin: 'A', destination: 'B', hazardAlerts: [], language: 'English' });
    
    expect(result.status).toBe('warning');
    expect(result.title).toBe('Advisory Title');
  });

  it('generateTravelAdvisory should fallback to mock on API error', async () => {
    mockGenerateContent.mockRejectedValue(new Error('API Error'));

    const { generateTravelAdvisory } = await import('../services/geminiService');
    const result = await generateTravelAdvisory({ origin: 'A', destination: 'B', hazardAlerts: [], language: 'English' });
    
    expect(result.status).toBe('safe');
    expect(result.title).toContain('Path Clear');
  });

  it('translateText should use Gemini API to translate', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => 'Translated Text'
      }
    });

    const { translateText } = await import('../services/geminiService');
    const result = await translateText('Hello', 'Hindi');
    
    expect(result).toBe('Translated Text');
  });

  it('translateText should fallback to mock on API error', async () => {
    mockGenerateContent.mockRejectedValue(new Error('Translation Error'));

    const { translateText } = await import('../services/geminiService');
    const result = await translateText('MonsoonGuard', 'Hindi');
    
    expect(result).toBe('मानसून गार्ड');
  });
});
