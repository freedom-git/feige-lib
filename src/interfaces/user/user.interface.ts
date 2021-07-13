import { YeepayTypeEnum } from '../../enum/yeepay.enum';
import { FromEnum } from '../../enum/from.enum';
import { UserStatusEnum } from '../../enum/user-status.enum';
import { PayCompanyEnum } from '../../enum/pay-company.enum';
export interface CertificatePath {
    origin: string;
    yeepay: string;
    fubei: string;
}
export interface UserSafe {
    readonly mobile: string;
    readonly countryCode: string;
    readonly password: string;
    readonly _id: string;
    readonly deviceId: string;
    readonly arrearsCountdown: number;
    readonly online: boolean;
    readonly clientId: string;
    readonly originAgentId: string;
    readonly responseAgentId: string;
    readonly status: UserStatusEnum;
    readonly abandonReason: string;
    readonly lostReason: string;
    readonly from: FromEnum;
    readonly visitCycle: number;
    readonly purchased: boolean;
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
    readonly pay: {
        active: boolean;
        company: PayCompanyEnum;
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
    readonly fubei: {
        payRate: number;
        merchant_id: number; // 付呗商户号
        merchant_code: string; // 付呗登陆账号
        app_id: string;
        app_secret: string;
        store_id: number; // 门店id
        sub_mch_id: string; // 当前渠道下对应的微信子商户号
        alipay_msid: string; // 当前渠道下对应的支付宝子商户号
        merchant_status: number; // 商户实名认证状态：0 未认证、1 认证中、2 认证成功、3 认证失败
        wechat_auth_status: string; // 商户微信认证状态：UNAUTHORIZED 未认证、AUTHORIZED 已认证、UNKNOWN 未知
        store_status: number; // 门店状态：1 待审核、2 审核通过、3 审核驳回
        error_msg: string; // 错误信息
    };
    readonly mpAlipay?: {
        authAppId: string;
        componentAppId: string;
        appRefreshToken: string;
        appAuthToken: string;
        templateVersion: string;
    };
    readonly mpWechat?: {
        fasteRegisterStatus: string;
        fasteRegisterMsg: string;
        authAppId: string;
        componentAppId: string;
        appRefreshToken: string;
        templateVersion: string;
    };
}
