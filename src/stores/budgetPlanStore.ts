import { fetchMockBudgetPlans } from '@/app/services/budgetPlanMock';
import { BudgetPlan } from '@/types/budgetPlan';
import { create } from 'zustand';

interface BudgetPlanStore {
    budgetPlans: BudgetPlan[];
    isLoading: boolean;
    error: string | null;
    fetchBudgetPlans: () => Promise<void>;
    addBudgetPlan: (plan: Omit<BudgetPlan, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateBudgetPlan: (id: string, plan: Partial<BudgetPlan>) => void;
    deleteBudgetPlan: (id: string) => void;
    getBudgetPlan: (id: string) => BudgetPlan | undefined;
    getBudgetPlans: () => BudgetPlan[];
}

export const useBudgetPlanStore = create<BudgetPlanStore>((set, get) => ({
    budgetPlans: [],
    isLoading: false,
    error: null,

    fetchBudgetPlans: async () => {
        set({ isLoading: true, error: null });
        try {
            const plans = await fetchMockBudgetPlans();
            set({ budgetPlans: plans, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch budget plans',
                isLoading: false
            });
        }
    },

    addBudgetPlan: (plan) =>
        set((state) => ({
            budgetPlans: [
                ...state.budgetPlans,
                {
                    ...plan,
                    id: Date.now().toString(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        })),

    updateBudgetPlan: (id, updatedPlan) =>
        set((state) => ({
            budgetPlans: state.budgetPlans.map((plan) =>
                plan.id === id
                    ? { ...plan, ...updatedPlan, updatedAt: new Date() }
                    : plan
            ),
        })),

    deleteBudgetPlan: (id) =>
        set((state) => ({
            budgetPlans: state.budgetPlans.filter((plan) => plan.id !== id),
        })),

    getBudgetPlan: (id) => get().budgetPlans.find((plan) => plan.id === id),

    getBudgetPlans: () => get().budgetPlans,
}));;
