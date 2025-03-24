import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeDemo } from '@/components/ui/ThemeDemo';
import { SPACING } from '@/constants/theme';

export default function ThemeDemoScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Theme Demo',
          headerShown: true,
        }}
      />
      <Text style={styles.heading}>Goldfisch-App Theme Demo</Text>
      <ThemeDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
});
