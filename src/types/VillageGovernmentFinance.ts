export interface VillageGovernmentFinance {
    id: number;
    name: string;
    type: 'income' | 'expenditure';
    amount: number;
}
