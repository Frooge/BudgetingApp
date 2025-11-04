import { Stack } from "expo-router";
import { FontProvider } from "../components/FontProvider";
import "./global.css";

export default function RootLayout() {
  return (
    <FontProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(budget)"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(transaction)"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </FontProvider>
  );
}
