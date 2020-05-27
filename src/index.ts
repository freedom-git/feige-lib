import { Order, Process, Content, Checkout, Task } from './interfaces/order/order.interface';
import { Store } from './interfaces/store/store.interface';
import { DishSnapshot } from './interfaces/store/dishSnapshot.interface';
import { CONST } from './const/const';

export { Order, Process, Content, Checkout, CONST, DishSnapshot, Store, Task };

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
    return totalPrice;
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
        receivablePrice,
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
    return totalPaid;
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
    return Math.round(left * 100) / 100;
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
