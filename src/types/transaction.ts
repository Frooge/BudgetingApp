export interface Transaction {
    id: string;
    title: string;
    budgetPlanId: string;
    category: string;
    amount: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
