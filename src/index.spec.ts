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
} from './index';
import * as order1 from '../josn-hub/orders/点了未加价规格的订单';
import * as order2 from '../josn-hub/orders/点了不加价和固定加减价规格的订单';
import * as order3 from '../josn-hub/orders/点了固定加价-百分比加价规格的订单';
import * as order4 from '../josn-hub/orders/有一个菜的价格是负数的情况';
import * as order5 from '../josn-hub/orders/整单价格都是负数的情况';
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
    });

    describe('测试计算应收金额：calcReceivablePrice', () => {
        it('抹零0位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 0,
                },
            ]);
            expect(result.receivablePrice).toBe(188.88);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-0.008);
        });
        it('抹零1位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 1,
                },
            ]);
            expect(result.receivablePrice).toBe(188.8);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-0.088);
        });
        it('抹零3位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 3,
                },
            ]);
            expect(result.receivablePrice).toBe(180);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-8.888);
        });
        it('抹零6位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 6,
                },
            ]);
            expect(result.receivablePrice).toBe(0);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-188.888);
        });
        it('抹零3位 + 打9折', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 3,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 9,
                },
            ]);
            expect(result.receivablePrice).toBe(160);
            expect(result.resultProcessArr.length).toBe(2);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-18.8888);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-9.9992);
        });
        it('打7.5折 + 抹零2位', () => {
            const result = calcReceivablePrice(135.87, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
                    value: 7.5,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE,
                    value: 2,
                },
            ]);
            expect(result.receivablePrice).toBe(101);
            expect(result.resultProcessArr.length).toBe(2);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-33.9675);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-0.9025);
        });
        it('打8折 + 抹零2位 + 让价10元', () => {
            const result = calcReceivablePrice(199.99, [
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
            expect(result.receivablePrice).toBe(149);
            expect(result.resultProcessArr.length).toBe(3);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-39.998);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-10);
            expect(result.resultProcessArr[2].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE);
            expect(result.resultProcessArr[2].volume).toBeCloseTo(-0.992);
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
                        type: CONST.CHECKOUT_TYPE.MYQR.TYPE,
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
                        type: CONST.CHECKOUT_TYPE.MYQR.TYPE,
                        amount: 66.87,
                    },
                    {
                        type: CONST.CHECKOUT_TYPE.MYQR.TYPE,
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
});
