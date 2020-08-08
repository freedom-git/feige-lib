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
        PHP: '₱',
    };
    UPPER_LIMIT = {
        WAITER_NUM: 10,
        CHEF_NUM: 5,
        DISH_PRICE: 10000,
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
        MULTI_LANGUAGE: {
            ID: 'multiLanguage',
            PRICE: 100,
            NAME: '多语言支持(标准版)',
        },
        SUPER_MULTI_LANGUAGE: {
            ID: 'superMultiLanguage',
            PRICE: 500,
            NAME: '多语言支持(无限版)',
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
        {
            name: '漢語',
            img: '',
            code: 'zh-tw',
        },
        {
            name: 'Español',
            img: '',
            code: 'es',
        },
        {
            name: '日本語',
            img: '',
            code: 'ja',
        },
        {
            name: '한국어',
            img: '',
            code: 'ko',
        },
        {
            name: 'Português',
            img: '',
            code: 'pt',
        },
        {
            name: 'Français',
            img: '',
            code: 'fr',
        },
        {
            name: 'Italiano',
            img: '',
            code: 'it',
        },
        {
            name: 'ئۇيغۇرچە',
            img: '',
            code: 'ug',
        },
    ];
    INIT_LANGUAGE = 'zh';
    DEFALUT_LANGUAGE = 'en';
    CUSTOM_HEADERS = {
        GEPHENOM_APP_ADMIN_CONTENT_VERSION: 'Gephenom-App-Admin-Content-Version',
        GEPHENOM_H5_CLIENT_VERSION: 'Gephenom-H5-Client-Version',
    };
    SOCKET_CHANNEL = {
        ORDER: 'order',
    };
    ORDER_EVENT = {
        CREATE: 'create',
        ABANDON: 'abandon',
        CHECKOUT: 'checkout',
        REFUND: 'refund',
        RETREAT: 'retreat',
        FINISH: 'finish',
        APPEND: 'append',
        CONFIRM: 'confirm',
        DELIVER: 'deliver',
        DELIVER_FINISHED: 'deliverFinished',
        FAKE_DELIVER_FINISHED: 'fakeFeliverFinished',
        CALL: 'call',
        CALL_FINISHED: 'callFinished',
        APPEND_CONFIRM: 'appendConfirm',
        APPEND_ABANDON: 'appendAbandon',
        CLEAN_FINISHED: 'cleanFinished',
        DISH_FINISHED: 'dishFinished',
        PRINT_FINISHED: 'printFinished',
        CHANGE_ORDER_OPERATOR: 'changeOrderOperator',
        CHANGE_TABLE: 'changeTable',
        WAITER_OFFLINE_CHANGE_ORDER_OPERATOR: 'waiterOfflineChangeOrderOperator', // 该动作会触发多次，通常保持静默
        WAITER_OFFLINE_CHANGE_ORDER_OPERATOR_FINISHED: 'waiterOfflineChangeOrderOperatorFinished',
        WAITER_ONLINE_CHANGE_ORDER_OPERATOR_FINISHED: 'waiterOnlineChangeOrderOperatorFinished',
    };
}

export const CONST = new Const();
