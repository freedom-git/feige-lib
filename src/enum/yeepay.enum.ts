// UNI_CREDIT_CODE=统一社会信用代码证；CORP_CODE＝营业执照
export enum YeepayMerCertTypeEnum {
    UNI_CREDIT_CODE = 'UNI_CREDIT_CODE',
    CORP_CODE = 'CORP_CODE',
}

//LEGAL_PERSON:法人 CONTROLLER:实际控制人 AGENT:代理人 OTHER:其他人
export enum YeepayContactTypeEnum {
    LEGAL_PERSON = 'LEGAL_PERSON',
    CONTROLLER = 'CONTROLLER',
    AGENT = 'AGENT',
    OTHER = 'OTHER',
}

export enum YeepayTypeEnum {
    PERSON = 'PERSON',
    INDIVIDUAL = 'INDIVIDUAL',
    ENTERPRISE_THREE_CERTIFICATE = 'ENTERPRISE_THREE_CERTIFICATE', //非三证合一
    ENTERPRISE_ONE_CERTIFICATE = 'ENTERPRISE_ONE_CERTIFICATE', //三证合一
}
