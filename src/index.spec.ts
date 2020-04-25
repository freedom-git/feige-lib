import { calcTotalPrice, calcReceivablePrice } from './index';
import * as order1 from '../josn-hub/orders/点了未加价规格的订单';
import * as order2 from '../josn-hub/orders/点了不加价和固定加减价规格的订单';
import * as order3 from '../josn-hub/orders/点了不加价-固定加价-百分比加价规格的订单';
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
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type,
                    value: 0,
                },
            ]);
            expect(result.receivablePrice).toBe(188.88);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-0.008);
        });
        it('抹零1位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type,
                    value: 1,
                },
            ]);
            expect(result.receivablePrice).toBe(188.8);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-0.088);
        });
        it('抹零3位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type,
                    value: 3,
                },
            ]);
            expect(result.receivablePrice).toBe(180);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-8.888);
        });
        it('抹零6位', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type,
                    value: 6,
                },
            ]);
            expect(result.receivablePrice).toBe(0);
            expect(result.resultProcessArr.length).toBe(1);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-188.888);
        });
        it('抹零3位 + 打9折', () => {
            const result = calcReceivablePrice(188.888, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type,
                    value: 3,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.type,
                    value: 9,
                },
            ]);
            expect(result.receivablePrice).toBe(160);
            expect(result.resultProcessArr.length).toBe(2);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.type);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-18.8888);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-9.9992);
        });
        it('打7.5折 + 抹零2位', () => {
            const result = calcReceivablePrice(135.87, [
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.type,
                    value: 7.5,
                },
                {
                    type: CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type,
                    value: 2,
                },
            ]);
            expect(result.receivablePrice).toBe(101);
            expect(result.resultProcessArr.length).toBe(2);
            expect(result.resultProcessArr[0].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.type);
            expect(result.resultProcessArr[0].volume).toBeCloseTo(-33.9675);
            expect(result.resultProcessArr[1].type).toBe(CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type);
            expect(result.resultProcessArr[1].volume).toBeCloseTo(-0.9025);
        });
    });
});
