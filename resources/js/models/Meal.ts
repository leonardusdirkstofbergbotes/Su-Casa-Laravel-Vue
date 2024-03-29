export default interface Meal {
    id: string,
    name: string;
    description: string;
    active: boolean;
    activeUntil: string | null;
    dailyCutoffTime: string | null;
    promote: boolean;
    eta: string | null;
    price: string;
    bulkBuyDiscount: number | null;
    bulkBuyPortions: number | null;
    imagePath: string;
    category_ids: string[]
};
