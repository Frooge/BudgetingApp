import { FixedButton, Header } from "@/components";
import { useBudgetPlanStore } from "@/stores/budgetPlanStore";
import { useTransactionStore } from "@/stores/transactionStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NewTransactionScreen() {
    const router = useRouter();
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const budgetPlans = useBudgetPlanStore((state) => state.budgetPlans);

    const [title, setTitle] = useState("");
    const [selectedBudgetPlan, setSelectedBudgetPlan] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [showBudgetPlanDropdown, setShowBudgetPlanDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // Get categories from selected budget plan
    const availableCategories = selectedBudgetPlan
        ? Object.keys(
            budgetPlans.find((plan) => plan.id === selectedBudgetPlan)?.categories || {}
        ).filter(
            (cat) =>
                budgetPlans.find((plan) => plan.id === selectedBudgetPlan)?.categories[cat].selected
        )
        : [];

    const handleSaveTransaction = () => {
        if (!title.trim()) {
            alert("Please enter a transaction title");
            return;
        }
        if (!selectedBudgetPlan) {
            alert("Please select a budget plan");
            return;
        }
        if (!selectedCategory) {
            alert("Please select a category");
            return;
        }
        if (!amount.trim()) {
            alert("Please enter an amount");
            return;
        }

        addTransaction({
            title,
            budgetPlanId: selectedBudgetPlan,
            category: selectedCategory,
            amount,
            description,
        });

        router.back();
    };

    const getBudgetPlanTitle = (id: string | null) => {
        if (!id) return "Select budget plan";
        return budgetPlans.find((plan) => plan.id === id)?.title || "Select budget plan";
    };

    return (
        <View className="flex-1">
            <Header title="New Transaction" showBack />
            <ScrollView className="flex-1 bg-slate-100 p-4 pb-24">
                {/* Title Field */}
                <View className="mb-6">
                    <Text className="mb-2 text-sm font-semibold text-blue-400">Title</Text>
                    <TextInput
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3"
                        placeholder="Adidas Samba"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Budget Plan Dropdown */}
                <View className="mb-6">
                    <Text className="mb-2 text-sm font-semibold text-blue-400">Budget Plan</Text>
                    <TouchableOpacity
                        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
                        onPress={() => setShowBudgetPlanDropdown(!showBudgetPlanDropdown)}
                    >
                        <Text className={selectedBudgetPlan ? "text-gray-800" : "text-gray-400"}>
                            {getBudgetPlanTitle(selectedBudgetPlan)}
                        </Text>
                        <MaterialIcons
                            name={showBudgetPlanDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color="#9ca3af"
                        />
                    </TouchableOpacity>
                    {showBudgetPlanDropdown && (
                        <View className="mt-2 rounded-lg border border-gray-300 bg-white">
                            {budgetPlans.map((plan) => (
                                <TouchableOpacity
                                    key={plan.id}
                                    className="border-b border-gray-200 px-4 py-3 last:border-b-0"
                                    onPress={() => {
                                        setSelectedBudgetPlan(plan.id);
                                        setSelectedCategory(null); // Reset category when budget plan changes
                                        setShowBudgetPlanDropdown(false);
                                    }}
                                >
                                    <Text className="text-gray-800">{plan.title}</Text>
                                </TouchableOpacity>
                            ))}
                            {budgetPlans.length === 0 && (
                                <View className="px-4 py-3">
                                    <Text className="text-gray-400">No budget plans available</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Category Dropdown */}
                <View className="mb-6">
                    <Text className="mb-2 text-sm font-semibold text-blue-400">Category</Text>
                    <TouchableOpacity
                        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
                        onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        disabled={!selectedBudgetPlan}
                    >
                        <Text
                            className={
                                selectedCategory
                                    ? "text-gray-800"
                                    : !selectedBudgetPlan
                                        ? "text-gray-300"
                                        : "text-gray-400"
                            }
                        >
                            {selectedCategory || "Select category"}
                        </Text>
                        <MaterialIcons
                            name={showCategoryDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color={!selectedBudgetPlan ? "#d1d5db" : "#9ca3af"}
                        />
                    </TouchableOpacity>
                    {showCategoryDropdown && selectedBudgetPlan && (
                        <View className="mt-2 rounded-lg border border-gray-300 bg-white">
                            {availableCategories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    className="border-b border-gray-200 px-4 py-3 last:border-b-0"
                                    onPress={() => {
                                        setSelectedCategory(category);
                                        setShowCategoryDropdown(false);
                                    }}
                                >
                                    <Text className="text-gray-800">{category}</Text>
                                </TouchableOpacity>
                            ))}
                            {availableCategories.length === 0 && (
                                <View className="px-4 py-3">
                                    <Text className="text-gray-400">No categories available</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Amount Field */}
                <View className="mb-6">
                    <Text className="mb-2 text-sm font-semibold text-blue-400">Amount</Text>
                    <View className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
                        <Text className="mr-2 text-gray-800">₱</Text>
                        <TextInput
                            className="flex-1"
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>
                </View>

                {/* Description Field */}
                <View className="mb-6">
                    <Text className="mb-2 text-sm font-semibold text-blue-400">Description</Text>
                    <TextInput
                        className="min-h-[100px] rounded-lg border border-gray-300 bg-white px-4 py-3"
                        placeholder="Replacement for old shoes."
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </ScrollView>
            <FixedButton onPress={handleSaveTransaction}>Save</FixedButton>
        </View>
    );
}
