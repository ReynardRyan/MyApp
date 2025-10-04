import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Button, Loading } from '../components';
import { colors } from '../utils';
import { useAuthStore } from '../stores/authStore';
import { useProvinceStore } from '../stores/provinceStore';

const HomeScreen = () => {
  const { userEmail, userToken, logout } = useAuthStore();
  const { provinces, isLoading, error, fetchProvinces, refreshProvinces } = useProvinceStore();

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Error logout:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  const renderProvinceItem = ({ item }: { item: any }) => (
    <View style={styles.provinceItem}>
      <Text style={styles.provinceName}>{item.name}</Text>
      <Text style={styles.provinceId}>ID: {item.id}</Text>
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
        visible={isLoading && provinces.length === 0} 
        text="Loading datas..." 
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Home!</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.infoTitle}>User Information:</Text>
        <Text style={styles.infoText}>Email: {userEmail || 'No email found'}</Text>
      </View>

      <View style={styles.provinceSection}>
        <Text style={styles.sectionTitle}>List of Indonesian Provinces</Text>
        {renderError()}
        {!error && !isLoading && provinces.length === 0 && (
          <Text style={styles.emptyText}>No data found</Text>
        )}
        {!error && provinces.length > 0 && (
          <FlatList
            data={provinces}
            renderItem={renderProvinceItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isLoading && provinces.length > 0}
                onRefresh={refreshProvinces}
                colors={[colors.primary]}
              />
            }
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
          />
        )}
      </View>
      {renderLoading()}

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  userInfo: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  provinceSection: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  flatList: {
    flex: 1,
  },
  provinceItem: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  provinceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  provinceId: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  errorContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
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
  buttonContainer: {
    marginTop: 10,
  },
});


export default HomeScreen;