import mergeSort from "./mergeSort.js";
class TreeNode {
    /**
     * @constructor
     * @param {number} data
     */
    constructor(data) {
        this.data = data;

        /**
         * @type {TreeNode | null}
         */
        this.left = null;

        /**
         * @type {TreeNode | null}
         */
        this.right = null;
    }
}

class Tree {
    /**
     * @constructor
     * @param {number[]} arr
     */
    constructor(arr) {
        const uniqueArr = mergeSort([...new Set(arr)]);

        this.root = this.buildTree(uniqueArr);
    }

    /**
     * @param {number[]} arr
     * @param {number} [start=0]
     * @param {number} [end=arr.length - 1]
     *
     * @returns {TreeNode | null}
     */
    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);

        const node = new TreeNode(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }
}

export default Tree;