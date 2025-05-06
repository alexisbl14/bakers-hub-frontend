export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
    expiration_date: string;
    low_stock_threshold: number;
}