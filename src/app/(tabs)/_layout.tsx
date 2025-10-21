import FAB from "@/components/FAB";
import { useFABStore } from "@/stores/fabStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";

export default function TabLayout() {
  const setFABVisible = useFABStore((state) => state.setVisible);

  useFocusEffect(
    useCallback(() => {
      // Show FAB when tab layout is focused
      setFABVisible(true);
      return () => {
        // Hide FAB when navigating away
        setFABVisible(false);
      };
    }, [setFABVisible])
  );

  return (
    <View className="flex-1 bg-slate-100">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <FAB />
    </View>
  );
}
