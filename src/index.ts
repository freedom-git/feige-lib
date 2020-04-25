import { Order } from './interfaces/order/order.interface';
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
                if (item.fareType == this.constService.FARE_TYPE.FIXED) {
                    addPrice += item.fare;
                } else if (item.fareType == this.constService.FARE_TYPE.PERCENTAGE) {
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
