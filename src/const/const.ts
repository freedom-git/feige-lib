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
        MEMBER: {
            TYPE: 'member',
            TEXT: '会员',
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
        GBP: '￡',
        PHP: '₱',
        VND: 'đ',
        RSD: 'RSD',
    };
    UPPER_LIMIT = {
        WAITER_NUM: 10,
        CHEF_NUM: 5,
        DISH_PRICE: 5000000,
        DISH_NAME_MAX_LENGTH: 40,
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
        SMS: {
            ID: 'sms',
            NAME: '短信数量充值',
        },
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
            defaultAreaCode: '86',
        },
        {
            name: 'English',
            img: '',
            code: 'en',
            speechCode: 'en-US',
            printCode: 'cp936',
            dateFormat: 'DAY_MONTH_YEAR',
            defaultAreaCode: '61',
        },
        {
            name: '漢語',
            img: '',
            code: 'zh-tw',
            speechCode: 'zh-tw',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
            defaultAreaCode: '852',
        },
        {
            name: 'ئۇيغۇرچە',
            img: '',
            code: 'ug',
            speechCode: 'ug-CN',
            printCode: 'img',
            fontFamily: 'UG',
            dateFormat: 'YEAR_MONTH_DAY',
            defaultAreaCode: '86',
        },
        {
            name: 'Tiếng Việt',
            img: '',
            code: 'vi',
            speechCode: 'vi-VN',
            printCode: 'img',
            dateFormat: 'DAY_MONTH_YEAR',
            defaultAreaCode: '84',
        },
        {
            name: 'Deutsch',
            img: '',
            code: 'de',
            speechCode: 'de-DE',
            printCode: 'img',
            dateFormat: 'DAY_MONTH_YEAR',
            defaultAreaCode: '49',
        },
        {
            name: '日本語',
            img: '',
            code: 'ja',
            speechCode: 'ja-JP',
            printCode: 'cp936',
            dateFormat: 'YEAR_MONTH_DAY',
            defaultAreaCode: '81',
        },
        {
            name: '한국어',
            img: '',
            code: 'ko',
            speechCode: 'ko-KR',
            printCode: 'img',
            dateFormat: 'YEAR_MONTH_DAY',
            defaultAreaCode: '82',
        },
        {
            name: 'Español',
            img: '',
            code: 'es',
            speechCode: 'es-ES',
            printCode: 'img',
            dateFormat: 'YEAR_MONTH_DAY',
            defaultAreaCode: '34',
        },
        {
            name: 'Português',
            img: '',
            code: 'pt',
            speechCode: 'pt-PT',
            printCode: 'img',
            dateFormat: 'DAY_MONTH_YEAR',
            defaultAreaCode: '351',
        },
        {
            name: 'Français',
            img: '',
            code: 'fr',
            speechCode: 'fr-FR',
            printCode: 'img',
            dateFormat: 'DAY_MONTH_YEAR',
            defaultAreaCode: '33',
        },
        {
            name: 'Italiano',
            img: '',
            code: 'it',
            speechCode: 'it-IT',
            printCode: 'img',
            dateFormat: 'DAY_MONTH_YEAR',
            defaultAreaCode: '39',
        },
    ];
    DATE_FORMAT = {
        YEAR_MONTH_DAY: {
            dateTime: 'YYYY-MM-DD HH:mm:ss',
            date: 'YYYY-MM-DD',
            yearMonth: 'YYYY-MM',
            yearMonthDayHourMinute: 'YYYY-MM-DD HH:mm',
        },
        DAY_MONTH_YEAR: {
            dateTime: 'DD-MM-YYYY HH:mm:ss',
            date: 'DD-MM-YYYY',
            yearMonth: 'MM-YYYY',
            yearMonthDayHourMinute: 'DD-MM-YYYY HH:mm',
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
        MEMBER: 'member',
        SMS_NUM: 'smsNum',
        PAY: 'pay',
    };
    ORDER_EVENT = {
        CREATE: 'create',
        ABANDON: 'abandon',
        CHECKOUT: 'checkout',
        REFUND: 'refund',
        RETREAT: 'retreat',
        CHANGE_WEIGH: 'changeWeigh',
        MERCHANT_NOTE: 'merchantNote',
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
            FUBEI_TYPE: 'idCard',
        },
        IDCARD_BACK: {
            DESCRIPTION: '法人身份证反面',
            KEY: 'IDCARD_BACK',
            FUBEI_TYPE: 'idCard',
        },
        SETTLE_BANKCARD: {
            DESCRIPTION: '结算银行卡',
            KEY: 'SETTLE_BANKCARD',
            FUBEI_TYPE: 'bankCard',
        },
        HAND_IDCARD: {
            DESCRIPTION: '法人手持营业执照及身份证（个人只手持身份证）',
            KEY: 'HAND_IDCARD',
            FUBEI_TYPE: 'other',
        },
        CORP_CODE: {
            DESCRIPTION: '营业执照',
            KEY: 'CORP_CODE',
            FUBEI_TYPE: 'license',
        },
        UNI_CREDIT_CODE: {
            DESCRIPTION: '统一社会信用代码证',
            KEY: 'UNI_CREDIT_CODE',
            FUBEI_TYPE: 'license',
        },
        OP_BANK_CODE: {
            DESCRIPTION: '银行开户许可证',
            KEY: 'OP_BANK_CODE',
            FUBEI_TYPE: 'bankCard',
        },
        BUSINESS_PLACE: {
            DESCRIPTION: '门头照',
            KEY: 'BUSINESS_PLACE',
            FUBEI_TYPE: 'store',
        },
        BUSINESS_SITE: {
            DESCRIPTION: '经营场所照',
            KEY: 'BUSINESS_SITE',
            FUBEI_TYPE: 'store',
        },
        CASHIER_SCENE: {
            DESCRIPTION: '收银台场景照',
            KEY: 'CASHIER_SCENE',
            FUBEI_TYPE: 'store',
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
    AREA_CODE = [
        {
            en: 'Angola',
            zh: '安哥拉',
            phoneCode: '244',
            zhHead: 'A',
        },
        {
            en: 'Afghanistan',
            zh: '阿富汗',
            phoneCode: '93',
            zhHead: 'A',
        },
        {
            en: 'Albania',
            zh: '阿尔巴尼亚',
            phoneCode: '355',
            zhHead: 'A',
        },
        {
            en: 'Algeria',
            zh: '阿尔及利亚',
            phoneCode: '213',
            zhHead: 'A',
        },
        {
            en: 'Andorra',
            zh: '安道尔共和国',
            phoneCode: '376',
            zhHead: 'A',
        },
        {
            en: 'Anguilla',
            zh: '安圭拉岛',
            phoneCode: '1264',
            zhHead: 'A',
        },
        {
            en: 'Antigua and Barbuda',
            zh: '安提瓜和巴布达',
            phoneCode: '1268',
            zhHead: 'A',
        },
        {
            en: 'Argentina',
            zh: '阿根廷',
            phoneCode: '54',
            zhHead: 'A',
        },
        {
            en: 'Armenia',
            zh: '亚美尼亚',
            phoneCode: '374',
            zhHead: 'Y',
        },
        {
            en: 'Ascension',
            zh: '阿森松',
            phoneCode: '247',
            zhHead: 'A',
        },
        {
            en: 'Australia',
            zh: '澳大利亚',
            phoneCode: '61',
            zhHead: 'A',
            setting: {
                defaultCurrency: '$',
                timeZoneNum: 10,
                agent: {
                    instruction: 'qrorder.au@gmail.com',
                    showPriceInStore: false,
                    qrCode: '',
                },
            },
        },
        {
            en: 'Austria',
            zh: '奥地利',
            phoneCode: '43',
            zhHead: 'A',
        },
        {
            en: 'Azerbaijan',
            zh: '阿塞拜疆',
            phoneCode: '994',
            zhHead: 'A',
        },
        {
            en: 'Bahamas',
            zh: '巴哈马',
            phoneCode: '1242',
            zhHead: 'B',
        },
        {
            en: 'Bahrain',
            zh: '巴林',
            phoneCode: '973',
            zhHead: 'B',
        },
        {
            en: 'Bangladesh',
            zh: '孟加拉国',
            phoneCode: '880',
            zhHead: 'M',
        },
        {
            en: 'Barbados',
            zh: '巴巴多斯',
            phoneCode: '1246',
            zhHead: 'B',
        },
        {
            en: 'Belarus',
            zh: '白俄罗斯',
            phoneCode: '375',
            zhHead: 'B',
        },
        {
            en: 'Belgium',
            zh: '比利时',
            phoneCode: '32',
            zhHead: 'B',
        },
        {
            en: 'Belize',
            zh: '伯利兹',
            phoneCode: '501',
            zhHead: 'B',
        },
        {
            en: 'Benin',
            zh: '贝宁',
            phoneCode: '229',
            zhHead: 'B',
        },
        {
            en: 'Bermuda Is.',
            zh: '百慕大群岛',
            phoneCode: '1441',
            zhHead: 'B',
        },
        {
            en: 'Bolivia',
            zh: '玻利维亚',
            phoneCode: '591',
            zhHead: 'B',
        },
        {
            en: 'Botswana',
            zh: '博茨瓦纳',
            phoneCode: '267',
            zhHead: 'B',
        },
        {
            en: 'Brazil',
            zh: '巴西',
            phoneCode: '55',
            zhHead: 'B',
        },
        {
            en: 'Brunei',
            zh: '文莱',
            phoneCode: '673',
            zhHead: 'W',
        },
        {
            en: 'Bulgaria',
            zh: '保加利亚',
            phoneCode: '359',
            zhHead: 'B',
        },
        {
            en: 'Burkina-faso',
            zh: '布基纳法索',
            phoneCode: '226',
            zhHead: 'B',
        },
        {
            en: 'Burma',
            zh: '缅甸',
            phoneCode: '95',
            zhHead: 'M',
        },
        {
            en: 'Burundi',
            zh: '布隆迪',
            phoneCode: '257',
            zhHead: 'B',
        },
        {
            en: 'Cameroon',
            zh: '喀麦隆',
            phoneCode: '237',
            zhHead: 'C',
        },
        {
            en: 'Canada',
            zh: '加拿大',
            phoneCode: '1',
            zhHead: 'J',
        },
        {
            en: 'Cayman Is.',
            zh: '开曼群岛',
            phoneCode: '1345',
            zhHead: 'K',
        },
        {
            en: 'Central African Republic',
            zh: '中非共和国',
            phoneCode: '236',
            zhHead: 'Z',
        },
        {
            en: 'Chad',
            zh: '乍得',
            phoneCode: '235',
            zhHead: 'Z',
        },
        {
            en: 'Chile',
            zh: '智利',
            phoneCode: '56',
            zhHead: 'Z',
        },
        {
            en: 'China',
            zh: '中国',
            phoneCode: '86',
            zhHead: 'Z',
        },
        {
            en: 'Colombia',
            zh: '哥伦比亚',
            phoneCode: '57',
            zhHead: 'G',
        },
        {
            en: 'Congo',
            zh: '刚果',
            phoneCode: '242',
            zhHead: 'G',
        },
        {
            en: 'Cook Is.',
            zh: '库克群岛',
            phoneCode: '682',
            zhHead: 'K',
        },
        {
            en: 'Costa Rica',
            zh: '哥斯达黎加',
            phoneCode: '506',
            zhHead: 'G',
        },
        {
            en: 'Cuba',
            zh: '古巴',
            phoneCode: '53',
            zhHead: 'G',
        },
        {
            en: 'Cyprus',
            zh: '塞浦路斯',
            phoneCode: '357',
            zhHead: 'S',
        },
        {
            en: 'Czech Republic',
            zh: '捷克',
            phoneCode: '420',
            zhHead: 'J',
        },
        {
            en: 'Denmark',
            zh: '丹麦',
            phoneCode: '45',
            zhHead: 'D',
        },
        {
            en: 'Djibouti',
            zh: '吉布提',
            phoneCode: '253',
            zhHead: 'J',
        },
        {
            en: 'Dominica Rep.',
            zh: '多米尼加共和国',
            phoneCode: '1890',
            zhHead: 'D',
        },
        {
            en: 'Ecuador',
            zh: '厄瓜多尔',
            phoneCode: '593',
            zhHead: 'E',
        },
        {
            en: 'Egypt',
            zh: '埃及',
            phoneCode: '20',
            zhHead: 'A',
        },
        {
            en: 'EI Salvador',
            zh: '萨尔瓦多',
            phoneCode: '503',
            zhHead: 'S',
        },
        {
            en: 'Estonia',
            zh: '爱沙尼亚',
            phoneCode: '372',
            zhHead: 'A',
        },
        {
            en: 'Ethiopia',
            zh: '埃塞俄比亚',
            phoneCode: '251',
            zhHead: 'A',
        },
        {
            en: 'Fiji',
            zh: '斐济',
            phoneCode: '679',
            zhHead: 'F',
        },
        {
            en: 'Finland',
            zh: '芬兰',
            phoneCode: '358',
            zhHead: 'F',
        },
        {
            en: 'France',
            zh: '法国',
            phoneCode: '33',
            zhHead: 'F',
        },
        {
            en: 'French Guiana',
            zh: '法属圭亚那',
            phoneCode: '594',
            zhHead: 'F',
        },
        {
            en: 'Gabon',
            zh: '加蓬',
            phoneCode: '241',
            zhHead: 'J',
        },
        {
            en: 'Gambia',
            zh: '冈比亚',
            phoneCode: '220',
            zhHead: 'G',
        },
        {
            en: 'Georgia',
            zh: '格鲁吉亚',
            phoneCode: '995',
            zhHead: 'G',
        },
        {
            en: 'Germany',
            zh: '德国',
            phoneCode: '49',
            zhHead: 'D',
        },
        {
            en: 'Ghana',
            zh: '加纳',
            phoneCode: '233',
            zhHead: 'J',
        },
        {
            en: 'Gibraltar',
            zh: '直布罗陀',
            phoneCode: '350',
            zhHead: 'Z',
        },
        {
            en: 'Greece',
            zh: '希腊',
            phoneCode: '30',
            zhHead: 'X',
        },
        {
            en: 'Grenada',
            zh: '格林纳达',
            phoneCode: '1809',
            zhHead: 'G',
        },
        {
            en: 'Guam',
            zh: '关岛',
            phoneCode: '1671',
            zhHead: 'G',
        },
        {
            en: 'Guatemala',
            zh: '危地马拉',
            phoneCode: '502',
            zhHead: 'W',
        },
        {
            en: 'Guinea',
            zh: '几内亚',
            phoneCode: '224',
            zhHead: 'J',
        },
        {
            en: 'Guyana',
            zh: '圭亚那',
            phoneCode: '592',
            zhHead: 'G',
        },
        {
            en: 'Haiti',
            zh: '海地',
            phoneCode: '509',
            zhHead: 'H',
        },
        {
            en: 'Honduras',
            zh: '洪都拉斯',
            phoneCode: '504',
            zhHead: 'H',
        },
        {
            en: 'Hongkong',
            zh: '香港',
            phoneCode: '852',
            zhHead: 'X',
        },
        {
            en: 'Hungary',
            zh: '匈牙利',
            phoneCode: '36',
            zhHead: 'X',
        },
        {
            en: 'Iceland',
            zh: '冰岛',
            phoneCode: '354',
            zhHead: 'B',
        },
        {
            en: 'India',
            zh: '印度',
            phoneCode: '91',
            zhHead: 'Y',
        },
        {
            en: 'Indonesia',
            zh: '印度尼西亚',
            phoneCode: '62',
            zhHead: 'Y',
        },
        {
            en: 'Iran',
            zh: '伊朗',
            phoneCode: '98',
            zhHead: 'Y',
        },
        {
            en: 'Iraq',
            zh: '伊拉克',
            phoneCode: '964',
            zhHead: 'Y',
        },
        {
            en: 'Ireland',
            zh: '爱尔兰',
            phoneCode: '353',
            zhHead: 'A',
        },
        {
            en: 'Israel',
            zh: '以色列',
            phoneCode: '972',
            zhHead: 'Y',
        },
        {
            en: 'Italy',
            zh: '意大利',
            phoneCode: '39',
            zhHead: 'Y',
        },
        {
            en: 'Ivory Coast',
            zh: '科特迪瓦',
            phoneCode: '225',
            zhHead: 'K',
        },
        {
            en: 'Jamaica',
            zh: '牙买加',
            phoneCode: '1876',
            zhHead: 'Y',
        },
        {
            en: 'Japan',
            zh: '日本',
            phoneCode: '81',
            zhHead: 'R',
        },
        {
            en: 'Jordan',
            zh: '约旦',
            phoneCode: '962',
            zhHead: 'Y',
        },
        {
            en: 'Kampuchea (Cambodia )',
            zh: '柬埔寨',
            phoneCode: '855',
            zhHead: 'J',
        },
        {
            en: 'Kazakstan',
            zh: '哈萨克斯坦',
            phoneCode: '327',
            zhHead: 'H',
        },
        {
            en: 'Kenya',
            zh: '肯尼亚',
            phoneCode: '254',
            zhHead: 'K',
        },
        {
            en: 'Korea',
            zh: '韩国',
            phoneCode: '82',
            zhHead: 'K',
        },
        {
            en: 'Kuwait',
            zh: '科威特',
            phoneCode: '965',
            zhHead: 'K',
        },
        {
            en: 'Kyrgyzstan',
            zh: '吉尔吉斯坦',
            phoneCode: '331',
            zhHead: 'J',
        },
        {
            en: 'Laos',
            zh: '老挝',
            phoneCode: '856',
            zhHead: 'L',
        },
        {
            en: 'Latvia',
            zh: '拉脱维亚',
            phoneCode: '371',
            zhHead: 'L',
        },
        {
            en: 'Lebanon',
            zh: '黎巴嫩',
            phoneCode: '961',
            zhHead: 'L',
        },
        {
            en: 'Lesotho',
            zh: '莱索托',
            phoneCode: '266',
            zhHead: 'L',
        },
        {
            en: 'Liberia',
            zh: '利比里亚',
            phoneCode: '231',
            zhHead: 'K',
        },
        {
            en: 'Libya',
            zh: '利比亚',
            phoneCode: '218',
            zhHead: 'L',
        },
        {
            en: 'Liechtenstein',
            zh: '列支敦士登',
            phoneCode: '423',
            zhHead: 'L',
        },
        {
            en: 'Lithuania',
            zh: '立陶宛',
            phoneCode: '370',
            zhHead: 'L',
        },
        {
            en: 'Luxembourg',
            zh: '卢森堡',
            phoneCode: '352',
            zhHead: 'L',
        },
        {
            en: 'Macao',
            zh: '澳门',
            phoneCode: '853',
            zhHead: 'A',
        },
        {
            en: 'Madagascar',
            zh: '马达加斯加',
            phoneCode: '261',
            zhHead: 'M',
        },
        {
            en: 'Malawi',
            zh: '马拉维',
            phoneCode: '265',
            zhHead: 'M',
        },
        {
            en: 'Malaysia',
            zh: '马来西亚',
            phoneCode: '60',
            zhHead: 'M',
        },
        {
            en: 'Maldives',
            zh: '马尔代夫',
            phoneCode: '960',
            zhHead: 'M',
        },
        {
            en: 'Mali',
            zh: '马里',
            phoneCode: '223',
            zhHead: 'M',
        },
        {
            en: 'Malta',
            zh: '马耳他',
            phoneCode: '356',
            zhHead: 'M',
        },
        {
            en: 'Mariana Is',
            zh: '马里亚那群岛',
            phoneCode: '1670',
            zhHead: 'M',
        },
        {
            en: 'Martinique',
            zh: '马提尼克',
            phoneCode: '596',
            zhHead: 'M',
        },
        {
            en: 'Mauritius',
            zh: '毛里求斯',
            phoneCode: '230',
            zhHead: 'M',
        },
        {
            en: 'Mexico',
            zh: '墨西哥',
            phoneCode: '52',
            zhHead: 'M',
        },
        {
            en: 'Moldova Republic of',
            zh: '摩尔多瓦',
            phoneCode: '373',
            zhHead: 'M',
        },
        {
            en: 'Monaco',
            zh: '摩纳哥',
            phoneCode: '377',
            zhHead: 'M',
        },
        {
            en: 'Mongolia',
            zh: '蒙古',
            phoneCode: '976',
            zhHead: 'M',
        },
        {
            en: 'Montserrat Is',
            zh: '蒙特塞拉特岛',
            phoneCode: '1664',
            zhHead: 'M',
        },
        {
            en: 'Morocco',
            zh: '摩洛哥',
            phoneCode: '212',
            zhHead: 'M',
        },
        {
            en: 'Mozambique',
            zh: '莫桑比克',
            phoneCode: '258',
            zhHead: 'M',
        },
        {
            en: 'Namibia',
            zh: '纳米比亚',
            phoneCode: '264',
            zhHead: 'N',
        },
        {
            en: 'Nauru',
            zh: '瑙鲁',
            phoneCode: '674',
            zhHead: 'N',
        },
        {
            en: 'Nepal',
            zh: '尼泊尔',
            phoneCode: '977',
            zhHead: 'N',
        },
        {
            en: 'Netheriands Antilles',
            zh: '荷属安的列斯',
            phoneCode: '599',
            zhHead: 'H',
        },
        {
            en: 'Netherlands',
            zh: '荷兰',
            phoneCode: '31',
            zhHead: 'H',
        },
        {
            en: 'New Zealand',
            zh: '新西兰',
            phoneCode: '64',
            zhHead: 'X',
        },
        {
            en: 'Nicaragua',
            zh: '尼加拉瓜',
            phoneCode: '505',
            zhHead: 'N',
        },
        {
            en: 'Niger',
            zh: '尼日尔',
            phoneCode: '227',
            zhHead: 'N',
        },
        {
            en: 'Nigeria',
            zh: '尼日利亚',
            phoneCode: '234',
            zhHead: 'N',
        },
        {
            en: 'North Korea',
            zh: '朝鲜',
            phoneCode: '850',
            zhHead: 'C',
        },
        {
            en: 'Norway',
            zh: '挪威',
            phoneCode: '47',
            zhHead: 'N',
        },
        {
            en: 'Oman',
            zh: '阿曼',
            phoneCode: '968',
            zhHead: 'A',
        },
        {
            en: 'Pakistan',
            zh: '巴基斯坦',
            phoneCode: '92',
            zhHead: 'P',
        },
        {
            en: 'Panama',
            zh: '巴拿马',
            phoneCode: '507',
            zhHead: 'B',
        },
        {
            en: 'Papua New Cuinea',
            zh: '巴布亚新几内亚',
            phoneCode: '675',
            zhHead: 'B',
        },
        {
            en: 'Paraguay',
            zh: '巴拉圭',
            phoneCode: '595',
            zhHead: 'B',
        },
        {
            en: 'Peru',
            zh: '秘鲁',
            phoneCode: '51',
            zhHead: 'M',
        },
        {
            en: 'Philippines',
            zh: '菲律宾',
            phoneCode: '63',
            zhHead: 'F',
        },
        {
            en: 'Poland',
            zh: '波兰',
            phoneCode: '48',
            zhHead: 'B',
        },
        {
            en: 'French Polynesia',
            zh: '法属玻利尼西亚',
            phoneCode: '689',
            zhHead: 'F',
        },
        {
            en: 'Portugal',
            zh: '葡萄牙',
            phoneCode: '351',
            zhHead: 'p',
        },
        {
            en: 'Puerto Rico',
            zh: '波多黎各',
            phoneCode: '1787',
            zhHead: 'B',
        },
        {
            en: 'Qatar',
            zh: '卡塔尔',
            phoneCode: '974',
            zhHead: 'K',
        },
        {
            en: 'Reunion',
            zh: '留尼旺',
            phoneCode: '262',
            zhHead: 'L',
        },
        {
            en: 'Romania',
            zh: '罗马尼亚',
            phoneCode: '40',
            zhHead: 'L',
        },
        {
            en: 'Russia',
            zh: '俄罗斯',
            phoneCode: '7',
            zhHead: 'E',
        },
        {
            en: 'Saint Lueia',
            zh: '圣卢西亚',
            phoneCode: '1758',
            zhHead: 'S',
        },
        {
            en: 'Saint Vincent',
            zh: '圣文森特岛',
            phoneCode: '1784',
            zhHead: 'S',
        },
        {
            en: 'Samoa Eastern',
            zh: '东萨摩亚(美)',
            phoneCode: '684',
            zhHead: 'S',
        },
        {
            en: 'Samoa Western',
            zh: '西萨摩亚',
            phoneCode: '685',
            zhHead: 'S',
        },
        {
            en: 'San Marino',
            zh: '圣马力诺',
            phoneCode: '378',
            zhHead: 'S',
        },
        {
            en: 'Sao Tome and Principe',
            zh: '圣多美和普林西比',
            phoneCode: '239',
            zhHead: 'S',
        },
        {
            en: 'Saudi Arabia',
            zh: '沙特阿拉伯',
            phoneCode: '966',
            zhHead: 'S',
        },
        {
            en: 'Senegal',
            zh: '塞内加尔',
            phoneCode: '221',
            zhHead: 'S',
        },
        {
            en: 'Seychelles',
            zh: '塞舌尔',
            phoneCode: '248',
            zhHead: 'S',
        },
        {
            en: 'Sierra Leone',
            zh: '塞拉利昂',
            phoneCode: '232',
            zhHead: 'S',
        },
        {
            en: 'Singapore',
            zh: '新加坡',
            phoneCode: '65',
            zhHead: 'X',
        },
        {
            en: 'Slovakia',
            zh: '斯洛伐克',
            phoneCode: '421',
            zhHead: 'S',
        },
        {
            en: 'Slovenia',
            zh: '斯洛文尼亚',
            phoneCode: '386',
            zhHead: 'S',
        },
        {
            en: 'Solomon Is',
            zh: '所罗门群岛',
            phoneCode: '677',
            zhHead: 'S',
        },
        {
            en: 'Somali',
            zh: '索马里',
            phoneCode: '252',
            zhHead: 'S',
        },
        {
            en: 'South Africa',
            zh: '南非',
            phoneCode: '27',
            zhHead: 'N',
        },
        {
            en: 'Spain',
            zh: '西班牙',
            phoneCode: '34',
            zhHead: 'X',
        },
        {
            en: 'Sri Lanka',
            zh: '斯里兰卡',
            phoneCode: '94',
            zhHead: 'S',
        },
        {
            en: 'St.Lucia',
            zh: '圣卢西亚',
            phoneCode: '1758',
            zhHead: 'S',
        },
        {
            en: 'St.Vincent',
            zh: '圣文森特',
            phoneCode: '1784',
            zhHead: 'S',
        },
        {
            en: 'Sudan',
            zh: '苏丹',
            phoneCode: '249',
            zhHead: 'S',
        },
        {
            en: 'Suriname',
            zh: '苏里南',
            phoneCode: '597',
            zhHead: 'S',
        },
        {
            en: 'Swaziland',
            zh: '斯威士兰',
            phoneCode: '268',
            zhHead: 'S',
        },
        {
            en: 'Sweden',
            zh: '瑞典',
            phoneCode: '46',
            zhHead: 'R',
        },
        {
            en: 'Switzerland',
            zh: '瑞士',
            phoneCode: '41',
            zhHead: 'R',
        },
        {
            en: 'Syria',
            zh: '叙利亚',
            phoneCode: '963',
            zhHead: 'X',
        },
        {
            en: 'Taiwan',
            zh: '台湾',
            phoneCode: '886',
            zhHead: 'T',
        },
        {
            en: 'Tajikstan',
            zh: '塔吉克斯坦',
            phoneCode: '992',
            zhHead: 'T',
        },
        {
            en: 'Tanzania',
            zh: '坦桑尼亚',
            phoneCode: '255',
            zhHead: 'T',
        },
        {
            en: 'Thailand',
            zh: '泰国',
            phoneCode: '66',
            zhHead: 'T',
        },
        {
            en: 'Togo',
            zh: '多哥',
            phoneCode: '228',
            zhHead: 'D',
        },
        {
            en: 'Tonga',
            zh: '汤加',
            phoneCode: '676',
            zhHead: 'T',
        },
        {
            en: 'Trinidad and Tobago',
            zh: '特立尼达和多巴哥',
            phoneCode: '1809',
            zhHead: 'T',
        },
        {
            en: 'Tunisia',
            zh: '突尼斯',
            phoneCode: '216',
            zhHead: 'T',
        },
        {
            en: 'Turkey',
            zh: '土耳其',
            phoneCode: '90',
            zhHead: 'T',
        },
        {
            en: 'Turkmenistan',
            zh: '土库曼斯坦',
            phoneCode: '993',
            zhHead: 'T',
        },
        {
            en: 'Uganda',
            zh: '乌干达',
            phoneCode: '256',
            zhHead: 'W',
        },
        {
            en: 'Ukraine',
            zh: '乌克兰',
            phoneCode: '380',
            zhHead: 'W',
        },
        {
            en: 'United Arab Emirates',
            zh: '阿拉伯联合酋长国',
            phoneCode: '971',
            zhHead: 'A',
        },
        {
            en: 'United Kiongdom',
            zh: '英国',
            phoneCode: '44',
            zhHead: 'Y',
        },
        {
            en: 'United States of America',
            zh: '美国',
            phoneCode: '1',
            zhHead: 'M',
        },
        {
            en: 'Uruguay',
            zh: '乌拉圭',
            phoneCode: '598',
            zhHead: 'W',
        },
        {
            en: 'Uzbekistan',
            zh: '乌兹别克斯坦',
            phoneCode: '233',
            zhHead: 'W',
        },
        {
            en: 'Venezuela',
            zh: '委内瑞拉',
            phoneCode: '58',
            zhHead: 'W',
        },
        {
            en: 'Vietnam',
            zh: '越南',
            phoneCode: '84',
            zhHead: 'Y',
            setting: {
                defaultCurrency: 'đ',
                timeZoneNum: 7,
                agent: {
                    instruction: 'Vui lòng quét mã để được hỗ trợ',
                    showPriceInStore: false,
                    qrCode: 'https://feige-img-hub.oss-cn-hangzhou.aliyuncs.com/feige/agent/vi-agent-qr.jpeg',
                },
            },
        },
        {
            en: 'Yemen',
            zh: '也门',
            phoneCode: '967',
            zhHead: 'Y',
        },
        {
            en: 'Yugoslavia',
            zh: '南斯拉夫',
            phoneCode: '381',
            zhHead: 'N',
        },
        {
            en: 'Zimbabwe',
            zh: '津巴布韦',
            phoneCode: '263',
            zhHead: 'J',
        },
        {
            en: 'Zaire',
            zh: '扎伊尔',
            phoneCode: '243',
            zhHead: 'Z',
        },
        {
            en: 'Zambia',
            zh: '赞比亚',
            phoneCode: '260',
            zhHead: 'Z',
        },
    ];
}

export const CONST = new Const();
