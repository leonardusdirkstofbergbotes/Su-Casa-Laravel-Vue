export default interface Category {
    id: number;
    name: string;
    description: string;
    imagePath: string | null;
    active: boolean;
    activeUntil: string;
    dailyCutoffTime: string;
    promote: boolean;
};
