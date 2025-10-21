import { Stack } from "expo-router";
import { FontProvider } from "../components/FontProvider";
import "./global.css";

export default function RootLayout() {
  return (
    <FontProvider>
      <Stack />
    </FontProvider>
  );
}
