import { BaseOrder } from './baseOrder.interface';

export interface DeliveryOrder extends BaseOrder {
    readonly selfPickUp: false;
    readonly phoneNum: string;
    readonly deliveryFee: number;
    readonly address: string;
    readonly nickName: string;
    readonly reserveTime?: Date;
}
