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
    // TODO:兼容1.9.X 后期删除
    STORE_TYPE = {
        BASE: 'base',
        KDS: 'kds',
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
    UPPER_LIMIT = {
        WAITER_NUM: 10,
        CHEF_NUM: 5,
    };
    BUSINESS = {
        BASE: {
            ID: 'base',
            PRICE: 15,
            NAME: '核心功能',
            PERMANENT_PRICE: 500,
        },
        WAITER: {
            ID: 'waiter',
            PRICE: 10,
            NAME: '服务员功能',
            PERMANENT_PRICE: 300,
        },
        KDS: {
            ID: 'kds',
            PRICE: 15,
            NAME: '后厨显示功能',
            PERMANENT_PRICE: 500,
        },
        // BASE_TAKEAWAY: {
        //     ID: 'baseTakeaway',
        //     PRICE: 0.02,
        //     NAME: '基础外卖功能',
        // },
    };
    PROBATION = 1; // 公共试用期，当具体模块下没有该字段时，取这里的数据，单位：月
    LANGUAGE = [
        {
            name: '汉语',
            img: '',
            code: 'zh',
        },
        {
            name: 'English',
            img: '',
            code: 'en',
        },
    ];
}

export const CONST = new Const();
