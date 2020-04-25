import { DishSnapshot } from '../store/dishSnapshot.interface';
export interface Order {
    readonly _id: string;
    readonly tableNum: string;
    readonly content: Content[];
    readonly tasks: Task[];
    readonly storeId: string;
    readonly clientId: string;
    readonly date: Date | string;
    readonly status: string;
    readonly operatorId: string;
    readonly __v: number;
    readonly process?: Process[];
}

export interface Content {
    _id: string;
    dishSnapshot: DishSnapshot;
    count: number;
    delivering?: number;
    finished?: number;
    date: Date | string;
}

export interface Task {
    _id: string;
    type: string;
    date: Date | string;
    dishGroupId?: string;
    status: string;
    operatorId?: string;
    outletNum?: number;
    count?: number;
    callReason?: string;
    content?: Content[];
    valet?: boolean;
    printed?: string[];
}

export interface Process {
    _id?: string;
    type: string;
    value: number;
    volume?: number;
}
