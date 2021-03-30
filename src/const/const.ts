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
        WECHAT: {
            TYPE: 'wechat',
            TEXT: '微信',
        },
        ALIPAY: {
            TYPE: 'alipay',
            TEXT: '支付宝',
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
        PAYING: 'paying',
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
        VND: 'đ',
    };
    UPPER_LIMIT = {
        WAITER_NUM: 10,
        CHEF_NUM: 5,
        DISH_PRICE: 5000000,
        DISH_NAME_MAX_LENGTH: 30,
        STORE_NAME_MAX_LENGTH: 30,
        TAKEOUT_STARTING_PRICE: 10000000,
        TAKEOUT_DELIVERY_FEE: 10000000,
        MEMBER_SAVING_RULE_DESCRIPTION_MAX_LENGTH: 50,
        MEMBER_NAME_MAX_LENGTH: 30,
        MEMBER_NOTE_MAX_LENGTH: 200,
        MEMBER_TRANSACTION_NOTE_MAX_LENGTH: 200,
    };
    BUSINESS = {
        BASE: {
            ID: 'base',
            NAME: '点餐收银',
        },
        WAITER: {
            ID: 'waiter',
            NAME: '服务员功能',
        },
        KDS: {
            ID: 'kds',
            NAME: '后厨显示功能',
        },
        MULTI_LANGUAGE: {
            ID: 'multiLanguage',
            NAME: '多语言支持(标准版)',
        },
        SUPER_MULTI_LANGUAGE: {
            ID: 'superMultiLanguage',
            NAME: '多语言支持(无限版)',
        },
        // BASE_TAKEAWAY: {
        //     ID: 'baseTakeaway',
        //     NAME: '基础外卖功能',
        // },
    };
    PROBATION = 10; // 公共试用期，当具体模块下没有该字段时，取这里的数据，单位：日
    LANGUAGE = [
        {
            name: '汉语',
            img: '',
            code: 'zh',
            speechCode: 'zh-CN',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
        },
        {
            name: 'English',
            img: '',
            code: 'en',
            speechCode: 'en-US',
            printCode: 'cp936',
            dateFormat: 'DAY_MONTH_YEAR',
        },
        {
            name: '漢語',
            img: '',
            code: 'zh-tw',
            speechCode: 'zh-tw',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
        },
        {
            name: 'Español',
            img: '',
            code: 'es',
            speechCode: 'es-ES',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
        },
        {
            name: '日本語',
            img: '',
            code: 'ja',
            speechCode: 'ja-JP',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
        },
        {
            name: '한국어',
            img: '',
            code: 'ko',
            speechCode: 'ko-KR',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
        },
        {
            name: 'Português',
            img: '',
            code: 'pt',
            speechCode: 'pt-PT',
            printCode: 'cp936',
            dateFormat: 'DAY_MONTH_YEAR',
        },
        {
            name: 'Français',
            img: '',
            code: 'fr',
            speechCode: 'fr-FR',
            printCode: 'cp936',
            dateFormat: 'DAY_MONTH_YEAR',
        },
        {
            name: 'Italiano',
            img: '',
            code: 'it',
            speechCode: 'it-IT',
            printCode: 'cp936',
            dateFormat: 'DAY_MONTH_YEAR',
        },
        {
            name: 'ئۇيغۇرچە',
            img: '',
            code: 'ug',
            speechCode: 'ug-CN',
            printCode: 'img',
            fontFamily: 'UG',
            dateFormat: 'YEAR_MONTH_DAY',
        },
        {
            name: 'Tiếng Việt',
            img: '',
            code: 'vi',
            speechCode: 'vi-VN',
            printCode: 'img',
            dateFormat: 'DAY_MONTH_YEAR',
        },
    ];
    DATE_FORMAT = {
        YEAR_MONTH_DAY: {
            dateTime: 'YYYY-MM-DD HH:mm:ss',
            date: 'YYYY-MM-DD',
        },
        DAY_MONTH_YEAR: {
            dateTime: 'DD-MM-YYYY HH:mm:ss',
            date: 'DD-MM-YYYY',
        },
    };
    INIT_LANGUAGE = 'zh';
    DEFALUT_LANGUAGE = 'en';
    CUSTOM_HEADERS = {
        GEPHENOM_APP_ADMIN_CONTENT_VERSION: 'Gephenom-App-Admin-Content-Version',
        GEPHENOM_H5_CLIENT_VERSION: 'Gephenom-H5-Client-Version',
    };
    SOCKET_CHANNEL = {
        ORDER: 'order',
        PAY: 'pay',
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
    CERTIFICATE_TYPE = {
        IDCARD_FRONT: {
            DESCRIPTION: '法人身份证正面',
            KEY: 'IDCARD_FRONT',
        },
        IDCARD_BACK: {
            DESCRIPTION: '法人身份证反面',
            KEY: 'IDCARD_BACK',
        },
        SETTLE_BANKCARD: {
            DESCRIPTION: '结算银行卡',
            KEY: 'SETTLE_BANKCARD',
        },
        HAND_IDCARD: {
            DESCRIPTION: '法人手持营业执照及身份证（个人只手持身份证）',
            KEY: 'HAND_IDCARD',
        },
        CORP_CODE: {
            DESCRIPTION: '营业执照',
            KEY: 'CORP_CODE',
        },
        UNI_CREDIT_CODE: {
            DESCRIPTION: '统一社会信用代码证',
            KEY: 'UNI_CREDIT_CODE',
        },
        OP_BANK_CODE: {
            DESCRIPTION: '银行开户许可证',
            KEY: 'OP_BANK_CODE',
        },
        BUSINESS_PLACE: {
            DESCRIPTION: '门头照',
            KEY: 'BUSINESS_PLACE',
        },
        BUSINESS_SITE: {
            DESCRIPTION: '经营场所照',
            KEY: 'BUSINESS_SITE',
        },
        CASHIER_SCENE: {
            DESCRIPTION: '收银台场景照',
            KEY: 'CASHIER_SCENE',
        },
    };
    REFUND_STATUS = {
        PROCESSING: 'PROCESSING',
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
    };
    OFFICIAL_AGENT_ID = '5f8715be1039e100138df98a';
    TAKE_OUT_PAY_TYPE = {
        ONLINE_PAY: 'onlinePay',
        CASH_ON_DELIERY: 'cashOnDeliery',
    };
    TYPE_OF_SALES = {
        DINE: 'dine',
        TAKEOUT: 'takeout',
    };
}

export const CONST = new Const();
