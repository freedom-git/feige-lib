import { Dish } from './dish.interface';
import { Classification } from './classification.interface';
import { Specification } from './specification.interface';
import { Subscription } from './subscription.interface';
import { MemberSavingRule } from './member.interface';
import { TaxTypeEnum } from '../../enum/tax.enum';
import { PrinterDeviceTypeEnum, PrinterWidthEnum } from '../../enum/printer.enum';
import { TimeMenuLoopMode } from '../../enum/time-menu.enum';
import { WeekEnum } from '../../enum/common.enum';

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
        mustPayVersion: boolean;
        freeVersion: boolean;
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
    readonly receptionPrinters: ReceptionPrinter[];
    readonly chefPrinters: ChefPrinter[];
    readonly labelPrinters: LabelPrinter[];
    readonly timeMenu: {
        enable: boolean;
        hideDisabledProductions: boolean;
        loopMode: TimeMenuLoopMode;
        dayLoop: DayLoopItem[];
        weekLoop: {
            Mon: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
            Tue: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
            Wed: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
            Thu: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
            Fri: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
            Sat: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
            Sun: {
                sameAs: WeekEnum;
                dayLoop: DayLoopItem[];
            };
        };
    };
    readonly customPayment: {
        name: string;
        enabled: boolean;
    }[];
}

export interface ReceptionPrinter {
    _id: string;
    name: string;
    type: PrinterDeviceTypeEnum;
    address: string;
    bluetoothName: string;
    printerWidth: PrinterWidthEnum;
    printerNum: number;
    disabled: boolean;
    mergeDishes: boolean;
    bigFont: boolean;
    isPrepayOrderPrinteWithTotalPrice: boolean;
    isAutoPrinteAfterConfirm: boolean;
    isAutoPrinteAfterCheckout: boolean;
    preferLang?: string;
    printChineseAndEnglishAsImg?: boolean;
    largeLineHeight?: boolean;
    lineBetweenDishes?: boolean;
    specificationInNewLine?: boolean;
    customInformationAtStart?: string;
    customInformationAtEnd?: string;
}

export interface ChefPrinter {
    name: string;
    type: PrinterDeviceTypeEnum;
    address: string;
    bluetoothName: string;
    printerWidth: PrinterWidthEnum;
    printerNum: number;
    disabled: boolean;
    bigFont: boolean;
    dishIds: string[];
    mergeDishes: boolean;
    isSeparateDishes: boolean;
    isSeparateDishesWithTotal: boolean;
    preferLang?: string;
    printChineseAndEnglishAsImg?: boolean;
    largeLineHeight?: boolean;
    lineBetweenDishes?: boolean;
    specificationInNewLine?: boolean;
    countFront?: boolean;
}

export interface LabelPrinter {
    name: string;
    type: PrinterDeviceTypeEnum;
    address: string;
    printerNum: number;
    disabled: boolean;
    dishIds: string[];
}

interface DayLoopItem {
    startMinute: number;
    endMinute: number;
    removeMode: boolean;
    dishId: string[];
}
