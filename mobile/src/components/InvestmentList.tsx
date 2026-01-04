import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { Investment } from '../types';
import InvestmentCard from './InvestmentCard';

interface Props {
  investments: Investment[];
  refreshing: boolean;
  onRefresh: () => void;
  ListEmptyComponent?: React.ReactElement;
}

export default function InvestmentList({ 
  investments, 
  refreshing, 
  onRefresh,
  ListEmptyComponent 
}: Props) {
  return (
    <FlatList
      data={investments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <InvestmentCard investment={item} />}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#10b981"
          colors={['#10b981']}
        />
      }
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});