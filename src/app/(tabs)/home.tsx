import Header from "@/components/Header";
import { useBudgetPlanStore } from "@/stores/budgetPlanStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { budgetPlans, isLoading, error, fetchBudgetPlans } = useBudgetPlanStore();

  useEffect(() => {
    fetchBudgetPlans();
  }, []);

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} to ${endDay}`;
    }
    return `${startMonth} ${startDay} to ${endMonth} ${endDay}`;
  };

  return (
    <View className="flex-1">
      <Header title="Welcome Back" showBack={false} inverted />

      <ScrollView className="flex-1 px-4 pt-6">
        <Text
          style={{ fontFamily: 'ClimateCrisis_400Regular' }}
          className="text-yellow-200 text-2xl mb-4 text-center"
        >
          Budget Plans
        </Text>

        {isLoading ? (
          <View className="py-8 items-center">
            <ActivityIndicator size="large" color="#60A5FA" />
          </View>
        ) : error ? (
          <View className="py-4">
            <Text className="text-red-500 text-center">{error}</Text>
          </View>
        ) : (
          <View className="gap-3 mb-4">
            {budgetPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                onPress={() => router.push(`/(budget)/budget-plan?id=${plan.id}`)}
                className="bg-gray-200 rounded-lg p-4 flex-row justify-between items-center min-h-[80px]"
              >
                <View>
                  <Text className="text-lg font-semibold text-gray-800 mb-1">
                    {plan.title}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {formatDateRange(plan.startDate, plan.endDate)}
                  </Text>
                </View>
                <Text className="text-xl">{'>'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push("/(budget)/new-budget-plan")}
          className="flex-row items-center justify-center py-4 bg-gray-200 rounded-lg p-4 min-h-[80px]"
        >
          <Text className="text-gray-400 text-base font-medium">+ New Budget Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
