export default interface Category {
    id: number;
    name: string;
    description: string;
    imagePath: string | null;
    active: boolean;
    activeUntil: string | null;
    dailyCutoffTime: string | null;
    promote: boolean;
};
