import { Text, View } from "react-native";

export default function HomeScreen() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <View> 
          <Text>Welcome back,</Text>
          <Text>Jade</Text>
      </View> */}
      <View>
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
        {/* <View>
          <Text>+</Text>
        </View> */}
      </View>
    </View>
  );
}
