import { YeepayTypeEnum } from '../../enum/yeepay.enum';
import { FromEnum } from '../../enum/from.enum';
import { UserStatusEnum } from '../../enum/user-status.enum';
export interface CertificatePath {
    origin: string;
    yeepay: string;
}
export interface UserSafe {
    readonly mobile: string;
    readonly countryCode: string;
    readonly _id: string;
    readonly deviceId: string;
    readonly arrearsCountdown: number;
    readonly online: boolean;
    readonly clientId: string;
    readonly originAgentId: string;
    readonly responseAgentId: string;
    readonly status:UserStatusEnum;
    readonly abandonReason:string;
    readonly from: FromEnum;
    readonly visitCycle: number;
    readonly purchased:boolean;
}
export interface User extends UserSafe {
    readonly certificate: {
        IDCARD_FRONT: CertificatePath;
        IDCARD_BACK: CertificatePath;
        UNI_CREDIT_CODE: CertificatePath;
        OP_BANK_CODE: CertificatePath;
        HAND_IDCARD: CertificatePath;
        SETTLE_BANKCARD: CertificatePath;
        CORP_CODE: CertificatePath;
        BUSINESS_PLACE: CertificatePath;
        BUSINESS_SITE: CertificatePath;
        CASHIER_SCENE: CertificatePath;
    };
    readonly realInfo: {
        type: YeepayTypeEnum;
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
        payRate: number;
        userEditLock: boolean;
        merchantNo: string;
        merNetInOutStatus: string;
        merNetInOutStatusRemark: string;
        merHmacKey: string;
        reportStatus: string;
        configStatus: string;
        active: boolean;
    };
}
