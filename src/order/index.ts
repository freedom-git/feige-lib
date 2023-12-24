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
export function getDishArrFromContents({
    contents,
    lang,
    order,
    showBuffet,
    text,
    addSpecificationsAfterName,
}: {
    contents: Content[];
    lang: string;
    order: Order;
    showBuffet?: boolean;
    text?: {
        adult: string;
        child: string;
    };
    addSpecificationsAfterName?: boolean;
}): PrinteDishInfo[] {
    const result = contents.map((dishGroup) => {
        const selectedNames = [];
        dishGroup.dishSnapshot.selectedSpecifications.forEach((selectedItems) => {
            selectedItems.content.forEach((tag) => {
                selectedNames.push(tag.name);
            });
        });
        let name = getNameFromNames(dishGroup.dishSnapshot.names, lang, CONST.DEFALUT_LANGUAGE) || '';
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
            specifications.push(`${text?.adult}${order.adultNum}`);
        }
        if (order.childNum) {
            specifications.push(`${text?.child}${order.childNum}`);
        }
        result.unshift({
            name: getNameFromNames(order.buffet.snapshot.names, lang, CONST.DEFALUT_LANGUAGE),
            count: 1,
            price: calcBuffetTotalPrice(order.buffet.snapshot, order.adultNum, order.childNum),
            specifications: specifications,
        });
    }
    if (addSpecificationsAfterName) {
        result.forEach((item) => {
            item.name += item.specifications.length > 0 ? `(${item.specifications.join()})` : '';
        });
    }
    return result;
}
