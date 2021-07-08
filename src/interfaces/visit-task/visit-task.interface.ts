export interface VisitTask {
    readonly _id: string;
    readonly userId: string;
    readonly createDate: string | Date;
    readonly effectiveDate: string | Date;
    readonly endDate: string | Date;
    readonly status: string;
    readonly countryCode: string;
    readonly mobile: string;
    readonly storeId: string;
    readonly storeName: string;
    readonly storeCreateDate: string | Date;
    readonly userStatus: string;
    readonly type: string;
    readonly result: string;
    readonly fileList: string[];
}
