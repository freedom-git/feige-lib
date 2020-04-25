"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('Index', function () {
    // beforeEach(async () => {
    //     const app: TestingModule = await Test.createTestingModule({
    //         controllers: [AppController],
    //         providers: [AppService],
    //     }).compile();
    //     appController = app.get<AppController>(AppController);
    // });
    describe('root', function () {
        it('should return "Hello World!"', function () {
            expect(index_1.a).toBe('Hello World!');
        });
    });
});
