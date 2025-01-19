import Tree from "./Tree.js";
let arr=[];
let arrPrint=[]
for(let i=0;i<=100;i++){
    arr.push(Math.floor(Math.random()*333));
}
console.log("Creamos el arbol");
let tree=new Tree(arr);
console.log("Esta balanceado?");
console.log(tree.isBalanced())
console.log("level,InOrder,PreOrder y PostOrder")
let print=(node)=>arrPrint.push(node.data);
tree.levelOrder(print,tree.root);
console.log(arrPrint);
arrPrint=[]
tree.inOrder(print,tree.root);
console.log(arrPrint);
arrPrint=[]
tree.preOrder(print,tree.root);
console.log(arrPrint);
arrPrint=[]
tree.postOrder(print,tree.root);
console.log(arrPrint);
arrPrint=[]
console.log("Insertamos valores>100");
console.log(tree.insert(1122));
console.log(tree.insert(173));
console.log(tree.insert(3333));
console.log("Esta balanceado?");
console.log(tree.isBalanced());
console.log("rebalanceamos");
console.log(tree.rebalancedTree());
console.log("Esta balanceado?");
console.log(tree.isBalanced());