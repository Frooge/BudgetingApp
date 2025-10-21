import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen once your app is ready
    // You can add any initialization logic here (fetch data, load fonts, etc.)
    SplashScreen.hideAsync();
  }, []);

  return <Stack />;
}
