export interface Classification {
    name: string;
    readonly names?: object;
    readonly content: Array<string>;
    readonly noFullOrderDiscount: boolean;
    readonly date: Date;
}
