export default interface Category {
    name: string;
    description: string;
    imagePath: string;
    price: string;
    active: boolean;
    activeUntil: string | null;
    dailyCutoffTime: string | null;
    bulkBuyDiscount: number | null;
    bulkBuyPortions: string | null;
    eta: string | null;
    promote: boolean;
};
