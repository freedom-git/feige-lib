import { Dish } from './dish.interface';
import { Classification } from './classification.interface';
import { Specification } from './specification.interface';
import { Subscription } from './subscription.interface';
import { MemberSavingRule } from './member.interface';
import { TaxTypeEnum } from '../../enum/tax.enum';
import {
    PrinterDeviceTypeEnum,
    PrinterWidthEnum,
    TagPrinterDeviceTypeEnum,
    EncodeTypeEnum,
    MultiLangDirectionEnum,
} from '../../enum/printer.enum';
import { TimeMenuLoopMode } from '../../enum/time-menu.enum';
import { WeekEnum } from '../../enum/common.enum';
import { AnnouncementTargetEnum, AnnouncementTypeEnum } from '../../index';

export interface LangList {
    [key: string]: string;
}
export interface BuffetDishItem {
    readonly dishId: string;
    upperLimit: {
        enable: boolean;
        adult: number;
        child: number;
    };
}

export interface BuffetCombosItems {
    readonly _id: string;
    names: object;
    price: {
        adult: number;
        child: number;
    };
    dishes: BuffetDishItem[];
}

export interface AllergenItem {
    readonly _id: string;
    names: object;
    img: string;
    dishIds: string[];
}

export interface AnnouncementItem {
    readonly _id: string;
    enable: boolean;
    titles: LangList;
    type: AnnouncementTypeEnum;
    targets: AnnouncementTargetEnum[];
    textContents: LangList;
    imageContents: LangList;
}

export interface Store {
    readonly _id: string;
    name: string;
    readonly names?: object;
    readonly auditedNames: object; //审核后的店铺名, 暂时用于发短信
    readonly needAuditNames: boolean; //如果店铺的名字有变化, 这里就要设置为需要重新审核
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
        enableBuffet: boolean;
        enableAllergens: boolean;
        checkoutFirst: boolean;
        defalutNoTax: boolean;
        taxType?: TaxTypeEnum;
        orderReminderInterval: number;
        disableAppendInterval: number;
        canDeleteOrder: boolean;
        tableOrderAutoCheckout: boolean;
        tableOrderAutoCleanTime: number;
        serialOrderAutoCleanTime: number;
        mustPayVersion: boolean;
        freeVersion: boolean;
        proclamationPopUp: boolean;
    };
    readonly takeoutSetting: {
        startingPrice: number;
        deliveryFee: number;
        payType: string[];
        startTime: number;
        endTime: number;
        open: boolean;
        autoConfirm: boolean;
        selfPickUp: boolean;
        enableDelivery: boolean;
        reserveSwitch: boolean;
        reserveTimeLow: number;
        reserveTimeHigh: number;
        nonPaymentSmsVerification: boolean;
        smsVerificationAreaCode: string[];
    };
    readonly buffetSetting: {
        enable: boolean;
        showDishesOutOfBuffetInClient: boolean;
        allowDishNumberExceedSetLimitInClient: boolean;
        buffetCombos: BuffetCombosItems[];
    };
    readonly allergenSetting: {
        enable: boolean;
        allergens: AllergenItem[];
    };
    readonly announcementSetting: {
        announcements: AnnouncementItem[];
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
        takeoutComplete: boolean;
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
    readonly areas: Area[];
    readonly cashDenominations: number[];
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
    showWaiterName?: boolean;
    showSalesmanName?: boolean;
    showUnitPrice?: boolean;
    encodeType?: EncodeTypeEnum;
    extendedPrintingLangs?: string[];
    multiLangDirection?: MultiLangDirectionEnum;
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
    showWaiterName?: boolean;
    showSalesmanName?: boolean;
    addTableNumBeforeDishName?: boolean;
    encodeType?: EncodeTypeEnum;
    extendedPrintingLangs?: string[];
    multiLangDirection?: MultiLangDirectionEnum;
}

export interface LabelPrinter {
    name: string;
    type: TagPrinterDeviceTypeEnum;
    address: string;
    printerNum: number;
    disabled: boolean;
    dishIds: string[];
    preferLang?: string;
}

interface DayLoopItem {
    startMinute: number;
    endMinute: number;
    removeMode: boolean;
    dishId: string[];
}

export interface Area {
    readonly _id?: string;
    readonly name: string;
    readonly tables: Table[];
}

export interface Table {
    readonly _id?: string;
    readonly name: string;
    readonly seatNum: number;
}
