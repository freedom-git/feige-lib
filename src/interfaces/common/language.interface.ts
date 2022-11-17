import { EncodeTypeEnum } from '../../enum/printer.enum';
import { DateFormat } from '../../enum/common.enum';
export interface LanguageItem {
    readonly name: string;
    readonly img: string; // 语言对应图片的url
    readonly code: string;
    readonly speechCode: string;
    readonly speechLang?: string;
    readonly fontFamily?: string;
    readonly dateFormat: DateFormat;
    readonly defaultAreaCode: string;
    readonly rtl?: boolean;
    readonly codepage: string;
    readonly defaultPrintEncodeType: EncodeTypeEnum;
}
