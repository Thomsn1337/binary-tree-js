/**
 * @param {number[]} left
 * @param {number[]} right
 */
function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }

    return [...result, ...left, ...right];
}

/**
 * @param {number[]} arr
 */
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const half = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, half));
    const right = mergeSort(arr.slice(half));

    return merge(left, right);
}

export default mergeSort;
