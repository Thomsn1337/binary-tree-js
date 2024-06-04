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

    /**
     * @param {number} val
     * @param {TreeNode | null} [node=this.root]
     *
     * @returns {TreeNode}
     */
    insert(val, node = this.root) {
        if (node === null) return new TreeNode(val);

        if (val < node.data) node.left = this.insert(val, node.left);
        else if (val > node.data) node.right = this.insert(val, node.right);

        return node;
    }

    /**
     * @param {number} val
     * @param {TreeNode | null} [node=this.root]
     */
    delete(val, node = this.root) {
        if (node === null) return node;

        if (val < node.data) node.left = this.delete(val, node.left);
        else if (val > node.data) node.right = this.delete(val, node.right);
        else {
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;

            node.data = this.#minValue(node.right);
            node.right = this.delete(node.data, node.right);
        }

        return node;
    }

    /**
     * @param {number} val
     * @param {TreeNode | null} [node=this.root]
     *
     * @returns {TreeNode | null}
     */
    find(val, node = this.root) {
        if (node === null || val === node.data) return node;

        if (val < node.data) node = this.find(val, node.left);
        else if (val > node.data) node = this.find(val, node.right);

        return node;
    }

    /**
     * @param {Function | null} callback
     */
    levelOrder(callback = null) {
        if (!this.root) return;

        const queue = [this.root];
        const nodes = [];

        while (queue.length) {
            const current = queue.shift();

            if (current) {
                nodes.push(current.data);

                if (current.left) queue.push(current.left);
                if (current.right) queue.push(current.right);

                if (callback) callback(current);
            }
        }

        if (!callback) return nodes;
    }

    /**
     * @param {Function | null} [callback=null]
     */
    preOrder(callback = null) {
        const nodes = [];
        const root = this.root;

        /**
         * @param {TreeNode | null} [node=this.root]
         */
        function traverse(node) {
            if (!node) return;

            nodes.push(node.data);
            if (callback) callback(node);

            traverse(node.left);
            traverse(node.right);
        }

        traverse(root);

        if (!callback) return nodes;
    }

    /**
     * @param {Function | null} [callback=null]
     */
    inOrder(callback = null) {
        const nodes = [];
        const root = this.root;

        /**
         * @param {TreeNode | null} [node=this.root]
         */
        function traverse(node) {
            if (!node) return;

            traverse(node.left);

            nodes.push(node.data);
            if (callback) callback(node);

            traverse(node.right);
        }

        traverse(root);

        if (!callback) return nodes;
    }

    /**
     * @param {Function | null} [callback=null]
     */
    postOrder(callback = null) {
        const nodes = [];
        const root = this.root;

        /**
         * @param {TreeNode | null} [node=this.root]
         */
        function traverse(node) {
            if (!node) return;

            traverse(node.left);
            traverse(node.right);

            nodes.push(node.data);
            if (callback) callback(node);
        }

        traverse(root);

        if (!callback) return nodes;
    }

    /**
     * @param {TreeNode} node
     *
     * @returns {number}
     */
    #minValue(node) {
        let min = node.data;

        while (node.left !== null) {
            min = node.left.data;
            node = node.left;
        }

        return min;
    }

    /**
     * @param {TreeNode | null} [node=this.root]
     * @param {string} [prefix=""]
     * @param {boolean} [isLeft=true]
     */
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false,
            );
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true,
            );
        }
    }
}

export default Tree;
