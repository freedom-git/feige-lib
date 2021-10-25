import {
    calcTotalPrice,
    calcReceivablePrice,
    calcReceived,
    getReadbleProcess,
    calcLeft,
    parseMoney,
    checkStoreSubscription,
    CHECK_STORE_SUBSCRIPTION_REASON,
    Store,
    getCurrentLangAndRange,
    getNameFromNames,
    getStoreByLanguage,
    getOrderByLanguage,
    Order,
    getLanguageFromCountryCode,
} from './index';
import * as order1 from '../josn-hub/orders/点了未加价规格的订单';
import * as order2 from '../josn-hub/orders/点了不加价和固定加减价规格的订单';
import * as order3 from '../josn-hub/orders/点了固定加价-百分比加价规格的订单';
import * as order4 from '../josn-hub/orders/有一个菜的价格是负数的情况';
import * as order5 from '../josn-hub/orders/整单价格都是负数的情况';
import * as order6 from '../josn-hub/orders/点了未加价规格的订单并有配送费';
import * as taxOrder from '../josn-hub/orders/tax-order';
import * as taxHavePriceBindOrder from '../josn-hub/orders/tax-have-price-bind-order';

import { CONST } from './const/const';

describe('开始运行单元测试', () => {
    // beforeEach(async () => {
    //     const app: TestingModule = await Test.createTestingModule({
    //         controllers: [AppController],
    //         providers: [AppService],
    //     }).compile();

    //     appController = app.get<AppController>(AppController);
    // });

    describe('测试计算订单总价：calcTotalPrice', () => {
        it('不加价规格订单总价检查', () => {
            expect(calcTotalPrice(order1.order)).toBe(order1.expectPrice);
        });
        it('点了不加价和固定加减价规格的订单', () => {
            expect(calcTotalPrice(order2.order)).toBe(order2.expectPrice);
        });
        it('点了不加价-固定加价-百分比加价规格的订单', () => {
            expect(calcTotalPrice(order3.order)).toBe(order3.expectPrice);
        });
        it('有一个菜的价格是负数的情况', () => {
            expect(calcTotalPrice(order4.order)).toBe(order4.expectPrice);
        });
        it('整单价格都是负数的情况', () => {
            expect(calcTotalPrice(order5.order)).toBe(order5.expectPrice);
        });
        it('配送费检查', () => {
            expect(calcTotalPrice(order6.order)).toBe(order6.expectPrice);
        });
    });

    describe('测试计算应收金额：calcReceivablePrice', () => {
        it('抹零0位', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 0,
                },
            ]);
            expect(result.totalPrice).toBe(order1.expectPrice);
            expect(result.receivablePrice).toBe(order1.expectPrice);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(0);
        });
        it('抹零1位', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 1,
                },
            ]);
            expect(result.receivablePrice).toBe(19.5);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-0.05);
        });
        it('抹零3位', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 3,
                },
            ]);
            expect(result.receivablePrice).toBe(10);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-9.55);
        });
        it('抹零6位', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 6,
                },
            ]);
            expect(result.receivablePrice).toBe(0);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-19.55);
        });
        it('抹零3位 + 打9折', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 3,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 9,
                },
            ]);
            expect(result.receivablePrice).toBe(10);
            expect(result.resultProcessArr.length).toBe(2);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-1.955);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-7.595);
        });
        it('打7.5折 + 抹零2位', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 7.5,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 2,
                },
            ]);
            expect(result.receivablePrice).toBe(14);
            expect(result.resultProcessArr.length).toBe(2);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-4.8875);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-0.6625);
        });
        it('打8折 + 抹零2位 + 让价10元', () => {
            const result = calcReceivablePrice(order1.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 8,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 2,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE,
                    value: 10,
                },
            ]);
            expect(result.receivablePrice).toBe(5);
            expect(result.resultProcessArr.length).toBe(3);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-3.91);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-10);
            expect(result.resultProcessArr[2].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[2].volume).toBeCloseTo(-0.64);
        });
        it('打8折 + 抹零2位 + 让价10元, 并且有一部分价格不参与打折, 商品税单价不含税，计算税额', () => {
            const result = calcReceivablePrice(taxOrder.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 8,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 2,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE,
                    value: 10,
                },
            ]);
            expect(result.totalPrice).toBe(20);
            expect(result.receivablePrice).toBe(7.76);
            expect(result.resultProcessArr.length).toBe(3);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-3);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-10);
            expect(result.resultProcessArr[2].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[2].volume).toBeCloseTo(-0);
            expect(result.taxArr.length).toBe(4);
            expect(result.taxArr[0].name).toBe('tax1(10%)');
            expect(result.taxArr[0].volume).toBe(0.21);
            expect(result.taxArr[1].name).toBe('tax2(5%)');
            expect(result.taxArr[1].volume).toBe(0.1);
            expect(result.taxArr[2].name).toBe('tax1(5%)');
            expect(result.taxArr[2].volume).toBe(0.15);
            expect(result.taxArr[3].name).toBe('tax2(10%)');
            expect(result.taxArr[3].volume).toBe(0.3);
        });
        it('打8折 + 抹零2位 + 让价10元, 并且有一部分价格不参与打折, 免税', () => {
            const result = calcReceivablePrice(
                taxOrder.order,
                [
                    {
                        type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                        value: 8,
                    },
                    {
                        type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                        value: 2,
                    },
                    {
                        type: CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE,
                        value: 10,
                    },
                ],
                true,
            );
            expect(result.totalPrice).toBe(20);
            expect(result.receivablePrice).toBe(7);
            expect(result.resultProcessArr.length).toBe(3);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-3);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-10);
            expect(result.resultProcessArr[2].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[2].volume).toBeCloseTo(-0);
        });
        it('打8折 + 抹零2位 + 让价10元, 并且有一部分价格不参与打折, 整单税单价含税，计算税额', () => {
            const result = calcReceivablePrice(taxHavePriceBindOrder.order, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 8,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 2,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE,
                    value: 10,
                },
            ]);
            expect(result.totalPrice).toBe(20);
            expect(result.receivablePrice).toBe(7);
            expect(result.resultProcessArr.length).toBe(3);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-3);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-10);
            expect(result.resultProcessArr[2].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[2].volume).toBeCloseTo(-0);
            expect(result.taxArr.length).toBe(2);
            expect(result.taxArr[0].name).toBe('税1(10%)');
            expect(result.taxArr[0].volume).toBe(0.61);
            expect(result.taxArr[1].name).toBe('税2(5%)');
            expect(result.taxArr[1].volume).toBe(0.3);
        });
    });

    describe('测试计算已收金额：calcReceived', () => {
        it('没有该字段返回0', () => {
            expect(calcReceived(undefined)).toBe(0);
        });
        it('计算两笔金额的总数', () => {
            expect(
                calcReceived([
                    {
                        type: CONST.CHECKOUT_TYPE.CASH.TYPE,
                        amount: 45.64,
                    },
                    {
                        type: CONST.CHECKOUT_TYPE.WECHAT.TYPE,
                        amount: 66.87,
                    },
                ]),
            ).toBe(112.51);
        });
        it('有退款的情况下计算两笔金额的总数', () => {
            expect(
                calcReceived([
                    {
                        type: CONST.CHECKOUT_TYPE.CASH.TYPE,
                        amount: 45.64,
                    },
                    {
                        type: CONST.CHECKOUT_TYPE.WECHAT.TYPE,
                        amount: 66.87,
                    },
                    {
                        type: CONST.CHECKOUT_TYPE.WECHAT.TYPE,
                        amount: 66.87,
                        retreated: true,
                    },
                ]),
            ).toBe(112.51);
        });
    });

    describe('测试可读的订单处理过程：getReadbleProcess', () => {
        it('输入打折过程，应该返回“打X折字段”', () => {
            expect(
                getReadbleProcess({
                    type: 'discount',
                    value: 9,
                    volume: -0.8,
                }),
            ).toBe('打9折');
        });
        it('输入抹零过程，应该返回“抹零”', () => {
            expect(
                getReadbleProcess({
                    type: 'remove_tails',
                    value: 2,
                    volume: -0.20000000000000018,
                }),
            ).toBe('抹零');
        });
    });

    describe('测试计算剩余金额：calcLeft', () => {
        it('去掉因为js计算的尾数 10.56 - 10', () => {
            expect(calcLeft(10.56, 10)).toBe(0.56);
        });
        it('去掉因为js计算的尾数 10.56 - 10 - 0.56', () => {
            expect(calcLeft(10.56 - 10, 0.56)).toBe(0);
        });
        it('负数情况', () => {
            expect(calcLeft(10.56, 11)).toBeCloseTo(-0.44);
        });
    });

    describe('测试格式化金额：parseMoney', () => {
        it('尾数高位', () => {
            expect(parseMoney(10.5650000000001)).toBe(10.57);
        });
        it('尾数低位', () => {
            expect(parseMoney(10.560000000001)).toBe(10.56);
        });
        it('负数中位', () => {
            expect(parseMoney(10.56499999999)).toBeCloseTo(10.56);
        });
    });

    describe('测试店铺开通订阅检查：checkStoreSubscription', () => {
        it('未购买任何模块的情况', () => {
            const store = { subscription: undefined };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId).result).toBe(false);
            expect(checkStoreSubscription(store as Store, moduleId).reason).toBe(
                CHECK_STORE_SUBSCRIPTION_REASON.NeedBuy,
            );
        });
        it('购买了其他模块的情况', () => {
            const store = {
                subscription: {
                    base: {
                        expires: '2021-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId).result).toBe(false);
            expect(checkStoreSubscription(store as Store, moduleId).reason).toBe(
                CHECK_STORE_SUBSCRIPTION_REASON.NeedBuy,
            );
        });
        it('已过期的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2000-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId).result).toBe(false);
            expect(checkStoreSubscription(store as Store, moduleId).reason).toBe(
                CHECK_STORE_SUBSCRIPTION_REASON.Expires,
            );
        });
        it('永久开通的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2000-06-21T15:59:59.999+00:00',
                        permanent: true,
                    },
                },
            };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId).result).toBe(true);
        });
        it('未过期的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId).result).toBe(true);
        });
        it('传入对比时间字符串的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId, '2101-06-21T15:59:59.999+00:00').result).toBe(
                false,
            );
        });
        it('传入对比时间对象的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(
                checkStoreSubscription(store as Store, moduleId, new Date('2101-06-21T15:59:59.999+00:00')).result,
            ).toBe(false);
        });
        it('传入当前时间戳的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(checkStoreSubscription(store as Store, moduleId, Date.now()).result).toBe(true);
        });
        it('传入将来时间戳的情况', () => {
            const store = {
                subscription: {
                    kds: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const moduleId = 'kds';
            expect(
                checkStoreSubscription(store as Store, moduleId, Date.parse('2101-06-21T15:59:59.999+00:00')).result,
            ).toBe(false);
        });
    });

    describe('根据店铺获取当前应该用的语言：getCurrentLangAndRange', () => {
        it('浏览器是中文,店铺默认语言中文，什么包都没开通', () => {
            const browserLang = 'zh';
            const store = {
                subscription: {},
                defaultLang: 'zh',
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('zh');
            expect(result.availableLangs.length).toBe(1);
            expect(result.availableLangs[0]).toBe('zh');
        });
        it('浏览器是英语,店铺默认语言中文，什么包都没开通', () => {
            const browserLang = 'en';
            const store = {
                subscription: {},
                defaultLang: 'zh',
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('zh');
            expect(result.availableLangs.length).toBe(1);
            expect(result.availableLangs[0]).toBe('zh');
        });
        it('浏览器是英文，开通了标准版语言包,选择语言维语', () => {
            const browserLang = 'en';
            const store = {
                subscription: {
                    multiLanguage: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                        allow: ['zh', 'en', 'ug'],
                    },
                },
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('en');
            expect(result.availableLangs.length).toBe(3);
            expect(result.availableLangs.includes('zh')).toBeTruthy();
            expect(result.availableLangs.includes('en')).toBeTruthy();
            expect(result.availableLangs.includes('ug')).toBeTruthy();
        });
        it('浏览器是维语，开通了标准版语言包,选择语言维语', () => {
            const browserLang = 'ug';
            const store = {
                subscription: {
                    multiLanguage: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                        allow: ['zh', 'en', 'ug'],
                    },
                },
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('ug');
            expect(result.availableLangs.length).toBe(3);
            expect(result.availableLangs.includes('zh')).toBeTruthy();
            expect(result.availableLangs.includes('en')).toBeTruthy();
            expect(result.availableLangs.includes('ug')).toBeTruthy();
        });
        it('浏览器是未知语言，默认英文，开通了标准版语言包,选择语言维语', () => {
            const browserLang = undefined;
            const store = {
                subscription: {
                    multiLanguage: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                        allow: ['zh', 'en', 'ug'],
                    },
                },
                defaultLang: 'en',
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('en');
            expect(result.availableLangs.length).toBe(3);
            expect(result.availableLangs.includes('zh')).toBeTruthy();
            expect(result.availableLangs.includes('en')).toBeTruthy();
            expect(result.availableLangs.includes('ug')).toBeTruthy();
        });
        it('标准包过期', () => {
            const browserLang = 'ug';
            const store = {
                subscription: {
                    multiLanguage: {
                        expires: '2000-06-21T15:59:59.999+00:00',
                        allow: ['zh', 'en', 'ug'],
                    },
                },
                defaultLang: 'zh',
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('zh');
            expect(result.availableLangs.length).toBe(1);
            expect(result.availableLangs[0]).toBe('zh');
        });
        it('浏览器是中文，开通了无限版语言包', () => {
            const browserLang = 'zh';
            const store = {
                subscription: {
                    superMultiLanguage: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('zh');
            expect(result.availableLangs.length).toBe(CONST.LANGUAGE.length);
            expect(result.availableLangs.includes(CONST.LANGUAGE[0].code)).toBeTruthy();
        });
        it('浏览器是未知语言，开通了无限版语言包', () => {
            const browserLang = undefined;
            const store = {
                subscription: {
                    superMultiLanguage: {
                        expires: '2100-06-21T15:59:59.999+00:00',
                    },
                },
                defaultLang: 'en',
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('en');
            expect(result.availableLangs.length).toBe(CONST.LANGUAGE.length);
            expect(result.availableLangs.includes(CONST.LANGUAGE[0].code)).toBeTruthy();
        });
        it('无限版语言包过期', () => {
            const browserLang = 'en';
            const store = {
                subscription: {
                    superMultiLanguage: {
                        expires: '2000-06-21T15:59:59.999+00:00',
                    },
                },
                defaultLang: 'zh',
            };
            const result = getCurrentLangAndRange(store as Store, browserLang);
            expect(result.currentLang).toBe('zh');
            expect(result.availableLangs.length).toBe(1);
            expect(result.availableLangs[0]).toBe('zh');
        });
    });

    describe('在语言对象中找到当前语言最匹配的值：getNameFromNames', () => {
        it('目标语言是中文，而且有可用语言有中文', () => {
            const currentLang = 'zh';
            const defaultLang = 'en';
            const names = {
                zh: '中文',
                en: 'English',
            };
            const result = getNameFromNames(names, currentLang, defaultLang);
            expect(result).toBe('中文');
        });
        it('目标语言是法语，但是不在可用语言列表中，默认是英文', () => {
            const currentLang = 'fr';
            const defaultLang = 'en';
            const names = {
                zh: '中文',
                en: 'English',
            };
            const result = getNameFromNames(names, currentLang, defaultLang);
            expect(result).toBe('English');
        });
        it('目标语言是法语，但是不在可用语言列表中，默认是中文', () => {
            const currentLang = 'fr';
            const defaultLang = 'zh';
            const names = {
                zh: '中文',
                en: 'English',
            };
            const result = getNameFromNames(names, currentLang, defaultLang);
            expect(result).toBe('中文');
        });
        it('目标语言是法语，但是不在可用语言列表中，默认是英文，但是英文也不存在', () => {
            const currentLang = 'fr';
            const defaultLang = 'en';
            const names = {
                zh: '中文',
                ug: 'Uygur',
            };
            const result = getNameFromNames(names, currentLang, defaultLang);
            expect(result).toBe('中文');
        });
        it('目标语言是法语，但是不在可用语言列表中，默认是英文，但是所有语言都不存在', () => {
            const currentLang = 'fr';
            const defaultLang = 'en';
            const names = {};
            const result = getNameFromNames(names, currentLang, defaultLang);
            expect(result).toBeUndefined();
        });
        it('目标语言是法语，但是不在可用语言列表中，默认是英文，但是多语言对象本身不存在', () => {
            const currentLang = 'fr';
            const defaultLang = 'en';
            const names = undefined;
            const result = getNameFromNames(names, currentLang, defaultLang);
            expect(result).toBeUndefined();
        });
    });

    describe('根据语言返回处理过的店铺数据：getStoreByLanguage', () => {
        const store = {
            name: '旧名字',
            names: {
                zh: '新店名',
                en: 'newStoreName',
            },
            description: '旧描述',
            descriptions: {
                en: 'newDescriptions',
            },
            classifications: [
                {
                    name: '分类旧数据',
                    names: {
                        zh: '分类中文',
                        en: 'classEnglish',
                    },
                },
                {
                    name: '分类旧数据2',
                    names: {
                        en: 'classEnglish2',
                    },
                },
            ],
            dishes: [
                {
                    name: '菜品旧数据',
                    names: {},
                    description: '旧描述1',
                    descriptions: {
                        zh: '新描述',
                        en: 'newDescriptions',
                    },
                },
                {
                    name: '菜品旧数据2',
                    description: '旧描述2',
                },
            ],
            specifications: [
                {
                    names: { zh: '中', en: 'EN' },
                    content: [
                        {
                            names: { zh: '中1', en: 'en1' },
                        },
                        {
                            names: { zh: '中2', en: 'en2' },
                        },
                    ],
                },
                {
                    names: { zh: '中x', en: 'ENx' },
                    content: [
                        {
                            names: { zh: '中x1', en: 'enx1' },
                        },
                        {
                            names: { en: 'enx2' },
                        },
                    ],
                },
            ],
        };

        it('目标语言是中文', () => {
            const currentLang = 'zh';
            const defaultLang = 'en';
            const result = getStoreByLanguage(store as Store, currentLang, defaultLang);
            expect(result.name).toBe('新店名');
            expect(result.description).toBe('newDescriptions');
            expect(result.classifications[0].name).toBe('分类中文');
            expect(result.classifications[1].name).toBe('classEnglish2');
            expect(result.dishes[0].name).toBe('菜品旧数据');
            expect(result.dishes[0].description).toBe('新描述');
            expect(result.dishes[1].name).toBe('菜品旧数据2');
            expect(result.dishes[1].description).toBe('旧描述2');
            expect(result.specifications[0].name).toBe('中');
            expect(result.specifications[0].content[0].name).toBe('中1');
            expect(result.specifications[0].content[1].name).toBe('中2');
            expect(result.specifications[1].content[1].name).toBe('enx2');
        });

        it('目标语言是法文，默认语言中文', () => {
            const currentLang = 'fr';
            const defaultLang = 'zh';
            const result = getStoreByLanguage(store as Store, currentLang, defaultLang);
            expect(result.name).toBe('新店名');
            expect(result.description).toBe('newDescriptions');
            expect(result.classifications[0].name).toBe('分类中文');
            expect(result.classifications[1].name).toBe('classEnglish2');
            expect(result.dishes[0].name).toBe('菜品旧数据');
            expect(result.dishes[0].description).toBe('新描述');
            expect(result.dishes[1].name).toBe('菜品旧数据2');
            expect(result.dishes[1].description).toBe('旧描述2');
            expect(result.specifications[0].name).toBe('中');
            expect(result.specifications[0].content[0].name).toBe('中1');
            expect(result.specifications[0].content[1].name).toBe('中2');
            expect(result.specifications[1].content[1].name).toBe('enx2');
        });
    });

    describe('根据语言返回处理过的订单数据：getOrderByLanguage', () => {
        const order = {
            content: [
                {
                    dishSnapshot: {
                        name: '菜名旧数据',
                        names: {
                            zh: '菜名中文',
                            en: 'dishEnglish',
                        },
                        selectedSpecifications: [
                            {
                                name: '规格旧数据',
                                names: {
                                    zh: '规格中文',
                                    en: 'specificationEnglish',
                                },
                                content: [
                                    {
                                        name: '规格选项旧数据',
                                        names: {
                                            zh: '选项中文',
                                            en: 'specificationOptionEnglish',
                                        },
                                    },
                                    {
                                        name: '规格选项旧数据2',
                                        names: {
                                            zh: '选项中文2',
                                        },
                                    },
                                ],
                            },
                            {
                                name: '规格旧数据2',
                                names: {
                                    zh: '规格中文2',
                                },
                                content: [
                                    {
                                        name: '规格2选项旧数据',
                                        names: {
                                            zh: '选项2中文',
                                            en: 'specification2OptionEnglish',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    dishSnapshot: {
                        name: '菜名旧数据2',
                        names: {
                            en: 'classEnglish2',
                        },
                    },
                },
            ],
            tasks: [
                { _id: '没有content' },
                {
                    content: [
                        {
                            dishSnapshot: {
                                names: { zh: '中', en: 'EN' },
                                selectedSpecifications: [
                                    {
                                        names: { en: 'EN' },
                                        content: [
                                            {
                                                names: { zh: '中1', en: 'en1' },
                                            },
                                            {
                                                name: '老数据',
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            dishSnapshot: {
                                names: { zh: '中x', en: 'ENx' },
                                selectedSpecifications: [
                                    {
                                        name: '老名字',
                                        content: [
                                            {
                                                names: { zh: '中x1', en: 'enx1' },
                                            },
                                            {
                                                names: { en: 'enx2' },
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        };

        it('目标语言是英文', () => {
            const currentLang = 'en';
            const defaultLang = 'en';
            const result = getOrderByLanguage(order as Order, currentLang, defaultLang);
            expect(result.content[0].dishSnapshot.name).toBe('dishEnglish');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].name).toBe('specificationEnglish');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe(
                'specificationOptionEnglish',
            );
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('选项中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].name).toBe('规格中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].content[0].name).toBe(
                'specification2OptionEnglish',
            );
            expect(result.content[1].dishSnapshot.name).toBe('classEnglish2');
            expect(result.tasks[0]['name']).toBeUndefined();
            expect(result.tasks[1].content[0].dishSnapshot.name).toBe('EN');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].name).toBe('EN');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('en1');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('老数据');
            expect(result.tasks[1].content[1].dishSnapshot.name).toBe('ENx');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].name).toBe('老名字');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('enx1');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('enx2');
        });

        it('目标语言是法语，默认语言是中文', () => {
            const currentLang = 'fr';
            const defaultLang = 'zh';
            const result = getOrderByLanguage(order as Order, currentLang, defaultLang);
            expect(result.content[0].dishSnapshot.name).toBe('菜名中文');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].name).toBe('规格中文');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('选项中文');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('选项中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].name).toBe('规格中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].content[0].name).toBe('选项2中文');
            expect(result.content[1].dishSnapshot.name).toBe('classEnglish2');
            expect(result.tasks[0]['name']).toBeUndefined();
            expect(result.tasks[1].content[0].dishSnapshot.name).toBe('中');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].name).toBe('EN');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('中1');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('老数据');
            expect(result.tasks[1].content[1].dishSnapshot.name).toBe('中x');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].name).toBe('老名字');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('中x1');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('enx2');
        });
    });
    describe('根据语言返回处理过的订单数据：getOrderByLanguage', () => {
        const order = {
            content: [
                {
                    dishSnapshot: {
                        name: '菜名旧数据',
                        names: {
                            zh: '菜名中文',
                            en: 'dishEnglish',
                        },
                        selectedSpecifications: [
                            {
                                name: '规格旧数据',
                                names: {
                                    zh: '规格中文',
                                    en: 'specificationEnglish',
                                },
                                content: [
                                    {
                                        name: '规格选项旧数据',
                                        names: {
                                            zh: '选项中文',
                                            en: 'specificationOptionEnglish',
                                        },
                                    },
                                    {
                                        name: '规格选项旧数据2',
                                        names: {
                                            zh: '选项中文2',
                                        },
                                    },
                                ],
                            },
                            {
                                name: '规格旧数据2',
                                names: {
                                    zh: '规格中文2',
                                },
                                content: [
                                    {
                                        name: '规格2选项旧数据',
                                        names: {
                                            zh: '选项2中文',
                                            en: 'specification2OptionEnglish',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    dishSnapshot: {
                        name: '菜名旧数据2',
                        names: {
                            en: 'classEnglish2',
                        },
                    },
                },
            ],
            tasks: [
                { _id: '没有content' },
                {
                    content: [
                        {
                            dishSnapshot: {
                                names: { zh: '中', en: 'EN' },
                                selectedSpecifications: [
                                    {
                                        names: { en: 'EN' },
                                        content: [
                                            {
                                                names: { zh: '中1', en: 'en1' },
                                            },
                                            {
                                                name: '老数据',
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            dishSnapshot: {
                                names: { zh: '中x', en: 'ENx' },
                                selectedSpecifications: [
                                    {
                                        name: '老名字',
                                        content: [
                                            {
                                                names: { zh: '中x1', en: 'enx1' },
                                            },
                                            {
                                                names: { en: 'enx2' },
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        };

        it('目标语言是英文', () => {
            const currentLang = 'en';
            const defaultLang = 'en';
            const result = getOrderByLanguage(order as Order, currentLang, defaultLang);
            expect(result.content[0].dishSnapshot.name).toBe('dishEnglish');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].name).toBe('specificationEnglish');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe(
                'specificationOptionEnglish',
            );
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('选项中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].name).toBe('规格中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].content[0].name).toBe(
                'specification2OptionEnglish',
            );
            expect(result.content[1].dishSnapshot.name).toBe('classEnglish2');
            expect(result.tasks[0]['name']).toBeUndefined();
            expect(result.tasks[1].content[0].dishSnapshot.name).toBe('EN');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].name).toBe('EN');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('en1');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('老数据');
            expect(result.tasks[1].content[1].dishSnapshot.name).toBe('ENx');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].name).toBe('老名字');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('enx1');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('enx2');
        });

        it('目标语言是法语，默认语言是中文', () => {
            const currentLang = 'fr';
            const defaultLang = 'zh';
            const result = getOrderByLanguage(order as Order, currentLang, defaultLang);
            expect(result.content[0].dishSnapshot.name).toBe('菜名中文');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].name).toBe('规格中文');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('选项中文');
            expect(result.content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('选项中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].name).toBe('规格中文2');
            expect(result.content[0].dishSnapshot.selectedSpecifications[1].content[0].name).toBe('选项2中文');
            expect(result.content[1].dishSnapshot.name).toBe('classEnglish2');
            expect(result.tasks[0]['name']).toBeUndefined();
            expect(result.tasks[1].content[0].dishSnapshot.name).toBe('中');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].name).toBe('EN');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('中1');
            expect(result.tasks[1].content[0].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('老数据');
            expect(result.tasks[1].content[1].dishSnapshot.name).toBe('中x');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].name).toBe('老名字');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[0].name).toBe('中x1');
            expect(result.tasks[1].content[1].dishSnapshot.selectedSpecifications[0].content[1].name).toBe('enx2');
        });
    });

    describe('测试根据区号返回语言码-getLanguageFromCountryCode', () => {
        it('86应该返回zh', () => {
            expect(getLanguageFromCountryCode('86')).toBe('zh');
        });
        it('非86应该返回en', () => {
            expect(getLanguageFromCountryCode('94')).toBe('en');
        });
    });
});
