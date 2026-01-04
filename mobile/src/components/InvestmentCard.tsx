import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Investment } from '../types';

interface Props {
  investment: Investment;
}

export default function InvestmentCard({ investment }: Props) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={[styles.card, investment.optimistic && styles.optimistic]}>
      <View style={styles.header}>
        <View style={styles.leftColumn}>
          <Text style={styles.farmerName}>{investment.farmer_name}</Text>
          <Text style={styles.date}>{formatDate(investment.created_at)}</Text>
        </View>
        <Text style={styles.amount}>{formatCurrency(investment.amount)}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{investment.crop}</Text>
        </View>
        {investment.optimistic && (
          <Text style={styles.savingText}>Saving...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optimistic: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  leftColumn: {
    flex: 1,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10b981',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065f46',
  },
  savingText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});