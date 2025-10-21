import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  children?: ReactNode;
  inverted?: boolean;
  showBack?: boolean;
}

export default function Header({
  title,
  children,
  inverted = false,
  showBack = true,
}: HeaderProps) {
  const router = useRouter();
  const navigation = useNavigation();

  // Check if there's a previous screen to go back to
  const canGoBack = navigation.canGoBack();

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  return (
    <View className="flex-1">
      {/* Header Section */}
      <View
        className={`px-6 py-4 ${
          inverted ? "bg-blue-300 pt-8 pb-18" : "rounded-b-3xl py-8 bg-blue-300"
        }`}
      >
        {/* Back button and title row */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            {canGoBack && showBack && (
              <Pressable
                onPress={handleBack}
                className="mr-3 rounded-lg p-1"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-lg text-gray-600">{"<"}</Text>
              </Pressable>
            )}
            <Text
              className="flex-1 text-2xl font-bold text-yellow-200 tracking-wider"
              style={{ fontFamily: 'ClimateCrisis_400Regular' }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>

        {/* Children content */}
        {children && <View className="mt-4">{children}</View>}
      </View>

      {/* Crescent white background for inverted design */}
      {inverted && (
        <View className="-mt-6 rounded-t-3xl bg-slate-100 pt-6" />
      )}
    </View>
  );
}
