import Tree from "./Tree.js";
let arr=[1, 7, 4, 23, 8,8,15,13,4, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let arr2=[];
let tree=new Tree(arr);

console.log(tree.prettyPrint()); // Verificar el resultado
console.log(tree.insert(2));
console.log(tree.prettyPrint());
console.log(tree.find(324));
console.log(tree.delete(1));
console.log(tree.prettyPrint());
console.log(tree.delete(15));
console.log(tree.prettyPrint());
// Definir el callback
const printNode = (node) => arr2.push(node.data);

// Usar postOrder con el callback
console.log(tree.insert(11));
console.log(tree.insert(17));
console.log(tree.insert(3333));
console.log(tree.isBalanced());
tree.rebalancedTree();
console.log(tree.prettyPrint());
console.log(tree.isBalanced());

