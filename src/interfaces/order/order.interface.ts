import { DishSnapshot } from '../store/dishSnapshot.interface';
import { PrintStatusEnum } from '../../enum/printer.enum';
import { DeliveryOrder } from './deliveryOrder.interface';
import { PickUpOrder } from './pickupOrder.interface';
import { TableOrder } from './tableOrder.interface';
import { BuffetOrder } from './buffetOrder.interface';
import { SerialOrder } from './serialOrder.interface';
import { OrderTypeEnum, TaxTypeEnum } from '../../index';
import { Content } from './baseOrder.interface';
import { Task } from './baseOrder.interface';
import { Process } from './baseOrder.interface';
import { Checkout } from './baseOrder.interface';
import { BuffetCombosItems } from '../store/store.interface';

export interface Order {
    readonly _id: string;
    readonly serialOrderId: string;
    readonly type: OrderTypeEnum;
    readonly tableNum?: string;
    readonly serialNum?: string;
    readonly phoneNum?: string;
    readonly deliveryFee?: number;
    readonly address?: string;
    readonly nickName?: string;
    readonly note?: string;
    readonly merchantNote?: string;
    readonly printerPrinted: string[];
    readonly kdsPrinted: string[];
    readonly printStatus: PrintStatusEnum;
    readonly content: Content[];
    readonly tasks: Task[];
    readonly storeId: string;
    readonly clientId: string;
    readonly date: Date | string;
    readonly autoCleanTime?: Date | string;
    readonly status: string;
    readonly checkoutFirst: boolean;
    readonly operatorId: string;
    readonly salesmanId: string;
    readonly __v: number;
    readonly process?: Process[];
    readonly checkout?: Checkout[];
    readonly payed: boolean;
    readonly retreated?: boolean;
    readonly noTax?: boolean;
    readonly taxType?: TaxTypeEnum;
    readonly reserveTime?: Date;
    readonly selfPickUp?: boolean;
    readonly selfPickUpUseDeliveryPrice?: boolean; //自取使用外卖价格, false表示使用堂食价格
    readonly pack?: boolean;
    readonly priceHaveTaxBindOrderTaxes?: {
        name: string;
        rate: number;
    }[];
    readonly taxes?: {
        name: string;
        volume: number;
    }[];
    readonly buffet?: {
        snapshot: BuffetCombosItems;
        taxes: {
            name: string;
            rate: number;
        }[];
    };
    readonly adultNum?: number;
    readonly childNum?: number;
}

export type AnyOrder = TableOrder | BuffetOrder | SerialOrder | DeliveryOrder | PickUpOrder;

/**
 * @param order
 */
export function isTableOrder(order: Order): order is TableOrder {
    return order.type === OrderTypeEnum.Table;
}

/**
 * @param order
 */
export function isBuffetOrder(order: Order): order is TableOrder {
    return order.type === OrderTypeEnum.Buffet;
}
