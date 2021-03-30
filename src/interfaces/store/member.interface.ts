import { MemberSendTypeEnum } from '../../enum/member.enum';

export interface MemberSavingRule {
    _id: string;
    savingValue: number;
    sendValue: number;
    sendType: MemberSendTypeEnum;
    description: string;
}
