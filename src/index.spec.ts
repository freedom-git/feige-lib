import { a } from './index';

describe('Index', () => {
    // beforeEach(async () => {
    //     const app: TestingModule = await Test.createTestingModule({
    //         controllers: [AppController],
    //         providers: [AppService],
    //     }).compile();

    //     appController = app.get<AppController>(AppController);
    // });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(a).toBe('Hello World!');
        });
    });
});
