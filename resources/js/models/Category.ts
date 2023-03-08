export default interface Category {
    link: string;
    name: string;
    description: string;
    imagePath: string | null;
    active: boolean;
    activeUntil: string | null;
    dailyCutoffTime: string | null;
    promote: boolean;
};
