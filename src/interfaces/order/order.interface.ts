import { DishSnapshot } from '../store/dishSnapshot.interface';
export interface Order {
    readonly _id: string;
    readonly tableNum?: string;
    readonly serialNum?: string;
    readonly phoneNum?: string;
    readonly address?: string;
    readonly nickName?: string;
    readonly note?: string;
    readonly printed?: string[];
    readonly content: Content[];
    readonly tasks: Task[];
    readonly storeId: string;
    readonly clientId: string;
    readonly date: Date | string;
    readonly status: string;
    readonly operatorId: string;
    readonly __v: number;
    readonly process?: Process[];
    readonly checkout?: Checkout[];
    readonly payed: boolean;
    readonly retreated?: boolean;
}

export interface Content {
    _id?: string;
    dishSnapshot: DishSnapshot;
    count: number;
    delivering?: number;
    finished?: number;
    retreated?: number;
    retreatReason?: string;
    date?: Date | string;
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
    readonly _id?: string;
    readonly type: string;
    readonly value: number;
    readonly volume?: number;
}

export interface Checkout {
    readonly _id?: string;
    readonly type: string;
    readonly amount: number;
    readonly retreated?: boolean;
    readonly date?: Date | string;
    readonly payRecordId: string;
}
