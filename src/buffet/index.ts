import { BuffetCombosItems, BuffetDishItem, Order, CONST, OrderTypeEnum } from '../index';
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

/**
 *
 */
export function getRoundCoundAndSecondsToNextTurn({
    order,
}: {
    order: Order;
}): {
    roundCount?: number;
    maxRounds?: number;
    secondsToNextTurn: number;
} {
    let secondsToNextTurn = 0;
    const buffetCombosItems = order.buffet?.snapshot;
    if (!buffetCombosItems.orderingByTurns?.enable) {
        throw 'Buffet ordering by turns is not enabled';
    }
    const { interval, maxRounds } = buffetCombosItems.orderingByTurns;
    const previousBuffetSubmitTasks = order.tasks.filter(
        (task) =>
            (task.type === CONST.TASK_TYPE.CHECK || task.type === CONST.TASK_TYPE.APPEND) &&
            _haveAtLeastOneSameItem(
                task.content.map((content) => String(content.dishSnapshot._id)),
                buffetCombosItems.dishes.map((dish) => String(dish.dishId)),
            ),
    );
    if (previousBuffetSubmitTasks.length === 0) {
        secondsToNextTurn = 0;
    } else if (previousBuffetSubmitTasks.length >= maxRounds) {
        secondsToNextTurn = Infinity;
    } else {
        const lastBuffetSubmitTime = previousBuffetSubmitTasks[previousBuffetSubmitTasks.length - 1].date;
        secondsToNextTurn = interval * 60 - Math.floor((Date.now() - new Date(lastBuffetSubmitTime).getTime()) / 1000);
    }
    return {
        roundCount: previousBuffetSubmitTasks.length,
        secondsToNextTurn,
        maxRounds,
    };
}

/**
 * @param arr1
 * @param arr2
 */
function _haveAtLeastOneSameItem<T>(arr1: T[], arr2: T[]): boolean {
    const set1 = new Set(arr1);
    return arr2.some((item) => set1.has(item));
}
