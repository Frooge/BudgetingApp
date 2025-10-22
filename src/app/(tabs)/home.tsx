import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
        <Header title="Home" showBack={false}/>
      {/* <View>
          <Text>Welcome back,</Text>
          <Text>Jade</Text>
      </View> */}
      <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
      >
        <Text
        style={{
          fontFamily: 'ClimateCrisis_400Regular',
          fontSize: 20,
          marginBottom: 10,
        }}
        >
          Budget Plans
        </Text>
        <View>
            <View>
              <Text className="text-lg font-bold">March 2025</Text>
              <Text className="text-sm">Feb 28 to March 27</Text>
            </View>
            <Text>{'>'}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(budget)/new-budget-plan")}
          className="rounded-lg bg-blue-500 px-6 py-3"
        >
          <Text className="font-semibold text-white">Create New Budget Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
