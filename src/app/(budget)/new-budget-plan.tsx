import { FixedButton, Header } from "@/components";
import { useBudgetPlanStore } from "@/stores/budgetPlanStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NewBudgetPlanScreen() {
  const router = useRouter();
  const addBudgetPlan = useBudgetPlanStore((state) => state.addBudgetPlan);
  const [title, setTitle] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
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

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleSaveBudgetPlan = () => {
    if (!title.trim()) {
      alert("Please enter a budget plan title");
      return;
    }

    const categoriesData = categories.reduce(
      (acc, category) => ({
        ...acc,
        [category]: {
          selected: selectedCategories[category],
          amount: categoryAmounts[category],
        },
      }),
      {}
    );

    addBudgetPlan({
      title,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      selectedAccount,
      categories: categoriesData,
    });

    router.back();
  };

  return (
    <View className="flex-1">
      <Header title="New Budget Plan" showBack />
      <ScrollView className="flex-1 bg-slate-100 p-4 pb-24">
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
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2"
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text className={startDate ? "text-gray-800" : "text-gray-400"}>
                {formatDate(startDate) || "Start date"}
              </Text>
            </TouchableOpacity>
            <Text className="mx-2 text-gray-600">to</Text>
            <TouchableOpacity
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2"
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text className={endDate ? "text-gray-800" : "text-gray-400"}>
                {formatDate(endDate) || "End date"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Pickers */}
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleStartDateChange}
            />
          )}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleEndDateChange}
            />
          )}
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-gray-700">Categories</Text>
          <View className="p-4">
            {categories.map((category) => (
              <View key={category} className="mb-4">
                <View className="flex-row items-center">
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
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-lg text-blue-500">+</Text>
              <Text className="ml-2 text-blue-500">New Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <FixedButton onPress={handleSaveBudgetPlan}>Save</FixedButton>
    </View>
  );
}
