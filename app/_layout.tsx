
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { Button } from "@/components/button";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useNetworkState } from "expo-network";
import { useColorScheme, Alert, View } from "react-native";
import { Stack, router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SystemBars } from "react-native-edge-to-edge";
import ChatBot from "@/components/ChatBot";
import ChatFAB from "@/components/ChatFAB";
import { colors } from "@/styles/commonStyles";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isConnected } = useNetworkState();
  const colorScheme = useColorScheme();
  const [chatVisible, setChatVisible] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert(
        "Pas de connexion Internet",
        "Veuillez vérifier votre connexion Internet pour utiliser Shopy Kin.",
        [{ text: "OK" }]
      );
    }
  }, [isConnected]);

  if (!loaded) {
    return null;
  }

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WidgetProvider>
        <ThemeProvider value={theme}>
          <SystemBars style="auto" />
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="transparent-modal"
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="formsheet"
                options={{
                  presentation: "formSheet",
                }}
              />
            </Stack>
            
            {/* Chat FAB - Always visible on main screens */}
            <ChatFAB 
              onPress={() => setChatVisible(true)}
              visible={!chatVisible}
            />
            
            {/* Chat Bot Modal */}
            <ChatBot 
              visible={chatVisible}
              onClose={() => setChatVisible(false)}
            />
          </View>
          <StatusBar style="auto" />
        </ThemeProvider>
      </WidgetProvider>
    </GestureHandlerRootView>
  );
}
