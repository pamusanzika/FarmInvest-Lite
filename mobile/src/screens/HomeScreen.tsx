import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Investment, InvestmentFormData } from '../types';
import { investmentService } from '../services/api';
import InvestmentList from '../components/InvestmentList';
import CreateInvestmentModal from '../components/CreateInvestmentModal';

export default function HomeScreen() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchInvestments = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await investmentService.getInvestments();
      setInvestments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchInvestments();
  }, [fetchInvestments]);

  const handleCreateInvestment = async (formData: InvestmentFormData) => {
    setSubmitting(true);

    const optimisticInvestment: Investment = {
      id: `temp-${Date.now()}`,
      farmer_name: formData.farmer_name,
      crop: formData.crop,
      amount: parseFloat(formData.amount),
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    setInvestments((prev) => [optimisticInvestment, ...prev]);
    setShowModal(false);

    try {
      const newInvestment = await investmentService.createInvestment({
        farmer_name: formData.farmer_name,
        crop: formData.crop,
        amount: parseFloat(formData.amount),
      });

      setInvestments((prev) =>
        prev.map((inv) =>
          inv.id === optimisticInvestment.id ? newInvestment : inv
        )
      );
    } catch (err) {
      setInvestments((prev) =>
        prev.filter((inv) => inv.id !== optimisticInvestment.id)
      );
      Alert.alert(
        'Error',
        err instanceof Error ? err.message : 'Failed to create investment'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading investments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Failed to Load</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchInvestments()}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>FarmInvest Lite</Text>
          <Text style={styles.subtitle}>Track your agricultural investments</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <InvestmentList
        investments={investments}
        refreshing={refreshing}
        onRefresh={() => fetchInvestments(true)}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌾</Text>
            <Text style={styles.emptyTitle}>No Investments Yet</Text>
            <Text style={styles.emptyMessage}>
              Start by creating your first investment
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.emptyButtonText}>Create Investment</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <CreateInvestmentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateInvestment}
        submitting={submitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f0fdf4',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  addButton: {
    backgroundColor:'#10b981',
paddingHorizontal: 20,
paddingVertical: 10,
borderRadius: 12,
},
addButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: '600',
},
emptyState: {
alignItems: 'center',
paddingVertical: 64,
},
emptyIcon: {
fontSize: 64,
marginBottom: 16,
},
emptyTitle: {
fontSize: 20,
fontWeight: '700',
color: '#111827',
marginBottom: 8,
},
emptyMessage: {
fontSize: 16,
color: '#6b7280',
marginBottom: 24,
},
emptyButton: {
backgroundColor: '#10b981',
paddingHorizontal: 24,
paddingVertical: 12,
borderRadius: 12,
},
emptyButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: '600',
},
});
