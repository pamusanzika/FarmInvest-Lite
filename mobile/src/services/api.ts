import { Investment } from '../types';

// IMPORTANT: Replace with your machine's IP address for device testing
// Find your IP: Mac/Linux: ifconfig | grep "inet ", Windows: ipconfig
const API_URL = 'http://localhost:3000/api';

export const investmentService = {
  async getInvestments(): Promise<Investment[]> {
    const response = await fetch(`${API_URL}/investments`);
    if (!response.ok) {
      throw new Error('Failed to fetch investments');
    }
    return response.json();
  },

  async createInvestment(data: Omit<Investment, 'id' | 'created_at'>): Promise<Investment> {
    const response = await fetch(`${API_URL}/investments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create investment');
    }

    return response.json();
  },
};
