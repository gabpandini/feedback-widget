export interface FeedbackCreateData {
    type: string;
    screenshot?: string;
    comment: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}