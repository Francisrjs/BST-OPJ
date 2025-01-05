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
    const mid = Math.floor(array.length / 2); 
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
  insert(value, current= this.root){
    if (this.root==null) { //C. Base
      this.root=new Node(value);
      return;
    }
    if (value<= current.data){ 
      if (current.left==null) {
        current.left= new Node(value);
      } else {
        this.insert(value,current.left);
      }
    }else{ // value >= current.data
      if (current.right==null){
        current.right= new Node(value);
      } else{
        this.insert(value,current.right);
      }
    }
    console.log(`Valor ${value} insertado.`);
}
  find(value,current=this.root){
    //C. Base
    if (current.data==value) { 
      return current;
    }
    if (current.data==null){
      return null
    }
    // Value <>
    if (value < current.data) {
      return this.find(value, current.left); 
  } else { 
      return this.find(value, current.right); 
  }
}
}