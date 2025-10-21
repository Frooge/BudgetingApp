import { useFABStore } from '@/stores/fabStore';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

export default function FAB() {
  const isVisible = useFABStore((state) => state.isVisible);

  if (!isVisible) {
    return null;
  }

  const handlePress = () => {
    // Handle FAB press - add your logic here
    console.log('FAB pressed');
  };

  return (
    <View className="absolute bottom-20 right-6">
      <Pressable
        onPress={handlePress}
        className="h-14 w-14 items-center justify-center rounded-full bg-blue-300 shadow-lg active:bg-blue-500"
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
