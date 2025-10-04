
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import LaunchGuide from '@/components/LaunchGuide';

export default function LaunchGuideScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen 
        options={{ 
          title: "Guide de Lancement",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          presentation: 'modal',
        }} 
      />
      <LaunchGuide />
    </SafeAreaView>
  );
}
