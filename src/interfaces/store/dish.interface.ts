export interface Dish {
    readonly _id: string;
    name: string;
    readonly names?: object;
    price: number;
    readonly takeoutPrice: number;
    description: string;
    descriptions?: object;
    units?: object;
    readonly img: string;
    readonly soldOut: boolean;
    readonly required: boolean;
    readonly chef: string;
    readonly specifications: string[];
    salesType: string[];
    type: string;
    readonly __v: number;
}
