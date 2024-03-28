import { AsyncCallback, MaybePromise } from "types/data/functions.types";

/**
 * Returns the elements of an array that meet the condition specified in a callback function.
 *
 * @template T type of element
 * @param {Array<T>} array array or async array. Auto wait in case of async array.
 * @param {AsyncCallback<T,U>} callback A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. Should returns `boolean` result.
 * @returns {Promise<Array<T>>} filtered array
 */
export default async function filter<T>(array: MaybePromise<readonly T[]>, callback: AsyncCallback<T, boolean>): Promise<T[]> {
  const awaited: readonly T[] = await array;
  const results: T[] = [];
  for (let index = 0; index < awaited.length; index++) {
    const result = await callback(awaited[index], index, awaited);
    if (result) {
      results.push(awaited[index]);
    }
  }
  return results;
}
