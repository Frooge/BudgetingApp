import { Transaction } from '@/types/transaction';

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        title: 'Grocery Shopping',
        budgetPlanId: '1',
        category: 'groceries',
        amount: '150.50',
        description: 'Weekly grocery shopping at the supermarket',
        createdAt: new Date('2025-03-05'),
        updatedAt: new Date('2025-03-05'),
    },
    {
        id: '2',
        title: 'Taxi Ride',
        budgetPlanId: '1',
        category: 'transport',
        amount: '45.00',
        description: 'Taxi from home to office',
        createdAt: new Date('2025-03-10'),
        updatedAt: new Date('2025-03-10'),
    },
    {
        id: '3',
        title: 'Movie Night',
        budgetPlanId: '1',
        category: 'entertainment',
        amount: '75.00',
        description: 'Cinema tickets and snacks',
        createdAt: new Date('2025-03-12'),
        updatedAt: new Date('2025-03-12'),
    },
    {
        id: '4',
        title: 'Hotel Booking',
        budgetPlanId: '2',
        category: 'accommodation',
        amount: '1200.00',
        description: 'Marina Bay Sands Hotel - 4 nights',
        createdAt: new Date('2025-04-01'),
        updatedAt: new Date('2025-04-01'),
    },
    {
        id: '5',
        title: 'Lunch at Hawker Center',
        budgetPlanId: '2',
        category: 'food',
        amount: '25.00',
        description: 'Delicious local food at Maxwell Food Centre',
        createdAt: new Date('2025-04-02'),
        updatedAt: new Date('2025-04-02'),
    },
    {
        id: '6',
        title: 'Gardens by the Bay',
        budgetPlanId: '2',
        category: 'activities',
        amount: '80.00',
        description: 'Entrance tickets for Cloud Forest and Flower Dome',
        createdAt: new Date('2025-04-03'),
        updatedAt: new Date('2025-04-03'),
    },
    {
        id: '7',
        title: 'MRT Card',
        budgetPlanId: '2',
        category: 'transport',
        amount: '50.00',
        description: 'Tourist MRT pass for public transportation',
        createdAt: new Date('2025-04-01'),
        updatedAt: new Date('2025-04-01'),
    },
];

export const fetchMockTransactions = (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTransactions);
        }, 500); // Simulate network delay
    });
};
