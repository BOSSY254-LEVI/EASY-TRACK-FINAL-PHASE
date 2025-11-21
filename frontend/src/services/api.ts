/**
 * EASY TRACK API Service
 * Centralized API communication layer
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Error types
export class APIError extends Error {
  constructor(
    public status: number,
    public details?: any,
    message?: string
  ) {
    super(message || `API Error: ${status}`);
  }
}

/**
 * AI Chat API
 */
export const aiAPI = {
  async chat(messages: any[], userId?: string) {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          userId: userId || 'web-user',
          context: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          }
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(response.status, error, error.error || 'Chat request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  },

  async analyzeFieldData(fieldData: any, dataType: string = 'general') {
    try {
      const response = await fetch(`${API_URL}/api/ai/analyze-field-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldData, dataType })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(response.status, error);
      }

      return await response.json();
    } catch (error) {
      console.error('Analysis API error:', error);
      throw error;
    }
  },

  async getInsights(allFieldData: any[], timeRange: string = 'month') {
    try {
      const response = await fetch(`${API_URL}/api/ai/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allFieldData, timeRange })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(response.status, error);
      }

      return await response.json();
    } catch (error) {
      console.error('Insights API error:', error);
      throw error;
    }
  }
};

/**
 * Field Data API
 */
export const fieldDataAPI = {
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/api/field-data`);
      
      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Failed to fetch field data');
      }

      return await response.json();
    } catch (error) {
      console.error('Field data fetch error:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const response = await fetch(`${API_URL}/api/field-data/${id}`);
      
      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Field data not found');
      }

      return await response.json();
    } catch (error) {
      console.error('Field data fetch error:', error);
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await fetch(`${API_URL}/api/field-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(response.status, error, 'Failed to create field data');
      }

      return await response.json();
    } catch (error) {
      console.error('Field data creation error:', error);
      throw error;
    }
  },

  async update(id: string, data: any) {
    try {
      const response = await fetch(`${API_URL}/api/field-data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(response.status, error, 'Failed to update field data');
      }

      return await response.json();
    } catch (error) {
      console.error('Field data update error:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const response = await fetch(`${API_URL}/api/field-data/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Failed to delete field data');
      }

      return await response.json();
    } catch (error) {
      console.error('Field data deletion error:', error);
      throw error;
    }
  }
};

/**
 * Supabase API (if backend forwards)
 */
export const supabaseAPI = {
  async getFieldData() {
    try {
      const response = await fetch(`${API_URL}/api/supabase/field-data`);
      
      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Failed to fetch Supabase data');
      }

      return await response.json();
    } catch (error) {
      console.error('Supabase fetch error:', error);
      throw error;
    }
  },

  async getUsers() {
    try {
      const response = await fetch(`${API_URL}/api/supabase/users`);
      
      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Users fetch error:', error);
      throw error;
    }
  }
};

/**
 * Sync API
 */
export const syncAPI = {
  async getAllData() {
    try {
      const response = await fetch(`${API_URL}/api/sync/all-data`);
      
      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Failed to sync data');
      }

      return await response.json();
    } catch (error) {
      console.error('Sync error:', error);
      throw error;
    }
  }
};

/**
 * Health Check
 */
export const healthAPI = {
  async check() {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new APIError(response.status, undefined, 'Health check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
};
