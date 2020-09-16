export interface CertificatePath {
    origin: string;
    yeepay: string;
}
export interface User {
    readonly mobile: string;
    readonly _id: string;
    readonly deviceId: string;
    readonly arrearsCountdown: number;
    readonly online: boolean;
    readonly clientId: string;
    readonly paidTurnover: number;
    readonly freeTurnover: number;
    readonly certificate: {
        IDCARD_FRONT: CertificatePath;
        IDCARD_BACK: CertificatePath;
        UNI_CREDIT_CODE: CertificatePath;
        OP_BANK_CODE: CertificatePath;
        HAND_IDCARD: CertificatePath;
    };
    readonly realInfo: {
        legalName: string;
        merLegalPhone: string;
        legalIdCard: string;
        merAddress: string;
        merProvince: string;
        merCity: string;
        merDistrict: string;
        cardNo: string;
        merFullName: string;
        merShortName: string;
        merCertNo: string;
        merCertType: string;
        merContactName: string;
        merContactPhone: string;
        accountLicense: string;
        headBankCode: string;
        bankCode: string;
        serviceTel: string;
        contactName: string;
        contactPhone: string;
        contactMobile: string;
        contactEmail: string;
        contactType: string;
    };
    readonly yeepay: {
        merchantNo: string;
        merNetInOutStatus: string;
        merHmacKey: string;
        reportStatus: string;
        configStatus: string;
        active: boolean;
    };
}
