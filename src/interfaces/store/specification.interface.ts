export interface Specification {
    _id: string;
    name: string;
    names?: object;
    description: string;
    multi: boolean;
    content: {
        _id: string;
        name: string;
        names?: object;
        disable: boolean;
        fare: number;
        fareType: string;
    }[];
    date: Date | string;
    __v: number;
}
