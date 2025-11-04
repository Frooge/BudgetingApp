import { BudgetPlan } from '@/types/budgetPlan';

export const mockBudgetPlans: BudgetPlan[] = [
    {
        id: '1',
        title: 'March 2025',
        startDate: '2025-02-28',
        endDate: '2025-03-27',
        selectedAccount: 'Main Account',
        categories: {
            groceries: {
                selected: true,
                amount: '500',
            },
            transport: {
                selected: true,
                amount: '200',
            },
            entertainment: {
                selected: true,
                amount: '150',
            },
        },
        createdAt: new Date('2025-02-20'),
        updatedAt: new Date('2025-02-20'),
    },
    {
        id: '2',
        title: 'Singapore Trip',
        startDate: '2025-04-01',
        endDate: '2025-04-09',
        selectedAccount: 'Travel Account',
        categories: {
            accommodation: {
                selected: true,
                amount: '1200',
            },
            food: {
                selected: true,
                amount: '800',
            },
            activities: {
                selected: true,
                amount: '600',
            },
            transport: {
                selected: true,
                amount: '400',
            },
        },
        createdAt: new Date('2025-03-15'),
        updatedAt: new Date('2025-03-15'),
    },
];

export const fetchMockBudgetPlans = (): Promise<BudgetPlan[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockBudgetPlans);
        }, 500); // Simulate network delay
    });
};
