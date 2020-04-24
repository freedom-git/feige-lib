export interface Dish {
    readonly _id: string;
    readonly name: string;
    readonly price: number;
    readonly description: string;
    readonly img: string;
    readonly storeId: string;
    readonly soldOut: boolean;
    readonly noCooking: boolean;
    readonly chef: string;
    readonly specifications: string[];
    readonly __v: number;
}
