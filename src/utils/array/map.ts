import { MaybePromise, AsyncCallback, Settings } from "types/data/functions.types";

/**
 * iterate async array and returns new array with results
 *
 * **Note:** if you want to use `serial` option, you should use `serial` setting instead.
 *
 * @template T type of element
 * @param {MaybePromise<T>} array array or async array. Auto wait in case of async array.
 * @param {AsyncCallback<T>} callback - A function that accepts up to three arguments. The map method calls the `callback` function one time for each element in the array.
 * @param {Settings} settings - subset of settings, like `serial`
 * @see {@link Settings}
 */
export default async function map<T, U>(array: MaybePromise<readonly T[]>, callback: AsyncCallback<T, U>, settings?: Settings) {
  const awaited: readonly T[] = await array;
  if (settings?.serial) {
    const mappedArr: U[] = [];
    for (let i = 0; i < awaited.length; i++) {
      mappedArr.push(await callback(awaited[i], i, awaited));
    }
    return mappedArr;
  } else {
    return Promise.all(awaited.map(callback));
  }
}
