import Tree from "./Tree.js";
let arr=[1, 7, 4, 23, 8,8,15,13,4, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree=new Tree(arr);

console.log(tree.prettyPrint()); // Verificar el resultado
console.log(tree.insert(2));
console.log(tree.prettyPrint());
console.log(tree.find(324));
console.log(tree.delete(1));
console.log(tree.prettyPrint());
console.log(tree.delete(15));
console.log(tree.prettyPrint());
//calback
const printNode = (node) => console.log(node.data);

// Usar preOrder con el callback
tree.postOrder(printNode);