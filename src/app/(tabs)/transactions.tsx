import { Header } from "@/components";
import { useDateFormatter } from "@/hooks";
import { useTransactionStore } from "@/stores";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function TransactionsScreen() {
  const { transactions, isLoading, fetchTransactions } = useTransactionStore();
  const { formatDateSection } = useDateFormatter();

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const dateKey = formatDateSection(transaction.createdAt);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
      return groups;
    },
    {} as Record<string, typeof transactions>
  );

  // Sort groups by date (most recent first)
  const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => {
    if (a === "TODAY") return -1;
    if (b === "TODAY") return 1;
    if (a === "YESTERDAY") return -1;
    if (b === "YESTERDAY") return 1;

    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  if (isLoading) {
    return (
      <View className="flex-1">
        <Header title="Transactions" />
        <View className="flex-1 items-center justify-center bg-slate-100">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Header title="Transactions" />
      <ScrollView className="flex-1 bg-slate-100 px-4 py-6 pb-[80px]">
        {sortedDateKeys.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-400">No transactions yet</Text>
          </View>
        ) : (
          sortedDateKeys.map((dateKey) => (
            <View key={dateKey} className="mb-6">
              {/* Date Section Header */}
              <Text className="mb-3 text-xs font-semibold text-gray-500">
                {dateKey}
              </Text>

              {/* Transactions for this date */}
              <View className="rounded-lg bg-white">
                {groupedTransactions[dateKey].map((transaction, index) => (
                  <View
                    key={transaction.id}
                    className={`flex-row items-center justify-between px-4 py-4 ${index !== groupedTransactions[dateKey].length - 1
                      ? "border-b border-gray-100"
                      : ""
                      }`}
                  >
                    <Text className="flex-1 text-gray-800">{transaction.title}</Text>
                    <Text className="ml-4 font-semibold text-red-500">
                      -₱{parseFloat(transaction.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
