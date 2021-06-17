import { Order, Process, Content, Checkout, Task } from './interfaces/order/order.interface';
import { Store } from './interfaces/store/store.interface';
import { User, UserSafe, CertificatePath } from './interfaces/user/user.interface';
import { DishSnapshot } from './interfaces/store/dishSnapshot.interface';
import { CONST } from './const/const';
import { PrintStatusEnum, PrinterDeviceTypeEnum, PrinterWidthEnum } from './enum/printer.enum';
export * from './enum/member.enum';
export * from './enum/sms.enum';
export * from './enum/checkout.enum';
export * from './enum/yeepay.enum';
export * from './enum/timezone.emum';
export * from './enum/order.enum';
export * from './enum/tax.enum';
export * from './interfaces/member/member.interface';
export * from './interfaces/member/member-transaction.interface';
import * as moment from 'moment';
import { TaxTypeEnum } from './enum/tax.enum';
export {
    Order,
    Process,
    Content,
    Checkout,
    CONST,
    DishSnapshot,
    Store,
    User,
    UserSafe,
    CertificatePath,
    Task,
    moment,
    PrintStatusEnum,
    PrinterDeviceTypeEnum,
    PrinterWidthEnum,
};

/**
 * 小数转化为金额,去除分位之后的尾数
 *
 * @param {number} num  需要转换的数字
 * @returns {number} 返回只保留两位小数的money
 */
export function parseMoney(num: number): number {
    return Math.round(num * 100) / 100;
}

/**
 * 计算加了规格后的菜品单价
 *
 * @param  {Content}  conent  单个菜品内容
 * @returns {number} 返回订单总金额
 *
 */
export function calcDishFinalPrice(conent: Content): number {
    let addPrice = 0;
    const selectedSpecifications = conent.dishSnapshot.selectedSpecifications || [];
    selectedSpecifications.forEach((specification) => {
        if (!specification) {
            return;
        }
        specification.content.forEach((item) => {
            if (item.fareType == CONST.FARE_TYPE.FIXED) {
                addPrice += item.fare;
            } else if (item.fareType == CONST.FARE_TYPE.PERCENTAGE) {
                addPrice += (conent.dishSnapshot.price * item.fare) / 100;
            }
        });
    });
    let dishPrice = conent.dishSnapshot.price + addPrice;
    if (dishPrice < 0) {
        dishPrice = 0;
    }
    return parseMoney(dishPrice);
}

/**
 * 利用订单计算总价
 *
 * @param  {object}  order  订单
 * @returns {number} 返回订单总金额
 *
 */
export function calcTotalPrice(order: Order): number {
    let totalPrice = 0;
    order.content.forEach((orderContentItem) => {
        totalPrice += orderContentItem.count * calcDishFinalPrice(orderContentItem);
    });
    if (order.deliveryFee) {
        totalPrice += order.deliveryFee;
    }
    return parseMoney(totalPrice);
}

/**
 * 计算处理后的应收金额
 *
 * @param {object} order  订单
 * @param {Array} processArr  结账处理过程
 * @param noTax
 * @param taxEnable
 * @returns {object} 返回应收订单总金额，以及处理计算过程
 */
export function calcReceivablePrice(
    order: Order,
    processArr: Process[],
    noTax = false,
): {
    resultProcessArr: Process[];
    receivablePrice: number;
    taxArr: {
        name: string;
        volume: number;
    }[];
    totalPrice: number;
    totalDiscountPrice: number;
} {
    let totalDiscountPrice = 0;
    const resultProcessArr = [];
    const totalPrice = calcTotalPrice(order);
    let receivablePrice = totalPrice;
    const sortedProcessArr = processArr.sort((a, b) => {
        return (
            CONST.RECEIVABLE_PROCESSING_TYPE[b.type.toUpperCase()].SORT -
            CONST.RECEIVABLE_PROCESSING_TYPE[a.type.toUpperCase()].SORT
        );
    });
    let totalMarkDown = 0;
    let receivablePriceAfterDiscount = receivablePrice;
    sortedProcessArr.forEach((process) => {
        if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE) {
            const rate = -(10 - process.value) / 10;
            let volume = 0;
            order.content.forEach((orderContentItem) => {
                if (orderContentItem.dishSnapshot.noFullOrderDiscount) {
                    return;
                }
                const dishTotalPrice = orderContentItem.count * calcDishFinalPrice(orderContentItem);
                totalDiscountPrice += dishTotalPrice;
                volume += dishTotalPrice * rate;
            });
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume,
            });
            receivablePrice += volume;
            receivablePriceAfterDiscount = receivablePrice;
        } else if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE) {
            const volume = -process.value;
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume,
            });
            receivablePrice += volume;
            totalMarkDown += -volume;
        } else if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.TYPE) {
            const pow = Math.pow(10, process.value - 2);
            const result = Math.floor(receivablePrice / pow) * pow;
            const volume = -(receivablePrice - result);
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume,
            });
            receivablePrice += volume;
            totalMarkDown += -volume;
        }
    });
    const taxObj = {};
    if (order.taxType === TaxTypeEnum.PriceNoTaxBindDish && !noTax) {
        order.content.forEach((orderContentItem) => {
            if (!orderContentItem.dishSnapshot.taxes || orderContentItem.dishSnapshot.taxes.length === 0) {
                return;
            }
            const discountValue = sortedProcessArr.find(
                (process) => process.type === CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE,
            )?.value;
            let dishTotalPrice = orderContentItem.count * calcDishFinalPrice(orderContentItem);
            if (discountValue && !orderContentItem.dishSnapshot.noFullOrderDiscount) {
                const rate = -(10 - discountValue) / 10;
                dishTotalPrice += dishTotalPrice * rate;
            }
            const sharedMarkDown = (totalMarkDown * dishTotalPrice) / receivablePriceAfterDiscount;
            orderContentItem.dishSnapshot.taxes.forEach((tax) => {
                const taxFare = (dishTotalPrice - sharedMarkDown) * tax.rate;
                const taxKey = `${tax.name}(${tax.rate * 100}%)`;
                taxObj[taxKey] = (taxObj[taxKey] || 0) + parseMoney(taxFare);
            });
        });
    } else if (order.taxType === TaxTypeEnum.PriceHaveTaxBindOrder && !noTax) {
        let totalTaxRate = 0;
        order.priceHaveTaxBindOrderTaxes.forEach((item) => {
            totalTaxRate += item.rate;
        });
        const totalTaxFare = receivablePrice - receivablePrice / (totalTaxRate + 1);
        order.priceHaveTaxBindOrderTaxes.forEach((item) => {
            const taxFare = (item.rate / totalTaxRate) * totalTaxFare;
            const taxKey = `${item.name}(${item.rate * 100}%)`;
            taxObj[taxKey] = (taxObj[taxKey] || 0) + parseMoney(taxFare);
        });
    }
    const taxArr = [];
    for (const name in taxObj) {
        taxArr.push({
            name,
            volume: taxObj[name],
        });
        if (order.taxType === TaxTypeEnum.PriceNoTaxBindDish) {
            receivablePrice += taxObj[name];
        }
    }
    taxArr.sort((item1, item2) => item1.name - item2.name);
    return {
        resultProcessArr,
        receivablePrice: parseMoney(receivablePrice),
        taxArr,
        totalPrice,
        totalDiscountPrice,
    };
}

/**
 * 计算已收金额
 *
 * @param {Array} checkoutArr  结账记录
 * @returns {number} 返回已收总金额
 */
export function calcReceived(checkoutArr: Checkout[]): number {
    if (!checkoutArr) {
        checkoutArr = [];
    }
    let totalPaid = 0;
    checkoutArr.forEach((checkout) => {
        if (!checkout.retreated) {
            totalPaid += checkout.amount;
        }
    });
    return parseMoney(totalPaid);
}

/**
 * 计算剩余金额,去除尾数
 *
 * @param {number} receivablePrice  应收
 * @param {number} received  已收
 * @returns {number} 返回已收总金额
 */
export function calcLeft(receivablePrice: number, received: number): number {
    const left = receivablePrice - received;
    return parseMoney(left);
}

/**
 * 获得可读的订单处理过程
 *
 * @param {Process} process  订单处理过程
 * @returns {string} 返回可读字符串
 */
export function getReadbleProcess(process: Process): string {
    let result = '';
    if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE) {
        result = '打' + process.value + '折';
    } else {
        result = CONST.RECEIVABLE_PROCESSING_TYPE[process.type.toUpperCase()].TEXT;
    }
    return result;
}

export enum CHECK_STORE_SUBSCRIPTION_REASON {
    NeedBuy = 1,
    Expires = 2,
}
/**
 * 检查店铺是否开通了特定的功能
 *
 * @param {Store} store  店铺
 * @param {string} moduleId  功能id
 * @param {string | Date | number} now 对比时间
 * @returns {string} 返回可读字符串
 */
export function checkStoreSubscription(
    store: Store,
    moduleId: string,
    now?: string | Date | number,
): { result: boolean; reason: CHECK_STORE_SUBSCRIPTION_REASON } {
    let result;
    let reason: CHECK_STORE_SUBSCRIPTION_REASON;
    // 检查永久开通
    if (store.subscription && store.subscription[moduleId] && store.subscription[moduleId].permanent) {
        return {
            result: true,
            reason,
        };
    }
    // 非永久开通，检查过期时间
    if (!(store.subscription && store.subscription[moduleId] && store.subscription[moduleId].expires)) {
        result = false;
        reason = CHECK_STORE_SUBSCRIPTION_REASON.NeedBuy;
    } else if (moment(store.subscription[moduleId].expires).isBefore(now ? moment(now) : moment())) {
        result = false;
        reason = CHECK_STORE_SUBSCRIPTION_REASON.Expires;
    } else {
        result = true;
    }
    return {
        result,
        reason,
    };
}

/**
 * 根据店铺获取当前应该用的语言
 *
 * @param {Store} store  店铺
 * @param {string} wantLang  想要的语言
 * @param {string | Date | number} now 对比时间
 * @returns {object} 返回当前语言和可用语言
 */
export function getCurrentLangAndRange(
    store: Store,
    wantLang: string,
    now?: string | Date | number,
): { currentLang: string; availableLangs: string[] } {
    let result = store.defaultLang;
    let langs: string[] = [store.defaultLang]; //可用语言范围
    if (checkStoreSubscription(store, CONST.BUSINESS.SUPER_MULTI_LANGUAGE.ID, now).result) {
        langs = CONST.LANGUAGE.map((lang) => lang.code);
    } else if (checkStoreSubscription(store, CONST.BUSINESS.MULTI_LANGUAGE.ID, now).result) {
        langs = store.subscription.multiLanguage.allow;
    }
    if (wantLang && langs.filter((item) => wantLang.includes(item)).length > 0) {
        result = wantLang;
    }
    return {
        currentLang: result,
        availableLangs: langs,
    };
}

/**
 * 在语言对象中找到当前语言最匹配的值，
 * 1. 精确匹配
 * 2. 如果没有精确匹配，寻找默认语言
 * 3. 如果默认语言也没有匹配，则返回第一个不为空的语言
 * 4. 如果都为空，那么返回undefinded
 *
 * @param {object} names  语言
 * @param {string} currentLang  目标语言
 * @param {string} defaultLang  默认语言
 * @returns {string} 返回当前语言的值
 */
export function getNameFromNames(names: object, currentLang: string, defaultLang: string): string {
    return (
        names &&
        (names[currentLang] || names[defaultLang] || names[Object.keys(names).filter((name) => names[name])[0]])
    );
}

/**
 * 根据语言返回处理过的店铺数据
 *
 * @param {Store} store  店铺
 * @param {string} currentLang  目标语言
 * @param {string} defaultLang  默认语言
 * @returns {object} 返回当前语言和可用语言
 */
export function getStoreByLanguage(store: Store, currentLang: string, defaultLang: string): Store {
    store.name = getNameFromNames(store.names, currentLang, defaultLang) || store.name;
    store.description = getNameFromNames(store.descriptions, currentLang, defaultLang) || store.description;
    store.classifications.forEach((classification) => {
        classification.name = getNameFromNames(classification.names, currentLang, defaultLang) || classification.name;
    });
    store.dishes.forEach((dish) => {
        dish.name = getNameFromNames(dish.names, currentLang, defaultLang) || dish.name;
        dish.description = getNameFromNames(dish.descriptions, currentLang, defaultLang) || dish.description;
    });
    store.specifications.forEach((specifications) => {
        specifications.name = getNameFromNames(specifications.names, currentLang, defaultLang) || specifications.name;
        specifications.content.forEach((content) => {
            content.name = getNameFromNames(content.names, currentLang, defaultLang) || content.name;
        });
    });
    return store;
}

/**
 * 根据语言返回处理过的店铺数据
 *
 * @param {Content} content 订单内容
 * @param {string} currentLang  目标语言
 * @param {string} defaultLang  默认语言
 * @returns {Content} 返回当前语言的订单
 */
function getContentByLanguage(content: Content, currentLang: string, defaultLang: string): Content {
    const dish = content.dishSnapshot;
    dish.name = getNameFromNames(dish.names, currentLang, defaultLang) || dish.name;
    if (dish.selectedSpecifications) {
        dish.selectedSpecifications &&
            dish.selectedSpecifications.forEach((specification) => {
                specification.name =
                    getNameFromNames(specification.names, currentLang, defaultLang) || specification.name;
                specification.content.forEach((tag) => {
                    tag.name = getNameFromNames(tag.names, currentLang, defaultLang) || tag.name;
                });
            });
    }
    return content;
}

/**
 * 根据语言返回处理过的订单数据
 *
 * @param {Order} order  店铺
 * @param {string} currentLang  目标语言
 * @param {string} defaultLang  默认语言
 * @returns {Order} 返回当前语言的订单
 */
export function getOrderByLanguage(order: Order, currentLang: string, defaultLang: string): Order {
    if (order.content) {
        order.content.map((dishGroup) => {
            return getContentByLanguage(dishGroup, currentLang, defaultLang);
        });
    }
    if (order.tasks) {
        order.tasks.forEach((task) => {
            if (task.content) {
                task.content.map((dishGroup) => {
                    return getContentByLanguage(dishGroup, currentLang, defaultLang);
                });
            }
        });
    }
    return order;
}

/**
 * 根据电话区号返回语言码,如果没找到，返回英文
 *
 * @param {string} countryCode  区号
 * @returns {string} 语言代码的小写格式
 */
export function getLanguageFromCountryCode(countryCode): string {
    const data = {
        '86': 'zh',
    };
    const languageCode = data[String(countryCode)] || 'en';
    return languageCode;
}
