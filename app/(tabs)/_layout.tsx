
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration for Shopy Kin e-commerce app
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Accueil', // Home in French for DRC market
    },
    {
      name: 'categories',
      route: '/(tabs)/categories',
      icon: 'square.grid.3x3.fill',
      label: 'Catégories', // Categories in French
    },
    {
      name: 'cart',
      route: '/(tabs)/cart',
      icon: 'cart.fill',
      label: 'Panier', // Cart in French
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Compte', // Account in French
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Accueil</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="categories">
          <Icon sf="square.grid.3x3.fill" drawable="ic_categories" />
          <Label>Catégories</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="cart">
          <Icon sf="cart.fill" drawable="ic_cart" />
          <Label>Panier</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Compte</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={320} />
    </>
  );
}
