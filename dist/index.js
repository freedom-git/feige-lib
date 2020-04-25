"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const/const");
/**
 * 利用订单计算总价
 *
 * @param  {object}  order  订单
 * @returns {number} 返回订单总金额
 *
 */
function calcTotalPrice(order) {
    var totalPrice = 0;
    order.content.forEach(function (orderContentItem) {
        var addPrice = 0;
        var selectedSpecifications = orderContentItem.dishSnapshot.selectedSpecifications || [];
        selectedSpecifications.forEach(function (specification) {
            specification.content.forEach(function (item) {
                if (item.fareType == const_1.CONST.FARE_TYPE.FIXED) {
                    addPrice += item.fare;
                }
                else if (item.fareType == const_1.CONST.FARE_TYPE.PERCENTAGE) {
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
/**
 * 计算处理后的应收金额
 *
 * @param {number} totalPrice  订单总额
 * @param {Array} processArr  结账处理过程
 * @returns {object} 返回应收订单总金额，以及处理计算过程
 */
function calcReceivablePrice(totalPrice, processArr) {
    var resultProcessArr = [];
    var receivablePrice = totalPrice;
    var sortedProcessArr = processArr.sort(function (a, b) {
        return (const_1.CONST.RECEIVABLE_PROCESSING_TYPE[b.type.toUpperCase()].sort -
            const_1.CONST.RECEIVABLE_PROCESSING_TYPE[a.type.toUpperCase()].sort);
    });
    sortedProcessArr.forEach(function (process) {
        if (process.type === const_1.CONST.RECEIVABLE_PROCESSING_TYPE.DISCOUNT.type) {
            var volume = (-(10 - process.value) / 10) * totalPrice;
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume: volume,
            });
            receivablePrice += volume;
        }
        else if (process.type === const_1.CONST.RECEIVABLE_PROCESSING_TYPE.REMOVE_TAILS.type) {
            var pow = Math.pow(10, process.value - 2);
            var result = Math.floor(receivablePrice / pow) * pow;
            var volume = -(receivablePrice - result);
            resultProcessArr.push({
                type: process.type,
                value: process.value,
                volume: volume,
            });
            receivablePrice += volume;
        }
    });
    return {
        resultProcessArr: resultProcessArr,
        receivablePrice: receivablePrice,
    };
}
exports.calcReceivablePrice = calcReceivablePrice;
