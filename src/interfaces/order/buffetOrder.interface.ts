import { TableOrder } from './tableOrder.interface';
import { BuffetCombosItems } from '../store/store.interface';

export interface BuffetOrder extends TableOrder {
    readonly buffet: {
        snapshot: BuffetCombosItems;
        taxes: {
            name: string;
            rate: number;
        }[];
    };
    readonly adultNum: number;
    readonly childNum: number;
}
