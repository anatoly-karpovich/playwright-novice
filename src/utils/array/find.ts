import { MaybePromise, AsyncCallback } from "types/data/functions.types";

/**
 * finds value in array by provided predicate
 *
 * @template T type of element
 * @param {Array<T>} array array or async array. Auto wait in case of async array.
 * @param {AsyncCallback<T>} callback - find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns `true`. If such an element is found, find immediately returns that element value. Otherwise, find returns `undefined`.
 */
export default async function find<T>(array: MaybePromise<readonly T[]>, callback: AsyncCallback<T, boolean>): Promise<T | undefined> {
  const awaited: readonly T[] = await array;
  for (let index = 0; index < awaited.length; index++) {
    const result = await callback(awaited[index], index, awaited);
    if (result) {
      return awaited[index];
    }
  }
  return undefined;
}
