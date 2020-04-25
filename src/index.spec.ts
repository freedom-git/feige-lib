import { calcTotalPrice } from './index';
import * as order1 from '../josn-hub/orders/点了未加价规格的订单';
import * as order2 from '../josn-hub/orders/点了不加价和固定加减价规格的订单';
import * as order3 from '../josn-hub/orders/点了不加价-固定加价-百分比加价规格的订单';
import * as order4 from '../josn-hub/orders/有一个菜的价格是负数的情况';
import * as order5 from '../josn-hub/orders/整单价格都是负数的情况';

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
});
