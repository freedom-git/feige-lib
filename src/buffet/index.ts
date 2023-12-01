import { BuffetCombosItems, BuffetDishItem } from '../index';
/**
 * 计算自助餐总价
 */

/**
 *
 */
export function getDishItemInBuffet({
    dishId,
    buffet,
}: {
    dishId: string;
    buffet?: BuffetCombosItems;
}): BuffetDishItem | undefined {
    return buffet?.dishes.find((item) => String(item.dishId) === String(dishId));
}

/**
 *
 */
export function getMaxBuffetDishUpperLimit({
    buffetDishItem,
    adultNum,
    childNum,
}: {
    buffetDishItem: BuffetDishItem;
    adultNum: number;
    childNum: number;
}): number {
    if (!buffetDishItem) throw 'No buffet dish item';
    if (!buffetDishItem.upperLimit.enable) return Infinity;
    return Math.ceil(buffetDishItem.upperLimit.adult * adultNum + buffetDishItem.upperLimit.child * childNum);
}

/**
 * @param buffetCombosItem
 * @param adultNum
 * @param childNum
 */
export function calcBuffetTotalPrice(buffetCombosItem: BuffetCombosItems, adultNum: number, childNum: number): number {
    return buffetCombosItem.price.adult * adultNum + buffetCombosItem.price.child * childNum;
}

/**
 *
 */
export function dishShowPriceWithBuffet({
    dishPrice,
    dishId,
    buffet,
    orderedCound,
    adultNum,
    childNum,
}: {
    dishPrice: number;
    dishId: string;
    buffet?: BuffetCombosItems;
    orderedCound: number;
    adultNum: number;
    childNum: number;
}) {
    const buffetDishItem = getDishItemInBuffet({ dishId, buffet });
    if (buffetDishItem) {
        if (orderedCound < getMaxBuffetDishUpperLimit({ buffetDishItem, adultNum, childNum })) {
            return 0;
        } else {
            return dishPrice;
        }
    } else {
        return dishPrice;
    }
}
