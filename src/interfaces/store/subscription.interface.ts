export interface Subscription {
    base: {
        expires: string | Date;
        permanent: boolean;
        note?: string;
        activation?: Activation;
    };
    waiter: {
        expires: string | Date;
        permanent: boolean;
    };
    kds: {
        expires: string | Date;
        permanent: boolean;
    };
    baseTakeaway: {
        expires: string | Date;
        permanent: boolean;
    };
    multiLanguage: {
        expires: string | Date;
        permanent: boolean;
        allow: string[];
    };
    superMultiLanguage: {
        expires: string | Date;
        permanent: boolean;
    };
}
export interface Activation {
    readonly receptionPrinterCountLimit: number;
    readonly chefPrinterCountLimit: number;
    readonly labelPrinterCountLimit: number;
    readonly dishCountLimit: number;
    readonly tableCountLimit: number;
    readonly memberFunction: boolean;
    readonly deliveryFunction: boolean;
    readonly buffetFunction: boolean;
    readonly waiterCountLimit: number;
    readonly kdsCountLimit: number;
    readonly multiLanguageCountLimit: number;
    readonly renewPrice: number;
}
