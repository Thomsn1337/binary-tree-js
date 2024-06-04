import Tree from "./binaryTree.js";

const randomArr = [];

for (let i = 0; i < 20; i++) {
    randomArr.push(Math.floor(Math.random() * 100) + 1);
}

const tree = new Tree(randomArr);

tree.prettyPrint();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

tree.insert(150);
tree.insert(140);
tree.insert(130);
tree.insert(180);
tree.insert(250);

console.log("\n-------------------\n");

tree.prettyPrint();
console.log(tree.isBalanced());

console.log("\n-------------------\n");

tree.rebalance();

tree.prettyPrint();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
