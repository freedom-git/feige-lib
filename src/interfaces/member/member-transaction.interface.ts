import { MemberTransactionTypeEnum, MemberSendTypeEnum } from '../../enum/member.enum';
import { MemberCheckoutTypeEnum } from '../../enum/checkout.enum';
export interface MemberTransaction {
    _id?: string;
    memberId: string;
    storeId: string;
    type: MemberTransactionTypeEnum;
    balance: number;
    value: number;
    createDate: Date;

    orderId: string; // 消费类型的时候记录订单id，退款的时候记录退款的订单id

    note: string; //补录和扣除的备注
    salesman: string; //补录和扣除的操作人id

    canceledSavingId: string; // 取消的会员充值交易id

    savingRule: {
        // 存储类型的时候记录存储方式快照
        savingValue: number;
        sendValue: number;
        sendType: MemberSendTypeEnum;
        description: string;
    };
    checkout: {
        type: MemberCheckoutTypeEnum;
        amount: number;
        retreated: boolean;
        payRecordId: string;
    };
}
