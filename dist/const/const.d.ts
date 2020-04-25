declare class Const {
    ROLE: {
        MANAGER: string;
        WAITER: string;
        CHEF: string;
    };
    TASK_TYPE: {
        CHECK: string;
        DELIVER: string;
        CALL: string;
        CLEAN: string;
        APPEND: string;
    };
    CHECKOUT_TYPE: {
        CASH: string;
        MYQR: string;
    };
    RECEIVABLE_PROCESSING_TYPE: {
        REMOVE_TAILS: string;
    };
    STORE_TYPE: {
        STALL: string;
        RESTAURANT: string;
    };
    STATUS: {
        PENDING: string;
        FINISHED: string;
        PROCESSING: string;
        CANCELLED: string;
    };
    CODE: {
        ERROR: number;
        MEMBER_LEVEL_ERROR: number;
    };
    FARE_TYPE: {
        FIXED: string;
        PERCENTAGE: string;
    };
    ENV: {
        DEV: string;
        TEST: string;
        CANARY: string;
        PRODUCTION: string;
    };
}
export declare const CONST: Const;
export {};
