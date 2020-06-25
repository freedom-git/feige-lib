import { Order, Process, Content, Checkout, Task } from './interfaces/order/order.interface';
import { Store } from './interfaces/store/store.interface';
import { DishSnapshot } from './interfaces/store/dishSnapshot.interface';
import { CONST } from './const/const';
import * as moment from 'moment';
export { Order, Process, Content, Checkout, CONST, DishSnapshot, Store, Task, moment };

/**
 * 小数转化为金额,去除分位之后的尾数，向下取数，不做四舍五入
 *
 * @param {number} num  需要转换的数字
 * @returns {number} 返回只保留两位小数的money
 */
export function parseMoney(num: number): number {
    return Math.round(num * 100) / 100;
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
        let addPrice = 0;
        const selectedSpecifications = orderContentItem.dishSnapshot.selectedSpecifications || [];
        selectedSpecifications.forEach((specification) => {
            if (!specification) {
                return;
            }
            specification.content.forEach((item) => {
                if (item.fareType == CONST.FARE_TYPE.FIXED) {
                    addPrice += item.fare;
                } else if (item.fareType == CONST.FARE_TYPE.PERCENTAGE) {
                    addPrice += (orderContentItem.dishSnapshot.price * item.fare) / 100;
                }
            });
        });
        let dishPrice = orderContentItem.dishSnapshot.price + addPrice;
        if (dishPrice < 0) {
            dishPrice = 0;
        }
        totalPrice += orderContentItem.count * dishPrice;
    });
    return parseMoney(totalPrice);
}

/**
 * 计算处理后的应收金额
 *
 * @param {number} totalPrice  订单总额
 * @param {Array} processArr  结账处理过程
 * @returns {object} 返回应收订单总金额，以及处理计算过程
 */
export function calcReceivablePrice(
    totalPrice: number,
    processArr: Process[],
): {
    resultProcessArr: Process[];
    receivablePrice: number;
} {
    const resultProcessArr = [];
    let receivablePrice = totalPrice;
    const sortedProcessArr = processArr.sort((a, b) => {
        return (
            CONST.RECEIVABLE_PROCESSING_TYPE[b.type.toUpperCase()].SORT -
            CONST.RECEIVABLE_PROCESSING_TYPE[a.type.toUpperCase()].SORT
        );
    });
    sortedProcessArr.forEach((process) => {
        if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.TYPE) {
            const volume = (-(10 - process.value) / 10) * totalPrice;
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume,
            });
            receivablePrice += volume;
        } else if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.MARKDOWN.TYPE) {
            const volume = -process.value;
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume,
            });
            receivablePrice += volume;
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
        }
    });
    return {
        resultProcessArr,
        receivablePrice: parseMoney(receivablePrice),
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
        totalPaid += checkout.amount;
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
 * @returns {string} 返回可读字符串
 */
export function checkStoreSubscription(
    store: Store,
    moduleId: string,
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
    } else if (moment(store.subscription[moduleId].expires).isBefore(moment())) {
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
