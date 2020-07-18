export interface Subscription {
    base: {
        expires: string | Date;
        permanent: boolean;
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
