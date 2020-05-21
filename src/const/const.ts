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
        CASH: {
            TYPE: 'cash',
            TEXT: '现金',
        },
        MYQR: {
            TYPE: 'myqr',
            TEXT: '商家收款码',
        },
    };
    RECEIVABLE_PROCESSING_TYPE = {
        REMOVE_TAILS: {
            TEXT: '抹零',
            TYPE: 'remove_tails',
            SORT: -1000,
        },
        DISCOUNT: {
            TEXT: '打折',
            TYPE: 'discount',
            SORT: 0,
        },
        MARKDOWN: {
            TEXT: '让价',
            TYPE: 'markdown',
            SORT: 0,
        },
    };
    STORE_TYPE = {
        BASE: 'base',
        KDS: 'kds',
    };
    STORE_TYPE_TEXT = {
        base: '基础模式',
        kds: '厨显模式',
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
    CURRENCY_SYMBOL = {
        RMB: '¥',
        USD: '$',
        EUR: '€',
    };
}

export const CONST = new Const();
