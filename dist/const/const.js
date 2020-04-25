"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Const = /** @class */ (function () {
    function Const() {
        this.ROLE = {
            MANAGER: 'manager',
            WAITER: 'waiter',
            CHEF: 'chef',
        };
        this.TASK_TYPE = {
            CHECK: 'check',
            DELIVER: 'deliver',
            CALL: 'call',
            CLEAN: 'clean',
            APPEND: 'append',
        };
        this.CHECKOUT_TYPE = {
            CASH: 'cash',
            MYQR: 'myqr',
        };
        this.RECEIVABLE_PROCESSING_TYPE = {
            // 收款处理类型
            REMOVE_TAILS: 'remove-tails',
        };
        this.STORE_TYPE = {
            STALL: 'stall',
            RESTAURANT: 'restaurant',
        };
        this.STATUS = {
            PENDING: 'pending',
            FINISHED: 'finished',
            PROCESSING: 'processing',
            CANCELLED: 'cancelled',
        };
        this.CODE = {
            ERROR: -1,
            MEMBER_LEVEL_ERROR: -2,
        };
        this.FARE_TYPE = {
            FIXED: 'fixed',
            PERCENTAGE: 'percentage',
        };
        this.ENV = {
            DEV: 'dev',
            TEST: 'test',
            CANARY: 'canary',
            PRODUCTION: 'production',
        };
    }
    return Const;
}());
exports.CONST = new Const();
