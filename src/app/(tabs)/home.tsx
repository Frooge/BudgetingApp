import { Text, View } from "react-native";
import { useFonts } from 'expo-font';
import { ClimateCrisis_400Regular } from '@expo-google-fonts/climate-crisis';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    ClimateCrisis_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

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
              <Text>March 2025</Text>
              <Text>Feb 28 to March 27</Text>
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
