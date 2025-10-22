import { Header } from "@/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NewBudgetPlanScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("March 1, 2025");
  const [endDate, setEndDate] = useState("April 15, 2025");
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({
    Shopping: false,
    Food: false,
    Savings: false,
    Health: false,
    Beauty: false,
    Grocery: false,
  });
  const [categoryAmounts, setCategoryAmounts] = useState<{ [key: string]: string }>({
    Shopping: "",
    Food: "",
    Savings: "",
    Health: "",
    Beauty: "",
    Grocery: "",
  });

  const accounts = ["PayMaya", "Account 2"];
  const categories = ["Shopping", "Food", "Savings", "Health", "Beauty", "Grocery"];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleAmountChange = (category: string, amount: string) => {
    setCategoryAmounts((prev) => ({
      ...prev,
      [category]: amount,
    }));
  };

  return (
    <View>
      <Header title="New Budget Plan" showBack />
      <ScrollView className="flex-1 bg-slate-100 p-4">
        {/* Title Field */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-700">Title</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3"
            placeholder="Enter budget plan title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Time Period */}
        <View className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-gray-700">Time Period</Text>
          <View className="flex-row items-center justify-between rounded-lg bg-white p-3">
            <TextInput
              className="flex-1"
              placeholder="Start date"
              value={startDate}
              onChangeText={setStartDate}
            />
            <Text className="mx-2 text-gray-600">to</Text>
            <TextInput
              className="flex-1"
              placeholder="End date"
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-gray-700">Categories</Text>
          <View className="rounded-lg bg-white p-4">
            {categories.map((category) => (
              <View key={category} className="mb-4">
                <View className="mb-2 flex-row items-center">
                  <TouchableOpacity onPress={() => handleCategoryToggle(category)}>
                    <MaterialIcons
                      name={selectedCategories[category] ? "check-box" : "check-box-outline-blank"}
                      size={20}
                      color={selectedCategories[category] ? "#3b82f6" : "#d1d5db"}
                    />
                  </TouchableOpacity>
                  <Text className="ml-3 text-gray-800">{category}</Text>
                </View>
                {selectedCategories[category] && (
                  <View className="ml-8 flex-row items-center">
                    <Text className="text-gray-600">₱</Text>
                    <TextInput
                      className="ml-2 flex-1 rounded border border-gray-300 px-3 py-2"
                      placeholder="0.00"
                      keyboardType="decimal-pad"
                      value={categoryAmounts[category]}
                      onChangeText={(value) => handleAmountChange(category, value)}
                    />
                  </View>
                )}
              </View>
            ))}
            <TouchableOpacity className="mt-4 flex-row items-center pt-2">
              <Text className="text-lg text-blue-500">+</Text>
              <Text className="ml-2 text-blue-500">New Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
