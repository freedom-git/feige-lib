import { MemberSendTypeEnum } from '../../enum/member.enum';

export interface MemberSavingRule {
    savingValue: number;
    sendValue: number;
    sendType: MemberSendTypeEnum;
    description: string;
}
