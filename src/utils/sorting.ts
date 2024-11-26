import { Order } from "@/types/components/table.types";
import { User } from "@/types/api.types";

export function descendingComparator<Key extends keyof User>(
    a: User,
    b: User,
    orderBy: Key
): number {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (valueA === undefined || valueB === undefined) {
        return 0;
    }

    if (valueA < valueB) {
        return 1;
    }
    if (valueA > valueB) {
        return -1;
    }
    return 0;
}

export function getComparator<Key extends keyof User>(
    order: Order,
    orderBy: Key
): (a: User, b: User) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
