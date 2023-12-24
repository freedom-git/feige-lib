import {
    DishType,
    Order,
    CONST,
    getNameFromNames,
    Content,
    calcBuffetTotalPrice,
    calcContentPrice,
    OrderTypeEnum,
} from '../index';

export interface PrinteDishInfo {
    name: string;
    count: number;
    price: number;
    specifications: string[];
}

/**
 *
 */
export async function getDishArrFromContents({
    contents,
    lang,
    specificationInNewLine,
    order,
    showBuffet,
}: {
    contents: Content[];
    lang: string;
    specificationInNewLine: boolean;
    order: Order;
    showBuffet?: boolean;
}): Promise<PrinteDishInfo[]> {
    const result = contents.map((dishGroup) => {
        const selectedNames = [];
        dishGroup.dishSnapshot.selectedSpecifications.forEach((selectedItems) => {
            selectedItems.content.forEach((tag) => {
                selectedNames.push(tag.name);
            });
        });
        let name = dishGroup.dishSnapshot.name;
        if (!specificationInNewLine && selectedNames.length > 0) {
            name += `(${selectedNames.join()})`;
        }
        if (dishGroup.dishSnapshot.type === DishType.Weigh) {
            name += `(${dishGroup.weight}${
                getNameFromNames(dishGroup.dishSnapshot.units, lang, CONST.DEFALUT_LANGUAGE) || ''
            })`;
        }
        return {
            name,
            count: dishGroup.count,
            price:
                calcContentPrice({
                    orderContentItem: dishGroup,
                    buffetItem: order.buffet?.snapshot,
                    orderType: order.type,
                    adultNum: order.adultNum,
                    childNum: order.childNum,
                    contents: order.content,
                }) / dishGroup.count,
            specifications: selectedNames,
        };
    });
    if (showBuffet && order.type === OrderTypeEnum.Buffet) {
        const specifications = [];
        if (order.adultNum) {
            specifications.push(`${await this.i18n.translate('printer.TEMPLATE.ADULT', { lang })}${order.adultNum}`);
        }
        if (order.childNum) {
            specifications.push(`${await this.i18n.translate('printer.TEMPLATE.CHILD', { lang })}${order.childNum}`);
        }
        result.unshift({
            name:
                getNameFromNames(order.buffet.snapshot.names, lang, CONST.DEFALUT_LANGUAGE) +
                `(${specifications.join()})`,
            count: 1,
            price: calcBuffetTotalPrice(order.buffet.snapshot, order.adultNum, order.childNum),
            specifications: specifications,
        });
    }
    return result;
}
