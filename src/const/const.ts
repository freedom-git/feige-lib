class Const {
    ROLE = {
        MANAGER: 'manager',
        WAITER: 'waiter',
        CHEF: 'chef',
    };
    TASK_TYPE = {
        CHECK: 'check',
        DELIVER: 'deliver',
        CALL: 'call',
        CLEAN: 'clean',
        APPEND: 'append',
    };
    CHECKOUT_TYPE = {
        CASH: 'cash',
        MYQR: 'myqr', //商家自备收费二维码
    };
    RECEIVABLE_PROCESSING_TYPE = {
        // 收款处理类型
        REMOVE_TAILS: 'remove-tails', // 抹零
    };
    STORE_TYPE = {
        STALL: 'stall',
        RESTAURANT: 'restaurant',
    };
    STATUS = {
        PENDING: 'pending',
        FINISHED: 'finished',
        PROCESSING: 'processing',
        CANCELLED: 'cancelled',
    };
    CODE = {
        ERROR: -1,
        MEMBER_LEVEL_ERROR: -2,
    };
    FARE_TYPE = {
        FIXED: 'fixed',
        PERCENTAGE: 'percentage',
    };
    ENV = {
        DEV: 'dev',
        TEST: 'test',
        CANARY: 'canary',
        PRODUCTION: 'production',
    };
}

export const CONST = new Const();
