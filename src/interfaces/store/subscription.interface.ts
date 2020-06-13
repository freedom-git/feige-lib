export interface Subscription {
    package: {
        level: number;
        expires: Date | string;
    };
}
