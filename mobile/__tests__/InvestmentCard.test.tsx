import React from 'react';
import { render } from '@testing-library/react-native';
import InvestmentCard from '../src/components/InvestmentCard';
import { Investment } from '../src/types';

describe('InvestmentCard', () => {
  const mockInvestment: Investment = {
    id: 1,
    farmer_name: 'John Doe',
    crop: 'Wheat',
    amount: 5000,
    created_at: '2025-01-01T10:00:00.000Z',
  };

  it('renders investment details correctly', () => {
    const { getByText } = render(<InvestmentCard investment={mockInvestment} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Wheat')).toBeTruthy();
    expect(getByText('$5,000')).toBeTruthy();
  });

  it('shows "Saving..." for optimistic updates', () => {
    const optimisticInvestment: Investment = {
      ...mockInvestment,
      optimistic: true,
    };

    const { getByText } = render(
      <InvestmentCard investment={optimisticInvestment} />
    );

    expect(getByText('Saving...')).toBeTruthy();
  });

  it('formats currency without decimals', () => {
    const { getByText } = render(<InvestmentCard investment={mockInvestment} />);
    
    expect(getByText('$5,000')).toBeTruthy();
  });
});
