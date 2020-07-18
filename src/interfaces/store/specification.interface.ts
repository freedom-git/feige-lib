export interface Specification {
    _id: string;
    name: string;
    names?: string[];
    description: string;
    multi: boolean;
    content: {
        _id: string;
        name: string;
        names?: string[];
        disable: boolean;
        fare: number;
        fareType: string;
    }[];
    date: Date | string;
    __v: number;
}
