export type Todo = {
    id: string;
    user_id: string;
    title: string;
    body?: string;
    created_at: Date;
    completed: boolean;
};