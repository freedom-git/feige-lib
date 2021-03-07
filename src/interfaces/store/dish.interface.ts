export interface Dish {
    readonly _id: string;
    name: string;
    readonly names?: object;
    price: number;
    readonly takeoutPrice: number;
    description: string;
    descriptions?: object;
    readonly img: string;
    readonly soldOut: boolean;
    readonly chef: string;
    readonly specifications: string[];
    salesType: string[];
    readonly __v: number;
}
