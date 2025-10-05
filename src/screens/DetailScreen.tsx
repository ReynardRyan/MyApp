import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Button, Loading } from '../components';
import { colors } from '../utils';
import { useRegencyStore } from '../stores/regencyStore';
import { useNavigation, useRoute } from '@react-navigation/native';

interface RouteParams {
  provinceId: string;
  provinceName: string;
}

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { provinceId, provinceName } = route.params as RouteParams;
  
  const { 
    regencies, 
    isLoading, 
    error, 
    currentProvinceName,
    fetchRegencies, 
    clearRegencies 
  } = useRegencyStore();

  useEffect(() => {
    fetchRegencies(provinceId, provinceName);
    
    return () => {
      clearRegencies();
    };
  }, [provinceId, provinceName]);

  const handleRefresh = async () => {
    await fetchRegencies(provinceId, provinceName);
  };

  const renderRegencyItem = ({ item }: { item: any }) => (
    <View style={styles.regencyItem}>
      <Text style={styles.regencyName}>{item.name}</Text>
      <Text style={styles.regencyId}>ID: {item.id}</Text>
    </View>
  );

  const renderError = () => {
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  };

  const renderLoading = () => {
    return (
      <Loading 
        visible={isLoading && regencies.length === 0} 
        text="Loading datas..." 
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Kabupaten/Kota</Text>
        <Text style={styles.subtitle}>{currentProvinceName || provinceName}</Text>
      </View>

      <View style={styles.regencySection}>
        {renderError()}
        {!error && !isLoading && regencies.length === 0 && (
          <Text style={styles.emptyText}>Tidak ada data kabupaten/kota</Text>
        )}
        {!error && regencies.length > 0 && (
          <FlatList
            data={regencies}
            renderItem={renderRegencyItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isLoading && regencies.length > 0}
                onRefresh={handleRefresh}
                colors={[colors.primary]}
              />
            }
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
          />
        )}
      </View>
      {renderLoading()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  regencySection: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  regencyItem: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  regencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  regencyId: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default DetailScreen;