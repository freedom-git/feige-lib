import { BaseOrder } from './baseOrder.interface';

export interface PickUpOrder extends BaseOrder {
    readonly selfPickUp: true;
    readonly phoneNum: string;
    readonly nickName: string;
    readonly reserveTime?: Date;
    readonly selfPickUpUseDeliveryPrice: boolean;
}
