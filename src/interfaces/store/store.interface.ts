import { Dish } from './dish.interface';
import { Classification } from './classification.interface';
import { Specification } from './specification.interface';
import { Subscription } from './subscription.interface';

export interface Store {
    readonly _id: string;
    readonly name: string;
    readonly img: string;
    readonly description: string;
    readonly type: string;
    readonly currency: string;
    readonly autoClean: boolean;
    readonly forceClean: boolean;
    readonly userId: string;
    readonly close: boolean;
    readonly multiLanguage: boolean;
    readonly dishes: Dish[];
    readonly classifications: Classification[];
    readonly specifications: Specification[];
    readonly subscription: Subscription;
    readonly date: string | Date;
}
