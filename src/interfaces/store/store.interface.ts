import { Dish } from './dish.interface';
import { Classification } from './classification.interface';
import { Specification } from './specification.interface';
import { Subscription } from './subscription.interface';
import { MemberSavingRule } from './member.interface';
import { TaxTypeEnum } from '../../enum/tax.enum';

export interface Store {
    readonly _id: string;
    name: string;
    readonly names?: object;
    readonly img: string;
    readonly phone: string;
    description: string;
    readonly descriptions?: object;
    readonly type: string;
    readonly currency: string;
    readonly defaultLang: string;
    readonly timeZoneNum: number;
    readonly autoClean: boolean;
    readonly forceClean: boolean;
    readonly userId: string;
    readonly close: boolean;
    readonly multiLanguage: boolean;
    readonly dishes: Dish[];
    readonly classifications: Classification[];
    readonly specifications: Specification[];
    readonly subscription: Subscription;
    readonly date: string | Date;
    readonly setting: {
        autoConfirm: boolean;
        clientPay: boolean;
        waiterCheckout: boolean;
        cashBox: boolean;
        openCashBoxWhenPay: boolean;
        closeTime: number;
        enableTaxes: boolean;
        checkoutFirst: boolean;
        defalutNoTax: boolean;
        taxType?: TaxTypeEnum;
        orderReminderInterval: number;
        disableAppendInterval: number;
        canDeleteOrder: boolean;
        tableOrderAutoCheckout: boolean;
        tableOrderAutoCleanTime: number;
    };
    readonly takeoutSetting: {
        startingPrice: number;
        deliveryFee: number;
        payType: string[];
        startTime: number;
        endTime: number;
        open: boolean;
        autoConfirm: boolean;
    };
    readonly memberSetting: {
        savingRules: MemberSavingRule[];
        security: {
            paymentVerification: boolean;
            paymentVerificationLimit: number;
        };
    };
    readonly smsNum: number;
    readonly smsNotificationSetting: {
        becomeMember: boolean;
        memberSave: boolean;
        memberPayout: boolean;
        takeoutConfirm: boolean;
        takeoutCancel: boolean;
    };
    readonly taxes: {
        name: string;
        rate: number;
        dishIds: string[];
    }[];
    readonly priceHaveTaxBindOrderTaxes: {
        name: string;
        rate: number;
    }[];
}
