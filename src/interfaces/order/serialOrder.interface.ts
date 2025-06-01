import { BaseOrder } from './baseOrder.interface';

export interface SerialOrder extends BaseOrder {
    readonly serialNum: string;
}
