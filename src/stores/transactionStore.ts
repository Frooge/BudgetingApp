import { fetchMockTransactions } from '@/app/services/transactionsMock';
import { Transaction } from '@/types/transaction';
import { create } from 'zustand';

interface TransactionStore {
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
    fetchTransactions: () => Promise<void>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    getTransaction: (id: string) => Transaction | undefined;
    getTransactions: () => Transaction[];
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
    transactions: [],
    isLoading: false,
    error: null,

    fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        try {
            const transactions = await fetchMockTransactions();
            set({ transactions, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch transactions',
                isLoading: false
            });
        }
    },

    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [
                ...state.transactions,
                {
                    ...transaction,
                    id: Date.now().toString(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        })),

    updateTransaction: (id, updatedTransaction) =>
        set((state) => ({
            transactions: state.transactions.map((transaction) =>
                transaction.id === id
                    ? { ...transaction, ...updatedTransaction, updatedAt: new Date() }
                    : transaction
            ),
        })),

    deleteTransaction: (id) =>
        set((state) => ({
            transactions: state.transactions.filter((transaction) => transaction.id !== id),
        })),

    getTransaction: (id) => get().transactions.find((transaction) => transaction.id === id),

    getTransactions: () => get().transactions,
}));
