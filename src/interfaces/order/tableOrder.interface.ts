import { BaseOrder } from './baseOrder.interface';
import { Task } from './baseOrder.interface';

export interface TableOrder extends BaseOrder {
    readonly tableNum: string;
    readonly tasks: Task[];
    readonly operatorId: string;
}
