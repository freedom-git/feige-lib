import { MemberSexEnum } from '../../enum/member.enum';
export interface Member {
    readonly _id: string;
    readonly storeId: string;
    readonly mobile: string;
    readonly name: string;
    readonly sex: MemberSexEnum;
    readonly countryCode: string;
    readonly enable: boolean;
    readonly credit: boolean;
    readonly note: string;
    readonly balance: number;
    readonly salesman: string;
    readonly birthday: Date;
    readonly createDate: Date;
}
