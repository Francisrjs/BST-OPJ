import mergeSort from "./mergeSort.js";
import Node from "./node.js";
export default class Tree {
    constructor(array){
        const processArray= this.eliminateDuplicates(array);
        const sortedArray= mergeSort(processArray);
        console.log(sortedArray);
        this.root=this.buildTree(sortedArray);
    }
    buildTree(array) {
      if (array.length == 0) return null;
      const mid = Math.floor(array.length / 2); // Cambiado a array.length / 2
      console.log(`Array actual: ${array}, Nodo raíz: ${array[mid]}`);
      const node = new Node(array[mid]);
  
      node.left = this.buildTree(array.slice(0, mid));
      node.right = this.buildTree(array.slice(mid + 1));
  
      return node;
  }
    eliminateDuplicates(array) {
        return [...new Set(array)];
    }
prettyPrint() {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
      prettyPrint(this.root);
}
}