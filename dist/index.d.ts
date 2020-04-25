import { Order } from './interfaces/order/order.interface';
/**
 * 利用订单计算总价
 *
 * @param  {object}  order  订单
 * @returns {number} 返回订单总金额
 *
 */
export declare function calcTotalPrice(order: Order): number;
