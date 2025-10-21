import { ClimateCrisis_400Regular } from '@expo-google-fonts/climate-crisis';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
      ClimateCrisis_400Regular,
    });
  
    if (!fontsLoaded) {
      return null;
    }
  
  useEffect(() => {
    // Hide the splash screen once your app is ready
    // You can add any initialization logic here (fetch data, load fonts, etc.)
    SplashScreen.hideAsync();
  }, []);

  return <Stack />;
}
