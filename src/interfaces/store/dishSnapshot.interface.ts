import { Dish } from './dish.interface';
import { Specification } from './specification.interface';

export interface DishSnapshot extends Dish {
    selectedSpecifications: Specification[];
}
