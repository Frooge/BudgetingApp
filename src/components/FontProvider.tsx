import { ClimateCrisis_400Regular } from '@expo-google-fonts/climate-crisis';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ReactNode, useEffect } from 'react';

interface FontProviderProps {
  children: ReactNode;
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const FontProvider = ({ children }: FontProviderProps) => {
  const [fontsLoaded] = useFonts({
    ClimateCrisis_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
};
