export default interface Category {
    id: string;
    link: string;
    name: string;
    description: string;
    imagePath: string | null;
    active: boolean;
    activeUntil: string | null;
    dailyCutoffTime: string | null;
    promote: boolean;
};
