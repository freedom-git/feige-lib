"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 利用订单计算总价
 *
 * @param  {object}  order  订单
 * @returns {number} 返回订单总金额
 *
 */
function calcTotalPrice(order) {
    var _this = this;
    var totalPrice = 0;
    order.content.forEach(function (orderContentItem) {
        var addPrice = 0;
        var selectedSpecifications = orderContentItem.dishSnapshot.selectedSpecifications || [];
        selectedSpecifications.forEach(function (specification) {
            specification.content.forEach(function (item) {
                if (item.fareType == _this.constService.FARE_TYPE.FIXED) {
                    addPrice += item.fare;
                }
                else if (item.fareType == _this.constService.FARE_TYPE.PERCENTAGE) {
                    addPrice += (orderContentItem.dishSnapshot.price * item.fare) / 100;
                }
            });
        });
        var dishPrice = orderContentItem.dishSnapshot.price + addPrice;
        if (dishPrice < 0) {
            dishPrice = 0;
        }
        totalPrice += orderContentItem.count * dishPrice;
    });
    return totalPrice;
}
exports.calcTotalPrice = calcTotalPrice;
