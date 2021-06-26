
export interface VisitTask {
    readonly _id: string;
    userId: string,
    createDate:string | Date,
    effectiveDate: string | Date,
    endDate: string | Date,
    status: string,
    countryCode: string,
    mobile:string,
    storeId: string,
    storeName: string,
    storeCreateDate:string | Date,
    userStatus:string,
    type:string,
    result:string
}
