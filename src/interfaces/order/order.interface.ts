import { DishSnapshot } from '../store/dishSnapshot.interface';
export interface Order {
    readonly _id: string;
    readonly tableNum: string;
    readonly content: Content[];
    readonly tasks: [
        {
            _id: string;
            type: string;
            date: Date;
            dishGroupId: string;
            status: string;
            operatorId: string;
            outletNum: number;
            count: number;
            callReason: string;
            content: Content[];
            valet: boolean;
            printed: string[];
        },
    ];
    readonly storeId: string;
    readonly clientId: string;
    readonly date: Date;
    readonly status: string;
    readonly operatorId: string;
    readonly __v: number;
}

export interface Content {
    _id: string;
    dishSnapshot: DishSnapshot;
    count: number;
    delivering: number;
    finished: number;
    date: Date;
}
