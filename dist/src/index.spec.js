"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var _______1 = require("../josn-hub/orders/\u89C4\u683C\u5168\u90E8\u4E0D\u52A0\u4EF7");
describe('开始运行单元测试', function () {
    // beforeEach(async () => {
    //     const app: TestingModule = await Test.createTestingModule({
    //         controllers: [AppController],
    //         providers: [AppService],
    //     }).compile();
    //     appController = app.get<AppController>(AppController);
    // });
    describe('测试计算订单总价：calcTotalPrice', function () {
        it('不加价规格订单总价检查', function () {
            expect(index_1.calcTotalPrice(_______1.default)).toBe(20);
        });
    });
});
