import { DishSnapshot } from '../store/dishSnapshot.interface';
import { PrintStatusEnum } from '../../enum/printer.enum';
import { OrderTypeEnum } from '../../enum/order.enum';
import { TaxTypeEnum } from '../../enum/tax.enum';

export interface BaseOrder {
    readonly _id: string;
    readonly serialOrderId: string;
    readonly type: OrderTypeEnum;
    readonly note?: string;
    readonly merchantNote?: string;
    readonly printerPrinted: string[];
    readonly kdsPrinted: string[];
    readonly printStatus: PrintStatusEnum;
    readonly content: Content[];
    readonly storeId: string;
    readonly clientId: string;
    readonly date: Date | string;
    readonly autoCleanTime?: Date | string;
    readonly status: string;
    readonly checkoutFirst: boolean;
    readonly salesmanId: string;
    readonly __v: number;
    readonly process?: Process[];
    readonly checkout?: Checkout[];
    readonly payed: boolean;
    readonly retreated?: boolean;
    readonly noTax?: boolean;
    readonly taxType?: TaxTypeEnum;
    readonly priceHaveTaxBindOrderTaxes?: {
        name: string;
        rate: number;
    }[];
    readonly taxes?: {
        name: string;
        volume: number;
    }[];
}

export interface Content {
    _id?: string;
    dishSnapshot: DishSnapshot;
    count: number;
    weight?: number;
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
    printerPrinted: string[];
    kdsPrinted: string[];
    printStatus: PrintStatusEnum;
    clientId: string;
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
    readonly customType?: string;
    readonly amount: number;
    readonly realCash?: number;
    readonly retreated?: boolean;
    readonly date?: Date | string;
    readonly payRecordId?: string;
    readonly memberTransactionId?: string;
    readonly operatorId?: string;
}
