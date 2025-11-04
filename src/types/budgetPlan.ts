export interface BudgetPlan {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    selectedAccount: string | null;
    categories: {
        [key: string]: {
            selected: boolean;
            amount: string;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}
