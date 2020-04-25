import { Order, Process } from './interfaces/order/order.interface';
export { Order, Process };
/**
 * 利用订单计算总价
 *
 * @param  {object}  order  订单
 * @returns {number} 返回订单总金额
 *
 */
export declare function calcTotalPrice(order: Order): number;
/**
 * 计算处理后的应收金额
 *
 * @param {number} totalPrice  订单总额
 * @param {Array} processArr  结账处理过程
 * @returns {object} 返回应收订单总金额，以及处理计算过程
 */
export declare function calcReceivablePrice(totalPrice: number, processArr: Process[]): {
    resultProcessArr: Process[];
    receivablePrice: number;
};
