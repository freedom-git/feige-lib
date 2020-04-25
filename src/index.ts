import { Order, Process } from './interfaces/order/order.interface';
export { Order, Process };

import { CONST } from './const/const';
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
            CONST.RECEIVABLE_PROCESSING_TYPE[b.type.toUpperCase()].sort -
            CONST.RECEIVABLE_PROCESSING_TYPE[a.type.toUpperCase()].sort
        );
    });
    sortedProcessArr.forEach((process) => {
        if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.type) {
            const volume = (-(10 - process.value) / 10) * totalPrice;
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume,
            });
            receivablePrice += volume;
        } else if (process.type === CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type) {
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
