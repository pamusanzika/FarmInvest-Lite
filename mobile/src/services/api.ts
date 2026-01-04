import { Investment } from '../types';

// IMPORTANT: Replace with your machine's IP address for device testing
// Find your IP: Mac/Linux: ifconfig | grep "inet ", Windows: ipconfig
const API_URL = 'http://192.168.8.144:3000/api';

export const investmentService = {
  async getInvestments(): Promise<Investment[]> {
    try {
      const response = await fetch(`${API_URL}/investments`);
      if (!response.ok) {
        throw new Error('Failed to fetch investments');
      }
      return response.json();
    } catch (error: any) {
      // Catch network or other errors
      throw new Error(`Network error: ${error.message}`);
    }
  },

  async createInvestment(
    data: Omit<Investment, 'id' | 'created_at'>
  ): Promise<Investment> {
    try {
      const response = await fetch(`${API_URL}/investments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create investment');
      }

      return response.json();
    } catch (error: any) {
      // Catch network or other errors
      throw new Error(`Network error: ${error.message}`);
    }
  },
};
