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
    if (current==null){
      return null
    }
    if (current.data==value) { 
      return current;
    }
   
    // Value <>
    if (value < current.data) {
      return this.find(value, current.left); 
  } else { 
      return this.find(value, current.right); 
  }
}
  delete(value){
    const nodeToDelete = this.find(value); 
  if (nodeToDelete === null) return false; 


  // Case 1: Node with out children's
  if (nodeToDelete.left === null && nodeToDelete.right === null) {
    this.deleteParent(value,nodeToDelete);
    return true;
  }
  //  Case 2: Node with one children
  if ((nodeToDelete.left === null && nodeToDelete.right !== null) ||
        (nodeToDelete.right === null && nodeToDelete.left !== null)) {
    const childNode = nodeToDelete.left || nodeToDelete.right; // Hijo no nulo
    this.deleteParent(value,nodeToDelete,childNode);
  }
  // Case 3: Node with two Children's
  if (nodeToDelete.right,nodeToDelete.left !==null){
    const childRightNode= nodeToDelete.right;
    const childLeftNode= nodeToDelete.left;
    if (childRightNode.value>childLeftNode.value){
      childRightNode.right=childLeftNode;
      this.deleteParent(value,nodeToDelete,childRightNode);
    } else{
      childLeftNode.right=childRightNode;
      this.deleteParent(value,nodeToDelete,childLeftNode);
    }
    
  }
  return false;
    
  }
  findParent(value, current = this.root) {
    // C. Base: si el árbol está vacío o es el nodo raíz
    if (current === null || current.left === null && current.right === null) {
      return null;
    }
  
    // Si el nodo actual es padre del nodo buscado
    if ((current.left && current.left.data === value) || 
        (current.right && current.right.data === value)) {
      return current;
    }
  
    // Buscar recursivamente en la izquierda o derecha según el valor
    if (value < current.data) {
      return this.findParent(value, current.left);
    } else {
      return this.findParent(value, current.right);
    }
  }
  deleteParent(value, nodeToDelete, Child=null){
    const parent = this.findParent(value); // Encuentra el padre del nodo a eliminar
    if (parent){
      if (parent.left === nodeToDelete) {
        parent.left = Child;
      } else if (parent.right === nodeToDelete) {
        parent.right = Child;
      }
    }else{
      this.root = Child;
    }
    console.log(`Nodo ${value} eliminado. Hijo asignado: ${Child ? Child.data : "ninguno"}`);
  }
}