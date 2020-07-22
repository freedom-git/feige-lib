export interface Dish {
    readonly _id: string;
    name: string;
    readonly names?: object;
    readonly price: number;
    description: string;
    descriptions?: object;
    readonly img: string;
    readonly soldOut: boolean;
    readonly noCooking: boolean;
    readonly chef: string;
    readonly specifications: string[];
    readonly __v: number;
}
